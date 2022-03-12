import { makeButtonsFrom } from "../codegen/makeButtons";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { makeButtons } from "../buttons/allButtons";
import { OccupationAndIncomeSummaryPD } from "../example/occupationAndIncomeDetails/occupationAndIncome.pageD";
import { AllGuardCreator } from "../buttons/guardButton";


describe ( "makeButtons", () => {
  it ( "should generate a tsx line using that button", () => {
    expect ( makeButtonsFrom ( paramsForTest,AllGuardCreator, makeButtons (), EAccountsSummaryPD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ([
      "    {amendExistingPlan:<ModalButton id='amendExistingPlan' text='amendExistingPlan'  state={state} modal = 'CreatePlan'  ",
      "      pageMode='edit'",
      "      focusOn={['EAccountsSummary','tempCreatePlan']}",
      "      copyFrom={['EAccountsSummary','fromApi','createPlan']}",
      "       rest={{'name':'EAccountsSummary_CreatePlanDDRestDetails','restAction':'update','path':['EAccountsSummary']}}",
      "    />,",
      "    createNewPlan:<ModalButton id='createNewPlan' text='createNewPlan'  state={state} modal = 'CreatePlan'  ",
      "      pageMode='create'",
      "      focusOn={['EAccountsSummary','tempCreatePlan']}",
      "      createEmpty={empty.emptyCreatePlanDD}",
      "       rest={{'name':'EAccountsSummary_CreatePlanDDRestDetails','restAction':'create','path':['EAccountsSummary']}}",
      "    />,",
      "    deleteExistingPlan:<RestButton state={state}",
      "    id='deleteExistingPlan'",
      "    name='deleteExistingPlan'",
      "    action='delete'",
      "    path={['EAccountsSummary','fromApi']}",
      "    rest='EAccountsSummary_CreatePlanDDRestDetails'",
      "    confirm={true}",
      "     />,",
      "    refresh:<button>refresh of type ResetStateButton cannot be created yet</button>,}"
    ] )
  } )
  it ( "should create modal buttons with copy on close", () => {
    expect ( makeButtonsFrom ( paramsForTest, AllGuardCreator,makeButtons (), OccupationAndIncomeSummaryPD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "    {addEntry:<ModalButton id='addEntry' text='addEntry'  state={state} modal = 'OccupationIncomeModalPD'  ",
      "      pageMode='create'",
      "      focusOn={['OccupationAndIncomeSummary','temp']}",
      "      copyOnClose={['OccupationAndIncomeSummary','fromApi','customerOccupationIncomeDetails','[append]']}",
      "      createEmpty={empty.emptyOccupationIncomeDetailsDD}",
      "      setToLengthOnClose={{'array':['OccupationAndIncomeSummary','fromApi','customerOccupationIncomeDetails'],'variable':['OccupationAndIncomeSummary','selectedItem']}}",
      "    />,",
      "    edit:<ModalButton id='edit' text='edit'  state={state} modal = 'OccupationIncomeModalPD'  ",
      "      pageMode='edit'",
      "      focusOn={['OccupationAndIncomeSummary','temp']}",
      "      copyFrom={['OccupationAndIncomeSummary','fromApi','customerOccupationIncomeDetails','{selectedItem}']}",
      "      copyOnClose={['OccupationAndIncomeSummary','fromApi','customerOccupationIncomeDetails','{selectedItem}']}",
      "    />,",
      "    nextOccupation:<GuardButton cond={nextOccupationGuard}>",
      "      <GuardButton cond={nextOccupationGuard}>",
      "        <ListNextButton id='nextOccupation' title='Next' list={fullState.focusOn('fromApi').focusOn('customerOccupationIncomeDetails')} value={fullState.focusOn('selectedItem')} />",
      "      </GuardButton>",
      "    </GuardButton>,",
      "    prevOccupation:<GuardButton cond={prevOccupationGuard}>",
      "      <ListPrevButton id='prevOccupation' title='Prev' list={fullState.focusOn('fromApi').focusOn('customerOccupationIncomeDetails')} value={fullState.focusOn('selectedItem')} />",
      "    </GuardButton>,}"
    ] )
  } )

} )