import { isModalPage, PageD } from "../common/pageD";
import { indentList } from "../codegen/codegen";
import { sortedEntries } from "@focuson/utils";
import { findAllDataDs } from "../common/dataD";

export function makeReport<B> ( ps: PageD<B>[] ): string[] {
  return ps.flatMap ( makeReportFor )
}

export interface ReportInfo {
  generatedDomainNames: string[]

}

function makeReportInfo<B> ( p: PageD<B> ): ReportInfo {
  return {
    generatedDomainNames: sortedEntries ( findAllDataDs ( [ p.display.dataDD ], false ) ).map ( ( [ name, d ] ) => d.name )
  }
}
export function makeReportFor<B> ( p: PageD<B> ): string[] {
  const info = makeReportInfo ( p )
  return [
    ...makeReportHeader ( p, info ),
    ...indentList ( [
      ...makeDomainReport ( p, info ),
      ...makeRestReport ( p, info ),
      ...makeModalsReport ( p, info ),
      ...makeDisplayReport ( p, info ),
      ...makeButtonsReport ( p, info ) ] ) ]
}
export function makeReportHeader<B> ( p: PageD<B>, { generatedDomainNames }: ReportInfo ) {
  return [ p.name, '='.repeat ( p.name.length ) ];
}

export function makeRestReport<B> ( p: PageD<B>, { generatedDomainNames }: ReportInfo ): string[] {
  if ( isModalPage ( p ) ) return []
  function notCreated ( name: string ): string[] {
    return generatedDomainNames.indexOf ( name ) < 0 ? [ `CRITICAL - ${name} will not be generated. Generated is ${generatedDomainNames.join ( "," )}` ] : []
  }
  const notIssued: string[] = sortedEntries ( p.rest ).flatMap ( ( [ name, rdp ] ) => {
    const title = `${name} is rest for ${rdp.rest.dataDD.name}`;
    return [ title, '-'.repeat ( title.length ), ...indentList ( [
      `URL:    ${rdp.rest.url}`,
      `Params: ${sortedEntries ( rdp.rest.params ).map ( ( [ name, p ] ) => name )}`,
      ...notCreated ( rdp.rest.dataDD.name ) ] ) ];
  } )
  return [ `Rest`, '----', ...notIssued ];

}
export function makeDomainReport<B> ( p: PageD<B>, { generatedDomainNames }: ReportInfo ): string[] {
  if ( isModalPage ( p ) ) return []

  return [ `Domain`, '----', ...indentList ( generatedDomainNames ) ];

}
export function makeModalsReport<B> ( p: PageD<B>, { generatedDomainNames }: ReportInfo ): string[] {
  return [];

}
export function makeDisplayReport<B> ( p: PageD<B>, { generatedDomainNames }: ReportInfo ): string[] {
  return [];

}
export function makeButtonsReport<B> ( p: PageD<B>, { generatedDomainNames }: ReportInfo ): string[] {
  return [];

}