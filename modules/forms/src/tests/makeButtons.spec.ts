import { makeButtonsFrom } from "../codegen/makeButtons";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";


describe("makeButtons", () =>{
  it("should generate a tsx line using that button", () =>{
    expect(makeButtonsFrom(EAccountsSummaryPD).map(s => s.replace(/"/g, "'"))).toEqual([
      "<ModalAndCopyButton id='amendExistingPlan' text='amendExistingPlan' modal = 'CreatePlan'  to={fullState.focusOn('tempCreatePlan')} base={['EAccountsSummary','tempCreatePlan']}  from={fullState.focusOn('fromApi').focusOn('createPlan')}   pageMode='edit'  rest={{'rest':'EAccountsSummary_CreatePlanDDRestDetails','action':'update','result':'refresh'}} />",
      "<ModalButton id='createNewPlan' text='createNewPlan' modal = 'CreatePlan'  to={fullState.focusOn('tempCreatePlan')} base={['EAccountsSummary','tempCreatePlan']}   pageMode='create'  rest={{'rest':'EAccountsSummary_CreatePlanDDRestDetails','action':'create','result':'refresh'}} />",
      "<RestButton id='deleteExistingPlan' state={state} />",
      "<button>refresh of type ResetStateButton cannot be create yet</button>"
    ])

  })
})