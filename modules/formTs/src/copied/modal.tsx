import { CommonStateProps } from "./common";
import { PageSelectionContext, popPage } from "@focuson/pages";


export function ModalCancelButton<S, Context extends PageSelectionContext<S>> ( { id, state }: CommonStateProps<S, any, Context> ) {
  return <button onClick={() => popPage ( state )}>Cancel</button>

}
export function ModalCommitButton<S, Context extends PageSelectionContext<S>> ( { id, state }: CommonStateProps<S, any, Context> ) {
  return <button onClick={() => popPage ( state )}>Commit</button>


}