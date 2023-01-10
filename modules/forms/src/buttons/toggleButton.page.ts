import { ButtonCreator, MakeButton, makeIdForButton } from "../codegen/makeButtons";
import { indentList, opt } from "../codegen/codegen";
import { stateForButton } from "../codegen/lens";
import { EnabledBy, enabledByString } from "./enabledBy";


function makeToggleButton<B extends ToggleButtonInPage<G>, G> (): ButtonCreator<ToggleButtonInPage<G>, G> {
  return {
    import: '@focuson-nw/form_components',
    makeButton: ( createButton ) => {
      const { params, parent, name, button } = createButton
      const { value, buttonText } = button
      return [ `<ToggleButton id=${makeIdForButton ( name )} ${enabledByString(button)}state={${stateForButton ( createButton, 'ToggleButton' ) ( value )}}`,
        ...indentList ( [ ...opt ( 'buttonText', buttonText ), ' />' ] ) ]
    }
  }
}

export function makeToggleButtons<G> (): MakeButton<G> {
  return { ToggleButton: makeToggleButton () }
}

export interface ToggleButtonInPage<G> extends EnabledBy{
  control: 'ToggleButton';
  value: string;
  buttonText: string
}

