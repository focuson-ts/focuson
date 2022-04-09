import { ButtonCreator, MakeButton, makeIdForButton } from "../codegen/makeButtons";
import { stateFocusQueryForRepl, indentList, opt } from "../codegen/codegen";
import { stateFocusQueryWithTildaFromPage, stateForButton } from "../codegen/lens";


function makeToggleButton<B extends ToggleButtonInPage<G>, G> (): ButtonCreator<ToggleButtonInPage<G>, G> {
  return {
    import: '@focuson/form_components',
    makeButton: ( createButton ) => {
      const { params, parent, name, button } = createButton
      const { value, buttonText } = button
      return [ `<ToggleButton id=${makeIdForButton ( name )} state={${stateForButton ( createButton, 'ToggleButton' ) ( value )}}`,
        ...indentList ( [ ...opt ( 'buttonText', buttonText ), ' />' ] ) ]
    }
  }
}

export function makeToggleButtons<G> (): MakeButton<G> {
  return { ToggleButton: makeToggleButton () }
}

export interface ToggleButtonInPage<G> {
  control: 'ToggleButton';
  value: string;
  buttonText: string
}

