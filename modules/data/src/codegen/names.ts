import { AllDataDD, DataD } from "../common/dataD";
import { PageD, RestDefnInPageProperties } from "../common/pageD";
import { RestActionDetail } from "../common/restD";
import { rawTypeName } from "./makeGraphQlTypes";


export const domainName = ( d: DataD ): string => d.name + "Domain";
export const componentName = ( d: DataD ): string => d.name;
export const pageComponentName = ( d: PageD ): string => d.name + "Page";
export const fetcherName = ( d: RestDefnInPageProperties ): string => d.rest.dataDD.name + "Fetcher";
export const selectedPage = ( p: PageD ): string => p.name;
export const hasDomain = ( d: DataD ): string => "Has" + d.name;
export function resolverName ( dataD: DataD, action: RestActionDetail ) {
  let rawType = rawTypeName ( dataD );
  return `${action.graphQPrefix}${rawType}${action.graphQlPostfix}`
}
export const sampleName = ( dataD: AllDataDD ) => dataD.name + "Sample";