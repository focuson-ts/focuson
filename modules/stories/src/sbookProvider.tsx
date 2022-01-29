import { lensState, LensState } from '@focuson/state';
import { State, Store } from '@sambego/storybook-state';
import { ReactNode } from 'react';

type SBookProviderI = <S>( initialState: S, component: ( s: LensState<Store<S>, S> ) => ReactNode ) => JSX.Element;

export const SBookProvider: SBookProviderI = ( initialState, component ) => {
  const store = new Store ( initialState );
  let s = lensState (
    store,
    ( m ) => {
      console.log ( 'state change',
        `${JSON.stringify ( store.state, null, 2 )}
===>
${JSON.stringify ( m.state, null, 2 )}` );
      store.set ( m.state );
    },
    'SBookProvider'
  );
  return <State store={store}>{component ( s.focusOn ( 'state' ) )}</State>;
};
