import { findResolvers, JavaWiringParams } from "./makeJavaResolvers";
import { RestActionDetail, RestD, RestOutputDetails } from "../common/restD";
import { AllDataDD, DataD } from "../common/dataD";
import { resolverName, sampleName } from "./names";
import { selectSample } from "./makeSample";


export const makeMockFetcherFor = ( params: JavaWiringParams ) => ( [ parent, action, dataD, resolver ]: [ DataD | undefined, RestActionDetail, AllDataDD, string ] ): string[] => {
  if ( parent && !action?.output?.needsObj )
    { // @ts-ignore
      let sample = selectSample ( 0, parent, dataD );
      return [ `  public DataFetcher ${resolver} (){ return new StaticDataFetcher("${sample}");}` ]
    }
  else
    return [ ` public DataFetcher ${resolverName ( dataD, action )}() {  return dataFetchingEnvironment -> ${params.sampleClass}.${sampleName ( dataD )}0;    }` ]

};

export function makeAllMockFetchers ( params: JavaWiringParams, rs: RestD[] ): string[] {
  return findResolvers ( rs ).flatMap ( makeMockFetcherFor ( params ) )
}

