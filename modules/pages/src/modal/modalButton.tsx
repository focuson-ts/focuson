import { LensProps } from "@focuson/state";
import { HasPageSelectionLens, page, PageMode } from "../pageSelection";

export interface CommonModalButtonProps {
  id?: string,
  text: string,
  modal: string,
  pageMode: PageMode
}

export interface ModalButtonProps<S, Context> extends LensProps<S, any, Context>, CommonModalButtonProps {
}
export function ModalButton<S extends any, Context extends HasPageSelectionLens<S>> ( { state, id, text, modal, pageMode }: ModalButtonProps<S, Context> ): JSX.Element {
  return <button id={id} onClick={() => page ( state, 'popup', { pageName: modal, firstTime: true, pageMode } )}>{text}</button>
}