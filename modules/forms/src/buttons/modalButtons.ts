import { DataD } from "../common/dataD";
import { safeArray } from "@focuson/utils";
import { PageD, RestOnCommit } from "../common/pageD";
import { PageMode } from "@focuson/pages";
import { ButtonCreator, MakeButton } from "../codegen/makeButtons";
import { focusOnFor, opt } from "../codegen/codegen";
import { emptyName, modalName, restDetailsName } from "../codegen/names";

export interface CommonModalButtonInPage {
  control: string;
  modal: PageD<any>,
  mode: PageMode,
  restOnCommit?: RestOnCommit,
  copyOnClose?: string[]
  to: string[],
}
export function restForButton<B> ( parent: PageD<B>, rest?: RestOnCommit ): string {
  return rest ? ` rest={${JSON.stringify ( { name: restDetailsName ( parent, rest.rest ), restAction: rest.action, path: safeArray ( rest.target ) } )}}` : ""
}

function makeCommonModalButton<B> ( parent: PageD<B>, name: string, button: CommonModalButtonInPage, extras: string ): string {
  const { modal, mode, restOnCommit, to } = button
  const toString = focusOnFor ( safeArray ( to ) )
  const copyOnCloseString = button.copyOnClose ? `copyOnClose={${JSON.stringify ( button.copyOnClose )}}` : ''
  return `<${button.control} id='${name}' text='${name}' modal = '${modalName ( parent, modal )}'  ` +
    `to={fullState${toString}} base={${JSON.stringify ( [ parent.name, ...to ] )}} ` +
    `${extras}  ${opt ( 'pageMode', mode )} ${copyOnCloseString} ${restForButton ( parent, button.restOnCommit )} />`;
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
  const { createEmpty } = button
  const createEmptyString = createEmpty ? `createEmpty={${params.emptyFile}.${emptyName ( createEmpty )}}` : ""
  return makeCommonModalButton ( parent, name, button, createEmptyString )
}

export const makeModalButtons: MakeButton = {
  ModalButton: makeModalButtonInPage,
  ModalAndCopyButton: makeModalAndCopyButtonInPage,
}




