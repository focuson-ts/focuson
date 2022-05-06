import { dataDsIn, isMainPage, MainPageD, PageD, RestDefnInPageProperties } from "../common/pageD";
import { indentList } from "../codegen/codegen";
import { NameAnd, safeArray, safeObject, safeString, sortedEntries, toArray } from "@focuson/utils";
import { isModalButtonInPage, ModalButtonInPage } from "../buttons/modalButtons";
import { ButtonD, isButtonWithControl } from "../buttons/allButtons";
import { Guards, GuardWithCondition, isGuardButton } from "../buttons/guardButton";
import { CompDataD, DataD, emptyDataFlatMap, flatMapDD, HasGuards, isComdDD, isRepeatingDd, OneDataDD } from "../common/dataD";
import { isCommonLens, RestD, RestParams, unique } from "../common/restD";
import { printRestAction } from "@focuson/rest";
import { findAllFields, findAllTableAndFieldDatasIn, findSqlRoot, findTableAndFieldFromDataD, TableAndFieldAndAliasData, walkSqlRoots } from "../codegen/makeSqlFromEntities";

export interface FullReport<B, G> {
  reports: Report<B, G>[];
  criticals: string[]
}

function makeFullReportCriticals<B, G> ( ps: MainPageD<B, G>[] ) {
  const allpages = ps.flatMap ( p => [ p.name, ...safeArray ( p.modals ).map ( m => m.modal.name ) ] )
  return findDuplicates ( allpages, p => p ).map ( name => `CRITICAL Multiple pages with name ${name}` )
}
export function makeReportData<B extends ButtonD, G extends GuardWithCondition> ( ps: MainPageD<B, G>[] ): FullReport<B, G> {
  let reports: Report<B, G>[] = ps.map ( makeReportFor );
  return { reports, criticals: makeFullReportCriticals ( ps ) }
}

export function makeCriticalReport<B, G> ( report: FullReport<B, G> ): string[] {
  let criticals = [ ...report.criticals, ...report.reports.flatMap ( ( { page, details } ) => criticalSummary ( page, details ) ) ];
  if ( criticals.length > 0 ) return [ '# Critical Issues', ...criticals, '', '---' ]
  return [];
}

export function makeReportHeader<B, G> ( report: FullReport<B, G> ): string[] {
  const { reports } = report
  const critical = makeCriticalReport ( report )
  const rests = [
    `# All endpoints`,
    `| Page | Rest | Url | Params | Access | Audit`,
    `| --- | --- | ---  |  --- | --- | --- |`,
    ...reports.flatMap ( r => r.details.filter ( d => d.part === 'rests' ).flatMap ( d => d.general.map ( g => `|${r.page.name}${g}` ) ) ) ]
  const paramsAndHeader = makeParamsAndHeader ( reports.map ( r => r.commonParams ) )
  return [ `# All Pages`, ...critical, ...paramsAndHeader, ...rests, '', '---' ];
}

export function makeReport<B extends ButtonD, G extends GuardWithCondition> ( report: FullReport<B, G> ): string[] {
  const { reports } = report
  const main = reports.flatMap ( ( r ) => formatReport ( r ) )
  const header = makeReportHeader ( report )
  return [ ...header, ...main, ]
}

function makeParamsAndHeader ( commonParams: NameAnd<string>[] ) {
  const params = unique ( commonParams.flatMap ( c => sortedEntries ( c ).flatMap ( ( [ name, value ] ) => `|${name}|${value}` ) ), s => s )
  const paramsAndHeader = params.length == 0 ? [] : [ `## Common Params`, `| Name | Location`, '| --- | ---', ...params ]
  return paramsAndHeader;
}
export function formatReport<B, G> ( r: Report<B, G> ): string[] {
  const { commonParams, page, details } = r
  const mainReport = details.flatMap ( d => {
    const name = d.part.padEnd ( 8 );
    if ( d.general.length === 0 ) return []
    // if ( d.general.length === 0 ) return [ `# ${d.part} - None` ]
    const header = d.headers.length > 0 ? [ `|${d.headers.join ( "|" )}`, `|${d.headers.map ( u => ` --- ` ).join ( "|" )}` ] : []
    return [ `## ${name}`, ...header, ...d.dontIndent ? d.general : indentList ( d.general ) ];
  } )
  const name = `# ${page.name} - ${page.pageType}`;
  const errors: string[] = details.flatMap ( d => d.critical )
  const errorMarker: string[] = errors.length > 0 ? [ '' ] : []
  const paramsAndHeader = makeParamsAndHeader ( [ commonParams ] );
  return [ name, ...errors, ...errorMarker, ...paramsAndHeader, ...indentList ( mainReport ), '', '---' ];
}


