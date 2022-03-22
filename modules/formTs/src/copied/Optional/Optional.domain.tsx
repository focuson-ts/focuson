import { CommonStateProps } from "../common";
import { NameAnd } from "@focuson/utils";

export interface OptionalProps<S, T, Context> extends CommonStateProps<S, T, Context> {
  label?: string;
  allButtons: NameAnd<JSX.Element>;
}
