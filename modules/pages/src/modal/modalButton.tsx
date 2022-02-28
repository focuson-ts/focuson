import { LensState } from "@focuson/state";
import { HasPageSelectionLens, page, PageMode, PageOps } from "../pageSelection";
import { Transform } from "@focuson/lens";
import { RestResult } from "@focuson/utils";
import { RestCommand } from "@focuson/rest";


export interface CommonModalButtonProps<S, Data, Context> {
  id?: string,
  text: string,
  modal: string,
  pageMode: PageMode,
  rest?: RestCommand,
  to: LensState<S, Data, Context>
  base: string[]
}

export interface ModalButtonProps<S, Data, Context> extends CommonModalButtonProps<S, Data, Context> {
}
export function transformsForModal<S, Data, Context extends HasPageSelectionLens<S>> ( c: Context, pageOps: PageOps, { base, modal, pageMode, rest }: CommonModalButtonProps<S, Data, Context> ): Transform<S, any> [] {
  return rest ?
    [ page<S, Context> ( c, pageOps, { pageName: modal, firstTime: true, pageMode, rest, base } ) ] :
    [ page<S, Context> ( c, pageOps, { pageName: modal, firstTime: true, pageMode, base } ) ]

}

export function ModalButton<S extends any, Data, Context extends HasPageSelectionLens<S>> ( props: ModalButtonProps<S, Data, Context> ): JSX.Element {
  const { to, id, text } = props
  return <button id={id} onClick={() => to.massTransform ( ...transformsForModal<S, Data, Context> ( to.context, 'popup', props ) )}>{text}</button>
}