export interface ReportInfo {
  generatedDomainNames: string[]
}

export interface ReportDetails {
  part: string;
  headers: string[];
  general: string[];
  critical: string[];
  dontIndent?: boolean
}


function criticalSummary<B, G> ( p: PageD<B, G>, ds: ReportDetails[] ): string[] {
  let criticals = ds.flatMap ( d => d.critical );
  if ( criticals.length > 0 ) return [ `## Critical Issues in ${p.name}`, ...criticals.map ( c => `* ${c}` ) ]
  return []
}

function makeReportInfo<B, G> ( p: PageD<B, G> ): ReportInfo {
  return {
    generatedDomainNames: sortedEntries ( dataDsIn ( [ p ], false ) ).map ( ( [ name, d ] ) => d.name )
  }
}
export interface Report<B, G> {
  page: PageD<B, G>;
  details: ReportDetails[ ];
  commonParams: NameAnd<string>;
}

function justCommonParams ( ps: RestParams[] ): NameAnd<string> {
  return Object.fromEntries ( ps.flatMap ( p => sortedEntries ( p ).flatMap ( ( [ name, p ] ) => isCommonLens ( p ) ? [ [ name, p.commonLens ] ] : [] ) ) )

}

export function makeReportFor<B extends ButtonD, G extends GuardWithCondition> ( page: MainPageD<B, G> ): Report<B, G> {
  const info = makeReportInfo ( page )
  const details: ReportDetails[] = isMainPage ( page ) ?
    [ makeDomainReport ( page, info ),
      makeRestReport ( page, info ),
      makeModalsReport ( page, info ),
      makeDisplayReport ( page, info ),
      makeButtonsReport ( page, info ),
      makeGuardsReportForPage ( page ),
      makeDataMappingReportForPage ( page ) ] :
    [ makeDisplayReport ( page, info ),
      makeButtonsReport ( page, info ),
      makeGuardsReportForPage ( page ) ]
  const commonParams = isMainPage ( page ) ? justCommonParams ( sortedEntries ( page.rest ).map ( ( [ name, rdp ] ) => rdp.rest.params ) ) : {}
  return { page, details, commonParams }
}

const notCreated = ( { generatedDomainNames }: ReportInfo, name ): string[] => generatedDomainNames.indexOf ( name ) < 0 ?
  [ `CRITICAL - ${name} will not be generated. Generated is ${generatedDomainNames.join ( "," )}` ] :
  [];
const dontSupportVariables = <S> ( info: ReportInfo, name: string, rdp: RestDefnInPageProperties<S> ): string[] => rdp.targetFromPath.indexOf ( '#' ) >= 0 ?
  [ `CRITICAL - Currently do not support variable names in 'rest' ${name} 'targetFromPath'. ${rdp.targetFromPath} ` ] :
  [];

function accessDetails<B, G> ( page: MainPageD<B, G>, rest: RestD<G> ): string {
  return safeArray ( rest.access ).flatMap ( a => toArray ( a.condition ).map ( c => `${c.param} ${c.type} ${c.values}` ) ).join ( "; " )
}
function auditDetails<B, G> ( page: MainPageD<B, G>, rest: RestD<G> ): string {
  return safeArray ( rest.audit ).flatMap ( a => `${printRestAction ( a.restAction )}->${toArray ( a.storedProcedure ).map ( s => s.name )}` ).join ( '; ' )
}

