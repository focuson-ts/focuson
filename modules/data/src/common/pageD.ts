import { DataD, findAllDataDs, NamesAndDataDs } from "./dataD";
import { RestD } from "./restD";
import { sortedEntries } from "@focuson/utils";
import { ComponentData } from "../codegen/makeComponents";
import { ModalButton } from "@focuson/pages";


type PageMode = 'view' | 'create' | 'edit'
export interface DomainDefnInPage {
  [ name: string ]: { dataDD: DataD }
}
export interface RestDefnInPageProperties {
  rest: RestD,
  targetFromPath: string,
  fetcher?: boolean
}
export interface RestDefnInPage {
  [ name: string ]: RestDefnInPageProperties
}
export type AllButtonsInPage = ModalButtonInPage | RestButtonInPage | ModalCloseButton
export interface ModalButtonInPage {
  control: 'ModalButton',
  modal: string,
  mode: PageMode,
  mainData?: string,
  tempData: string,
  restOnCommit?: { rest: any, action: string }
}
export function isModalButton ( b: AllButtonsInPage ): b is ModalButtonInPage {
  return b.control == 'ModalButton'
}
export interface RestButtonInPage {
  control: 'RestButton',
  rest: string,
  action: string,
  confirm?: boolean
}
export function isRestButton ( b: AllButtonsInPage ): b is RestButtonInPage {
  return b.control == 'RestButton'
}
export interface ModalCloseButton {
  control: 'ModalCancelButton' | 'ModalCommitButton'
}
export function isModalCloseButton ( b: AllButtonsInPage ): b is ModalCloseButton {
  return b.control == 'ModalCancelButton' || b.control == 'ModalCommitButton'
}
export interface ButtonDefnInPage {
  [ name: string ]: AllButtonsInPage
}
export interface LayoutD {
  name: string,
  details: string // ok not sure what to do here... so this is just a placeholder
}
export interface PageD {
  name?: string,
  modal?: boolean,
  path?: string[],
  modes: PageMode[],
  display: { layout: LayoutD, target: string[], dataDD: DataD },
  initialValue: any,
  domain: DomainDefnInPage,
  rest: RestDefnInPage,
  buttons: ButtonDefnInPage
}


export function dataDsIn ( pds: PageD[], stopAtDisplay?: boolean ): NamesAndDataDs {
  const pageDataDs = pds.flatMap ( pd => sortedEntries ( pd.rest ).map ( ( [ na, restPD ]: [ string, RestDefnInPageProperties ] ) => restPD.rest.dataDD ) )
  return findAllDataDs ( pageDataDs, stopAtDisplay )
}

