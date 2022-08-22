import { AllDataDD, CompDataD, compDataDIn } from "../common/dataD";
import { ModalPageD, PageD, RefD, RestDefnInPageProperties } from "../common/pageD";
import { RestD } from "../common/restD";
import { rawTypeName } from "./makeGraphQlTypes";
import { HasName, isRestStateChange, RestAction, safeString } from "@focuson/utils";
import { JavaWiringParams, TSParams } from "./config";
import { TableAndFieldAndAliasData } from "./makeSqlFromEntities";
import { restActionForName, restActionToDetails } from "@focuson/rest";
import { isMessageMutation, MutationDetail } from "../common/resolverD";

export const guardName = ( s: string ) => s + "Guard"
export const domainName = <G> ( d: CompDataD<G> ): string => d.name + "Domain";
export const componentName = <G> ( d: CompDataD<G> ): string => d.display ? d.display.name : d.name;
export const pageInState = <B, G> ( p: PageD<B, G> ): string => p.name
export const pageComponentName = <B, G> ( d: PageD<B, G> ): string => d.name + "Page";
// export const pageComponent = ( p: PageD ): string => p.name;
export const hasDomainForPage = <G> ( pd: RefD<G> ): string => "Has" + pageDomainName ( pd );
export const pageDomainName = ( pd: HasName ): string => pd.name + "PageDomain"
export function resolverName<G> ( rest: RestD<G>, action: RestAction ) {
  let rawType = rawTypeName ( rest.dataDD );
  const ad = restActionToDetails ( action )
  const prefix = rest.namePrefix ? rest.namePrefix : ''
  const postfix = isRestStateChange ( action ) ? action.state : ''
  return `${ad.graphQPrefix}${postfix}${prefix}${rawType}${ad.graphQlPostfix}`
}
export const sampleName = <G> ( dataD: AllDataDD<G> ) => "sample" + dataD.name;
export const emptyName = <G> ( dataD: AllDataDD<G> ) => "empty" + dataD.name;

export const restControllerName = <B, G> ( p: RefD<G>, restD: RestD<G> ) => p.name + "_" + (restD.namePrefix ? `${restD.namePrefix}_` : '') + `${restD.dataDD.name}Controller`
export const javaSqlCreateTableSqlName = <G> ( restD: RestD<G> ) => `${restD.dataDD.name}.createTableSql.sql`
export const javaSqlReadSqlName = <G> ( restD: RestD<G> ) => `${restD.dataDD.name}.readTableSql.sql`

export const queryName = <G> ( restD: RestD<G>, action: RestAction ): string => { return restActionForName ( action ) + safeString ( restD.namePrefix ) + compDataDIn ( restD.dataDD ).name; } //safeString ( restD.namePrefix ) +
export const createTableName = <G> ( restD: RestD<G> ): string => { return "createTable" + compDataDIn ( restD.dataDD ).name; }
export const createTableSqlName = (): string => { return "schema"}
export const getSqlName = (): string => { return "get"}
export const endPointName = <G> ( restD: RestD<G>, action: RestAction ): string => restActionForName ( action ) + restD.dataDD.name

export const modalName = <B, G> ( p: PageD<B, G>, modal: PageD<B, G> ) => modal.name
export const restNameWithPrefix = <G> ( r: RestD<G> ) => r.namePrefix ? r.namePrefix + "_" + r.dataDD.name : r.dataDD.name
export const restDetailsName = <G> ( p: RefD<G>, restName: string, r: RestD<G> ) => p.name + "_" + restNameWithPrefix ( r ) + "RestDetails"

export const packageNameFor = <B, G> ( params: JavaWiringParams, p: HasName, thing: string ): string => `${params.thePackage}.${thing}.${p.name}`;
export const fetcherPackageName = <G> ( params: JavaWiringParams, p: HasName ): string => packageNameFor ( params, p, params.fetcherPackage );
export const fetcherInterfaceName = <G> ( params: JavaWiringParams, r: RestD<G>, a: RestAction ): string => fetcherInterfaceForResolverName ( params, r, resolverName ( r, a ) )
export const fetcherInterfaceForResolverName = <G> ( params: JavaWiringParams, r: RestD<G>, resolverName: string ): string => `${restNameWithPrefix ( r )}_${resolverName}_${params.fetcherInterface}`;

export const dbFetcherPackage = <B, G> ( params: JavaWiringParams, p: HasName ): string => packageNameFor ( params, p, params.dbFetcherPackage );
export const dbFetcherClassName = <G> ( params: JavaWiringParams, r: RestD<G>, action: RestAction ): string => `${restNameWithPrefix ( r )}_${restActionForName ( action )}_${params.fetcherInterface}DB`;

export const mockFetcherPackage = <B, G> ( params: JavaWiringParams, p: HasName ): string => packageNameFor ( params, p, params.mockFetcherPackage );
export const mockFetcherClassName = <G> ( params: JavaWiringParams, r: RestD<G>, a: RestAction ): string => `${restNameWithPrefix ( r )}_${restActionForName ( a )}_${params.fetcherInterface}Mock`;
export const mockFetcherClassNameForResolver = <G> ( params: JavaWiringParams, r: RestD<G>, resolver: string ): string => {
  if ( typeof resolver !== 'string' ) throw Error ( `Resolver must be string. Actually is ${JSON.stringify ( resolver )}` )
  return `${restNameWithPrefix ( r )}_${resolver}_${params.fetcherInterface}MockR`;
};