export function makeRestReport<B, G> ( page: MainPageD<B, G>, info: ReportInfo ): ReportDetails {
  const general: string[] = sortedEntries ( page.rest ).flatMap ( ( [ name, rdp ] ) =>
    [ `|${name} | ${rdp.rest.url}| ${sortedEntries ( rdp.rest.params ).map ( ( [ name, p ] ) => name )} | ${accessDetails ( page, rdp.rest )} | ${auditDetails ( page, rdp.rest )}`,
      ...sortedEntries ( rdp.rest.states ).map ( ( [ stateName, details ] ) =>
        `| | ${details.url}| ${sortedEntries ( rdp.rest.params ).map ( ( [ name, p ] ) => name )} |` )
    ] )
  const critical: string[] = sortedEntries ( page.rest ).flatMap ( ( [ name, rdp ] ) => [
    ...notCreated ( info, rdp.rest.dataDD.name ),
    ...dontSupportVariables ( info, name, rdp ) ] )
  return { part: 'rests', headers: [ 'name', 'url', 'params', 'access', 'audit' ], general, critical }

}

function findDuplicates<T> ( ts: T[], fn: ( t: T ) => string ): T[] {
  const existingNames = new Set<String> ()
  let dups = [ ...ts ].filter ( t => {
    if ( existingNames.has ( fn ( t ) ) ) return true;
    existingNames.add ( fn ( t ) )
  } );
  return dups
}
export function makeDomainReport<B, G> ( page: MainPageD<B, G>, { generatedDomainNames }: ReportInfo ): ReportDetails {
  const rootObjects: Set<CompDataD<G>> = new Set ()
  sortedEntries ( page.domain ).forEach ( ( [ name, obj ] ) => {if ( isComdDD ( obj.dataDD ) ) rootObjects.add ( obj.dataDD ) } )
  rootObjects.add ( page.display.dataDD )
  sortedEntries ( page.rest ).forEach ( ( [ name, obj ] ) => rootObjects.add ( obj.rest.dataDD ) );
  const objects: Set<CompDataD<G>> = new Set ()
  rootObjects.forEach ( obj => flatMapDD<CompDataD<G>, G> ( obj, {
    ...emptyDataFlatMap (),
    walkDataStart: ( path, parents, oneDataDD, dataDD ) => [ dataDD ],
    walkRepStart: ( path, parents, oneDataDD, dataDD ) => [ dataDD ]
  } ).forEach ( d => objects.add ( d ) ) )
  const existingNames = new Set<String> ()
  let dups = findDuplicates ( [ ...objects ], o => o.name );
  const duplicates = dups.map ( d => `CRITICAL duplicate name in dataD ${d.name}` )

  return { part: 'domains', headers: [], general: generatedDomainNames, critical: duplicates };
}
export function makeModalsReport<B, G> ( page: MainPageD<B, G>, info: ReportInfo ): ReportDetails {
  const general = safeArray ( page.modals ).flatMap ( m => [
    `| ${m.modal.name} |${m.modal.display.dataDD.name}`
  ] )
  const critical = safeArray ( page.modals ).flatMap ( m => notCreated ( info, m.modal.display.dataDD.name ) )
  return { part: 'modals', headers: [ 'name', 'displayed with' ], general, critical };
}
export function makeDisplayReport<B, G> ( page: PageD<B, G>, info: ReportInfo ): ReportDetails {
  const display = page.display.dataDD.display;
  const unusualDisplay = display ? ` displayed using ${display.name}` : ''
  return { part: 'display', headers: [], general: [ `${page.display.dataDD.name}${unusualDisplay}` ], critical: [] };

}
export function makeButtonsReport<B extends ButtonD, G extends GuardWithCondition> ( page: PageD<B, G>, info: ReportInfo ): ReportDetails {
  const general = sortedEntries ( page.buttons ).flatMap ( ( [ name, button ] ) => {
    const actualButton = isGuardButton ( button ) ? button.guard : button
    const guardedString = isGuardButton ( button ) ? ` guarded by [${button.by.condition}]` : ``
    if ( isModalButtonInPage ( actualButton ) ) return modalButtonData ( actualButton, guardedString )
    let raw = `${name.padEnd ( 12 )} ${actualButton.control}${guardedString}`;
    if ( actualButton.control === 'ToggleButton' ) return [ `${raw} toggles ${actualButton.value}` ]
    if ( isButtonWithControl ( actualButton ) ) return [ raw ]
    return [ `Unknown button Page ${page.name} Button ${name} ${JSON.stringify ( button )} ` ]
  } )
  return { part: 'buttons', headers: [], general, critical: [] };
}
function modalButtonData<G> ( button: ModalButtonInPage<G>, guardedBy: string ): string[] {
  const restOnCommit = button.restOnCommit ? [ `RestOnCommit: ${button.restOnCommit.restName}/${button.restOnCommit.action}` ] : []
  const copyOnClose = button.copyOnClose ? [ `Copy on close ${JSON.stringify ( button.copyOnClose )} ` ] : []
  const from = button.copy ? [ `Copy from ${JSON.stringify ( button.copy )}` ] : []
  const empty = button.createEmpty ? [ `Initialised as empty` ] : []
  return [ `Modal Button ==> ${button.modal.name} in mode ${button.mode}${guardedBy}`, ...indentList ( [
    ...from, `Focused on ${JSON.stringify ( button.focusOn )}`, ...restOnCommit, ...copyOnClose ] ) ]
}

