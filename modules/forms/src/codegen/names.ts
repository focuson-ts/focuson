import { AllDataDD, CompDataD, compDataDIn } from "../common/dataD";
import { MainPageD, ModalPageD, PageD, RestDefnInPageProperties } from "../common/pageD";
import { RestActionDetail, RestD } from "../common/restD";
import { rawTypeName } from "./makeGraphQlTypes";
import { RestAction, safeString } from "@focuson/utils";
import { JavaWiringParams, TSParams } from "./config";
import { SingleLinkData, SqlLinkData, TableAndFieldAndAliasData } from "./makeSqlFromEntities";

export const guardName = ( s: string ) => s + "Guard"
export const domainName = <G> ( d: CompDataD<G> ): string => d.name + "Domain";
export const componentName = <G> ( d: CompDataD<G> ): string => d.display ? d.display.name : d.name;
export const pageInState = <B, G> ( p: PageD<B, G> ): string => p.name
export const pageComponentName = <B, G> ( d: PageD<B, G> ): string => d.name + "Page";
// export const pageComponent = ( p: PageD ): string => p.name;
export const hasDomainForPage = <B, G> ( pd: PageD<B, G> ): string => "Has" + pageDomainName ( pd );
export const pageDomainName = <B, G> ( pd: PageD<B, G> ): string => pd.name + "PageDomain"
export function resolverName<G> ( dataD: AllDataDD<G>, action: RestActionDetail ) {
  let rawType = rawTypeName ( dataD );
  return `${action.graphQPrefix}${rawType}${action.graphQlPostfix}`
}
export const sampleName = <G> ( dataD: AllDataDD<G> ) => "sample" + dataD.name;
export const emptyName = <G> ( dataD: AllDataDD<G> ) => "empty" + dataD.name;

export const restControllerName = <G> ( restD: RestD<G> ) => (restD.namePrefix ? `${restD.namePrefix}_` : '') + `${restD.dataDD.name}Controller`
export const javaSqlCreateTableSqlName = <G> ( restD: RestD<G> ) => `${restD.dataDD.name}.createTableSql.sql`
export const javaSqlReadSqlName = <G> ( restD: RestD<G> ) => `${restD.dataDD.name}.readTableSql.sql`

export const queryName = <G> ( restD: RestD<G>, action: RestAction ): string => { return action + compDataDIn ( restD.dataDD ).name; }
export const createTableName = <G> ( restD: RestD<G> ): string => { return "createTable" + compDataDIn ( restD.dataDD ).name; }
export const createTableSqlName = (): string => { return "schema"}
export const getSqlName = (): string => { return "get"}
export const endPointName = <G> ( restD: RestD<G>, action: RestAction ): string => action + restD.dataDD.name

export const modalName = <B, G> ( p: PageD<B, G>, modal: PageD<B, G> ) => modal.name
export const restNameWithPrefix = <G> ( r: RestD<G> ) => r.namePrefix ? r.namePrefix + "_" + r.dataDD.name : r.dataDD.name
export const restDetailsName = <B, G> ( p: PageD<B, G>, restName: string, r: RestD<G> ) => p.name + "_" + restNameWithPrefix ( r ) + "RestDetails"
export const fetcherName = <G> ( d: RestDefnInPageProperties<G> ): string => restNameWithPrefix ( d.rest ) + "Fetcher";
export const fetcherInterfaceName = <G> ( params: JavaWiringParams, r: RestD<G> ): string => `${restNameWithPrefix ( r )}${params.fetcherInterface}`;
export const fetcherVariableName = <G> ( params: JavaWiringParams, r: RestD<G> ): string => `_${restNameWithPrefix ( r )}${params.fetcherInterface}`;
export const mockFetcherClassName = <G> ( params: JavaWiringParams, r: RestD<G> ): string => `${restNameWithPrefix ( r )}${params.fetcherInterface}Mock`;
export const h2FetcherClassName = <G> ( params: JavaWiringParams, r: RestD<G> ): string => `${restNameWithPrefix ( r )}${params.fetcherInterface}H2`;

export const queryClassName = <G> ( params: JavaWiringParams, r: RestD<G> ): string => `${r.dataDD.name}Queries`;

export const javaDbFileName = <B, G> ( params: JavaWiringParams, p: PageD<B, G> ): string => `${p.name}Db`;
export const sqlDataSuffixFor = ( suffix: string, i: number ): string => suffix + "_" + i

export function sqlMapName<B, G> ( p: PageD<B, G>, restName: string, path: number[] ) {return `${p.name}_${restName}Maps${path.join ( "_" )}`}
export function sqlListName<B, G> ( p: PageD<B, G>, restName: string, path: number[], i: number ) {return sqlMapName ( p, restName, [ ...path, i ] )}
export function sqlMapFileName<B, G> ( root: string, p: PageD<B, G>, restName: string, path: number[] ) {return `${root}/${sqlMapName ( p, restName, path )}`}
export function sqlTafFieldName<G> ( taf: TableAndFieldAndAliasData<G> ) {return `${taf.alias}_${taf.fieldData.dbFieldName}`}

export const optionalsName = <B, G> ( p: PageD<B, G> ) => `${p.name}Optionals`


export const someFileName = <B, G> ( root: string, pd: PageD<B, G>, postfix: string ): string => `${root}/${pd.name}/${pd.name}.${postfix}`;
export const someFileNameFromMainPage = <B, G> ( root: string, mainPage: PageD<B, G>, pd: PageD<B, G>, postfix: string ): string => `${root}/${mainPage.name}/${pd.name}.${postfix}`;
export const modalImportFromFileName = <B, G> ( root: string,mainP: MainPageD<B,G>,  p: ModalPageD<B, G>, suffix: string ): string => `${root}/${mainP.name}/${mainP.name}.${suffix}`


export const storybookFileName = <B, G> ( root: string, params: TSParams, pd: PageD<B, G> ): string => someFileName ( root, pd, `stories` );
export const renderFileName = <B, G> ( root: string, params: TSParams, mainPage: MainPageD<B, G>, pd: PageD<B, G> ): string => someFileNameFromMainPage ( root, mainPage, pd, params.renderFile );
export const domainsFileName = <B, G> ( root: string, params: TSParams, pd: PageD<B, G> ): string => someFileName ( root, pd, params.domainsFile );
export const emptyFileName = <B, G> ( root: string, params: TSParams, pd: PageD<B, G> ): string => someFileName ( root, pd, params.emptyFile );
export const pactFileName = <B, G> ( root: string, params: TSParams, pd: PageD<B, G> ): string => someFileName ( root, pd, params.pactsFile );
export const samplesFileName = <B, G> ( root: string, params: TSParams, pd: PageD<B, G> ): string => someFileName ( root, pd, params.samplesFile );
export const restFileName = <B, G> ( root: string, params: TSParams, pd: PageD<B, G> ): string => someFileName ( root, pd, params.restsFile );
export const fetcherFileName = <B, G> ( root: string, params: TSParams, pd: PageD<B, G> ): string => someFileName ( root, pd, params.fetchersFile );
export const optionalsFileName = <B, G> ( root: string, params: TSParams, pd: PageD<B, G> ): string => someFileName ( root, pd, params.optionalsFile );
