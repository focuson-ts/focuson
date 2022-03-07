import { ButtonCreator, MakeButton } from "../codegen/makeButtons";
import { RestAction, RestResult } from "@focuson/utils";
import { RestD } from "../common/restD";
import { CommonStateProps } from "@focuson/form_components";
import { opt, optT } from "../codegen/codegen";
import { restDetailsName } from "../codegen/names";


const makeRestButton: ButtonCreator<RestButtonInPage> = ( { params, parent, name, button } ) => {
  const { rest, action, confirm, result, path } = button
  return `<RestButton  ${opt ( 'id', name )}   ${opt ( 'name', name )} ${opt ( 'action', action )} ${optT ( 'path', path )} state={state}${opt ( 'rest', restDetailsName ( parent, rest ) )} ${optT ( 'confirm', confirm )} />`
}

export const makeRestButtons: MakeButton = {
  RestButton: makeRestButton,
}

export interface RestButtonInPage {
  control: 'RestButton';
  rest: RestD;
  action: RestAction;
  path: string[],
  confirm?: boolean;
  result?: RestResult
}

