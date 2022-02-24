import { makeButtonsFrom } from "../codegen/makeButtons";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";


describe("makeButtons", () =>{
  it("should generate a tsx line using that button", () =>{
    expect(makeButtonsFrom(EAccountsSummaryPD)).toEqual([
      "<ModalAndCopyButton id='amendExistingPlan' text='amendExistingPlan' modal = 'EAccountsSummary_CreatePlan' pageMode='edit' from={fullState.focusOn('fromApi')} to={fullState.focusOn('temp')}   rest={{\"rest\":\"createPlanRestD\",\"action\":\"update\"}}/>",
      "<ModalButton id='createNewPlan' text='createNewPlan' modal = 'EAccountsSummary_CreatePlan' state={state} pageMode='create'  rest={{\"rest\":\"createPlanRestD\",\"action\":\"create\"}} />",
      "<RestButton id='deleteExistingPlan' state={state} />",
      "<RestButton id='refresh' state={state} />"
    ])

  })
})