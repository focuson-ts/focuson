import { ButtonCreator, MakeButton } from "../codegen/makeButtons";
import { stateFocusQueryForRepl, indentList, opt } from "../codegen/codegen";


function makeToggleButton<B extends ToggleButtonInPage<G>, G> (): ButtonCreator<ToggleButtonInPage<G>, G> {
  return {
    import: '@focuson/form_components',
    makeButton: ( { params, parent, name, button } ) => {
      const { value, buttonText } = button
      return [ `<ToggleButton state={${stateFocusQueryForRepl ( 'fullState', value )}}`,
        ...indentList ( [
          ...opt ( 'id', name ),
          ...opt ( 'buttonText', buttonText ), ' />' ] ) ]
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

