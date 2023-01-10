import { LensState } from "@focuson-nw/state";
import { CommonStateProps, DropDownOnChangeProps } from "./common";
import { LabelAndDropdown } from "./labelAndDropdown";
import { FocusOnContext } from "@focuson-nw/focuson";
import { HasButtons } from "./makeButtons";

export interface DropDownFromDataProps<S, T, C> extends CommonStateProps<S, string, C>, DropDownOnChangeProps<S, C> , HasButtons{
  label: string;
  parentState?: LensState<S, any, C>;
  data: LensState<S, T[], C>;
  dataId: keyof T;
  dataField: keyof T;
  pleaseSelect?: string;
  size?: number;
  required?: boolean;
  readonly?: boolean
}

export function LabelAndDropDownFromData<S, T, C extends FocusOnContext<S>> ( props: DropDownFromDataProps<S, T, C> ) {
  const { state, data, dataId, dataField, allButtons, parentState } = props

  const actualData = data.optJsonOr ( [] )
  const enums = Object.fromEntries ( actualData.map ( t => [ t[ dataId ], t[ dataField ] ] ) )
  return <LabelAndDropdown parentState={parentState} {...props} state={state} allButtons={allButtons} enums={enums}/>
}