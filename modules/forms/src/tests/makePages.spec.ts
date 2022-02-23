import { makePages } from "../codegen/makePages";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";


describe ( "makePages", () => {
  it ( "should make the 'pages' description for the generated app", () => {
    expect ( makePages ( paramsForTest, [ EAccountsSummaryPD ,CreatePlanPD] ) ).toEqual ( [
      "import { identityOptics } from \"@focuson/lens\";",
      "import { MultiPageDetails, simpleMessagesPageConfig } from \"@focuson/pages\";",
      "import { modals, Modals } from \"./modals\";",
      "import {Context,  FState } from \"./common\";",
      "import { EAccountsSummaryPage } from \"./render\";",
      "",
      "function MyLoading () {",
      "      return <p>Loading</p>",
      "}",
      "const simpleMessagesConfig = simpleMessagesPageConfig<FState, string, Modals,Context> ( modals, MyLoading )",
      "export const pages: MultiPageDetails<FState, any,Context> = {",
      "    EAccountsSummary: { config: simpleMessagesConfig, lens: identityOptics<FState> ().focusQuery ( 'EAccountsSummary' ), pageFunction: EAccountsSummaryPage(), initialValue: {} }",
      "  }"
    ] )
  } )

} )