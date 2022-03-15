import { makeAllMockFetchers } from "../codegen/makeMockFetchers";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { repeatingRestRD } from "../example/repeating/repeating.restD";


describe ( "makeMockFetchers", () => {
  it ( "to make a java mock fetcher", () => {
    expect ( makeAllMockFetchers ( paramsForTest, [ eAccountsSummaryRestD, createPlanRestD , repeatingRestRD] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      " public DataFetcher getEAccountsSummary() {  return dataFetchingEnvironment -> Sample.sampleEAccountsSummary0;    }",
      " public DataFetcher getCreatePlan() {  return dataFetchingEnvironment -> Sample.sampleCreatePlan0;    }",
      " public DataFetcher createCreatePlan() {  return dataFetchingEnvironment -> Sample.sampleCreatePlan0;    }",
      " public DataFetcher updateCreatePlan() {  return dataFetchingEnvironment -> Sample.sampleCreatePlan0;    }",
      " public DataFetcher deleteCreatePlan() {  return dataFetchingEnvironment -> Sample.sampleCreatePlan0;    }",
      " public DataFetcher listCreatePlan() {  return dataFetchingEnvironment -> Sample.sampleCreatePlan0;    }",
      " public DataFetcher createRepeatingLine() {  return dataFetchingEnvironment -> Sample.sampleRepeatingWholeData0;    }",
      " public DataFetcher getRepeatingLine() {  return dataFetchingEnvironment -> Sample.sampleRepeatingWholeData0;    }",
      "  public DataFetcher getAccountSummaryDescription (){ return new StaticDataFetcher('This account has a description');}",
      "  public DataFetcher getTotalMonthlyCost (){ return new StaticDataFetcher(1000);}",
      "  public DataFetcher getOneAccountBalance (){ return new StaticDataFetcher(9921);}",
      "  public DataFetcher getCurrentAccountBalance (){ return new StaticDataFetcher(12321);}"
    ])
  } )
} )