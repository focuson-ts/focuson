import { ButtonCreator, MakeButton } from "../codegen/makeButtons";
import { makeSimpleButton, optT } from "../codegen/codegen";
import { ModalButtonInPage } from "./modalButtons";


export interface ModalCommitButtonInPage {
  control: 'ModalCommitButton'
  validate?: boolean;
  text?: string
}
export interface ModalCancelButtonInPage {
  control: 'ModalCancelButton'
}


export const makeModalCommitButton: ButtonCreator<ModalCommitButtonInPage> = ({
  import: "@focuson/pages",
  makeButton: ( { name, button } ) =>
    `          <ModalCommitButton id='${button.text ? button.text : name}' ${optT ( 'validate', button.validate )} state={state} />`
})

export const makeModalCloseButtons: MakeButton = {
  ModalCancelButton: makeSimpleButton ( "@focuson/pages" ),
  ModalCommitButton: makeModalCommitButton
}

