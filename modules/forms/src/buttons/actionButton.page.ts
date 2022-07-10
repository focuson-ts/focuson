import { ButtonCreator, MakeButton, makeIdForButton } from "../codegen/makeButtons";
import { NameAnd, safeObject } from "@focuson/utils";
import { indentList, opt } from "../codegen/codegen";
import { EnabledBy, enabledByString } from "./enabledBy";
import { ButtonWithControl } from "./allButtons";
import { stateForButtonWithPath, stateQueryForPathsFnButtonParams } from "../codegen/lens";


function makeActionButton<B extends ActionButtonInPage, G> (): ButtonCreator<ActionButtonInPage, G> {
  return {
    import: '@focuson/form_components',
    makeButton: data => {
      const { params, mainPage, parent, name, button } = data
      const { action, text,path, paths } = button
      const errorPrefix = `Page ${parent.name}.buttons[${name}] `
      const state = stateForButtonWithPath ( data, 'DeleteStateButton' ) ( path )
      return [ `<ActionButton state={${state}} id=${makeIdForButton ( name )} ${enabledByString ( button )} action={action.${action}}`,
        ...indentList ( [
          ...opt ( 'text', text ),
        ] ),
        `paths= {{${Object.entries ( safeObject(paths) ).map ( ( [ name, path ] ) => `${name}:${stateQueryForPathsFnButtonParams ( errorPrefix, params, mainPage, parent, path )}` ).join ( ',' )}}}`,
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
  paths?: NameAnd<string>;
}

