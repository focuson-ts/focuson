import { AllDataDD, DataD } from "../common/dataD";
import { PageD, RestDefnInPageProperties } from "../common/pageD";
import { RestActionDetail, RestD } from "../common/restD";
import { rawTypeName } from "./makeGraphQlTypes";
import { RestAction } from "@focuson/utils";
import { JavaWiringParams } from "./config";


export const domainName = ( d: DataD ): string => d.name + "Domain";
export const componentName = ( d: DataD ): string => d.name;
export const pageInState = <B> ( p: PageD <B> ): string => p.name
export const pageComponentName =  <B>( d: PageD <B> ): string => d.name + "Page";
// export const pageComponent = ( p: PageD ): string => p.name;
export const hasDomainForPage = <B> ( pd: PageD <B> ): string => "Has" + pageDomainName ( pd );
export const pageDomainName =  <B>( pd: PageD <B> ): string => pd.name + "PageDomain"
export function resolverName ( dataD: AllDataDD, action: RestActionDetail ) {
  let rawType = rawTypeName ( dataD );
  return `${action.graphQPrefix}${rawType}${action.graphQlPostfix}`
}
export const sampleName = ( dataD: AllDataDD ) => "sample" + dataD.name;
export const emptyName = ( dataD: AllDataDD ) => "empty" + dataD.name;

export const restControllerName = ( restD: RestD ) => `${restD.dataDD.name}Controller`

export const queryName = ( restD: RestD, action: RestAction ): string => action + restD.dataDD.name
export const endPointName = ( restD: RestD, action: RestAction ): string => action + restD.dataDD.name

export const modalName = <B> ( p: PageD <B>, modal: PageD<B> ) => modal.name
export const restDetailsName = <B> ( p: PageD<B>, r: RestD ) =>
  p.name + "_" + r.dataDD.name + "RestDetails"
export const storybookFileName = <B> ( pd: PageD<B> ): string => `${pd.name}.stories.ts`;
export const fetcherName = ( d: RestDefnInPageProperties ): string => d.rest.dataDD.name + "Fetcher";
export const fetcherInterfaceName = ( params: JavaWiringParams,r: RestD): string => `${r.dataDD.name}${params.fetcherInterface}`;
export const fetcherVariableName = ( params: JavaWiringParams,r: RestD): string => `_${r.dataDD.name}${params.fetcherInterface}`;
export const mockFetcherClassName = ( params: JavaWiringParams,r: RestD): string => `${r.dataDD.name}${params.fetcherInterface}Mock`;
export const queryClassName = ( params: JavaWiringParams,r: RestD): string => `${r.dataDD.name}Queries`;

