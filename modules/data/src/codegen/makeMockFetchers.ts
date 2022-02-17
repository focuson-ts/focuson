import { PageD } from "../common/pageD";
import { findResolvers } from "./makeJavaResolvers";
import { RestD, RestOutputDetails } from "../common/restD";
import { AllDataDD, DataD } from "../common/dataD";


export function makeMockFetcherFor ( [ parent, output, dataD, resolver ]: [ DataD | undefined, RestOutputDetails, AllDataDD, string ] ): string[] {
  return [ `Parent ${parent?.name} ${dataD.name} ${resolver}` ]

}

export function makeMockFetchers ( rs: RestD[] ): string[] {
  return findResolvers ( rs ).flatMap ( makeMockFetcherFor )
}