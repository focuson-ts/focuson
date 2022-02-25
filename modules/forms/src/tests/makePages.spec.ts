import { makePages } from "../codegen/makePages";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";


describe ( "makePages", () => {
  it ( "should make the 'pages' description for the generated app", () => {
    expect ( makePages ( paramsForTest, [ EAccountsSummaryPD ,CreatePlanPD] ) ).toEqual ( [
      "import { identityOptics } from \"@focuson/lens\";",
      "import { MultiPageDetails, simpleMessagesPageConfig } from \"@focuson/pages\";",
      "import {Context,  FState } from \"./common\";",
      "import * as render from\"./render\";",
      "import { EAccountsSummaryPage } from \"./render\";",
      "",
      "function MyLoading () {",
      "      return <p>Loading</p>",
      "}",
      "const simpleMessagesConfig = simpleMessagesPageConfig<FState, string, Context> (  MyLoading )",
      "const identity = identityOptics<FState> ();",
      "export const pages: MultiPageDetails<FState, Context> = {",
      "    EAccountsSummary: { config: simpleMessagesConfig, lens: identity.focusQuery ( 'EAccountsSummary' ), pageFunction: EAccountsSummaryPage(), initialValue: {} },",
      "    CreatePlan: { config: simpleMessagesConfig,  pageFunction: render.CreatePlanPage(), modal: true}",
      "  }"
    ])
  } )

} )