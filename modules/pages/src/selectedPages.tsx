import { MultiPageDetails } from "./pageConfig";
import { PageSelection } from "./pageSelection";
import { Lens } from "@focuson/lens";
import { LensProps } from "@focuson/state";
import { sortedEntries } from "@focuson/utils";
import { ModalPagesDetails } from "./modal/modalPages";

export interface SelectPageProps<S> extends LensProps<S, any> {
  selectedPageLens: Lens<S, PageSelection>;
  pageName: string;
}
export function SelectPage<S> ( { state, selectedPageLens, pageName }: SelectPageProps<S> ) {
  return <button onClick={() => state.copyWithLens ( selectedPageLens ).setJson ( { pageName, firstTime: true } )}>{pageName}</button>
}
export interface IndexPageProps<S,Details extends ModalPagesDetails<S>> extends LensProps<S, S> {
  selectedPageLens: Lens<S, PageSelection>;
  pages: MultiPageDetails<S, Details>;
  children: JSX.Element | JSX.Element[]
}


export function IndexPage <S,Details extends ModalPagesDetails<S>>( { pages, state, children, selectedPageLens }: IndexPageProps<S,Details> ) {
  return (
    <div>
      <ul>
        {sortedEntries ( pages ).map ( ( [ name, pd ] ) =>
          <li key={name}><SelectPage state={state} pageName={name} selectedPageLens={selectedPageLens}/></li> )}
      </ul>
      {children}
    </div>)
}
