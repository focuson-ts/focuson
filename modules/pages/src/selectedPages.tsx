import { page, PageMode, PageSelectionContext } from "./pageSelection";
import { LensProps, reasonFor } from "@focuson/state";
import { sortedEntries } from "@focuson/utils";
import { isMainPageDetails } from "./pageConfig";

export interface SelectPageProps<S, Context> extends LensProps<S, any, Context> {
  id?: string
  pageName: string;
  pageMode: PageMode
}
export function SelectPage<S, Context extends PageSelectionContext<S>> ( { id, state, pageName, pageMode }: SelectPageProps<S, Context> ) {
  return <button id={id} onClick={() => state.massTransform ( reasonFor ( 'SelectPage', 'onClick', id ) ) ( page ( state.context, 'select', { pageName, firstTime: true, pageMode } ) )}>{pageName}</button>
}

export interface IndexPageProps<S, Context extends PageSelectionContext<S>> extends LensProps<S, S, Context> {
  children: JSX.Element | JSX.Element[]
}


export function IndexPage<S, Context extends PageSelectionContext<S>> ( { state, children }: IndexPageProps<S, Context> ) {
  return (
    <div>
      <ul>
        {sortedEntries ( state.context.pages ).filter ( ( [ name, pd ] ) => isMainPageDetails ( pd ) ).map ( ( [ name, pd ] ) =>
          <li key={name}><SelectPage state={state} id={`selectPage-${name}`} pageName={name} pageMode={pd.pageMode}/></li> )}
      </ul>
      {children}
    </div>)
}
