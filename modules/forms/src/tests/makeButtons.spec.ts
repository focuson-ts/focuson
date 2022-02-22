import { makeButtonsFrom } from "../codegen/makeButtons";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";


describe("makeButtons", () =>{
  it("should generate a tsx line using that button", () =>{
    expect(makeButtonsFrom(EAccountsSummaryPD)).toEqual([
      "<ModalAndCopyButton id='amendExistingPlan' text='amendExistingPlan' modal = 'EAccountsSummary_CreatePlan' state={state} mode='edit' from={fullState.focusOn('fromApi')} to={fullState.focusOn('temp')} rest='createPlanRestD' action='update'  />",
      "<ModalButton id='createNewPlan' text='createNewPlan' modal = 'EAccountsSummary_CreatePlan' state={state} mode='create' createEmpty rest='createPlanRestD' action='create'  />",
      "<RestButton id='deleteExistingPlan' state={state} />",
      "<RestButton id='refresh' state={state} />"
    ])

  })
})