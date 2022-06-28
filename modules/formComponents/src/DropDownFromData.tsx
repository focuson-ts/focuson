import { LensProps, LensState } from "@focuson/state";
import { CommonStateProps, InputOnChangeProps } from "./common";
import { LabelAndDropdown } from "./labelAndDropdown";
import { NameAnd } from "@focuson/utils";
import { FocusOnContext } from "@focuson/focuson";
import { cleanInputProps } from "./input";
import { DropDownWithVaryingContentProps } from "./DropDownWithVaryingContent";

export interface DropDownFromDataProps<S, T, C> extends CommonStateProps<S, string, C>, InputOnChangeProps<S, C> {
  label: string;
  parentState?: LensState<S, any, C>;
  data: LensState<S, T[], C>;
  dataId: keyof T;
  dataField: keyof T;
  allButtons: NameAnd<any>;
  pleaseSelect?: string;
  size?: number;
  required?: boolean;
}

export function LabelAndDropDownFromData<S, T, C extends FocusOnContext<S>> ( props: DropDownFromDataProps<S, T, C> ) {
  const { state, data, dataId, dataField, allButtons, parentState } = props

  const actualData = data.optJsonOr ( [] )
  const enums = Object.fromEntries ( actualData.map ( t => [ t[ dataId ], t[ dataField ] ] ) )
  return <LabelAndDropdown parentState={parentState} {...props} state={state} allButtons={allButtons} enums={enums}/>
}