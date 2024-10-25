import React, {ReactNode} from "react";
import {useStateOps} from "@focuson/state";
import {EditFieldMaker, FieldComponents} from "../interfaces/field.components";


export const SimpleComponentsContext = React.createContext<EditFieldMaker | undefined>(undefined);

export const SimpleComponentsProvider: React.FC<{ maker: EditFieldMaker, children: ReactNode }> =
    ({maker, children}) =>
        <SimpleComponentsContext.Provider value={maker}>{children}</SimpleComponentsContext.Provider>

export const useComponents = <T, >(path: string): FieldComponents => {
    const [state,setEvent] =useStateOps<T>()
    const components = React.useContext(SimpleComponentsContext);
    if (!components) throw new Error("No SimpleComponentsProvider available");
    return components?.(path,state, setEvent);
}

