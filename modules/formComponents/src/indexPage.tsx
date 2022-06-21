import { isMainPageDetails, isPopup, PageSelectionContext, SelectPage } from "@focuson/pages";
import { LensProps, LensState } from "@focuson/state";
import { Lenses } from "@focuson/lens";
import { DateFn, sortedEntries } from "@focuson/utils";


export interface IndexPageProps<S, Context extends PageSelectionContext<S>> extends LensProps<S, S, Context> {
  children: JSX.Element | JSX.Element[],
  dateFn: DateFn
}


export function IndexPage<S, Context extends PageSelectionContext<S>> ( { state, children, dateFn }: IndexPageProps<S, Context> ) {
  // @ts-ignore
  let showDebugState: LensState<S, boolean, Context> = state.copyWithLens ( Lenses.identity<S> ().focusQuery ( 'debug' ).focusQuery ( 'showDebug' ) );
  return (
    <div>
      <ul>
        {sortedEntries ( state.context.pages ).filter ( ( [ name, pd ] ) => isMainPageDetails ( pd ) ).map ( ( [ name, pd ] ) => {
          if ( !isMainPageDetails ( pd ) ) throw Error ( 'software error' )
          return <li key={name}><SelectPage state={state} id={`selectPage-${name}`} pageName={name} pageMode={pd.pageMode} dateFn={dateFn} popup={isPopup(pd)}/></li>;
        } )}

      </ul>
      {children}
    </div>)
}
