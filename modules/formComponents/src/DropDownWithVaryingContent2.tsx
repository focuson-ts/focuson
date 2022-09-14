import { LensState } from "@focuson/state";
import { CommonStateProps, DropDownOnChangeProps } from "./common";
import { LabelAndDropdown } from "./labelAndDropdown";
import { NameAnd } from "@focuson/utils";
import { FocusOnContext } from "@focuson/focuson";
import { HasButtons } from "./makeButtons";

export interface DropDownWithVaryingContent2Props<S, C> extends CommonStateProps<S, string, C>, DropDownOnChangeProps<S, C>, HasButtons {
  label: string;
  parentState?: LensState<S, any, C>;
  selector1: LensState<S, string, C> //this is the data about which enum we want
  selector2: LensState<S, string, C> //this is the data about which enum we want
  enums: NameAnd<NameAnd<NameAnd<string>>>
  pleaseSelect?: string;
  size?: number;
  required?: boolean;
  readonly?: boolean
}

export function LabelAndDropDownWithVaryingContent2<S, C extends FocusOnContext<S>> ( props: DropDownWithVaryingContent2Props<S, C> ) {
  const { state, selector1, selector2, enums, allButtons } = props
  const s1 = selector1.optJson ()
  const s2 = selector2.optJson ()
  const selectedEnums = s1 && s2 ? enums[ s1 ]?.[ s2 ] : {}
  return <LabelAndDropdown  {...props} state={state} allButtons={allButtons} enums={selectedEnums}/>
}