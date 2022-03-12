import { makeModalButtons, ModalButtonInPage } from "./modalButtons";
import { ResetStateButton } from "./stateButtons";
import { ListNextButtonInPage, ListPrevButtonInPage, makeListMarkerButtons } from "./listButtons";
import { MakeButton } from "../codegen/makeButtons";
import { makeModalCloseButtons, ModalCancelButtonInPage, ModalCommitButtonInPage } from "./modalCloseButtons";
import { makeRestButtons, RestButtonInPage } from "./restButton";
import { makeValidationButtons, ValidationButtonInPage } from "./ValidationDebugButton";
import { AllGuards, GuardButtonInPage } from "./guardButton";

export interface ButtonWithControl {
  control: string

}
export function isButtonWithControl ( b: any ): b is ButtonWithControl {
  return b.control !== undefined
}
export type ButtonD = ButtonWithControl | GuardButtonInPage<any, any>

export type RawButtons<G> = ModalButtonInPage<G> | ModalCancelButtonInPage | ModalCommitButtonInPage |
  ResetStateButton | RestButtonInPage<G> | ListNextButtonInPage | ListPrevButtonInPage | ValidationButtonInPage;

export type AllButtonsInPage<G> = RawButtons<G> | GuardButtonInPage<AllButtonsInPage<G>, G>

export function makeButtons<G> (): MakeButton<G> {
  return {
    ...makeModalButtons (),
    ...makeModalCloseButtons (),
    ...makeListMarkerButtons (),
    ...makeRestButtons (),
    ...makeValidationButtons ()
  }
}

