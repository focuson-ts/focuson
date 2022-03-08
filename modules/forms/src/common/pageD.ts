import { AllDataDD, DataD, findAllDataDs, NamesAndDataDs } from "./dataD";
import { defaultRestAction, RestActionDetail, RestD, unique } from "./restD";
import { RestAction, sortedEntries } from "@focuson/utils";
import { PageMode } from "@focuson/pages";
import { RestResult } from "@focuson/utils";
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

export function hasDomains<B> ( p: PageD<B> ) {
  return p.pageType === 'MainPage'
}

export interface PageD<Buttons> {
  name: string,
  pageType: PageType,
  modes: PageMode[],
  display: { layout: LayoutD, target: string[], dataDD: DataD, importFrom?: string },
  initialValue: 'empty' | any,
  domain: DomainDefnInPage,
  modals?: ModalData<Buttons>[],
  rest: RestDefnInPage,
  buttons: ButtonDefnInPage
}


export function dataDsIn<B> ( pds: PageD<B>[], stopAtDisplay?: boolean ): NamesAndDataDs {
  const pageDataDs = pds.flatMap ( pd => sortedEntries ( pd.rest ).map ( ( [ na, restPD ]: [ string, RestDefnInPageProperties ] ) => restPD.rest.dataDD ) )
  return findAllDataDs ( pageDataDs, stopAtDisplay )
}

export function allRestAndActions<B> ( pds: PageD<B>[] ): [ PageD<B>, RestDefnInPageProperties, RestActionDetail ][] {
  return unique ( pds.flatMap ( pd => {
    return sortedEntries ( pd.rest ).flatMap ( ( [ name, rdp ] ) => {
      const y: [ PageD<B>, RestDefnInPageProperties, RestActionDetail ][] = rdp.rest.actions.map ( a => [ pd, rdp, defaultRestAction[ a ] ] )
      return y
    } )
  } ), ( [ p, r, rad ] ) => p.name + "," + r.rest.dataDD.name + "," + rad.name )
}

export function allMainPages<B> ( ps: PageD<B>[] ): PageD<B>[] {return ps.filter ( p => p.pageType === 'MainPage' )}

