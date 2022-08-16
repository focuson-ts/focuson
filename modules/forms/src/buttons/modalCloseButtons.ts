import { ButtonCreator, MakeButton, makeIdForButton } from "../codegen/makeButtons";
import { opt, optT } from "../codegen/codegen";
import { CustomButtonType, EnabledBy, enabledByString } from "./enabledBy";
import { ModalChangeCommands } from "@focuson/rest";


export interface ModalCommitButtonInPage extends EnabledBy {
  control: 'ModalCommitButton';
  enabledBy?: string | string[];
  validate?: boolean;
  confirm?: boolean | string;
  change?: ModalChangeCommands | ModalChangeCommands[];
  text?: string
}
export interface ModalCancelButtonInPage extends EnabledBy {
  control: 'ModalCancelButton';
  text?: string;
  confirm?: boolean | string;
}
export interface ModalCommitWindowButtonInPage extends EnabledBy {
  control: 'ModalCommitWindowButton';
  enabledBy?: string | string[];
  validate?: boolean;
  messageText?: string
  confirmText?: string;
  cancelText?: string;
  change?: ModalChangeCommands | ModalChangeCommands[];
  text?: string
}

export function makeModalCommitButton<B extends ModalCommitButtonInPage, G> (): ButtonCreator<B, G> {
  return ({
    import: "@focuson/pages",
    makeButton: ( { name, button } ) => {
      const id = '{`${id}`.' + button.text ? button.text : name + "}"
      return [ [ `<ModalCommitButton id=${makeIdForButton ( button.text ? button.text : name )} ${enabledByString ( button )}`,
        ...opt ( 'text', button.text ),
        ...optT ( 'change', button.change ),
        ...optT ( 'confirm', button.confirm ),
        ...opt ( 'buttonType', button.buttonType ? button.buttonType : 'primary' ),
        ...optT ( 'validate', button.validate ),
        ` state={state} />` ].join ( ' ' ) ];
    }
  })
}
export function makeModalCommitWindowButton<B extends ModalCommitWindowButtonInPage,G>(): ButtonCreator<B,G> {
  return ({
    import: "@focuson/pages",
    makeButton: ( { name, button } ) => {
      const id = '{`${id}`.' + button.text ? button.text : name + "}"
      return [ [ `<ModalCommitWindowButton id=${makeIdForButton ( button.text ? button.text : name )} ${enabledByString ( button )}`,
        ...opt ( 'text', button.text ),
        ...optT ( 'change', button.change ),
        ...opt ( 'messageText', button.messageText ),
        ...opt ( 'confirmText', button.confirmText ),
        ...opt ( 'cancelText', button.cancelText ),
        ...opt ( 'buttonType', button.buttonType ? button.buttonType : 'primary' ),
        ...optT ( 'validate', button.validate ),
        ` state={state} />` ].join ( ' ' ) ];
    }
  })
}

export const makeSimpleButton: <G> ( imp: string ) => ButtonCreator<ModalCommitButtonInPage, G> = imp => ({
  import: imp,
  makeButton: ( { name, button } ) =>
    [ [ `<${button.control} id=${makeIdForButton ( button.text ? button.text : name )} state={state} ${enabledByString ( button )}`,
      ...opt ( 'text', button.text ),
      ...optT ( 'confirm', button.confirm ),
      ...opt ( 'buttonType', button.buttonType ? button.buttonType : 'secondary' ),
      '/>' ].join ( ' ' ) ]
})

export function makeModalCloseButtons<G> (): MakeButton<G> {
  return {
    ModalCancelButton: makeSimpleButton ( "@focuson/pages" ),
    ModalCommitButton: makeModalCommitButton (),
    ModalCommitWindowButton: makeModalCommitWindowButton ()
  }
}

