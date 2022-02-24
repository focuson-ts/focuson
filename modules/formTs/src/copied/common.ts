import { LensState } from "@focuson/state";
import { PageMode } from "@focuson/pages";


export interface CommonComponentProps {
  id?: string;
  ariaLabel?: string;
  mode?: PageMode
}


export interface CommonStateProps<S, T, Context> extends CommonComponentProps {
  state: LensState<S, T, Context>;
}