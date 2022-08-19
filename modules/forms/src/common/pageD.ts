import { AllDataDD, CompDataD, DataD, findAllDataDs, HasGuards, HasLayout, isCompDD, isDataDd, NamesAndDataDs } from "./dataD";
import { CommonLensRestParam, RestD } from "./restD";
import { HasName, NameAnd, RestAction, safeString, sortedEntries, unique } from "@focuson/utils";
import { PageMode } from "@focuson/pages";
import { getRestTypeDetails, NewPageChangeCommands, RestActionDetail, RestChangeCommands } from "@focuson/rest";


export interface DomainDefnInPage<G> {
  [ name: string ]: { dataDD: AllDataDD<G> }
}


export interface RestDefnInPageProperties<G> {
  rest: RestD<G>,
  targetFromPath: string,
  fetcher?: boolean;
  postFetchCommands?: RestChangeCommands | RestChangeCommands[]
}
export interface RestDefnInPage<G> {
  [ name: string ]: RestDefnInPageProperties<G>
}
export interface CommonRestOnCommit {
  restName: string,
  action: RestAction,
  messageOnSuccess?: string
  changeOnSuccess?: RestChangeCommands | RestChangeCommands[]
  on404?: RestChangeCommands | RestChangeCommands[]
}
export interface RestOnCommitNothing extends CommonRestOnCommit {
  result: 'nothing';
}
export interface RestOnCommitRefresh extends CommonRestOnCommit {
  result: 'refresh';
  /** If specified this will be set to 'undefined', otherwise the actual rest object will be set to undefined.
   * This is to allow the fetchers to get the latest version after a mutation
   * This reason we have a path is that sometimes we do 'rest' on a list item, and need to refresh the list
   * At the moment the paths must start with /, but that might relax later*/
  pathToDelete?: string[]
}
export function isRestOnCommitRefresh ( r: CommonRestOnCommit ): r is RestOnCommitRefresh {
  const a: any = r;
  return a.result === 'refresh'
}
export type RestOnCommit = RestOnCommitNothing | RestOnCommitRefresh


export interface ButtonDefnInPage<B> {
  [ name: string ]: B
}

export type PageType = 'MainPage' | 'ModalPage' | 'ModalPopup' | 'MainPopup'
export type ModalOrMainData<B, G> = ModalData<B, G> | MainData<B, G>
export interface ModalData<B, G> {
  modal: ModalPageD<B, G>;
}
export function isModalData<B, G> ( m: ModalOrMainData<B, G> ): m is ModalData<B, G> {
  const a: any = m
  return a.modal
}
export const flatMapToModal = <B, G> ( m: ModalOrMainData<B, G> ) => isModalData ( m ) ? [ m ] : [];
export function isMainData<B, G> ( m: ModalOrMainData<B, G> ): m is MainData<B, G> {
  const a: any = m
  return a.main
}
export interface MainData<B, G> {
  main: MainPageD<B, G>;
}

export function isMainPage<B, G> ( p: RefD<G> | PageD<B, G> ): p is MainPageD<B, G> {
  const a: any = p
  return a.pageType === 'MainPage' || a.pageType === 'MainPopup'
}
export function isModalPage<B, G> ( p: PageD<B, G> ): p is ModalPageD<B, G> {
  return p.pageType === 'ModalPage' || p.pageType === 'ModalPopup'
}
export type PageD<Buttons, G> = MainPageD<Buttons, G> | ModalPageD<Buttons, G>


export interface VariableByCodeD {
  constructedBy: 'code';
  imports?: string[];
  purpose?: string;
  code: string;
}
export function allVariableByCode ( vs: VariableD[] ): VariableByCodeD[] {
  return vs.flatMap ( x => x.constructedBy === 'code' ? [ x ] : [] )

}
export interface VariableByPathD {
  constructedBy: 'path';
  purpose?: string;
  path: string
}
export type VariableD = VariableByCodeD | VariableByPathD

export interface PageDisplay<G> {
  target: string,
  dataDD: CompDataD<G>
}
type NewPageCommandOrEmpty = 'empty' | NewPageChangeCommands
export type InitialValue = NewPageCommandOrEmpty | NewPageCommandOrEmpty[]
export interface RefD<G> extends HasName {
  rest: RestDefnInPage<G>,
  refGroups?: string|string[]
  domain: DomainDefnInPage<G>,
  commonParams?: NameAnd<CommonLensRestParam<any>>,
}
export function isRefD<G> ( p: PageD<any, G> | RefD<G> ): p is RefD<G> {
  const a: any = p
  return a.rest ? true : false;
}
export interface MainPageD<Buttons, G> extends HasLayout, HasGuards<G>, RefD<G>, HasName {
  pageType: 'MainPage' | 'MainPopup',
  title?: string;
  name: string,
  modes: PageMode[],
  display: PageDisplay<G>,
  initialValue?: InitialValue
  variables?: NameAnd<VariableD>
  modals?: ModalOrMainData<Buttons, G>[],

  /** The names and order of the visible buttons. If not populated uses definition order */
  buttonOrder?: string[];
  buttons: ButtonDefnInPage<Buttons>;
}

export interface ModalPageD<Buttons, G> extends HasLayout, HasGuards<G>, HasName {
  pageType: 'ModalPage' | 'ModalPopup',
  title?: string;
  name: string,
  modes: PageMode[],
  display: PageDisplay<G>, //importFrom is deprecated
  buttons: ButtonDefnInPage<Buttons>;
}


export function dataDsIn<G> ( pds: (RefD<G> | PageD<any, G>)[], stopAtDisplay?: boolean ): NamesAndDataDs<G> {
  const refs = allRefs ( pds );
  const pageDataDs: CompDataD<G>[] = refs.flatMap ( pd => sortedEntries ( pd.rest )
    .map ( ( [ na, restPD ]: [ string, RestDefnInPageProperties<G> ] ) => restPD.rest.dataDD ) )
  // pageDataDs.forEach ( d => console.log ( 'pageDataD - rest', d.name ) )
  const domainDataDs: CompDataD<G>[] = refs.flatMap ( pd => sortedEntries ( pd.domain ) )
    .flatMap ( ( [ name, domain ] ) => isCompDD ( domain.dataDD ) ? [ domain.dataDD ] : [] )
  // pageDataDs.forEach ( d => console.log ( 'domainDataDs ', d.name ) )
  let result = findAllDataDs ( [ ...pageDataDs, ...domainDataDs ], stopAtDisplay );
  // sortedEntries ( result ).forEach ( ( [ n, d ] ) => console.log ( "result", n, d.name ) )
  return result
}

export function allRestAndActions<G> ( pds: RefD<G>[] ): [ RefD<G>, string, RestDefnInPageProperties<G>, RestActionDetail ][] {
  return unique ( pds.flatMap ( pd => {
    return sortedEntries ( pd.rest ).flatMap ( ( [ name, rdp ] ) => {
      const y: [ RefD<G>, string, RestDefnInPageProperties<G>, RestActionDetail ][] = rdp.rest.actions.map ( a => [ pd, name, rdp, getRestTypeDetails ( a ) ] )
      return y
    } )
  } ), ( [ p, name, r, rad ] ) => safeString ( r.rest.namePrefix ) + name + p.name + "," + r.rest.dataDD.name + "," + rad.name )
}

export function allMainPages<B, G> ( pds: PageD<B, G>[] ): MainPageD<B, G>[] {
  return pds.filter ( isMainPage )
}
export function allRefs<G> ( pds: (RefD<G> | PageD<any, G>)[] ): RefD<G>[] {
  return pds.filter ( isRefD )
}

