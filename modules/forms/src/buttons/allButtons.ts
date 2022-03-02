import { makeModalButtons, ModalAndCopyButtonInPage, ModalButtonInPage } from "./modalButtons";
import { ResetStateButton } from "./stateButtons";
import { ListMarkerNextButtonInPage, ListMarkerPrevButtonInPage, makeListMarkerButtons } from "./listButtons";
import { makeRestButtonFrom, RestButtonInPage } from "./restButtons";
import { MakeButton } from "../codegen/makeButtons";
import { makeModalCloseButtons, ModalCloseButton } from "./modalCloseButtons";


export interface ButtonD {
  control: string
}
export type AllButtonsInPage = ModalButtonInPage | ModalAndCopyButtonInPage | ModalCloseButton |
  ResetStateButton | RestButtonInPage | ListMarkerNextButtonInPage | ListMarkerPrevButtonInPage

export const transformButtons: MakeButton = {
  ...makeModalButtons,
  ...makeModalCloseButtons,
  ...makeListMarkerButtons,
  RestButton: makeRestButtonFrom
}
