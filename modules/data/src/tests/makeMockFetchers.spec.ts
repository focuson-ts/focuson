import { makeAllMockFetchers } from "../codegen/makeMockFetchers";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccountsSummary.restD";
import { paramsForTest } from "./makeJavaResolvers.spec";


describe ( "makeMockFetchers", () => {
  it ( "to make a java mock fetcher", () => {
    expect ( makeAllMockFetchers ( paramsForTest, [ eAccountsSummaryRestD, createPlanRestD ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "    public DataFetcher getEAccountsSummaryDD() {  return dataFetchingEnvironment -> EAccountsSummaryDDSample0();    }",
      "    public DataFetcher getCreatePlanDD() {  return dataFetchingEnvironment -> CreatePlanDDSample0();    }",
      "    public DataFetcher createCreatePlanDD() {  return dataFetchingEnvironment -> CreatePlanDDSample0();    }",
      "    public DataFetcher updateCreatePlanDD() {  return dataFetchingEnvironment -> CreatePlanDDSample0();    }",
      "    public DataFetcher deleteCreatePlanDD() {  return dataFetchingEnvironment -> CreatePlanDDSample0();    }",
      "    public DataFetcher listCreatePlanDD() {  return dataFetchingEnvironment -> CreatePlanDDSample0();    }",
      "    public DataFetcher getEAccountSummaryDD (){ return new StaticDataFetcher('This is a one line string');}",
      "    public DataFetcher getEAccountsSummaryDD (){ return new StaticDataFetcher('1000');}",
      "    public DataFetcher getEAccountsSummaryDD (){ return new StaticDataFetcher('9921');}",
      "    public DataFetcher getEAccountsSummaryDD (){ return new StaticDataFetcher('12321');}"
    ])
  } )
} )