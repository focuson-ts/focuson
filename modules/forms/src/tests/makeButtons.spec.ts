import { makeButtonsFrom } from "../codegen/makeButtons";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { transformButtons } from "../buttons/allButtons";


describe ( "makeButtons", () => {
  it ( "should generate a tsx line using that button", () => {
    expect ( makeButtonsFrom ( paramsForTest, transformButtons, EAccountsSummaryPD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "  <ModalAndCopyButton id='amendExistingPlan' text='amendExistingPlan' modal = 'CreatePlan'  to={fullState.focusOn('tempCreatePlan')} base={['EAccountsSummary','tempCreatePlan']}  from={fullState.focusOn('fromApi').focusOn('createPlan')}   pageMode='edit'  rest={{'name':'EAccountsSummary_CreatePlanDDRestDetails','restAction':'update','path':['EAccountsSummary']}} />",
      "  <ModalButton id='createNewPlan' text='createNewPlan' modal = 'CreatePlan'  to={fullState.focusOn('tempCreatePlan')} base={['EAccountsSummary','tempCreatePlan']} createEmpty={empty.emptyCreatePlanDD}  pageMode='create'  rest={{'name':'EAccountsSummary_CreatePlanDDRestDetails','restAction':'create','path':['EAccountsSummary']}} />",
      "  <RestButton id='deleteExistingPlan' state={state} />",
      "  <button>refresh of type ResetStateButton cannot be created yet</button>"
    ] )

  } )
} )