import { page, PageMode, PageSelectionContext } from "./pageSelection";
import { LensProps } from "@focuson/state";
import { sortedEntries } from "@focuson/utils";

export interface SelectPageProps<S, Context> extends LensProps<S, any, Context> {

  pageName: string;
  pageMode: PageMode
}
export function SelectPage<S, Context extends PageSelectionContext<S>> ( { state, pageName, pageMode }: SelectPageProps<S, Context> ) {
  return <button onClick={() => page ( state, 'select', { pageName, firstTime: true, pageMode } )}>{pageName}</button>
}

export interface IndexPageProps<S, Context extends PageSelectionContext<S>> extends LensProps<S, S, Context> {
  children: JSX.Element | JSX.Element[]
}


export function IndexPage<S, Context extends PageSelectionContext<S>> ( { state, children }: IndexPageProps<S, Context> ) {
  return (
    <div>
      <ul>
        {sortedEntries ( state.context.pages ).map ( ( [ name, pd ] ) =>
          <li key={name}><SelectPage state={state} pageName={name} pageMode='edit'/></li> )}
      </ul>
      {children}
    </div>)
}
