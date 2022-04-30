import { findAllResolversFor, ResolverData } from "./makeJavaResolvers";
import { RestD } from "../common/restD";
import { JavaWiringParams } from "./config";
import { RestAction, safePick } from "@focuson/utils";


export const makeMockFetcherFor = ( params: JavaWiringParams ) => ( { isRoot, samplerName, sample, resolver }: ResolverData ): string[] =>
  isRoot ?
    [ ` public DataFetcher ${resolver}() {  return dataFetchingEnvironment -> ${params.sampleClass}.${samplerName}0;    }` ] :
    [ `  public DataFetcher ${resolver} (){ return new StaticDataFetcher(${JSON.stringify ( safePick ( sample, 0 ) )});}` ]


export function makeAllMockFetchers<G> ( params: JavaWiringParams, r: RestD<G>, a: RestAction ): string[] {
  return findAllResolversFor ( r, a ).flatMap ( makeMockFetcherFor ( params ) )
}

