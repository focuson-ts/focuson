import { findAllResolvers2, ResolverData } from "./makeJavaResolvers";
import { RestD } from "../common/restD";
import { JavaWiringParams } from "./config";
import { safePick } from "@focuson/utils";


export const makeMockFetcherFor = ( params: JavaWiringParams ) => ( { isRoot, samplerName, sample, resolver }: ResolverData ): string[] =>
  isRoot ?
    [ ` public DataFetcher ${resolver}() {  return dataFetchingEnvironment -> ${params.sampleClass}.${samplerName}0;    }` ]:
    [ `  public DataFetcher ${resolver} (){ return new StaticDataFetcher(${JSON.stringify ( safePick ( sample, 0 ) )});}` ]


export function makeAllMockFetchers ( params: JavaWiringParams, rs: RestD[] ): string[] {
  return findAllResolvers2 ( rs ).flatMap ( makeMockFetcherFor ( params ) )
}

