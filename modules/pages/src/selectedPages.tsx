import { page, PageSelectionContext } from "./pageSelection";
import { LensProps, reasonFor } from "@focuson/state";
import { DateFn, decamelize, HasDateFn, PageMode } from "@focuson/utils";
import {wrapWithErrors} from "./errors";
import {getRefForValidateLogicToButton} from "./validity";

export interface SelectPageProps<S, Context> extends LensProps<S, any, Context> {
  id?: string
  text?: string
  pageName: string;
  pageMode: PageMode;
  dateFn?: DateFn;
  popup?: boolean
  enabledBy?: string[][];
  validate?: boolean;
}
export function SelectPage<S, Context extends PageSelectionContext<S> & HasDateFn> ( { id, state, pageName, pageMode, text, dateFn, popup, enabledBy, validate }: SelectPageProps<S, Context> ) {
  const className = popup === true ? 'secondary-btn' : 'primary-btn'
  const realDataFn = dateFn ? dateFn : state.context.dateFn;

  return wrapWithErrors ( id, enabledBy, [], ( errorProps, error, errorRef, allErrors ) =>
    <button ref={getRefForValidateLogicToButton ( state ) ( id, false, validate===true, allErrors, errorRef )}
            className={className} id={id}
            {...errorProps} disabled={error}
            onClick={() => state.massTransform (
            reasonFor ( 'SelectPage', 'onClick', id ) ) (
              page ( state.context, 'select', { pageName, firstTime: true, pageMode, time: realDataFn () } ) )}>

    {text ? text : decamelize ( pageName, ' ' )}</button> )
}
