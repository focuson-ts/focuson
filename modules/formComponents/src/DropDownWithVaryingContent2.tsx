import { LensState } from "@focuson-nw/state";
import { CommonStateProps, DropDownOnChangeProps } from "./common";
import { LabelAndDropdown } from "./labelAndDropdown";
import { NameAnd, safeObject } from "@focuson-nw/utils";
import { FocusOnContext } from "@focuson-nw/focuson";
import { HasButtons } from "./makeButtons";

export interface DropDownWithVaryingContent2Props<S, C> extends CommonStateProps<S, string, C>, DropDownOnChangeProps<S, C>, HasButtons {
  label: string;
  parentState?: LensState<S, any, C>;
  selector1: LensState<S, string, C> //this is the data about which enum we want
  selector2: LensState<S, string, C> //this is the data about which enum we want
  enums: NameAnd<NameAnd<NameAnd<string>>>
  defaultForSelector1?: NameAnd<NameAnd<string>>
  pleaseSelect?: string;
  size?: number;
  required?: boolean;
  readonly?: boolean
}

export function LabelAndDropDownWithVaryingContent2<S, C extends FocusOnContext<S>> ( props: DropDownWithVaryingContent2Props<S, C> ) {
  const { state, selector1, selector2, enums, allButtons, defaultForSelector1 } = props
  const s1 = selector1.optJson ()
  const s2 = selector2.optJson ()
  const fromSelector1 = s1 && enums[ s1 ] ? enums[ s1 ] : defaultForSelector1
  const fromSelector2 = fromSelector1 && s2 ? fromSelector1[ s2 ] : {}
  return <LabelAndDropdown  {...props} state={state} allButtons={allButtons} enums={safeObject(fromSelector2)}/>
}