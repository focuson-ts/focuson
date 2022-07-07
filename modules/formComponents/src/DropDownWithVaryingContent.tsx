import { LensState } from "@focuson/state";
import { CommonStateProps, DropDownOnChangeProps } from "./common";
import { LabelAndDropdown } from "./labelAndDropdown";
import { NameAnd } from "@focuson/utils";
import { FocusOnContext } from "@focuson/focuson";
import { HasButtons } from "./makeButtons";

export interface DropDownWithVaryingContentProps<S, C> extends CommonStateProps<S, string, C>, DropDownOnChangeProps<S, C>,HasButtons {
  label: string;
  parentState?: LensState<S, any, C>;
  selector: LensState<S, string, C> //this is the data about which enum we want
  enums: NameAnd<NameAnd<string>>
  pleaseSelect?: string;
  size?: number;
  required?: boolean;
  readonly?: boolean
}

export function LabelAndDropDownWithVaryingContent<S, C extends FocusOnContext<S>> ( props: DropDownWithVaryingContentProps<S, C> ) {
  const {  state, selector, enums, allButtons } = props
  const s = selector.optJson ()
  const selectedEnums = s ? enums[ s ] : {}
  return <LabelAndDropdown  {...props} state={state} allButtons={allButtons} enums={selectedEnums}/>
}