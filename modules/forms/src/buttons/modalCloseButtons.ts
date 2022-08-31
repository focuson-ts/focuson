import { ButtonCreator, MakeButton, makeIdForButton } from "../codegen/makeButtons";
import { opt, optObj, optT } from "../codegen/codegen";
import { CustomButtonType, EnabledBy, enabledByString } from "./enabledBy";
import { ModalChangeCommands } from "@focuson/rest";
import { ConfirmWindow } from "@focuson/pages";


export interface ModalCommitButtonInPage extends EnabledBy {
  control: 'ModalCommitButton';
  enabledBy?: string | string[];
  closeTwoWindowsNotJustOne?: boolean
  validate?: boolean;
  confirm?: boolean | string | ConfirmWindow;
  change?: ModalChangeCommands | ModalChangeCommands[];
  text?: string
}
export interface ModalCancelButtonInPage extends EnabledBy {
  control: 'ModalCancelButton';
  text?: string;
  confirm?: boolean | string | ConfirmWindow;
}
// export interface ModalConfirmWindowButtonInPage extends EnabledBy {
//   control: 'ModalConfirmWindowButton';
//   enabledBy?: string | string[];
//   validate?: boolean;
//   messageText?: string
//   confirmText?: string;
//   cancelText?: string;
//   change?: ModalChangeCommands | ModalChangeCommands[];
//   text?: string
// }

export function makeModalCommitButton<B extends ModalCommitButtonInPage, G> (): ButtonCreator<B, G> {
  return ({
    import: "@focuson/pages",
    makeButton: ( { name, button } ) => {
      const id = '{`${id}`.' + button.text ? button.text : name + "}"
      return [ [ `<ModalCommitButton id=${makeIdForButton ( button.text ? button.text : name )} ${enabledByString ( button )}`,
        ...opt ( 'text', button.text ),
        ...optT ( 'change', button.change ),
        ...optObj ( 'confirm', JSON.stringify ( button.confirm ) ),
        ...opt ( 'buttonType', button.buttonType ? button.buttonType : 'primary' ),
        ...optT ( 'validate', button.validate ),
        ` state={state} />` ].join ( ' ' ) ];
    }
  })
}
// export function makeModalConfirmWindowButton<B extends ModalConfirmWindowButtonInPage,G>(): ButtonCreator<B,G> {
//   return ({
//     import: "@focuson/pages",
//     makeButton: ( { name, button } ) => {
//       const id = '{`${id}`.' + button.text ? button.text : name + "}"
//       return [ [ `<ModalConfirmWindowButton id=${makeIdForButton ( button.text ? button.text : name )} ${enabledByString ( button )}`,
//         ...opt ( 'text', button.text ),
//         ...optT ( 'change', button.change ),
//         ...opt ( 'messageText', button.messageText ),
//         ...opt ( 'confirmText', button.confirmText ),
//         ...opt ( 'cancelText', button.cancelText ),
//         ...opt ( 'buttonType', button.buttonType ? button.buttonType : 'primary' ),
//         ...optT ( 'validate', button.validate ),
//         ` state={state} />` ].join ( ' ' ) ];
//     }
//   })
// }

export const makeSimpleButton: <G> ( imp: string ) => ButtonCreator<ModalCommitButtonInPage, G> = imp => ({
  import: imp,
  makeButton: ( { name, button } ) =>
    [ [ `<${button.control} id=${makeIdForButton ( button.text ? button.text : name )} state={state} ${enabledByString ( button )}`,
      ...opt ( 'text', button.text ),
      ...optT ( 'confirm', button.confirm ),
      ...opt ( 'buttonType', button.buttonType ? button.buttonType : 'secondary' ),
      ...optT ( 'closeTwoWindowsNotJustOne', button.closeTwoWindowsNotJustOne ),
      '/>' ].join ( ' ' ) ]
})

export function makeModalCloseButtons<G> (): MakeButton<G> {
  return {
    ModalCancelButton: makeSimpleButton ( "@focuson/pages" ),
    ModalCommitButton: makeModalCommitButton (),
    // ModalConfirmWindowButton: makeModalConfirmWindowButton ()
  }
}

