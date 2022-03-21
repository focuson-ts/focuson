import { ButtonCreator, MakeButton } from "../codegen/makeButtons";
import { RestAction, RestResult } from "@focuson/utils";
import { RestD } from "../common/restD";
import { focusOnFor, focusQueryFor, indentList, opt, optT } from "../codegen/codegen";
import { restDetailsName } from "../codegen/names";
import { replaceBasePageWithKnownPage } from "@focuson/pages";


function makeToggleButton<B extends ToggleButtonInPage<G>, G> (): ButtonCreator<ToggleButtonInPage<G>, G> {
  return {
    import: '../copied/ToggleButton',
    makeButton: ( { params, parent, name, button } ) => {
      const { value, buttonText } = button
      return [ `<ToggleButton state={fullState${focusOnFor ( value )}}`,
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
  value: string[];
  buttonText: string
}

