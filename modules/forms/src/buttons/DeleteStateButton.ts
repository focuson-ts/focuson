import { ButtonCreator, MakeButton, makeIdForButton } from "../codegen/makeButtons";
import { opt, optT } from "../codegen/codegen";
import { stateForButton, stateForButtonWithPath } from "../codegen/lens";
import { toArray } from "@focuson/utils";

function makeDeleteStateButton<G> (): ButtonCreator<DeleteStateButtonInPage, G> {
  return {
    import: "@focuson/form_components",
    makeButton:
      ( createButton ) => {
        const { params, parent, name, button } = createButton
        const states = toArray ( button.path ).map ( p => stateForButtonWithPath ( createButton, 'DeleteStateButton' ) ( p ) )
        return [ `<DeleteStateButton  id=${makeIdForButton ( name )} states={[${states.join ( ',' )}]} ${opt ( 'label', button.label )} />` ]
      }
  }
}

export function makeDeleteStateButtons<G> (): MakeButton<G> {
  return { DeleteStateButton: makeDeleteStateButton () }
}

export interface DeleteStateButtonInPage {
  control: 'DeleteStateButton';
  label: string;
  path: string | string[];
}

