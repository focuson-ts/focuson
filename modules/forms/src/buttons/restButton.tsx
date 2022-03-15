import { ButtonCreator, MakeButton } from "../codegen/makeButtons";
import { RestAction, RestResult } from "@focuson/utils";
import { RestD } from "../common/restD";
import { indentList, opt, optT } from "../codegen/codegen";
import { restDetailsName } from "../codegen/names";
import { replaceBasePathWithKnownPage } from "@focuson/pages";


function makeRestButton<B extends RestButtonInPage<G>, G> (): ButtonCreator<RestButtonInPage<G>, G> {
  return {
    import: '../copied/rest',
    makeButton: ( { params, parent, name, button } ) => {
      const { rest, action, confirm, result, path } = button
      const realPath = replaceBasePathWithKnownPage ( parent.name, path )
      return [ `<RestButton state={state}`,
        ...indentList ( [
          ...opt ( 'id', name ),
          ...opt ( 'name', name ),
          ...opt ( 'action', action ),
          ...optT ( 'path', realPath ),
          ...opt ( 'rest', restDetailsName ( parent, rest ) ),
          ...optT ( 'confirm', confirm ) ] ), ' />' ]
    }
  }
}

export function makeRestButtons<G> (): MakeButton<G> {
  return { RestButton: makeRestButton () }
}

export interface RestButtonInPage<G> {
  control: 'RestButton';
  rest: RestD<G>;
  action: RestAction;
  path: string[],
  confirm?: boolean;
  result?: RestResult;
  validate?: boolean;
}

