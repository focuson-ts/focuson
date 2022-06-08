import { ButtonCreator, MakeButton, makeIdForButton } from "../codegen/makeButtons";
import { makeSimpleButton, opt, optT } from "../codegen/codegen";
import { EnabledBy, enabledByString } from "./enabledBy";


export interface ModalCommitButtonInPage extends EnabledBy {
  control: 'ModalCommitButton';
  enabledBy?: string | string[];
  validate?: boolean;
  text?: string
}
export interface ModalCancelButtonInPage {
  control: 'ModalCancelButton';
  text?: string
}


export function makeModalCommitButton<B extends ModalCommitButtonInPage, G> (): ButtonCreator<B, G> {
  return ({
    import: "@focuson/pages",
    makeButton: ( { name, button } ) => {
      const id = '{`${id}`.' + button.text ? button.text : name + "}"
      return [ [ `<ModalCommitButton id=${makeIdForButton ( button.text ? button.text : name )} ${enabledByString(button)}`, 
      ...opt ( 'text', button.text ),
      ...opt ( 'buttonType', button.buttonType ? button.buttonType : 'primary'),
      ...optT ( 'validate', button.validate ),
       ` state={state} />` ].join ( ' ' ) ];
    }
  })
}

export function makeModalCloseButtons<G> (): MakeButton<G> {
  return {
    ModalCancelButton: makeSimpleButton ( "@focuson/pages" ),
    ModalCommitButton: makeModalCommitButton ()
  }
}

