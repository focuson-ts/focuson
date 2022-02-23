import { LensProps } from "@focuson/state";
import { Optional } from "@focuson/lens";
import { HasSelectedModalPage } from "./modalPages";

export interface CommonModalButtonProps<S> {
  modalL: Optional<S, string | undefined>,
  id?: string,
  text: string,
  modal?: string

}

export interface ModalButtonProps<S, Context> extends LensProps<S, any, Context>, CommonModalButtonProps<S> {
}
export function ModalButton<S extends any, Context> ( { state, id, text, modal, modalL }: ModalButtonProps<S, Context> ): JSX.Element {
  return <button id={id} onClick={() => state.copyWithLens ( modalL ).setJson ( modal )}>{text}</button>

}