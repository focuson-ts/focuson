import { AllButtonsInPage, isModalAndCopyButton, isModalButton, isModalCloseButton, isRestButton, ModalAndCopyButtonInPage, ModalButtonInPage, ModalCloseButton, PageD, RestButtonInPage } from "../common/pageD";
import { safeArray, sortedEntries } from "@focuson/utils";
import { access } from "node:fs/promises";
import { modalName } from "./names";
import { focusOnFor } from "./codegen";


function restOnCommitString ( r: { rest: any, action: string } | any ): string {
  return r ? `rest='${r.rest}' action='${r.action}'` : ''
}
function opt ( name: string, p: string | undefined ) {
  return p ? `${name}='${p}'` : ''
}
function makeModalButtonFrom ( parent: PageD, name: string, button: ModalButtonInPage ): string {
  const { modal, mode, createEmpty, restOnCommit } = button
  const createEmptyString = createEmpty ? "createEmpty" : ""
  return `<${button.control} id='${name}' text='${name}' modal = '${modalName ( parent, modal )}' state={state} ${opt ( 'pageMode', mode )} />`;
}
function makeModalAndCopyButtonInPage ( parent: PageD, name: string, button: ModalAndCopyButtonInPage ): string {
  const { modal, mode, from, to, restOnCommit } = button
  const fromString = focusOnFor ( safeArray ( from ) )
  const toString = focusOnFor ( safeArray ( to ) )
  return `<${button.control} id='${name}' text='${name}' modal = '${modalName ( parent, modal )}' ${opt ( 'pageMode', mode )} from={fullState${fromString}} to={fullState${toString}} />`//${restOnCommitString ( restOnCommit )}  />`;
}


function makeRestButtonFrom ( name: string, button: RestButtonInPage ): string {
  return `<${button.control} id='${name}' state={state} />`;
}
function makeModalCloseButtonFrom ( name: string, button: ModalCloseButton ): string {
  return `<${button.control} id='${name}' state={state} />`;
}
export const makeButtonFrom = ( parent: PageD ) => ( [ name, button ]: [ string, AllButtonsInPage ] ): string => {
  if ( isModalButton ( button ) ) return makeModalButtonFrom ( parent, name, button )
  if ( isModalAndCopyButton ( button ) ) return makeModalAndCopyButtonInPage ( parent, name, button )
  if ( isRestButton ( button ) ) return makeRestButtonFrom ( name, button )
  if ( isModalCloseButton ( button ) ) return makeModalCloseButtonFrom ( name, button )
  if ( isModalCloseButton ( button ) ) return makeModalCloseButtonFrom ( name, button )
  return `<button>${name} of type ${button.control} cannot be create yet</button>`
};
export function makeButtonsFrom ( p: PageD ): string[] {
  return sortedEntries ( p.buttons ).map ( makeButtonFrom ( p ) )

}