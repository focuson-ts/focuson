import { page, PageSelectionContext } from "./pageSelection";
import { LensProps, reasonFor } from "@focuson/state";
import { DateFn, decamelize, HasDateFn, PageMode } from "@focuson/utils";

export interface SelectPageProps<S, Context> extends LensProps<S, any, Context> {
  id?: string
  text?: string
  pageName: string;
  pageMode: PageMode;
  dateFn?: DateFn;
  popup?: boolean
}
export function SelectPage<S, Context extends PageSelectionContext<S> & HasDateFn> ( { id, state, pageName, pageMode, text, dateFn, popup }: SelectPageProps<S, Context> ) {
  const className = popup === true ? 'secondary-btn' : 'primary-btn'
  const realDataFn = dateFn ? dateFn : state.context.dateFn;
  return <button className={className} id={id}
                                        onClick={() => state.massTransform (
                   reasonFor ( 'SelectPage', 'onClick', id ) ) (
    page ( state.context, 'select', { pageName, firstTime: true, pageMode, time: realDataFn () } ) )}>

    {text ? text : decamelize ( pageName, ' ' )}</button>
}
