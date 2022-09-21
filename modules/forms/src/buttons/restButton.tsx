import { ButtonCreator, MakeButton, makeIdForButton } from "../codegen/makeButtons";
import { decamelize, RequiredCopyDetails, RestAction, RestResult, toArray } from "@focuson/utils";
import { indentList, opt, optT } from "../codegen/codegen";
import { restDetailsName } from "../codegen/names";
import { EnabledBy, enabledByString } from "./enabledBy";
import { ButtonWithControl } from "./allButtons";
import { CopyResultCommand, DeleteCommand, MessageCommand, RestChangeCommands } from "@focuson/rest";
import { ConfirmWindow } from "@focuson/pages";


function findFullOnSuccess ( onSuccess: RestChangeCommands[], copyDetails: RequiredCopyDetails[], deletes: string[], messages: string[] ) {
  const copyCommands: CopyResultCommand[] = copyDetails.map ( copy => ({ ...copy, command: 'copyResult' }) )
  const deleteCommands: DeleteCommand[] = deletes.map ( path => ({ command: 'delete', path }) )
  const messageCommands: MessageCommand[] = messages.map ( msg => ({ command: 'message', msg }) )
  const result = [ ...onSuccess, ...deleteCommands, ...copyCommands, ...messageCommands ]
  return result.length > 0 ? result : undefined;
}
function makeRestButton<B extends RestButtonInPage<G>, G> (): ButtonCreator<RestButtonInPage<G>, G> {
  return {
    import: '@focuson/form_components',
    makeButton: ( { params, mainPage, parent, name, button } ) => {
      const { action, confirm, restName, validate, text, deleteOnSuccess, messageOnSuccess, buttonType, copyOnSuccess, onSuccess, on404 } = button
      // if ( !isMainPage ( parent ) ) throw new Error ( 'Currently rest buttons are only valid on main pages' ) //Note: this is just for 'how do we specify them'
      const rest = mainPage.rest[ restName ]
      if ( !rest ) throw new Error ( `Rest button on page ${parent.name} uses restName ${restName} which doesn't exist\n${JSON.stringify ( button )}` )
      const changeOnSuccess = findFullOnSuccess ( toArray ( onSuccess ), toArray ( copyOnSuccess ), toArray ( deleteOnSuccess ), toArray ( messageOnSuccess ) )
      return [ `<RestButton state={state} id=${makeIdForButton ( name )} ${enabledByString ( button )} text='${text ? text : decamelize ( name, ' ' )}'`,
        ...indentList ( [
          ...opt ( 'name', name ),
          ...optT ( 'action', action ),
          ...optT ( 'validate', validate ),
          ...optT ( 'buttonType', buttonType ),
          ...optT ( 'onSuccess', changeOnSuccess ),
          ...optT ( 'on404', on404 ? toArray ( on404 ) : undefined ),
          ...opt ( 'rest', restDetailsName ( mainPage, restName, rest.rest ) ),
          ...optT ( 'confirm', confirm ) ] ),
        ' />' ]
    }
  }
}

export function makeRestButtons<G> (): MakeButton<G> {
  return { RestButton: makeRestButton () }
}

export function isRestButtonInPage ( p: ButtonWithControl ): p is RestButtonInPage<any> {
  return p.control === 'RestButton'
}
export interface RestButtonInPage<G> extends EnabledBy {
  control: 'RestButton';
  restName: string;
  action: RestAction;
  confirm?: boolean | string | ConfirmWindow;
  result?: RestResult;
  validate?: boolean;
  text?: string;
  deleteOnSuccess?: string | string[];
  copyOnSuccess?: RequiredCopyDetails | RequiredCopyDetails[]
  messageOnSuccess?: string,
  onSuccess?: RestChangeCommands | RestChangeCommands[],
  on404?: RestChangeCommands | RestChangeCommands[],
}

