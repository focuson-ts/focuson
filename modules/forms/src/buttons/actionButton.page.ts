import { ButtonCreator, MakeButton, makeIdForButton } from "../codegen/makeButtons";
import { decamelize } from "@focuson/utils";
import { indentList, opt, optT } from "../codegen/codegen";
import { restDetailsName } from "../codegen/names";
import { EnabledBy, enabledByString } from "./enabledBy";
import { ButtonWithControl } from "./allButtons";
import { PageMode } from "@focuson/pages";
import { LensState } from "@focuson/state";
import { Lens } from "@focuson/lens";
import { stateForButtonWithPath } from "../codegen/lens";


function makeActionButton<B extends ActionButtonInPage, G> (): ButtonCreator<ActionButtonInPage, G> {
  return {
    import: '@focuson/form_components',
    makeButton: data => {
      const { params, mainPage, parent, name, button } = data
      const { action, text, path } = button
      const state = stateForButtonWithPath ( data, 'DeleteStateButton' ) ( path )
      return [ `<ActionButton state={${state}} id=${makeIdForButton ( name )} ${enabledByString ( button )} action={action.${action}}`,
        ...indentList ( [
          ...opt ( 'text', text ) ] ),
        ' />' ]
    }
  }
}

export function makeActionButtons<G> (): MakeButton<G> {
  return { ActionButton: makeActionButton () }
}

export function isActionButton ( p: ButtonWithControl ): p is ActionButtonInPage {
  return p.control === 'ActionButton'
}
export interface ActionButtonInPage extends EnabledBy {
  control: 'ActionButton'
  text?: string;
  action: string;
  path: string;
}

