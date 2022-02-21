import { CommonStateProps, RestAction } from "./common";
import { PageMode } from "@focuson/pages";


export interface ModalButtonProps<S> extends CommonStateProps<S, any> {
  mode: PageMode;
  mainData?: string;
  tempData?: string;
  rest?: string;
  action?: RestAction;
  text?: string;
}

export function ModalButton<S> ( { id }: ModalButtonProps<S> ) {
  return <button>{id}</button>
}

export function ModalCancelButton<S> ( { id }: CommonStateProps<S, any> ) {
  return <button>Cancel</button>

}
export function ModalCommitButton<S> ( { id }: CommonStateProps<S, any> ) {
  return <button>Commit</button>
}