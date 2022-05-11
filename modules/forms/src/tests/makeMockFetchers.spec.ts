import { makeMockFetcherFor, makeMockFetchersForRest } from "../codegen/makeMockFetchers";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { repeatingRestRD } from "../example/repeating/repeating.restD";
import { paramsForTest } from "./paramsForTest";
import { ResolverData } from "../codegen/makeJavaFetchersInterface";


describe ( "makeMockFetchers", () => {
  it ( "to make a java mock fetcher - has child fetchers, but should now ignore them", () => {
    expect ( makeMockFetchersForRest ( paramsForTest, eAccountsSummaryRestD, 'get' ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      " public DataFetcher getEAccountsSummary() {  return dataFetchingEnvironment -> Sample.sampleEAccountsSummary0;    }"
    ])
  } )
  it ( "to make a java mock fetcher - for a resolver", () => {
    let resolverData: ResolverData = {
      isRoot: false,
      name: "someResolverName", needsObjectInOutput: false, parent: "SomeParent", sample: [], samplerName: "", resolver: 'someResolverR'
    };
    expect ( makeMockFetcherFor ( paramsForTest ) ( resolverData ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "  public DataFetcher someResolverR (){ return new StaticDataFetcher(true);}"
    ])
  } )

  it ( "to make a java mock fetcher -returning true for RestActions that just return a boolean", () => {
    expect ( makeMockFetchersForRest ( paramsForTest, createPlanRestD, 'delete' ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "  public DataFetcher deleteCreatePlan (){ return new StaticDataFetcher(true);}"
    ] )
  } )

} )