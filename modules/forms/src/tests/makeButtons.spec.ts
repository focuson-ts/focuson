import { makeButtonsFrom } from "../codegen/makeButtons";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { transformButtons } from "../buttons/allButtons";
import { OccupationAndIncomeSummaryPD } from "../example/occupationAndIncomeDetails/occupationAndIncome.pageD";


describe ( "makeButtons", () => {
  it ( "should generate a tsx line using that button", () => {
    expect ( makeButtonsFrom ( paramsForTest, transformButtons, EAccountsSummaryPD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ([
      "  <ModalButton id='amendExistingPlan' text='amendExistingPlan'  state={state} modal = 'CreatePlan'  focusOn={['EAccountsSummary','tempCreatePlan']} copyFrom={['EAccountsSummary','fromApi','createPlan']}    pageMode='edit'   rest={{'name':'EAccountsSummary_CreatePlanDDRestDetails','restAction':'update','path':['EAccountsSummary']}} />",
      "  <ModalButton id='createNewPlan' text='createNewPlan'  state={state} modal = 'CreatePlan'  focusOn={['EAccountsSummary','tempCreatePlan']}  createEmpty={empty.emptyCreatePlanDD}   pageMode='create'   rest={{'name':'EAccountsSummary_CreatePlanDDRestDetails','restAction':'create','path':['EAccountsSummary']}} />",
      "  <RestButton  id='deleteExistingPlan'   name='deleteExistingPlan' action='delete' path={['EAccountsSummary','fromApi']} state={state}rest='EAccountsSummary_CreatePlanDDRestDetails' confirm={true} />",
      "  <button>refresh of type ResetStateButton cannot be created yet</button>"
    ])
  } )
  it ("should create modal buttons with copy on close", () =>{
    expect ( makeButtonsFrom ( paramsForTest, transformButtons, OccupationAndIncomeSummaryPD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "  <ModalButton id='addEntry' text='addEntry'  state={state} modal = 'OccupationIncomeModalPD'  focusOn={['OccupationAndIncomeSummary','temp']}  copyOnClose={['OccupationAndIncomeSummary','fromApi','customerOccupationIncomeDetails','[append]']}createEmpty={empty.emptyOccupationIncomeDetailsDD}  setToLengthOnClose={{'array':['OccupationAndIncomeSummary','fromApi','customerOccupationIncomeDetails'],'variable':['OccupationAndIncomeSummary','selectedItem']}} pageMode='create'   />",
      "  <ModalButton id='edit' text='edit'  state={state} modal = 'OccupationIncomeModalPD'  focusOn={['OccupationAndIncomeSummary','temp']} copyFrom={['OccupationAndIncomeSummary','fromApi','customerOccupationIncomeDetails','{selectedItem}']} copyOnClose={['OccupationAndIncomeSummary','fromApi','customerOccupationIncomeDetails','{selectedItem}']}   pageMode='edit'   />",
      "  <ListNextButton id='nextOccupation' title='Next' list={fullState.focusOn('fromApi').focusOn('customerOccupationIncomeDetails')} value={fullState.focusOn('selectedItem')} />",
      "  <ListPrevButton id='prevOccupation' title='Prev' list={fullState.focusOn('fromApi').focusOn('customerOccupationIncomeDetails')} value={fullState.focusOn('selectedItem')} />"
    ])
  })

} )