import { DataD, emptyDataFlatMap, findAllDataDs, flatMapDD, NamesAndDataDs } from "./dataD";
import { defaultRestAction, RestActionDetail, RestD, unique } from "./restD";
import { sortedEntries } from "@focuson/utils";
import { ModalButton } from "@focuson/pages";
import { makeHasDomainsFor } from "../codegen/makeDomain";


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
export type AllButtonsInPage = ModalButtonInPage | RestButtonInPage | ModalCloseButton | ResetStateButton
export interface ModalButtonInPage {
  control: 'ModalButton',
  modal: string,
  mode: PageMode,
  mainData?: string,
  tempData: string,
  restOnCommit?: { rest: any, action: string }
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
export interface ButtonDefnInPage {
  [ name: string ]: AllButtonsInPage
}
export interface LayoutD {
  name: string,
  details: string // ok not sure what to do here... so this is just a placeholder
}
export type PageType = 'MainPage' | 'ModalPage'
export interface PageD {
  name: string,
  pageType: PageType,
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

export function allRestAndActions ( pds: PageD[] ): [ PageD, RestDefnInPageProperties, RestActionDetail ][] {
  return unique ( pds.flatMap ( pd => {
    return sortedEntries ( pd.rest ).flatMap ( ( [ name, rdp ] ) => {
      const y: [ PageD, RestDefnInPageProperties, RestActionDetail ][] = rdp.rest.actions.map ( a => [ pd, rdp, defaultRestAction[ a ] ] )
      return y
    } )
  } ), ( [ p, r, rad ] ) => p.name + "," + r.rest.dataDD.name + "," + rad.name )
}

export function allMainPages(ps: PageD[]): PageD[]{return ps.filter(p => p.pageType === 'MainPage')}

// export function allPageDataAndResolvers ( rs: RestD[] ) {
//   rs.flatMap ( r => flatMapDD ( r.dataDD,
//     {
//       ...emptyDataFlatMap (),
//       walkDataStart: ( path, oparents: DataD[],neDataDD, dataDD ) =>
//         path.length < 2 ? [] : [ makeWiring ( path[ path.length - 2 ], path[ path.length - 1 ] ) ],
//       walkPrim: ( path,parents: DataD[], oneDataDD, dataDD ) =>
//         path.length < 2 ? [] : [ makeWiring ( path[ path.length - 2 ], path[ path.length - 1 ] ) ],
//     } )
// }
