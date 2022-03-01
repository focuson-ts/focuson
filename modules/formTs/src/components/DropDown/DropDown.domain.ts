import { LensProps } from '@focuson/state';
import { PageMode } from "@focuson/pages";

export interface DropDownProps<S,C> extends LensProps<S, string,C> {
  label: string;
  mode: PageMode;
}
