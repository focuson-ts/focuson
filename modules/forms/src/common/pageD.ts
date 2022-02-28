import { DataD, findAllDataDs, NamesAndDataDs } from "./dataD";
import { defaultRestAction, RestActionDetail, RestD, unique } from "./restD";
import { RestAction, sortedEntries } from "@focuson/utils";
import { PageMode } from "@focuson/pages";
import { RestResult } from "@focuson/utils";


export interface DomainDefnInPage {
  [ name: string ]: { dataDD: DataD }
}
type FetcherType = 'get' | 'list'

export interface RestDefnInPageProperties {
  rest: RestD,
  targetFromPath: string[],
  fetcher?: FetcherType
}
export interface RestDefnInPage {
  [ name: string ]: RestDefnInPageProperties
}
export type AllButtonsInPage = ModalButtonInPage | ModalAndCopyButtonInPage | ModalCloseButton |
  ResetStateButton | RestButtonInPage | ListMarkerNextButtonInPage | ListMarkerPrevButtonInPage


export interface RestOnCommit {
  rest: any,
  action: RestAction,
  /** What happens when the rest is completed. Currently only 'refresh' which clears the 'main object' triggering a fetch. Later we will be more clever' */
  result: RestResult
}

export interface CommonModalButtonInPage {
  control: string;
  modal: PageD,
  mode: PageMode,
  restOnCommit?: RestOnCommit
  to: string[],
}

export interface ModalButtonInPage extends CommonModalButtonInPage {
  control: 'ModalButton',
  createEmpty?: boolean
}
export interface ModalAndCopyButtonInPage extends CommonModalButtonInPage {
  control: 'ModalAndCopyButton',
  from: string[]
}

export interface ListMarkerNextButtonInPage {
  control: 'ListMarkerNextButton',
}
export function isListMarkerNextButton(b: AllButtonsInPage): b is ListMarkerNextButtonInPage{
  return b.control === 'ListMarkerNextButton'
}
export interface ListMarkerPrevButtonInPage {
  control: 'ListMarkerPrevButton',
}
export function isListMarkerPrevButton(b: AllButtonsInPage): b is ListMarkerPrevButtonInPage{
  return b.control === 'ListMarkerPrevButton'
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
  confirm?: boolean,
  result: RestResult
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

