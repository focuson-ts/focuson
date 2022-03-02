import { RestD } from "../common/restD";
import { RestResult } from "@focuson/utils";
import { ButtonCreator } from "../codegen/makeButtons";

export interface RestButtonInPage {
  control: 'RestButton',
  rest: RestD,
  action: string,
  confirm?: boolean,
  result: RestResult
}
export const makeRestButtonFrom: ButtonCreator<RestButtonInPage> =
               ( { params, parent, name, button } )=> `<${button.control} id='${name}' state={state} />`
