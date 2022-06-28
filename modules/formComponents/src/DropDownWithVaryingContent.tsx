import { LensProps, LensState } from "@focuson/state";
import { CommonStateProps } from "./common";
import { LabelAndDropdown } from "./labelAndDropdown";
import { NameAnd } from "@focuson/utils";
import { FocusOnContext } from "@focuson/focuson";
import { cleanInputProps } from "./input";

export interface DropDownWithVaryingContentProps<S, C> extends CommonStateProps<S, string, C> {
  label: string;
  parentState: LensState<S, any, C>;
  selector: LensState<S, string, C> //this is the data about which enum we want
  enums: NameAnd<NameAnd<string>>
  allButtons: NameAnd<any>;
  pleaseSelect?: string;
  size?: number;
  required?: boolean;
}

export function LabelAndDropDownWithVaryingContent<S, C extends FocusOnContext<S>> ( props: DropDownWithVaryingContentProps<S, C> ) {
  const { parentState, state, selector, enums, allButtons } = props
  const s = selector.optJson ()
  const selectedEnums = s ? enums[ s ] : {}
  const cleanProps: Omit<DropDownWithVaryingContentProps<S, C>, 'parentState'> = cleanInputProps ( props )
  return <LabelAndDropdown parentState={parentState} {...cleanProps} state={state} allButtons={allButtons} enums={selectedEnums}/>
}