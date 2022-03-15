import { makeButtonsFrom } from "../codegen/makeButtons";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { makeButtons } from "../buttons/allButtons";
import { OccupationAndIncomeSummaryPD } from "../example/occupationAndIncomeDetails/occupationAndIncome.pageD";
import { AllGuardCreator } from "../buttons/guardButton";
import { PostCodeMainPage } from "../example/addressSearch/addressSearch.pageD";


describe ( "makeButtons", () => {
  it ( "should generate a tsx line using that button", () => {
    expect ( makeButtonsFrom ( paramsForTest, AllGuardCreator, makeButtons (), EAccountsSummaryPD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "    {amendExistingPlan:<ModalButton id='amendExistingPlan' text='amendExistingPlan'  state={state} modal = 'CreatePlan'  ",
      "      pageMode='edit'",
      "      focusOn={['EAccountsSummary','{basePage}','tempCreatePlan']}",
      "      copy={[{'from':['{basePage}','fromApi','createPlan']}]}",
      "       rest={{'name':'EAccountsSummary_CreatePlanDDRestDetails','restAction':'update'}}",
      "    />,",
      "    createNewPlan:<ModalButton id='createNewPlan' text='createNewPlan'  state={state} modal = 'CreatePlan'  ",
      "      pageMode='create'",
      "      focusOn={['EAccountsSummary','{basePage}','tempCreatePlan']}",
      "      createEmpty={empty.emptyCreatePlanDD}",
      "       rest={{'name':'EAccountsSummary_CreatePlanDDRestDetails','restAction':'create'}}",
      "    />,",
      "    deleteExistingPlan:<RestButton state={state}",
      "      id='deleteExistingPlan'",
      "      name='deleteExistingPlan'",
      "      action='delete'",
      "      rest='EAccountsSummary_CreatePlanDDRestDetails'",
      "      confirm={true}",
      "     />,",
      "    refresh:<button>refresh of type ResetStateButton cannot be created yet</button>,}"
    ] )
  } )
  it ( "should create modal buttons with copy on close", () => {
    expect ( makeButtonsFrom ( paramsForTest, AllGuardCreator, makeButtons (), OccupationAndIncomeSummaryPD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "    {addEntry:<ModalButton id='addEntry' text='addEntry'  state={state} modal = 'OccupationIncomeModalPD'  ",
      "      pageMode='create'",
      "      focusOn={['OccupationAndIncomeSummary','{basePage}','temp']}",
      "      copyOnClose={[{'to':['{basePage}','fromApi','customerOccupationIncomeDetails','[append]']}]}",
      "      createEmpty={empty.emptyOccupationIncomeDetailsDD}",
      "      setToLengthOnClose={{'array':['fromApi','customerOccupationIncomeDetails'],'variable':['selectedItem']}}",
      "    />,",
      "    edit:<ModalButton id='edit' text='edit'  state={state} modal = 'OccupationIncomeModalPD'  ",
      "      pageMode='edit'",
      "      focusOn={['OccupationAndIncomeSummary','{basePage}','temp']}",
      "      copy={[{'from':['fromApi','customerOccupationIncomeDetails','{selectedItem}']}]}",
      "      copyOnClose={[{'to':['fromApi','customerOccupationIncomeDetails','{selectedItem}']}]}",
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

  it ( "should render a postcode button", () => {
    expect ( makeButtonsFrom ( paramsForTest, AllGuardCreator, makeButtons (), PostCodeMainPage ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "    {save:<RestButton state={state}",
      "      id='save'",
      "      name='save'",
      "      action='create'",
      "      validate={false}",
      "      rest='PostCodeDemo_PostCodeMainPageRestDetails'",
      "     />,",
      "    search:<ModalButton id='search' text='search'  state={state} modal = 'PostCodeSearch'  ",
      "      pageMode='edit'",
      "      focusOn={['PostCodeDemo','postcode']}",
      "      copy={[{'from':['{basePage}','main','postcode'],'to':['{basePage}','postcode','search']}]}",
      "      copyOnClose={[{'from':['{basePage}','postcode','addressResults','line1'],'to':['{basePage}','main','line1']},{'from':['{basePage}','postcode','addressResults','line2'],'to':['{basePage}','main','line2']},{'from':['{basePage}','postcode','addressResults','line3'],'to':['{basePage}','main','line3']},{'from':['{basePage}','postcode','addressResults','line4'],'to':['{basePage}','main','line4']},{'from':['{basePage}','postcode','search'],'to':['{basePage}','main','postcode']}]}",
      "    />,}"
    ] )
  } )

} )