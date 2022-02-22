import { makeModals } from "../codegen/makeModal";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";

describe("makeModals", () =>{
  it("should make the modals component for modals.ts", () =>{

    expect(makeModals([ EAccountsSummaryPD ,CreatePlanPD])).toEqual([
      "import { Lenses } from \"@focuson/lens\";",
      "import { ModalPagesDetails } from \"@focuson/pages\";",
      "import { CreatePlanPage } from \"./render\";",
      "import { FState } from \"./common\";",
      "",
      "",
      "export type Modals = typeof modals",
      "const identity = Lenses.identity<FState> ( 'allModalPages' );",
      "export const modals: ModalPagesDetails<FState> = {",
      "      EAccountsSummary_CreatePlan: { displayModalFn: CreatePlanPage, mode: 'edit', lens: identity.focusQuery('EAccountsSummary').focusQuery('fromApi').focusQuery('createPlan')}",
      "}"
    ])

  })
})