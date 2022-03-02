import { MakeButton } from "../codegen/makeButtons";
import { makeSimpleButton } from "../codegen/codegen";

export const makeModalCloseButtons: MakeButton = {
  ModalCancelButton: makeSimpleButton,
  ModalCommitButton: makeSimpleButton
}

export interface ModalCloseButton {
  control: 'ModalCancelButton' | 'ModalCommitButton'
}
