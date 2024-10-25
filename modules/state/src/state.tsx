import React from "react";
import {EventProcessor, LensEvent, SetEvent} from "@focuson/events";
import {appendPath} from "@focuson/utils";

export type SetFn = (path: string, localPath: string, value: string) => void;
export type StateOps<S> = [Partial<S>, SetFn];
export const StateContext = React.createContext<StateOps<any> | undefined>(undefined);

export function useStateOps<S>(): StateOps<S> {
    const stateOps = React.useContext(StateContext);
    if (!stateOps) throw new Error('useStateOps must be used within a StateProvider');
    return stateOps as StateOps<S>;
}

type StateProviderProps<S> = { initialEvents: LensEvent[], processor: EventProcessor<S>, children: React.ReactNode }

export function StateOpsProvider<S>({initialEvents, processor, children}: StateProviderProps<S>) {
    const [events, setEvents] = React.useState<LensEvent[]>(initialEvents);
    const [state, setState] = React.useState<Partial<S>>({});

    const setValue: SetFn = (path, localPath, value) => {
        const event: SetEvent = {type: 'setValue', path: appendPath(path, localPath), value};
        let newEvents = [...events, event];
        setEvents(newEvents);
        const newState = processor([event], state); //note we could run all events instead...
        setState(newState);
        console.log('fireEvent', event, newEvents, newState);
    }
    return <StateContext.Provider value={[state, setValue]}>{children}</StateContext.Provider>
}
