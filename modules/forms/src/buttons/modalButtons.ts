import { DataD } from "../common/dataD";
import { safeArray } from "@focuson/utils";
import { PageD, RestOnCommit } from "../common/pageD";
import { PageMode } from "@focuson/pages";
import { ButtonCreator, MakeButton } from "../codegen/makeButtons";
import { focusOnFor, opt } from "../codegen/codegen";
import { emptyName, modalName, restDetailsName } from "../codegen/names";
import { RestCommand } from "@focuson/rest";

export interface CommonModalButtonInPage {
  control: string;
  modal: PageD,
  mode: PageMode,
  restOnCommit?: RestOnCommit
  to: string[],
}
export function restForButton ( parent: PageD, rest?: RestOnCommit ): string {
  const actualRestOnCommet: RestCommand = { name: restDetailsName ( parent, rest.rest ), restAction: rest.action, path: safeArray ( rest.target ) }
  return rest ? ` rest={${JSON.stringify ( actualRestOnCommet )}}` : ""
}

function makeCommonModalButton ( parent: PageD, name: string, button: CommonModalButtonInPage, extras: string ): string {
  const { modal, mode, restOnCommit, to } = button
  const toString = focusOnFor ( safeArray ( to ) )
  return `<${button.control} id='${name}' text='${name}' modal = '${modalName ( parent, modal )}'  ` +
    `to={fullState${toString}} base={${JSON.stringify ( [ parent.name, ...to ] )}} ` +
    `${extras}  ${opt ( 'pageMode', mode )} ${restForButton ( parent, button.restOnCommit )} />`;
}


export interface ModalAndCopyButtonInPage extends CommonModalButtonInPage {
  control: 'ModalAndCopyButton',
  from: string[]
}
const makeModalAndCopyButtonInPage: ButtonCreator<ModalAndCopyButtonInPage> =
        ( { params, parent, name, button } ) =>
          makeCommonModalButton ( parent, name, button, ` from={fullState${(focusOnFor ( safeArray ( button.from ) ))}} ` )

export interface ModalButtonInPage extends CommonModalButtonInPage {
  control: 'ModalButton',
  createEmpty?: DataD
}
const makeModalButtonInPage: ButtonCreator<ModalButtonInPage> = ( { params, parent, name, button } ) => {
  const { modal, mode, createEmpty, restOnCommit } = button
  const createEmptyString = createEmpty ? `createEmpty={${params.emptyFile}.${emptyName ( createEmpty )}}` : ""
  return makeCommonModalButton ( parent, name, button, createEmptyString )
}

export const makeModalButtons: MakeButton = {
  ModalButton: makeModalButtonInPage,
  ModalAndCopyButton: makeModalAndCopyButtonInPage,
}




