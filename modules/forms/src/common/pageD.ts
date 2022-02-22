import { DataD, emptyDataFlatMap, findAllDataDs, flatMapDD, NamesAndDataDs } from "./dataD";
import { defaultRestAction, RestActionDetail, RestD, unique } from "./restD";
import { sortedEntries } from "@focuson/utils";
import { ModalButton, PageMode } from "@focuson/pages";
import { makeHasDomainsFor } from "../codegen/makeDomain";


export interface DomainDefnInPage {
  [ name: string ]: { dataDD: DataD }
}
type FetcherType = 'get' | 'list'

export interface RestDefnInPageProperties {
  rest: RestD,
  targetFromPath: string,
  fetcher?: FetcherType
}
export interface RestDefnInPage {
  [ name: string ]: RestDefnInPageProperties
}
export type AllButtonsInPage = ModalButtonInPage | RestButtonInPage | ModalCloseButton | ResetStateButton | ModalAndCopyButtonInPage
export interface ComonModalButtonInPage {
  modal: PageD,
  mode: PageMode,
  restOnCommit?: { rest: any, action: string }
}

export interface ModalButtonInPage extends ComonModalButtonInPage {
  control: 'ModalButton',
  createEmpty?: boolean
}
export interface ModalAndCopyButtonInPage extends ComonModalButtonInPage {
  control: 'ModalAndCopyButton',
  from?: string[],
  to: string[],
}
export interface ResetStateButton {
  control: 'ResetStateButton',

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
export function isModalAndCopyButton ( b: AllButtonsInPage ): b is ModalAndCopyButtonInPage {
  return b.control == 'ModalAndCopyButton'
}
export interface ButtonDefnInPage {
  [ name: string ]: AllButtonsInPage
}
export interface LayoutD {
  name: string,
  details: string // ok not sure what to do here... so this is just a placeholder
}
export type PageType = 'MainPage' | 'ModalPage'
export interface ModalData {
  modal: PageD,
  path: string[]
}
export interface PageD {
  name: string,
  pageType: PageType,
  modes: PageMode[],
  display: { layout: LayoutD, target: string[], dataDD: DataD },
  initialValue: 'empty' | any,
  domain: DomainDefnInPage,
  modals?: ModalData[],
  rest: RestDefnInPage,
  buttons: ButtonDefnInPage
}


export function dataDsIn ( pds: PageD[], stopAtDisplay?: boolean ): NamesAndDataDs {
  const pageDataDs = pds.flatMap ( pd => sortedEntries ( pd.rest ).map ( ( [ na, restPD ]: [ string, RestDefnInPageProperties ] ) => restPD.rest.dataDD ) )
  return findAllDataDs ( pageDataDs, stopAtDisplay )
}

export function allRestAndActions ( pds: PageD[] ): [ PageD, RestDefnInPageProperties, RestActionDetail ][] {
  return unique ( pds.flatMap ( pd => {
    return sortedEntries ( pd.rest ).flatMap ( ( [ name, rdp ] ) => {
      const y: [ PageD, RestDefnInPageProperties, RestActionDetail ][] = rdp.rest.actions.map ( a => [ pd, rdp, defaultRestAction[ a ] ] )
      return y
    } )
  } ), ( [ p, r, rad ] ) => p.name + "," + r.rest.dataDD.name + "," + rad.name )
}

export function allMainPages ( ps: PageD[] ): PageD[] {return ps.filter ( p => p.pageType === 'MainPage' )}

