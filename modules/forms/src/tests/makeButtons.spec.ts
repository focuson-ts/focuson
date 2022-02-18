import { makeButtonsFrom } from "../codegen/makeButtons";
import { EAccountsSummaryPD } from "../example/eAccountsSummary.pageD";


describe("makeButtons", () =>{
  it("should generate a tsx line using that button", () =>{
    expect(makeButtonsFrom(EAccountsSummaryPD)).toEqual([
      "<ModalButton id='amendExistingPlan' state={state} mode='edit' mainData='fromApi' tempData='temp' rest='createPlanRestD' action='update'  />",
      "<ModalButton id='createNewPlan' state={state} mode='create'  tempData='temp' rest='createPlanRestD' action='create'  />",
      "<RestButton id='deleteExistingPlan' state={state} />",
      "<RestButton id='refresh' state={state} />",
      "<ModalButton id='requestInfo' state={state} mode='view' mainData='TDB' tempData='TBD'   />"
    ])

  })
})