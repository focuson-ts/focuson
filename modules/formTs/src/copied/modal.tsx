import { CommonStateProps, RestAction } from "./common";
import { PageMode, selectionModalPageL } from "@focuson/pages";
import { LensState } from "@focuson/state";


export interface ModalButtonProps<S, Full> extends CommonStateProps<S, Full> {
  modal: string;
  mode: PageMode;
  rest?: string;
  action?: RestAction;
  text?: string;
  createEmpty?: boolean;
}
export interface ModalAndCopyButtonProps<S, Full, D> extends ModalButtonProps<S, Full> {
  from: LensState<S, D>;
  to: LensState<S, D>;
}

//   const fromJson: Data|undefined = from.optJson ()
//       if ( modalL ) to.useOtherAsWell ( modalL ).setTwoValues ( fromJson, modal )
//       else throw Error ( `Using ModalAndCopyButton  ${text} ${modal} ${from.optional.description} ${to.optional.description} without context` )
//
export function ModalButton<S extends any, Full> ( { state, id, text, modal }: ModalButtonProps<S, Full> ): JSX.Element {
  // @ts-ignore
  const bodge = selectionModalPageL<S> ()
  return (<button id={id} onClick={() => state.copyWithLens ( bodge ).setJson ( modal )}>{text}</button>)

}

export function ModalAndCopyButton<S, Full, Data> ( { id, text, modal, from, to }: ModalAndCopyButtonProps<S, Full, Data> ) {
  const bodge = selectionModalPageL<S> ()
  function onClick () {
    return () => {
      const fromJson: Data | undefined = from.optJson ()
      to.useOtherAsWell ( bodge ).setTwoValues ( fromJson, modal )
    }
  }
  return <button id={id} onClick={onClick ()}>{text}</button>
}


export function ModalCancelButton<S> ( { id, state }: CommonStateProps<S, any> ) {
  const bodge = selectionModalPageL<S> ()
  return <button onClick={() => state.copyWithLens ( bodge ).setJson ( undefined )}>Cancel</button>

}
export function ModalCommitButton<S> ( { id, state }: CommonStateProps<S, any> ) {
  const bodge = selectionModalPageL<S> ()
  return <button onClick={() => state.copyWithLens ( bodge ).setJson ( undefined )}>Commit</button>

}