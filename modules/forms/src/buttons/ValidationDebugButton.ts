import { ButtonCreator, MakeButton } from "../codegen/makeButtons";
import { opt } from "../codegen/codegen";


function makeValidationDebugButton<G> (): ButtonCreator<ValidationButtonInPage, G> {
  return {
    import: "../formComponents/validationButton",
    makeButton:
      ( { params, parent, name, button } ) => {
        return [`<ValidationButton  ${opt ( 'id', name )}   ${opt ( 'name', name )}  />`]
      }
  }
}

export function makeValidationButtons<G> (): MakeButton<G> {
  return { ValidationButton: makeValidationDebugButton (), }
}

export interface ValidationButtonInPage {
  control: 'ValidationButton';
}

