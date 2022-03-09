import { ButtonCreator, MakeButton } from "../codegen/makeButtons";
import { makeSimpleButton, optT } from "../codegen/codegen";


export interface ModalCommitButtonInPage {
  control: 'ModalCommitButton'
  validate?: boolean;
  text?: string
}
export interface ModalCancelButtonInPage {
  control: 'ModalCancelButton'
}


export function makeModalCommitButton<B extends ModalCommitButtonInPage, G> (): ButtonCreator<B, G> {
  return ({
    import: "@focuson/pages",
    makeButton: ( { name, button } ) =>
      `          <ModalCommitButton id='${button.text ? button.text : name}' ${optT ( 'validate', button.validate )} state={state} />`
  })
}

export function makeModalCloseButtons<G> (): MakeButton<G> {
  return {
    ModalCancelButton: makeSimpleButton ( "@focuson/pages" ),
    ModalCommitButton: makeModalCommitButton ()
  }
}

