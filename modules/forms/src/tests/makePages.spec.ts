import { makePages } from "../codegen/makePages";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";
import { repeatingRestRD } from "../example/repeating/repeating.restD";
import { RepeatingLinePageD, RepeatingPageD } from "../example/repeating/repeating.pageD";
import { RepeatingWholeDataD } from "../example/repeating/repeating.dataD";


describe ( "makePages", () => {
  it ( "should make the 'pages' description for the generated app", () => {
    expect ( makePages ( paramsForTest, [ EAccountsSummaryPD ,CreatePlanPD,RepeatingPageD, RepeatingLinePageD] ) ).toEqual ( [
      "import { identityOptics } from \"@focuson/lens\";",
      "import { MultiPageDetails, simpleMessagesPageConfig } from \"@focuson/pages\";",
      "import {Context,  FState } from \"./common\";",
      "import { EAccountsSummaryPage } from './EAccountsSummary/EAccountsSummary.render';",
      "import { CreatePlanPage } from './CreatePlan/CreatePlan.render';",
      "import { RepeatingPage } from './Repeating/Repeating.render';",
      "import { RepeatingLinePage } from './RepeatingLine/RepeatingLine.render';",
      "",
      "function MyLoading () {",
      "      return <p>Loading</p>",
      "}",
      "const simpleMessagesConfig = simpleMessagesPageConfig<FState, string, Context> (  MyLoading )",
      "const identity = identityOptics<FState> ();",
      "export const pages: MultiPageDetails<FState, Context> = {",
      "    EAccountsSummary: { config: simpleMessagesConfig, lens: identity.focusQuery ( 'EAccountsSummary' ), pageFunction: EAccountsSummaryPage(), initialValue: {} },",
      "    Repeating: { config: simpleMessagesConfig, lens: identity.focusQuery ( 'Repeating' ), pageFunction: RepeatingPage(), initialValue: {} },",
      "    CreatePlan: { config: simpleMessagesConfig,  pageFunction: CreatePlanPage(), modal: true},",
      "    RepeatingLine: { config: simpleMessagesConfig,  pageFunction: RepeatingLinePage(), modal: true}",
      "  }"
    ])
  } )

} )