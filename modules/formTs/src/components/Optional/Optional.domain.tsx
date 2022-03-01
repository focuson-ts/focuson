import { LensProps } from '@focuson/state';
import { PageMode } from "@focuson/pages";

export interface OptionalProps<S, C> extends LensProps<S, boolean, C> {
  label: string;
  mode: PageMode;
}
