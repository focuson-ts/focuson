import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import { focusedPage, focusedPageWithExtraState, fullState, pageState } from "@focuson/pages";
import { Context, FocusedProps, FState, identityL } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "@focuson/form_components";
import { GuardButton } from "@focuson/form_components";
//if there is an error message here... did you set the importFrom on this modal correctly, and also check that the PageD links to this DataD in a domain or rest block
import { MainOccupationDetailsPageSummaryPageDomain, OneOccupationIncomeDetailsDomain } from '../MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.domains';
import { OneOccupationIncomeDetails } from '../MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.render'
import { ListNextButton } from '@focuson/form_components';
import { ListPrevButton } from '@focuson/form_components';
import { ModalButton } from '@focuson/pages';
import { ModalCancelButton } from '@focuson/pages';
import { ModalCommitButton } from '@focuson/pages';
import { RestButton } from '@focuson/form_components';
import { ToggleButton } from '@focuson/form_components';
import { ValidationButton } from '@focuson/form_components';
import { HideButtonsLayout } from '@focuson/form_components';
import { OccupationAndIncomeSummaryPageDomain } from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains";

export function OccupationIncomeModalPage () {
  return focusedPage<FState, OneOccupationIncomeDetailsDomain, Context> ( s => '' ) (//If there is a compilation here have you added this to the 'domain' of the main page
    ( state, d, mode ) => {
      const additionalInfoFirstGuard = pageState( state )<MainOccupationDetailsPageSummaryPageDomain>().focusOn ( 'tempForOccupationEdit' ).focusOn ( 'areYou' ).optJson () === "E";
      const additionalInfoSecondGuard = pageState ( state )<MainOccupationDetailsPageSummaryPageDomain>().focusOn ( 'MainOccupationDetailsPageSummary' ).focusOn ( 'temp' ).focusOn ( 'areYou' ).optJson () === "S";
      const otherSourcesOfIncomeGuard = fullState.focusOn ( 'fromApi' ).focusOn ( 'occupationAndIncome' ).focusOn ( 'customerOccupationIncomeDetails' ).focusOn ( 'otherSourceOfIncome' ).optJson () === "Y";
      const id = 'root';
      const buttons = {
        additionalInfoFirst: <GuardButton cond={additionalInfoFirstGuard}>
          <ModalButton id='additionalInfoFirst' text='additionalInfoFirst' state={state} modal='AdditionalInfoFirstModal'
                       pageMode='view'
                       focusOn='~/tempForAdditionalInfoFirst'
                       copy={[ { "from": "~/fromApi/additionalInfoFirst" } ]}
                       copyOnClose={[ { "to": "~/fromApi/additionalInfoFirst" } ]}
          />
        </GuardButton>,
        additionalInfoSecond: <GuardButton cond={additionalInfoSecondGuard}>
          <ModalButton id='additionalInfoSecond' text='additionalInfoSecond' state={state} modal='AdditionalInfoSecondModal'
                       pageMode='edit'
                       focusOn='~/tempForAdditionalInfoSecond'
                       copy={[ { "from": "~/fromApi/additionalInfoSecond" } ]}
                       copyOnClose={[ { "to": "~/fromApi/additionalInfoSecond" } ]}
          />
        </GuardButton>,
        cancel: <ModalCancelButton id='cancel' state={state}/>,
        commit: <ModalCommitButton id='commit' state={state}/>,
        list: <ModalButton id='list' text='list' state={state} modal='ListOccupationsModal'
                           pageMode='edit'
                           focusOn='~/fromApi/occupation'
                           copy={[ { "from": "~/fromApi/occupationAndIncome/customerOccupationIncomeDetails/occupation", "to": "~/fromApi/occupation/search" }, { "from": "~/fromApi/occupationAndIncome/customerOccupationIncomeDetails/occupation", "to": "~/fromApi/occupation/selectedOccupationName" }, { "from": "~/fromApi/occupationsList", "to": "~/fromApi/occupation/searchResults" } ]}
                           copyOnClose={[ { "from": "~/fromApi/occupation/selectedOccupationName", "to": "~/fromApi/occupationAndIncome/customerOccupationIncomeDetails/occupation" } ]}
        />,
        otherSourcesOfIncome: <GuardButton cond={otherSourcesOfIncomeGuard}>
          <ModalButton id='otherSourcesOfIncome' text='otherSourcesOfIncome' state={state} modal='OtherSourcesOfIncomeModal'
                       pageMode='edit'
                       focusOn='~/tempForOtherSourcesOfIncome'
                       copy={[ { "from": "~/fromApi/otherSourcesOfIncome" } ]}
                       copyOnClose={[ { "to": "~/fromApi/otherSourcesOfIncome" } ]}
          />
        </GuardButton>,
      }
      return <HideButtonsLayout buttons={buttons} hide={[ "additionalInfoFirst", "additionalInfoSecond", "otherSourcesOfIncome", "list" ]}>
        <OneOccupationIncomeDetails id={`${id}`} state={state} mode={mode} buttons={buttons}/>
        {buttons.cancel}
        {buttons.commit}
        {buttons.additionalInfoFirst}
        {buttons.additionalInfoSecond}
        {buttons.otherSourcesOfIncome}
        {buttons.list}
      </HideButtonsLayout>
    } )
}