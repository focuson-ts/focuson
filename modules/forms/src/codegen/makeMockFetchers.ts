import { RestD } from "../common/restD";
import { JavaWiringParams } from "./config";
import { RestAction, safePick } from "@focuson-nw/utils";
import { findQueryMutationResolver, ResolverData } from "./makeJavaFetchersInterface";


export const makeMockFetcherFor = ( params: JavaWiringParams ) => ( rd: ResolverData ): string[] => {
  const { isRoot, samplerName, sample, resolver, needsObjectInOutput, javaType } = rd
  // console.log ( 'resolver data', rd )
  if ( needsObjectInOutput )
    if ( isRoot || sample.length === 0 )
      return [ ` public DataFetcher<${javaType}> ${resolver}() {  return dataFetchingEnvironment -> ${params.sampleClass}.${samplerName}0;    }` ]
    else
      return [ `  public DataFetcher<${javaType}> ${resolver} (){ return new StaticDataFetcher(${JSON.stringify ( safePick ( sample, 0 ) )});}` ]
  else return [ `  public DataFetcher<${javaType}> ${resolver} (){ return new StaticDataFetcher(true);}` ];
}


export function makeMockFetchersForRest<G> ( params: JavaWiringParams, r: RestD<G>, a: RestAction ): string[] {
  let resolverData = findQueryMutationResolver ( r, a );
  return makeMockFetcherFor ( params ) ( resolverData )
}

