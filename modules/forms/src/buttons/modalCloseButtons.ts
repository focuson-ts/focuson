import { ButtonCreator, MakeButton, makeIdForButton } from "../codegen/makeButtons";
import { opt, optT } from "../codegen/codegen";
import { CustomButtonType, EnabledBy, enabledByString } from "./enabledBy";


export interface ModalCommitButtonInPage extends EnabledBy {
  control: 'ModalCommitButton';
  enabledBy?: string | string[];
  validate?: boolean;
  confirm?: boolean | string;
  text?: string
}
export interface ModalCancelButtonInPage extends CustomButtonType {
  control: 'ModalCancelButton';
  text?: string;
  confirm?: boolean | string;
}


export function makeModalCommitButton<B extends ModalCommitButtonInPage, G> (): ButtonCreator<B, G> {
  return ({
    import: "@focuson/pages",
    makeButton: ( { name, button } ) => {
      const id = '{`${id}`.' + button.text ? button.text : name + "}"
      return [ [ `<ModalCommitButton id=${makeIdForButton ( button.text ? button.text : name )} ${enabledByString ( button )}`,
        ...opt ( 'text', button.text ),
        ...optT ( 'confirm', button.confirm ),
        ...opt ( 'buttonType', button.buttonType ? button.buttonType : 'primary' ),
        ...optT ( 'validate', button.validate ),
        ` state={state} />` ].join ( ' ' ) ];
    }
  })
}
export const makeSimpleButton: <G> ( imp: string ) => ButtonCreator<ModalCommitButtonInPage, G> = imp => ({
  import: imp,
  makeButton: ( { name, button } ) =>
    [ [ `<${button.control} id=${makeIdForButton ( button.text ? button.text : name )} state={state}`,
      ...opt ( 'text', button.text ),
      ...optT ( 'confirm', button.confirm ),
      ...opt ( 'buttonType', button.buttonType ? button.buttonType : 'secondary' ),
      '/>' ].join ( ' ' ) ]
})

export function makeModalCloseButtons<G> (): MakeButton<G> {
  return {
    ModalCancelButton: makeSimpleButton ( "@focuson/pages" ),
    ModalCommitButton: makeModalCommitButton ()
  }
}

