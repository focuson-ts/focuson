import { AllButtonsInPage, CommonModalButtonInPage, isListMarkerNextButton, isListMarkerPrevButton, isModalAndCopyButton, isModalButton, isModalCloseButton, isRestButton, ModalAndCopyButtonInPage, ModalButtonInPage, ModalCloseButton, PageD, RestButtonInPage, RestOnCommit } from "../common/pageD";
import { safeArray, sortedEntries } from "@focuson/utils";
import { emptyName, modalName, restDetailsName } from "./names";
import { focusOnFor } from "./codegen";
import { RestCommand } from "@focuson/rest";
import { TSParams } from "./config";


function restOnCommitString ( r: { rest: any, action: string } | any ): string {
  return r ? `rest='${r.rest}' action='${r.action}'` : ''
}
function opt ( name: string, p: string | undefined ) {
  return p ? `${name}='${p}'` : ''
}

function rest ( parent: PageD, rest?: RestOnCommit ): string {
  const actualRestOnCommet: RestCommand = { name: restDetailsName ( parent, rest.rest ), restAction: rest.action, path: safeArray ( rest.target ) }
  return rest ? ` rest={${JSON.stringify ( actualRestOnCommet )}}` : ""
}

function makeCommonModalButton ( parent: PageD, name: string, button: CommonModalButtonInPage, extras: string ): string {
  const { modal, mode, restOnCommit, to } = button
  const toString = focusOnFor ( safeArray ( to ) )
  return `<${button.control} id='${name}' text='${name}' modal = '${modalName ( parent, modal )}'  to={fullState${toString}} base={${JSON.stringify ( [ parent.name, ...to ] )}} ${extras}  ${opt ( 'pageMode', mode )} ${rest ( parent, button.restOnCommit )} />`;

}

function makeModalButtonInPage ( params: TSParams, parent: PageD, name: string, button: ModalButtonInPage ): string {
  const { modal, mode, createEmpty, restOnCommit } = button
  const createEmptyString = createEmpty ? `createEmpty={${params.emptyFile}.${emptyName ( createEmpty )}}` : ""
  return makeCommonModalButton ( parent, name, button, createEmptyString )
  // return `<${button.control} id='${name}' text='${name}' modal = '${modalName ( parent, modal )}' state={state} ${opt ( 'pageMode', mode )} ${rest ( button.restOnCommit )} />`;
}
function makeModalAndCopyButtonInPage ( parent: PageD, name: string, button: ModalAndCopyButtonInPage ): string {
  const { modal, mode, from, to, restOnCommit } = button
  const fromString = focusOnFor ( safeArray ( from ) )
  const toString = focusOnFor ( safeArray ( to ) )
  return makeCommonModalButton ( parent, name, button, ` from={fullState${fromString}} ` )
  // return `<${button.control} id='${name}' text='${name}' modal = '${modalName ( parent, modal )}' ${opt ( 'pageMode', mode )} from={fullState${fromString}} to={fullState${toString}}  ${rest ( button.restOnCommit )}/>`//${restOnCommitString ( restOnCommit )}  />`;
}

function makeListMarkerPrevButton () {
  return `<button>Prev</button>`
}
function makeListMarkerNextButton () {
  return `<button>Next</button>`
}


function makeRestButtonFrom ( name: string, button: RestButtonInPage ): string {
  return `<${button.control} id='${name}' state={state} />`;
}
function makeModalCloseButtonFrom ( name: string, button: ModalCloseButton ): string {
  return `<${button.control} id='${name}' state={state} />`;
}
export const makeButtonFrom = ( params: TSParams ) => ( parent: PageD ) => ( [ name, button ]: [ string, AllButtonsInPage ] ): string => {
  if ( isModalButton ( button ) ) return makeModalButtonInPage ( params, parent, name, button )
  if ( isModalAndCopyButton ( button ) ) return makeModalAndCopyButtonInPage ( parent, name, button )
  if ( isRestButton ( button ) ) return makeRestButtonFrom ( name, button )
  if ( isModalCloseButton ( button ) ) return makeModalCloseButtonFrom ( name, button )
  if ( isModalCloseButton ( button ) ) return makeModalCloseButtonFrom ( name, button )
  if ( isListMarkerPrevButton ( button ) ) return makeListMarkerPrevButton ()
  if ( isListMarkerNextButton ( button ) ) return makeListMarkerNextButton ()
  return `<button>${name} of type ${button.control} cannot be create yet</button>`
};
export function makeButtonsFrom ( params: TSParams, p: PageD ): string[] {
  return sortedEntries ( p.buttons ).map ( makeButtonFrom ( params ) ( p ) )

}