import { MultiPageDetails } from "./pageConfig";
import { PageMode, PageSelection } from "./pageSelection";
import { Lens } from "@focuson/lens";
import { LensProps } from "@focuson/state";
import { sortedEntries } from "@focuson/utils";
import { ModalPagesDetails } from "./modal/modalPages";

export interface SelectPageProps<S, Context> extends LensProps<S, any, Context> {
  selectedPageLens: Lens<S, PageSelection>;
  pageName: string;
  pageMode: PageMode
}
export function SelectPage<S, Context> ( { state, selectedPageLens, pageName, pageMode }: SelectPageProps<S, Context> ) {
  return <button onClick={() => state.copyWithLens ( selectedPageLens ).setJson ( { pageName, firstTime: true, pageMode } )}>{pageName}</button>
}
export interface IndexPageProps<S, Details extends ModalPagesDetails<S, Context>, Context> extends LensProps<S, S, Context> {
  selectedPageLens: Lens<S, PageSelection>;
  pages: MultiPageDetails<S, Details, Context>;
  children: JSX.Element | JSX.Element[]
}


export function IndexPage<S, Details extends ModalPagesDetails<S, Context>, Context> ( { pages, state, children, selectedPageLens }: IndexPageProps<S, Details, Context> ) {
  return (
    <div>
      <ul>
        {sortedEntries ( pages ).map ( ( [ name, pd ] ) =>
          <li key={name}><SelectPage state={state} pageName={name} pageMode='edit' selectedPageLens={selectedPageLens}/></li> )}
      </ul>
      {children}
    </div>)
}
