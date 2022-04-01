import { page, PageMode, PageSelectionContext } from "./pageSelection";
import { LensProps, reasonFor } from "@focuson/state";

export interface SelectPageProps<S, Context> extends LensProps<S, any, Context> {
  id?: string
  pageName: string;
  pageMode: PageMode
}
export function SelectPage<S, Context extends PageSelectionContext<S>> ( { id, state, pageName, pageMode }: SelectPageProps<S, Context> ) {
  return <button id={id} onClick={() => state.massTransform ( reasonFor ( 'SelectPage', 'onClick', id ) ) ( page ( state.context, 'select', { pageName, firstTime: true, pageMode } ) )}>{pageName}</button>
}
