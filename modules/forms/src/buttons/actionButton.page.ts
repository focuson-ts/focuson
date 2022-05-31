import { ButtonCreator, MakeButton, makeIdForButton } from "../codegen/makeButtons";
import { decamelize } from "@focuson/utils";
import { indentList, opt, optT } from "../codegen/codegen";
import { restDetailsName } from "../codegen/names";
import { EnabledBy, enabledByString } from "./enabledBy";
import { ButtonWithControl } from "./allButtons";
import { PageMode } from "@focuson/pages";
import { LensState } from "@focuson/state";


function makeActionButton<B extends ActionButtonInPage<G>, G> (): ButtonCreator<ActionButtonInPage<G>, G> {
  return {
    import:  '@focuson/form_components',
    makeButton: ( { params, mainPage, parent, name, button } ) => {
      const { action, text } = button

      return [ `<ActionButton state={state} id=${makeIdForButton ( name )} ${enabledByString ( button )} action={action.${action}}`,
        ...indentList ( [
          ...opt ( 'text', text )] ),
        ' />' ]
    }
  }
}

export function makeActionButtons<G> (): MakeButton<G> {
  return { ActionButton: makeActionButton () }
}

export function isActionButton<G> ( p: ButtonWithControl ): p is ActionButtonInPage<G> {
  return p.control === 'ActionButton'
}
export interface ActionButtonInPage<G> extends EnabledBy {
  control: 'ActionButton'
  text?: string;
  action: string,
}

