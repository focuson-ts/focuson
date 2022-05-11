import { ButtonCreator, MakeButton, makeIdForButton } from "../codegen/makeButtons";
import { RestAction, RestResult } from "@focuson/utils";
import { RestD } from "../common/restD";
import { indentList, opt, optT } from "../codegen/codegen";
import { restDetailsName } from "../codegen/names";
import { replaceBasePageWithKnownPage } from "@focuson/pages";
import { isMainPage } from "../common/pageD";
import { EnabledBy, enabledByString } from "./enabledBy";
import { printRestAction } from "@focuson/rest";
import { ButtonWithControl } from "./allButtons";


function makeRestButton<B extends RestButtonInPage<G>, G> (): ButtonCreator<RestButtonInPage<G>, G> {
  return {
    import: '@focuson/form_components',
    makeButton: ( { params, parent, name, button } ) => {
      const { action, confirm, restName, result, validate, enabledBy ,deleteOnSuccess} = button
      if ( !isMainPage ( parent ) ) throw new Error ( 'Currently rest buttons are only valid on main pages' ) //Note: this is just for 'how do we specify them'
      const rest = parent.rest[ restName ]
      if ( !rest ) throw new Error ( `Rest button on page ${parent.name} uses restName ${restName} which doesn't exist\n${JSON.stringify ( button )}` )
      return [ `<RestButton state={state} id=${makeIdForButton ( name )} ${enabledByString ( button )}`,
        ...indentList ( [
          ...opt ( 'name', name ),
          ...optT ( 'action', action ),
          ...optT ( 'validate', validate ),
          ...optT ( 'deleteOnSuccess', deleteOnSuccess ),
          ...opt ( 'rest', restDetailsName ( parent, restName, rest.rest ) ),
          ...optT ( 'confirm', confirm ) ] ),
        ' />' ]
    }
  }
}

export function makeRestButtons<G> (): MakeButton<G> {
  return { RestButton: makeRestButton () }
}

export function isRestButtonInPage( p: ButtonWithControl) : p is RestButtonInPage<any>{
  return p.control === 'RestButton'
}
export interface RestButtonInPage<G> extends EnabledBy {
  control: 'RestButton';
  restName: string;
  action: RestAction;
  confirm?: boolean | string;
  result?: RestResult;
  validate?: boolean;
  deleteOnSuccess?: string | string[]

}

