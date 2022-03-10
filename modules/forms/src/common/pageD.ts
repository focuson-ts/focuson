import { AllDataDD, CompDataD, DataD, findAllDataDs, isDataDd, NamesAndDataDs } from "./dataD";
import { defaultRestAction, RestActionDetail, RestD, unique } from "./restD";
import { RestAction, RestResult, sortedEntries } from "@focuson/utils";
import { PageMode } from "@focuson/pages";
import { AllButtonsInPage } from "../buttons/allButtons";


export interface DomainDefnInPage<G> {
  [ name: string ]: { dataDD: AllDataDD<G> }
}


export interface RestDefnInPageProperties<G> {
  rest: RestD<G>,
  targetFromPath: string[],
  fetcher?: boolean
}
export interface RestDefnInPage<G> {
  [ name: string ]: RestDefnInPageProperties<G>
}

export interface RestOnCommit {
  rest: any,
  action: RestAction,
  /** What happens when the rest is completed. Currently only 'refresh' which clears the 'main object' triggering a fetch. Later we will be more clever' */
  result: RestResult;
  target: string[];
}


export interface ButtonDefnInPage<B> {
  [ name: string ]: B
}
export interface LayoutD {
  name: string,
  details: string // ok not sure what to do here... so this is just a placeholder
}
export type PageType = 'MainPage' | 'ModalPage'
export interface ModalData<B, G> {
  modal: PageD<B, G>,
  path: string[]
}

export function isMainPage<B, G> ( p: PageD<B, G> ): p is MainPageD<B, G> {
  return p.pageType === 'MainPage'
}
export function isModalPage<B, G> ( p: PageD<B, G> ): p is ModalPageD<B, G> {
  return p.pageType === 'ModalPage'
}
export type PageD<Buttons, G> = MainPageD<Buttons, G> | ModalPageD<Buttons, G>

export interface MainPageD<Buttons, G> {
  pageType: 'MainPage',
  name: string,
  modes: PageMode[],
  display: { layout: LayoutD, target: string[], dataDD: CompDataD<G> },
  initialValue: 'empty' | any,
  domain: DomainDefnInPage<G>,
  modals?: ModalData<Buttons, G>[],
  rest: RestDefnInPage<G>,
  buttons: ButtonDefnInPage<Buttons>
}
export interface ModalPageD<Buttons, G> {
  pageType: 'ModalPage',
  name: string,
  modes: PageMode[],
  display: { layout: LayoutD, target: string[], dataDD: DataD<G>, importFrom: string },
  buttons: ButtonDefnInPage<Buttons>
}


export function dataDsIn<B, G> ( pds: PageD<B, G>[], stopAtDisplay?: boolean ): NamesAndDataDs<G> {
  let mainPages = allMainPages ( pds );
  const pageDataDs: CompDataD<G>[] = mainPages.flatMap ( pd => sortedEntries ( pd.rest )
    .map ( ( [ na, restPD ]: [ string, RestDefnInPageProperties<G> ] ) => restPD.rest.dataDD ) )
  // pageDataDs.forEach ( d => console.log ( 'pageDataD - rest', d.name ) )
  const domainDataDs: DataD<G>[] = mainPages.flatMap ( pd => sortedEntries ( pd.domain ) )
    .flatMap ( ( [ name, domain ] ) => isDataDd ( domain.dataDD ) ? [ domain.dataDD ] : [] )
  // pageDataDs.forEach ( d => console.log ( 'domainDataDs ', d.name ) )
  let result = findAllDataDs ( [ ...pageDataDs, ...domainDataDs ], stopAtDisplay );
  // sortedEntries ( result ).forEach ( ( [ n, d ] ) => console.log ( "result", n, d.name ) )
  return result
}


export function allRestAndActions<B, G> ( pds: PageD<B, G>[] ): [ PageD<B, G>, RestDefnInPageProperties<G>, RestActionDetail ][] {
  return unique ( allMainPages ( pds ).flatMap ( pd => {
    return sortedEntries ( pd.rest ).flatMap ( ( [ name, rdp ] ) => {
      const y: [ PageD<B, G>, RestDefnInPageProperties<G>, RestActionDetail ][] = rdp.rest.actions.map ( a => [ pd, rdp, defaultRestAction[ a ] ] )
      return y
    } )
  } ), ( [ p, r, rad ] ) => p.name + "," + r.rest.dataDD.name + "," + rad.name )
}


export function allMainPages<B, G> ( pds: PageD<B, G>[] ): MainPageD<B, G>[] {
  return pds.filter ( isMainPage )
}

