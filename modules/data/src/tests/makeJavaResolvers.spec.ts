import { makeJavaResolversInterface } from "../codegen/makeJavaResolvers";
import { createPlanRestD, exportAccountsSummaryRestD } from "../example/eAccountsSummary.restD";

describe ( "makeJavaResolversInterface", () => {
  it ( "should make a java interface", () => {
    expect ( makeJavaResolversInterface ( 'packName', 'intName', [ exportAccountsSummaryRestD, createPlanRestD ] ) ).toEqual ( [
      "package packName;",
      "",
      "interface intName {",
      "   public DataFetcher getEAccountsSummaryDD();",
      "   public DataFetcher getCreatePlanDD();",
      "   public DataFetcher createCreatePlanDD();",
      "   public DataFetcher updateCreatePlanDD();",
      "   public DataFetcher deleteCreatePlanDD();",
      "   public DataFetcher listCreatePlanDD();",
      "}"
    ] )
  } )
} )