export const queryPackage = <B, G> ( params: JavaWiringParams, p: RefD<G> ): string => packageNameFor ( params, p, params.queriesPackage );
export const providerName = <B, G> ( p: HasName ) => p.name + "Provider"

export const fetcherName = <G> ( d: RestDefnInPageProperties<G> ): string => restNameWithPrefix ( d.rest ) + "Fetcher";
export const fetcherVariableName = <G> ( params: JavaWiringParams, r: RestD<G>, a: RestAction ): string => `${restNameWithPrefix ( r )}_${restActionForName ( a )}_${params.fetcherInterface}`;
export const fetcherVariableNameForResolver = <G> ( params: JavaWiringParams, r: RestD<G>, resolverName: string ): string => `${restNameWithPrefix ( r )}_${resolverName}_${params.fetcherInterface}`;
export const providerPactClassName = <B, G> ( pd: RefD<G> ): string => providerName ( pd ) + "Test";

export const mutationClassName = <B, G> ( r: RestD<G>, restAction: RestAction ) => `${restNameWithPrefix ( r )}_${restActionForName ( restAction )}Mutation`;
export const mutationVariableName = <B, G> ( r: RestD<G>, restAction: RestAction ) => `__${restActionForName ( restAction )}Mutation`;
export const resolverClassName = <B, G> ( r: RestD<G>, resolverName: string ) => `${restNameWithPrefix ( r )}_${resolverName}Resolver`;
export const mutationDetailsName = ( md: MutationDetail, index: string ): string | undefined => isMessageMutation ( md ) ? `message${index}` : md.name;
export const mutationMethodName = <B, G> ( r: RestD<G>, res: string, m: MutationDetail, index: string ) => {
  const name = mutationDetailsName ( m, index )
  return name !== undefined ? name + index : `${restNameWithPrefix ( r )}_${res}_${name}${index}`;
};

export const queryClassName = <G> ( params: JavaWiringParams, r: RestD<G> ): string => `${safeString ( r.namePrefix )}${r.dataDD.name}Queries`;

export const javaDbFileName = <B, G> ( params: JavaWiringParams, p: PageD<B, G> ): string => `${p.name}Db`;
export const sqlDataSuffixFor = ( suffix: string, i: number ): string => suffix + "_" + i

export function sqlMapName<B, G> ( p: RefD<G>, restOrResolverName: string, path: number[] ) {return `${p.name}_${restOrResolverName}Maps${path.join ( "_" )}`}
export function sqlListName<B, G> ( p: RefD<G>, restOrResolverName: string, path: number[], i: number ) {return sqlMapName ( p, restOrResolverName, [ ...path, i ] )}
export function sqlMapFileName<B, G> ( root: string, p: RefD<G>, restName: string, path: number[] ) {return `${root}/${p.name}/${sqlMapName ( p, restName, path )}`}
export function sqlTafFieldName<G> ( taf: TableAndFieldAndAliasData<G> ) {return taf.fieldData.dbFieldAlias ? taf.fieldData.dbFieldAlias : `${taf.alias}_${taf.fieldData.dbFieldName}`}
export function sqlMapPackageName<G> ( params: JavaWiringParams, p: RefD<G> ) {return `${params.thePackage}.${params.dbPackage}.${p.name}`}
export const optionalsName = ( p: HasName ) => `${p.name}Optionals`

export const someFileName = ( root: string, pd: HasName, postfix: string ): string => `${root}/${pd.name}/${pd.name}.${postfix}`;
export const someFileNameFromMainPage = <G> ( root: string, mainPage: RefD<G>, pd: HasName, postfix: string ): string => `${root}/${mainPage.name}/${pd.name}.${postfix}`;
export const modalImportFromFileName = <B, G> ( root: string, mainP: RefD<G>, p: ModalPageD<B, G>, suffix: string ): string => `${root}/${mainP.name}/${mainP.name}.${suffix}`


export const storybookFileName = <G> ( root: string, params: TSParams, pd: RefD<G> ): string => someFileName ( root, pd, `stories` );
export const renderFileName = <B, G> ( root: string, params: TSParams, mainPage: RefD<G>, pd: PageD<B, G> ): string => someFileNameFromMainPage ( root, mainPage, pd, params.renderFile );
export const guardReportFileName = <G> ( root: string, params: TSParams, mainPage: RefD<G> ): string => someFileName ( root, mainPage, params.guardReportFile );
export const domainsFileName = ( root: string, params: TSParams, pd: HasName ): string => someFileName ( root, pd, params.domainsFile );
export const emptyFileName = <G> ( root: string, params: TSParams, pd: RefD<G> ): string => someFileName ( root, pd, params.emptyFile );
export const pactFileName = <G> ( root: string, params: TSParams, pd: RefD<G> ): string => someFileName ( root, pd, params.pactsFile );
export const samplesFileName = <G> ( root: string, params: TSParams, pd: RefD<G> ): string => someFileName ( root, pd, params.samplesFile );
export const restFileName = <G> ( root: string, params: TSParams, pd: RefD<G> ): string => someFileName ( root, pd, params.restsFile );
export const fetcherFileName = <G> ( root: string, params: TSParams, pd: RefD<G> ): string => someFileName ( root, pd, params.fetchersFile );
export const optionalsFileName = <G> ( root: string, params: TSParams, pd: RefD<G> ): string => someFileName ( root, pd, params.optionalsFile );
export const loadRefsFileName = <G> ( root: string, params: TSParams, pd: RefD<G> ): string => someFileName ( root, pd, params.loadRefsFile );

