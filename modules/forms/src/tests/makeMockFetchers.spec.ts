import { makeAllMockFetchers } from "../codegen/makeMockFetchers";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { repeatingRestRD } from "../example/repeating/repeating.restD";


describe ( "makeMockFetchers", () => {
  it ( "to make a java mock fetcher - has child fetchers", () => {
    expect ( makeAllMockFetchers ( paramsForTest, eAccountsSummaryRestD, 'get' ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      " public DataFetcher getEAccountsSummary() {  return dataFetchingEnvironment -> Sample.sampleEAccountsSummary0;    }",
      "  public DataFetcher getAccountSummaryDescription (){ return new StaticDataFetcher('This account's description');}",
      "  public DataFetcher getTotalMonthlyCost (){ return new StaticDataFetcher(1000);}",
      "  public DataFetcher getOneAccountBalance (){ return new StaticDataFetcher(9921);}",
      "  public DataFetcher getCurrentAccountBalance (){ return new StaticDataFetcher(12321);}"
    ] )
  } )
  it ( "to make a java mock fetcher - no child fetchers", () => {
    expect ( makeAllMockFetchers ( paramsForTest, createPlanRestD, 'update' ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      " public DataFetcher updateCreatePlan() {  return dataFetchingEnvironment -> Sample.sampleCreatePlan0;    }",
    ] )
  } )

  it ( "to make a java mock fetcher -returning true for RestActions that just return a boolean", () => {
    expect ( makeAllMockFetchers ( paramsForTest, createPlanRestD, 'delete' ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "  public DataFetcher deleteCreatePlan (){ return new StaticDataFetcher(true);}"
    ] )
  } )

} )