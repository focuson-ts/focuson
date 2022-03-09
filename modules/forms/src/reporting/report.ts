import { dataDsIn, isMainPage, MainPageD, PageD } from "../common/pageD";
import { indentList } from "../codegen/codegen";
import { safeArray, sortedEntries } from "@focuson/utils";
import { isModalButtonInPage, ModalButtonInPage } from "../buttons/modalButtons";
import { ButtonD, ButtonWithControl, isButtonWithControl } from "../buttons/allButtons";
import { GuardWithCondition, isGuardButton } from "../buttons/guardButton";

export function makeReport<B extends ButtonD, G extends GuardWithCondition> ( ps: PageD<B, G>[] ): string[] {
  const reports: Report<B, G>[] = ps.map ( makeReportFor )
  const main = reports.flatMap ( ( { page, details } ) => format ( page, details ) )
  const critical = reports.flatMap ( ( { page, details } ) => criticalSummary ( page, details ) )
  return [ ...main, ...critical ]
}
function format<B, G> ( p: PageD<B, G>, ds: ReportDetails[] ): string[] {
  const mainReport = ds.flatMap ( d => {
    const name = d.part.padEnd ( 8 );
    if ( d.general.length === 0 ) return [ `${d.part} - None` ]
    if ( d.general.length === 1 ) return [ `${name} - ${d.general[ 0 ]}` ]
    return [ name, ...indentList ( d.general ) ];
  } )
  const name = `${p.name} - ${p.pageType}`;
  return [ name, '='.repeat ( name.length ), ...indentList ( mainReport ), '' ];
}


export interface ReportInfo {
  generatedDomainNames: string[]
}

export interface ReportDetails {
  part: string;
  general: string[];
  critical: string[];
}


function criticalSummary<B, G> ( p: PageD<B, G>, ds: ReportDetails[] ): string[] {
  return ds.flatMap ( d => d.critical.length > 0 ? [ `CRITICAL issues in ${p.name}`, ...indentList ( d.critical ) ] : [] )
}

function makeReportInfo<B, G> ( p: PageD<B, G> ): ReportInfo {
  return {
    generatedDomainNames: sortedEntries ( dataDsIn ( [ p ], false ) ).map ( ( [ name, d ] ) => d.name )
  }
}
export interface Report<B, G> {
  page: PageD<B, G>;
  details: ReportDetails[ ]
}

export function makeReportFor<B extends ButtonD, G extends GuardWithCondition> ( page: PageD<B, G> ): Report<B, G> {
  const info = makeReportInfo ( page )
  const details: ReportDetails[] = isMainPage ( page ) ?
    [ makeDomainReport ( page, info ), makeRestReport ( page, info ), makeModalsReport ( page, info ), makeDisplayReport ( page, info ), makeButtonsReport ( page, info ) ] :
    [ makeDisplayReport ( page, info ), makeButtonsReport ( page, info ) ]
  return { page, details }
}

const notCreated = ( { generatedDomainNames }: ReportInfo, name ): string[] => generatedDomainNames.indexOf ( name ) < 0 ?
  [ `CRITICAL - ${name} will not be generated. Generated is ${generatedDomainNames.join ( "," )}` ] :
  [];
export function makeRestReport<B, G> ( page: MainPageD<B, G>, info: ReportInfo ): ReportDetails {
  const general: string[] = sortedEntries ( page.rest ).flatMap ( ( [ name, rdp ] ) => [
    `${name} at ${rdp.rest.url}. Params: ${sortedEntries ( rdp.rest.params ).map ( ( [ name, p ] ) => name )}`,
    ...notCreated ( info, rdp.rest.dataDD.name ) ] )
  const critical: string[] = sortedEntries ( page.rest ).flatMap ( ( [ name, rdp ] ) => notCreated ( info, rdp.rest.dataDD.name ) )
  return { part: 'rests', general, critical }

}
export function makeDomainReport<B, G> ( page: MainPageD<B, G>, { generatedDomainNames }: ReportInfo ): ReportDetails {
  return { part: 'domains', general: generatedDomainNames, critical: [] };
}
export function makeModalsReport<B, G> ( page: MainPageD<B, G>, info: ReportInfo ): ReportDetails {
  const general = safeArray ( page.modals ).flatMap ( m => [
    `${m.modal.name} on path  ${JSON.stringify ( m.path )}. Displayed with ${m.modal.display.dataDD.name}`,
    ...notCreated ( info, m.modal.display.dataDD.name )
  ] )
  const critical = safeArray ( page.modals ).flatMap ( m => notCreated ( info, m.modal.display.dataDD.name ) )
  return { part: 'modals', general, critical };
}
export function makeDisplayReport<B, G> ( page: PageD<B, G>, info: ReportInfo ): ReportDetails {
  const display = page.display.dataDD.display;
  const unusualDisplay = display ? ` displayed using ${display.name}` : ''
  return { part: 'display', general: [ `${page.display.dataDD.name}${unusualDisplay}` ], critical: [] };

}
export function makeButtonsReport<B extends ButtonD, G extends GuardWithCondition> ( page: PageD<B, G>, info: ReportInfo ): ReportDetails {
  const general = sortedEntries ( page.buttons ).flatMap ( ( [ name, button ] ) => {
    const actualButton = isGuardButton ( button ) ? button.guard : button
    const guardedString = isGuardButton ( button ) ? ` guarded by [${button.by.condition}]` : ``
    if ( isModalButtonInPage ( actualButton ) ) return modalButtonData ( actualButton, guardedString )
    if (isButtonWithControl(actualButton))return [ `${name.padEnd ( 12 )} ${actualButton.control}${guardedString}` ]
    return [`Unknown button Page ${page.name} Button ${name} ${JSON.stringify(button)} `]
  } )
  return { part: 'buttons', general, critical: [] };
}
function modalButtonData<G> ( button: ModalButtonInPage<G>, guardedBy: string ): string[] {
  const restOnCommit = button.restOnCommit ? [ `RestOnCommit: ${button.restOnCommit.rest.url}/${button.restOnCommit.action} to ${JSON.stringify ( button.restOnCommit.target )}` ] : []
  const copyOnClose = button.copyOnClose ? [ `Copy on close ${JSON.stringify ( button.copyOnClose )} ` ] : []
  const from = button.copyFrom ? [ `Copy from ${JSON.stringify ( button.copyFrom )}` ] : []
  const empty = button.createEmpty ? [ `Initialised as empty` ] : []
  return [ `Modal Button ==> ${button.modal.name} in mode ${button.mode}${guardedBy}`, ...indentList ( [
    ...from, `Focused on ${JSON.stringify ( button.focusOn )}`, ...restOnCommit, ...copyOnClose ] ) ]
}