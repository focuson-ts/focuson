import { LensProps } from '@focuson/state';

export interface RestButtonProps<S,C> extends LensProps<S, any,C> {
  id: string;
}
