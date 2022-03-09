import { AllDataDD, DataD, findAllDataDs, NamesAndDataDs } from "./dataD";
import { defaultRestAction, RestActionDetail, RestD, unique } from "./restD";
import { RestAction, RestResult, sortedEntries } from "@focuson/utils";
import { PageMode } from "@focuson/pages";
import { AllButtonsInPage } from "../buttons/allButtons";


export interface DomainDefnInPage {
  [ name: string ]: { dataDD: AllDataDD }
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

export interface RestOnCommit {
  rest: any,
  action: RestAction,
  /** What happens when the rest is completed. Currently only 'refresh' which clears the 'main object' triggering a fetch. Later we will be more clever' */
  result: RestResult;
  target: string[];
}


export interface ButtonDefnInPage {
  [ name: string ]: AllButtonsInPage
}
export interface LayoutD {
  name: string,
  details: string // ok not sure what to do here... so this is just a placeholder
}
export type PageType = 'MainPage' | 'ModalPage'
export interface ModalData<B> {
  modal: PageD<B>,
  path: string[]
}

export function isMainPage<B> ( p: PageD<B> ): p is MainPageD<B> {
  return p.pageType === 'MainPage'
}
export function isModalPage<B> ( p: PageD<B> ): p is ModalPageD<B> {
  return p.pageType === 'ModalPage'
}
export type PageD<Buttons> = MainPageD<Buttons> | ModalPageD<Buttons>

export interface MainPageD<Buttons> {
  pageType: 'MainPage',
  name: string,
  modes: PageMode[],
  display: { layout: LayoutD, target: string[], dataDD: DataD},
  initialValue: 'empty' | any,
  domain: DomainDefnInPage,
  modals?: ModalData<Buttons>[],
  rest: RestDefnInPage,
  buttons: ButtonDefnInPage
}
export interface ModalPageD<Buttons> {
  pageType: 'ModalPage',
  name: string,
  modes: PageMode[],
  display: { layout: LayoutD, target: string[], dataDD: DataD, importFrom: string },
  buttons: ButtonDefnInPage
}


export function dataDsIn<B> ( pds: PageD<B>[], stopAtDisplay?: boolean ): NamesAndDataDs {
  const pageDataDs = pds.flatMap ( pd => (isMainPage ( pd ) ? sortedEntries ( pd.rest ) : []).map ( ( [ na, restPD ]: [ string, RestDefnInPageProperties ] ) => restPD.rest.dataDD ) )
  return findAllDataDs ( pageDataDs, stopAtDisplay )
}

export function allRestAndActions<B> ( pds: PageD<B>[] ): [ PageD<B>, RestDefnInPageProperties, RestActionDetail ][] {
  return unique ( pds.flatMap ( pd => {
    return (isMainPage ( pd ) ? sortedEntries ( pd.rest ) : []).flatMap ( ( [ name, rdp ] ) => {
      const y: [ PageD<B>, RestDefnInPageProperties, RestActionDetail ][] = rdp.rest.actions.map ( a => [ pd, rdp, defaultRestAction[ a ] ] )
      return y
    } )
  } ), ( [ p, r, rad ] ) => p.name + "," + r.rest.dataDD.name + "," + rad.name )
}

export function allMainPages<B> ( ps: PageD<B>[] ): PageD<B>[] {return ps.filter ( p => p.pageType === 'MainPage' )}

