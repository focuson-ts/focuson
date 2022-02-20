import { AllButtonsInPage, isModalButton, isModalCloseButton, isRestButton, ModalButtonInPage, ModalCloseButton, PageD, RestButtonInPage } from "../common/pageD";
import { sortedEntries } from "@focuson/utils";
import { access } from "node:fs/promises";


//  modal: string,
//   mode: PageMode,
//   mainData?: string,
//   tempData: string,
//   restOnCommit?: { rest: any, action: string }

function restOnCommitString ( r: { rest: any, action: string } | any ): string {
  return r ? `rest='${r.rest}' action='${r.action}'` : ''
}
function opt ( name: string, p: string | undefined ) {
  return p ? `${name}='${p}'` : ''
}
function makeModalButtonFrom ( name: string, button: ModalButtonInPage ): string {
  const { modal, mode, mainData, tempData, restOnCommit } = button
  return `<${button.control} id='${name}' state={state} ${opt ( 'mode', mode )} ${opt ( 'mainData', mainData )} ${opt ( 'tempData', tempData )} ${restOnCommitString ( restOnCommit )}  />`;
}
function makeRestButtonFrom ( name: string, button: RestButtonInPage ): string {
  return `<${button.control} id='${name}' state={state} />`;
}
function makeModalCloseButtonFrom ( name: string, button: ModalCloseButton ): string {
  return `<${button.control} id='${name}' state={state} />`;
}
export function makeButtonFrom ( [ name, button ]: [ string, AllButtonsInPage ] ): string {
  if ( isModalButton ( button ) ) return makeModalButtonFrom ( name, button )
  if ( isRestButton ( button ) ) return makeRestButtonFrom ( name, button )
  if ( isModalCloseButton ( button ) ) return makeModalCloseButtonFrom ( name, button )
  return `<button>${name} of type ${button.control} cannot be create yet</button>`
}
export function makeButtonsFrom ( p: PageD ): string[] {
  return sortedEntries ( p.buttons ).map ( makeButtonFrom )

}