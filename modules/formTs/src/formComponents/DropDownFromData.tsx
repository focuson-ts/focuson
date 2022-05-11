import { LensProps, LensState } from "@focuson/state";
import { CommonStateProps } from "./common";
import { LabelAndDropdown } from "./labelAndDropdown";
import { NameAnd } from "@focuson/utils";
import { FocusOnContext } from "@focuson/focuson";

export interface DropDownFromDataProps<S, C> extends CommonStateProps<S, string, C> {
  label: string;
  /** A list of values */
  data: LensState<S, any, C>;
  /** for example { m: 'mainCustomerName',j: 'jointCustomerName',n: 'New Bank'} */
  idAndField: NameAnd<string>;
  allButtons: NameAnd<any>
}

export function DropDownFromData<S, C extends FocusOnContext<S>> ( { id, label, state, idAndField, data }: DropDownFromDataProps<S, C> ) {
  const actualData = data.optJsonOr ( {} )
  const enums = Object.fromEntries ( Object.entries ( idAndField ).map ( ( [ id, field ] ) => [ id, actualData[ field ] ] ) )
  return <LabelAndDropdown state={state} allButtons={{}} label={label} id={id} enums={enums}/>
}