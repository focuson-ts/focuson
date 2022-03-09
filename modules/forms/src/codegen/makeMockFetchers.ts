import { findAllResolvers, ResolverData } from "./makeJavaResolvers";
import { RestD } from "../common/restD";
import { JavaWiringParams } from "./config";
import { safePick } from "@focuson/utils";


export const makeMockFetcherFor = ( params: JavaWiringParams ) => ( { isRoot, samplerName, sample, resolver }: ResolverData ): string[] =>
  isRoot ?
    [ ` public DataFetcher ${resolver}() {  return dataFetchingEnvironment -> ${params.sampleClass}.${samplerName}0;    }` ]:
    [ `  public DataFetcher ${resolver} (){ return new StaticDataFetcher(${JSON.stringify ( safePick ( sample, 0 ) )});}` ]


export function makeAllMockFetchers <G> ( params: JavaWiringParams, rs: RestD <G>[] ): string[] {
  return findAllResolvers ( rs ).flatMap ( makeMockFetcherFor ( params ) )
}

