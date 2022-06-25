import { makeButtonsFrom } from "../codegen/makeButtons";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { makeButtons } from "../buttons/allButtons";

import { AllGuardCreator } from "../buttons/guardButton";
import { PostCodeMainPage } from "../example/postCodeDemo/addressSearch.pageD";
import { OccupationAndIncomeSummaryPD } from "../example/occupationAndIncome/occupationAndIncome.pageD";
import { paramsForTest } from "./paramsForTest";


describe ( "makeButtons", () => {
  it ( "should generate a tsx line using that button", () => {
    expect ( makeButtonsFrom ( paramsForTest, AllGuardCreator, makeButtons (), EAccountsSummaryPD,EAccountsSummaryPD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "    {amendExistingPlan:<ModalButton id={`${id}.amendExistingPlan`} text='Amend Existing Plan' dateFn={defaultDateFn} state={state} modal='CreatePlan' ",
      "      pageMode='edit'",
      "      focusOn='~/tempCreatePlan'",
      "      buttonType={'secondary'}",
      "      copy={[{'from':'~/fromApi/createPlan'}]}",
      "       rest={{'name':'EAccountsSummary_CreatePlanRestDetails','restAction':'update'}}",
      "    />,",
      "    createNewPlan:<ModalButton id={`${id}.createNewPlan`} text='Create New Plan' dateFn={defaultDateFn} state={state} modal='CreatePlan' ",
      "      pageMode='create'",
      "      focusOn='~/tempCreatePlan'",
      "      buttonType={'secondary'}",
      "      createEmpty={empty.emptyCreatePlan}",
      "       rest={{'name':'EAccountsSummary_CreatePlanRestDetails','restAction':'create'}}",
      "    />,",
      "    deleteExistingPlan:<RestButton state={state} id={`${id}.deleteExistingPlan`}  text='Delete Existing Plan'",
      "      name='deleteExistingPlan'",
      "      action={'delete'}",
      "      rest='EAccountsSummary_CreatePlanRestDetails'",
      "      confirm={true}",
      "     />,}"
    ])
  } )
  it ( "should create modal buttons with copy on close", () => {
    expect ( makeButtonsFrom ( paramsForTest, AllGuardCreator, makeButtons (), OccupationAndIncomeSummaryPD,OccupationAndIncomeSummaryPD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "    {addEntry:<ModalButton id={`${id}.addEntry`} text='Add Entry' dateFn={defaultDateFn} state={state} modal='OccupationIncomeModal' ",
      "      pageMode='create'",
      "      focusOn='~/temp'",
      "      copyOnClose={[{'to':'#currentOccupation/[$append]'}]}",
      "      createEmpty={empty.emptyOneOccupationIncomeDetails}",
      "      setToLengthOnClose={{'variable':'#selected','array':'#currentOccupation'}}",
      "    />,",
      "    additionalInfo:<ModalButton id={`${id}.additionalInfo`} text='Additional Info' dateFn={defaultDateFn} state={state} modal='AdditionalInformationModal' ",
      "      pageMode='edit'",
      "      focusOn='~/additionalInformation'",
      "    />,",
      "    businessDetails:<ModalButton id={`${id}.businessDetails`} text='Business Details' dateFn={defaultDateFn} state={state} modal='BusinessDetailsModal' ",
      "      pageMode='edit'",
      "      focusOn='~/businessDetails'",
      "    />,",
      "    edit:<ModalButton id={`${id}.edit`} text='Edit' dateFn={defaultDateFn} state={state} modal='OccupationIncomeModal' ",
      "      pageMode='edit'",
      "      focusOn='~/temp'",
      "      copy={[{'from':'#currentOccupation[#selected]'}]}",
      "      copyOnClose={[{'to':'#currentOccupation[#selected]'}]}",
      "    />,",
      "    list:<ModalButton id={`${id}.list`} text='List' dateFn={defaultDateFn} state={state} modal='ListOccupationsModal' ",
      "      pageMode='edit'",
      "      focusOn='~/occupation'",
      "      copy={[{'from':'#currentOccupation[#selected]/occupation','to':'~/occupation/search'},{'from':'#currentOccupation[#selected]/occupation','to':'~/occupation/selectedOccupationName'}]}",
      "      copyOnClose={[{'from':'~/occupation/selectedOccupationName','to':'#currentOccupation[#selected]/occupation'}]}",
      "    />,",
      "    mainOrJoint:<ToggleButton id={`${id}.mainOrJoint`} state={fullState.focusOn('mainOrJoint')}",
      "      buttonText='Showing {~/mainOrJoint|Main|Joint}'",
      "       />,",
      "    nextOccupation:<ListNextButton id={`${id}.nextOccupation`} title='Next' list={state.copyWithLens(OccupationAndIncomeSummaryOptionals.currentOccupation(identityL))} value={state.copyWithLens(OccupationAndIncomeSummaryOptionals.selected(identityL))} />,",
      "    otherSourcesOfIncome:<ModalButton id={`${id}.otherSourcesOfIncome`} text='Other Sources Of Income' dateFn={defaultDateFn} state={state} modal='OtherSourcesOfIncomeModal' ",
      "      pageMode='edit'",
      "      focusOn='~/otherSourcesOfIncome'",
      "    />,",
      "    prevOccupation:<ListPrevButton id={`${id}.prevOccupation`} title='Prev' list={state.copyWithLens(OccupationAndIncomeSummaryOptionals.currentOccupation(identityL))} value={state.copyWithLens(OccupationAndIncomeSummaryOptionals.selected(identityL))} />,}"
    ])
  } )

  it ( "should render a postcode button", () => {
    expect ( makeButtonsFrom ( paramsForTest, AllGuardCreator, makeButtons (), PostCodeMainPage,PostCodeMainPage ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "    {save:<RestButton state={state} id={`${id}.save`}  text='Save'",
      "      name='save'",
      "      action={'createWithoutFetch'}",
      "      validate={true}",
      "      rest='PostCodeMainPage_PostCodeNameAndAddressRestDetails'",
      "     />,",
      "    search:<ModalButton id={`${id}.search`} text='Search' dateFn={defaultDateFn} state={state} modal='PostCodeSearch' ",
      "      pageMode='edit'",
      "      focusOn='~/postcode'",
      "      copyOnClose={[{'from':'~/postcode/addressResults/line1','to':'~/main/line1'},{'from':'~/postcode/addressResults/line2','to':'~/main/line2'},{'from':'~/postcode/addressResults/line3','to':'~/main/line3'},{'from':'~/postcode/addressResults/line4','to':'~/main/line4'},{'from':'~/postcode/addressResults/postcode','to':'~/main/postcode'}]}",
      "      copyJustString={[{'from':'~/main/postcode','to':'~/postcode/search'}]}",
      "    />,}"
    ])
  } )

} )