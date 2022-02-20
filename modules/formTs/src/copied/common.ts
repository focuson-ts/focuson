import { LensState } from "@focuson/state";

export type RestAction = 'get' | 'getOption' | 'list' | 'update' | 'create' | 'delete'
export  type PageMode = 'view' | 'create' | 'edit';
export  interface CommonComponentProps{
  id?: string;
  ariaLabel?: string;
}


export  interface CommonStateProps<S,T> extends CommonComponentProps{
  state: LensState<S,T>;
}