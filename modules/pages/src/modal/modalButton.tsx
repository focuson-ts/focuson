import { LensProps } from "@focuson/state";
import { HasPageSelectionLens, page, PageMode, PageOps } from "../pageSelection";
import { Transform } from "@focuson/lens";


export interface RestForModal {
  rest: string;
  action: string
}

export interface CommonModalButtonProps {
  id?: string,
  text: string,
  modal: string,
  pageMode: PageMode,
  rest?: RestForModal
}

export interface ModalButtonProps<S, Context> extends LensProps<S, any, Context>, CommonModalButtonProps {
}
export function transformsForModal<S, Context extends HasPageSelectionLens<S>> ( c: Context, pageOps: PageOps, { id, text, modal, pageMode, rest }: CommonModalButtonProps ): Transform<S, any> [] {
  return rest ?
    [ page<S, Context> ( c, pageOps, { pageName: modal, firstTime: true, pageMode, rest } ) ] :
    [ page<S, Context> ( c, pageOps, { pageName: modal, firstTime: true, pageMode } ) ]

}

export function ModalButton<S extends any, Context extends HasPageSelectionLens<S>> ( props: ModalButtonProps<S, Context> ): JSX.Element {
  const { state, id, text } = props
  return <button id={id} onClick={() => state.massTransform ( ...transformsForModal<S, Context> ( state.context, 'popup', props ) )}>{text}</button>
}