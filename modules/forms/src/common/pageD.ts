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

