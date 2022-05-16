import { RestD } from "../common/restD";
import { JavaWiringParams } from "./config";
import { RestAction, safePick } from "@focuson/utils";
import { getRestTypeDetails } from "@focuson/rest";
import { findAllResolversFor, findQueryMutationResolvers, ResolverData } from "./makeJavaFetchersInterface";


export const makeMockFetcherFor = ( params: JavaWiringParams ) => ( { isRoot, samplerName, sample, resolver, needsObjectInOutput, javaType }: ResolverData ): string[] =>
  needsObjectInOutput ?
    isRoot ?
      [ ` public DataFetcher<${javaType}> ${resolver}() {  return dataFetchingEnvironment -> ${params.sampleClass}.${samplerName}0;    }` ] :
      [ `  public DataFetcher<${javaType}> ${resolver} (){ return new StaticDataFetcher(${JSON.stringify ( safePick ( sample, 0 ) )});}` ] :
    [ `  public DataFetcher<${javaType}> ${resolver} (){ return new StaticDataFetcher(true);}` ]


export function makeMockFetchersForRest<G> ( params: JavaWiringParams, r: RestD<G>, a: RestAction ): string[] {
  let resolverData = findQueryMutationResolvers ( r, a );
  return makeMockFetcherFor ( params ) ( resolverData )
}

