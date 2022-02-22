import { CommonStateProps, RestAction } from "./common";
import { PageMode, selectionModalPageL } from "@focuson/pages";


export interface ModalButtonProps<S> extends CommonStateProps<S, any> {
  modal: string;
  mode: PageMode;
  mainData?: string;
  tempData?: string;
  rest?: string;
  action?: RestAction;
  text?: string;
}

export function ModalButton<S extends any> ( { state, id, text, modal }: ModalButtonProps<S> ): JSX.Element {
// @ts-ignore
  const bodge = selectionModalPageL<S> ()
  return <button id={id} onClick={() => state.copyWithLens ( bodge ).setJson ( modal )}>{text}</button>

}

export function ModalCancelButton<S> ( { id }: CommonStateProps<S, any> ) {
  return <button>Cancel</button>

}
export function ModalCommitButton<S> ( { id }: CommonStateProps<S, any> ) {
  return <button>Commit</button>
}