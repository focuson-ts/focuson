import { CommonStateProps, RestAction } from "./common";
import { PageMode, selectionModalPageL } from "@focuson/pages";
import { LensState } from "@focuson/state";


export interface ModalButtonProps<S, Full, Context> extends CommonStateProps<S, Full, Context> {
  modal: string;
  mode: PageMode;
  rest?: string;
  action?: RestAction;
  text?: string;
  createEmpty?: boolean;
}
export interface ModalAndCopyButtonProps<S, Full, D, Context> extends ModalButtonProps<S, Full, Context> {
  from: LensState<S, D, Context>;
  to: LensState<S, D, Context>;
}

//   const fromJson: Data|undefined = from.optJson ()
//       if ( modalL ) to.useOtherAsWell ( modalL ).setTwoValues ( fromJson, modal )
//       else throw Error ( `Using ModalAndCopyButton  ${text} ${modal} ${from.optional.description} ${to.optional.description} without context` )
//
export function ModalButton<S extends any, Full, Context> ( { state, id, text, modal }: ModalButtonProps<S, Full, Context> ): JSX.Element {
  // @ts-ignore
  const bodge = selectionModalPageL<S> ()
  return (<button id={id} onClick={() => state.copyWithLens ( bodge ).setJson ( modal )}>{text}</button>)

}

export function ModalAndCopyButton<S, Full, Data, Context> ( { id, text, modal, from, to }: ModalAndCopyButtonProps<S, Full, Data, Context> ) {
  const bodge = selectionModalPageL<S> ()
  function onClick () {
    return () => {
      const fromJson: Data | undefined = from.optJson ()
      to.useOtherAsWell ( bodge ).setTwoValues ( fromJson, modal )
    }
  }
  return <button id={id} onClick={onClick ()}>{text}</button>
}


export function ModalCancelButton<S, Context> ( { id, state }: CommonStateProps<S, any, Context> ) {
  const bodge = selectionModalPageL<S> ()
  return <button onClick={() => state.copyWithLens ( bodge ).setJson ( undefined )}>Cancel</button>

}
export function ModalCommitButton<S, Context> ( { id, state }: CommonStateProps<S, any, Context> ) {
  const bodge = selectionModalPageL<S> ()
  return <button onClick={() => state.copyWithLens ( bodge ).setJson ( undefined )}>Commit</button>

}