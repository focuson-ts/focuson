import { ButtonCreator, MakeButton, makeIdForButton } from "../codegen/makeButtons";
import { NameAnd, safeObject, toArray } from "@focuson-nw/utils";
import { indentList, opt, optObj, optT } from "../codegen/codegen";
import { CustomButtonType, EnabledBy, enabledByString } from "./enabledBy";
import { ButtonWithControl } from "./allButtons";
import { stateForButtonWithPath, stateQueryForPathsFnButtonParams } from "../codegen/lens";
import { ChangeCommand, CommandButtonChangeCommands } from "@focuson-nw/rest";


function makeActionButton<B extends ActionButtonInPage, G> (): ButtonCreator<ActionButtonInPage, G> {
  return {
    import: '@focuson-nw/form_components',
    needsHistory: true,
    makeButton: data => {
      const { params, mainPage, parent, name, button } = data
      const { action, text, path, paths, preCommands, postCommands, buttonType, needsHistory } = button
      const errorPrefix = `Page ${parent.name}.buttons[${name}] `
      const state = stateForButtonWithPath ( data, 'DeleteStateButton' ) ( path )
      const history = needsHistory ? 'history' : undefined
      return [ `<ActionButton state={${state}} id=${makeIdForButton ( name )} ${enabledByString ( button )} action={action.${action}}`,
        ...indentList ( [
          ...optT ( 'buttonType', buttonType ),
          ...optObj ( 'history', history ),
            `preCommands={${JSON.stringify ( toArray ( (preCommands) ) )}}`,
          `postCommands={${JSON.stringify ( toArray ( (postCommands) ) )}}`,
          ...opt ( 'text', text ),
        ] ),
        `paths= {{${Object.entries ( safeObject ( paths ) ).map ( ( [ name, path ] ) => `${name}:${stateQueryForPathsFnButtonParams ( errorPrefix, params, mainPage, parent, path )}` ).join ( ',' )}}}`,
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
export interface ActionButtonInPage extends EnabledBy, CustomButtonType {
  control: 'ActionButton'
  text?: string;
  action: string;
  path: string;
  paths?: NameAnd<string>;
  needsHistory?: boolean;
  preCommands?: CommandButtonChangeCommands | CommandButtonChangeCommands[]
  postCommands?: CommandButtonChangeCommands | CommandButtonChangeCommands[]
}

