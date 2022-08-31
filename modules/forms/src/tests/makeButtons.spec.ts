import { makeButtonsFrom, makeGuardButtonVariables } from "../codegen/makeButtons";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { makeButtons } from "../buttons/allButtons";

import { AllGuardCreator } from "../buttons/guardButton";
import { PostCodeMainPage } from "../example/postCodeDemo/addressSearch.pageD";
import { OccupationAndIncomeSummaryPD } from "../example/occupationAndIncome/occupationAndIncome.pageD";
import { paramsForTest } from "./paramsForTest";
import { EnabledByPageD } from "../example/enabledBy/enabledBy.pageD";


describe ( "makeButtons", () => {
  it ( "should generate a tsx line using that button", () => {
    expect ( makeButtonsFrom ( paramsForTest, AllGuardCreator, makeButtons (), EAccountsSummaryPD, EAccountsSummaryPD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "    {amendExistingPlan:<ModalButton id={`${id}.amendExistingPlan`} text='Amend Existing Plan' dateFn={defaultDateFn} state={state} modal='EAccountsSummary_CreatePlan' ",
      "      pageMode='edit'",
      "      focusOn={'~/tempCreatePlan'}",
      "      // If there is a compile error here the focuson path might not exist",
      "      focusOnLensForCompileCheck={pageState(state)<domain.EAccountsSummaryPageDomain>().focusOn('tempCreatePlan')}",
      "      buttonType={'secondary'}",
      "      copy={[{'from':'~/fromApi/createPlan'}]}",
      "       rest={{'name':'EAccountsSummary_CreatePlanRestDetails','restAction':'update'}}",
      "    />,",
      "    createNewPlan:<ModalButton id={`${id}.createNewPlan`} text='Create New Plan' dateFn={defaultDateFn} state={state} modal='EAccountsSummary_CreatePlan' ",
      "      pageMode='create'",
      "      focusOn={'~/tempCreatePlan'}",
      "      // If there is a compile error here the focuson path might not exist",
      "      focusOnLensForCompileCheck={pageState(state)<domain.EAccountsSummaryPageDomain>().focusOn('tempCreatePlan')}",
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
    ] )
  } )
  it ( "should create modal buttons with copy on close", () => {
    expect ( makeButtonsFrom ( paramsForTest, AllGuardCreator, makeButtons (), OccupationAndIncomeSummaryPD, OccupationAndIncomeSummaryPD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "    {addEntry:<ModalButton id={`${id}.addEntry`} text='Add Entry' dateFn={defaultDateFn} state={state} modal='OccupationAndIncomeSummary_OccupationIncomeModal' ",
      "      pageMode='create'",
      "      focusOn={'~/temp'}",
      "      // If there is a compile error here the focuson path might not exist",
      "      focusOnLensForCompileCheck={pageState(state)<domain.OccupationAndIncomeSummaryPageDomain>().focusOn('temp')}",
      "      copyOnClose={[{'to':'#currentOccupation/[$append]'}]}",
      "      createEmpty={empty.emptyOneOccupationIncomeDetails}",
      "      setToLengthOnClose={{'variable':'#selected','array':'#currentOccupation'}}",
      "    />,",
      "    additionalInfo:<ModalButton id={`${id}.additionalInfo`} text='Additional Info' dateFn={defaultDateFn} state={state} modal='OccupationAndIncomeSummary_AdditionalInformationModal' ",
      "      pageMode='edit'",
      "      focusOn={'~/additionalInformation'}",
      "      // If there is a compile error here the focuson path might not exist",
      "      focusOnLensForCompileCheck={pageState(state)<domain.OccupationAndIncomeSummaryPageDomain>().focusOn('additionalInformation')}",
      "    />,",
      "    businessDetails:<ModalButton id={`${id}.businessDetails`} text='Business Details' dateFn={defaultDateFn} state={state} modal='OccupationAndIncomeSummary_BusinessDetailsModal' ",
      "      pageMode='edit'",
      "      focusOn={'~/businessDetails'}",
      "      // If there is a compile error here the focuson path might not exist",
      "      focusOnLensForCompileCheck={pageState(state)<domain.OccupationAndIncomeSummaryPageDomain>().focusOn('businessDetails')}",
      "    />,",
      "    edit:<ModalButton id={`${id}.edit`} text='Edit' dateFn={defaultDateFn} state={state} modal='OccupationAndIncomeSummary_OccupationIncomeModal' ",
      "      pageMode='edit'",
      "      focusOn={'~/temp'}",
      "      // If there is a compile error here the focuson path might not exist",
      "      focusOnLensForCompileCheck={pageState(state)<domain.OccupationAndIncomeSummaryPageDomain>().focusOn('temp')}",
      "      copy={[{'from':'#currentOccupation[#selected]'}]}",
      "      copyOnClose={[{'to':'#currentOccupation[#selected]'}]}",
      "    />,",
      "    list:<ModalButton id={`${id}.list`} text='List' dateFn={defaultDateFn} state={state} modal='OccupationAndIncomeSummary_ListOccupationsModal' ",
      "      pageMode='edit'",
      "      focusOn={'~/searchList'}",
      "      // If there is a compile error here the focuson path might not exist",
      "      focusOnLensForCompileCheck={pageState(state)<domain.OccupationAndIncomeSummaryPageDomain>().focusOn('searchList')}",
      "      copy={[{'from':'#currentOccupation[#selected]/occupation','to':'~/searchList/search'},{'from':'#currentOccupation[#selected]/occupation','to':'~/searchList/selectedOccupationName'}]}",
      "      copyOnClose={[{'from':'~/searchList/selectedOccupationName','to':'#currentOccupation[#selected]/occupation'}]}",
      "    />,",
      "    mainOrJoint:<ToggleButton id={`${id}.mainOrJoint`} state={fullState.focusOn('mainOrJoint')}",
      "      buttonText='Showing {~/mainOrJoint|Main|Joint}'",
      "       />,",
      "    nextOccupation:<ListNextButton id={`${id}.nextOccupation`} title='Next' list={state.copyWithLens(OccupationAndIncomeSummaryOptionals.currentOccupation(identityL))} value={state.copyWithLens(OccupationAndIncomeSummaryOptionals.selected(identityL))} />,",
      "    otherSourcesOfIncome:<ModalButton id={`${id}.otherSourcesOfIncome`} text='Other Sources Of Income' dateFn={defaultDateFn} state={state} modal='OccupationAndIncomeSummary_OtherSourcesOfIncomeModal' ",
      "      pageMode='edit'",
      "      focusOn={'~/otherSourcesOfIncome'}",
      "      // If there is a compile error here the focuson path might not exist",
      "      focusOnLensForCompileCheck={pageState(state)<domain.OccupationAndIncomeSummaryPageDomain>().focusOn('otherSourcesOfIncome')}",
      "    />,",
      "    prevOccupation:<ListPrevButton id={`${id}.prevOccupation`} title='Prev' list={state.copyWithLens(OccupationAndIncomeSummaryOptionals.currentOccupation(identityL))} value={state.copyWithLens(OccupationAndIncomeSummaryOptionals.selected(identityL))}  />,}"
    ] )
  } )

  it ( "should render a postcode button", () => {
    expect ( makeButtonsFrom ( paramsForTest, AllGuardCreator, makeButtons (), PostCodeMainPage, PostCodeMainPage ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "    {save:<RestButton state={state} id={`${id}.save`}  text='Save'",
      "      name='save'",
      "      action={'createWithoutFetch'}",
      "      validate={true}",
      "      onSuccess={[{'command':'message','msg':'Saved'}]}",
      "      rest='PostCodeMainPage_PostCodeNameAndAddressRestDetails'",
      "     />,",
      "    search:<ModalButton id={`${id}.search`} text='Search' dateFn={defaultDateFn} state={state} modal='PostCodeMainPage_PostCodeSearch' ",
      "      pageMode='edit'",
      "      focusOn={'~/postcode'}",
      "      // If there is a compile error here the focuson path might not exist",
      "      focusOnLensForCompileCheck={pageState(state)<domain.PostCodeMainPagePageDomain>().focusOn('postcode')}",
      "      copyOnClose={[{'from':'~/postcode/addressResults/line1','to':'~/main/line1'},{'from':'~/postcode/addressResults/line2','to':'~/main/line2'},{'from':'~/postcode/addressResults/line3','to':'~/main/line3'},{'from':'~/postcode/addressResults/line4','to':'~/main/line4'},{'from':'~/postcode/addressResults/postcode','to':'~/main/postcode'}]}",
      "      copyJustString={[{'from':'~/main/postcode','to':'~/postcode/search'}]}",
      "    />,}"
    ] )
  } )
  it ( "should render buttons with guards", () => {
    expect ( makeButtonsFrom ( paramsForTest, AllGuardCreator, makeButtons (), EnabledByPageD, EnabledByPageD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "    {page:<ModalButton id={`${id}.page`} text='Page' dateFn={defaultDateFn} state={state} modal='EnabledBy_EnableByModalPage' ",
      "      pageMode='edit'",
      "      focusOn={'~/onChange'}",
      "      // If there is a compile error here the focuson path might not exist",
      "      focusOnLensForCompileCheck={pageState(state)<domain.EnabledByPageDomain>().focusOn('onChange')}",
      "      changeOnClose={{'command':'message','msg':'from modal button'}}",
      "    />,",
      "    pageGuardDirect:<GuardButton cond={pageGuardDirectGuard}>",
      "      <ModalButton id={`${id}.pageGuardDirect`} text='Page Guard Direct' dateFn={defaultDateFn} state={state} modal='EnabledBy_EnableByModalPage' ",
      "        pageMode='edit'",
      "        focusOn={'~/onChange'}",
      "        // If there is a compile error here the focuson path might not exist",
      "        focusOnLensForCompileCheck={pageState(state)<domain.EnabledByPageDomain>().focusOn('onChange')}",
      "      />",
      "    </GuardButton>,",
      "    pageGuardName:<GuardButton cond={dropdownYesGuard}>",
      "      <ModalButton id={`${id}.pageGuardName`} text='Page Guard Name' dateFn={defaultDateFn} state={state} modal='EnabledBy_EnableByModalPage' ",
      "        pageMode='edit'",
      "        focusOn={'~/onChange'}",
      "        // If there is a compile error here the focuson path might not exist",
      "        focusOnLensForCompileCheck={pageState(state)<domain.EnabledByPageDomain>().focusOn('onChange')}",
      "      />",
      "    </GuardButton>,}"
    ])

  } )
  it ( "should make guard variables for buttons with guards", () => {
    expect ( makeGuardButtonVariables ( paramsForTest, AllGuardCreator, EnabledByPageD, EnabledByPageD ) ).toEqual ( [
      "const pageGuardDirectGuard =  state.focusOn('dropdown').optJson() === \"Y\"? []:[\"guard for pageGuardDirect is not valid\"]"
    ] )

  } )

} )