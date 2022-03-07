import { makeModalButtons, ModalButtonInPage } from "./modalButtons";
import { ResetStateButton } from "./stateButtons";
import { ListNextButtonInPage, ListPrevButtonInPage, makeListMarkerButtons } from "./listButtons";
import { MakeButton } from "../codegen/makeButtons";
import { makeModalCloseButtons, ModalCloseButton } from "./modalCloseButtons";
import { makeRestButtons, RestButtonInPage } from "./restButton";


export interface ButtonD {
  control: string
}
export type AllButtonsInPage = ModalButtonInPage | ModalCloseButton |
  ResetStateButton | RestButtonInPage | ListNextButtonInPage | ListPrevButtonInPage

export const transformButtons: MakeButton = {
  ...makeModalButtons,
  ...makeModalCloseButtons,
  ...makeListMarkerButtons,
  ...makeRestButtons
}

