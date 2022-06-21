import { page, PageMode, PageSelectionContext } from "./pageSelection";
import { LensProps, reasonFor } from "@focuson/state";
import { DateFn, decamelize } from "@focuson/utils";

export interface SelectPageProps<S, Context> extends LensProps<S, any, Context> {
  id?: string
  text?: string
  pageName: string;
  pageMode: PageMode;
  dateFn: DateFn;
  popup?: boolean
}
export function SelectPage<S, Context extends PageSelectionContext<S>> ( { id, state, pageName, pageMode, text, dateFn, popup }: SelectPageProps<S, Context> ) {
  const className = popup === true ? 'secondary-btn' : 'primary-btn'
  return <button className={className} id={id} onClick={() => state.massTransform ( reasonFor ( 'SelectPage', 'onClick', id ) ) (
    page ( state.context, 'select', { pageName, firstTime: true, pageMode, time: dateFn () } ) )}>{text ? text : decamelize ( pageName, ' ' )}</button>
}
