import { page, PageMode, PageSelectionContext } from "./pageSelection";
import { LensProps, reasonFor } from "@focuson/state";
import { decamelize } from "@focuson/utils";

export interface SelectPageProps<S, Context> extends LensProps<S, any, Context> {
  id?: string
  text?: string
  pageName: string;
  pageMode: PageMode
}
export function SelectPage<S, Context extends PageSelectionContext<S>> ( { id, state, pageName, pageMode, text }: SelectPageProps<S, Context> ) {
  return <button id={id} onClick={() => state.massTransform ( reasonFor ( 'SelectPage', 'onClick', id ) ) (
    page ( state.context, 'select', { pageName, firstTime: true, pageMode } ) )}>{text ? text : decamelize ( pageName, ' ' )}</button>
}