function makeTitle<G> ( title: string, g: HasGuards<G> ): string[] {
  if ( g.guards === undefined ) return []
  const names = [ title, ...Object.keys ( g.guards ) ]
  return [ `| ${names.join ( "|" )}`, `|${names.map ( n => ' --- ' ).join ( '|' )}` ]

}
const makeGuardReportFor = ( titles: string[] ) => <G> ( [ name, oneDataD ]: [ string, OneDataDD<G> ] ): string[] => {
  if ( oneDataD.guard === undefined ) return []
  return [ [ name, ...titles.map ( t => oneDataD.guard[ t ] ? safeArray ( oneDataD.guard[ t ] ).join ( "," ) : ' ' ) ].join ( '|' ) ]
};
function makeGuardReportForDataD<G> ( d: CompDataD<G> ): string[] {
  if ( isRepeatingDd ( d ) ) return []
  if ( d.guards === undefined ) return []
  const names = Object.keys ( d.guards )
  return [ ...makeTitle ( d.name, d ), ...Object.entries ( d.structure ).flatMap ( makeGuardReportFor ( names ) ), '' ]
}
function makeGuardButtonReportForPage<B, G extends GuardWithCondition> ( p: PageD<B, G> ): string[] {
  const lines: string[] = sortedEntries ( p.buttons ).flatMap ( ( [ name, button ] ) => {
    if ( isGuardButton ( button ) ) return [ `| ${name} | ${JSON.stringify ( button.by )}}` ]
    return []
  } )
  if ( lines.length === 0 ) return []
  return [ `| ${p.name} button | condition`, `| --- | --- |`, ...lines ]
}


export function makeGuardsReportForPage<B, G extends GuardWithCondition> ( p: MainPageD<B, G> ): ReportDetails {
  let pages: PageD<B, G>[] = [ p, ...safeArray ( p.modals ).map ( m => m.modal ) ];
  const fromDataDs = sortedEntries ( dataDsIn ( pages ) ).flatMap ( ( [ name, d ] ) => makeGuardReportForDataD ( d ) )
  const fromButtons: string[] = pages.flatMap ( makeGuardButtonReportForPage )
  return {
    part: 'guards',
    headers: [],
    general: [ ...fromDataDs, ...fromButtons ],
    critical: [],
    dontIndent: true
  }
}


export function makeDataMappingReportForPage<B, G> ( p: MainPageD<B, G> ): ReportDetails {
  const data: string[] = findAllTableAndFieldDatasIn ( Object.values ( p.rest ) ).flatMap ( taf => {
    return [ `## Table ${taf.table.name} (Schema ${taf.table.schema.name})`, '|Display path | Database Field', '| --- | --- |', ...taf.fieldData.flatMap ( fd =>
      fd.fieldName === undefined ? [] : [ `| ${fd.path}  |  ${fd.dbFieldName} ` ] ), '' ]
  } )
  return {
    part: 'dataMapping',
    headers: [],
    general: data,
    critical: [],
    dontIndent: true
  }

}