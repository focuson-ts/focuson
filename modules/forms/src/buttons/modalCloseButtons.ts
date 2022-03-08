import { MakeButton } from "../codegen/makeButtons";
import { makeSimpleButton } from "../codegen/codegen";

export const makeModalCloseButtons: MakeButton = {
  ModalCancelButton: makeSimpleButton ( "@focuson/pages" ),
  ModalCommitButton: makeSimpleButton ( "@focuson/pages" )
}

export interface ModalCloseButton {
  control: 'ModalCancelButton' | 'ModalCommitButton'
}
