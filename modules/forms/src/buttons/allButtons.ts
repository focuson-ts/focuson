import { makeModalButtons, ModalButtonInPage } from "./modalButtons";
import { ResetStateButton } from "./stateButtons";
import { ListNextButtonInPage, ListPrevButtonInPage, makeListMarkerButtons } from "./listButtons";
import { MakeButton } from "../codegen/makeButtons";
import { makeModalCloseButtons, ModalCancelButtonInPage, ModalCommitButtonInPage } from "./modalCloseButtons";
import { makeRestButtons, RestButtonInPage } from "./restButton";
import { makeValidationButtons, ValidationButtonInPage } from "./ValidationDebugButton";


export interface ButtonD {
  control: string
}
export type AllButtonsInPage = ModalButtonInPage | ModalCancelButtonInPage | ModalCommitButtonInPage |
  ResetStateButton | RestButtonInPage | ListNextButtonInPage | ListPrevButtonInPage | ValidationButtonInPage

export const transformButtons: MakeButton = {
  ...makeModalButtons,
  ...makeModalCloseButtons,
  ...makeListMarkerButtons,
  ...makeRestButtons,
  ...makeValidationButtons
}

