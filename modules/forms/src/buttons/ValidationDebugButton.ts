import { ButtonCreator, MakeButton } from "../codegen/makeButtons";
import { opt } from "../codegen/codegen";


const makeValidationDebugButton: ButtonCreator<ValidationButtonInPage> = {
  import: "./copied/ValidationButton",
  makeButton:
    ( { params, parent, name, button } ) => {
      return `<ValidationButton  ${opt ( 'id', name )}   ${opt ( 'name', name )}  />`
    }
}

export const makeValidationButtons: MakeButton = {
  ValidationButton: makeValidationDebugButton,
}

export interface ValidationButtonInPage {
  control: 'ValidationButton';

}

