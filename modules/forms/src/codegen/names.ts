import { AllDataDD, DataD } from "../common/dataD";
import { PageD, RestDefnInPageProperties } from "../common/pageD";
import { RestActionDetail, RestD } from "../common/restD";
import { rawTypeName } from "./makeGraphQlTypes";
import { RestAction } from "@focuson/utils";


export const domainName = ( d: DataD ): string => d.name + "Domain";
export const componentName = ( d: DataD ): string => d.name;
export const pageInState = ( p: PageD ): string => p.name
export const pageComponentName = ( d: PageD ): string => d.name + "Page";
export const fetcherName = ( d: RestDefnInPageProperties ): string => d.rest.dataDD.name + "Fetcher";
// export const pageComponent = ( p: PageD ): string => p.name;
export const hasDomainForPage = ( pd: PageD ): string => "Has" + pageDomainName ( pd );
export const pageDomainName = ( pd: PageD ): string => pd.name + "PageDomain"
export function resolverName ( dataD: AllDataDD, action: RestActionDetail ) {
  let rawType = rawTypeName ( dataD );
  return `${action.graphQPrefix}${rawType}${action.graphQlPostfix}`
}
export const sampleName = ( dataD: AllDataDD ) => "sample" + dataD.name;
export const emptyName = ( dataD: AllDataDD ) => "empty" + dataD.name;

export const restControllerName = ( restD: RestD ) => `${restD.dataDD.name}Controller`

export const queryName = ( restD: RestD, action: RestAction ): string => action + restD.dataDD.name
export const endPointName = ( restD: RestD, action: RestAction ): string => action + restD.dataDD.name

export const modalName = ( p: PageD, modal: PageD ) => modal.name
export const restDetailsName = ( p: PageD, r: RestD ) =>
  p.name + "_" + r.dataDD.name + "RestDetails"
export const storybookFileName = ( pd: PageD ): string => `${pd.name}.stories.ts`;

