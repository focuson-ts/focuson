import { lensState, LensState } from '@focuson/state';
import { State, Store } from '@sambego/storybook-state';
import { ReactNode } from 'react';
import { PageSelectionContext } from "@focuson/pages";
import { StateObject } from "@sambego/storybook-state/Store";

// type SBookProviderI = <S>( initialState: S, component: ( s: LensState<Store<S>, S, Context<S>> ) => ReactNode ) => JSX.Element;

export function SBookProvider<S extends StateObject, Context> ( initialState: S, context: Context, component: ( s: LensState<S, S, Context> ) => ReactNode ) {
  const store = new Store<S> ( initialState );
  function makeState (s:S) {
    return lensState<S, Context> (
      s,
      ( m ) => {
        console.log ( 'state change', `${JSON.stringify ( store.state, null, 2 )}===>${JSON.stringify ( m.state, null, 2 )}` );
        store.set (m);
      },
      'SBookProvider',
      context
    )
  }

  return <State store={store}>{s=>component ( makeState(s) )}</State>;
};
