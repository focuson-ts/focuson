import { LensState } from "@focuson/state";
import { PageMode } from "@focuson/pages";


export interface CommonComponentProps {
  id: string;
  name?: string;
  ariaLabel?: string;
  mode?: PageMode;
  required?: boolean;
}
export interface StringValidations {
  minlength?: number;
  maxlength?: number;
  pattern?: string;
}
export interface NumberValidations {
  min?: number;
  max?: number;
}
export interface BooleanValidations {}


export interface CommonStateProps<S, T, Context> extends CommonComponentProps {
  state: LensState<S, T, Context>;
}