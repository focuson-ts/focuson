import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState, fullState, pageState} from "@focuson/pages";
import { Context, FocusedProps, FState, identityL } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "@focuson/form_components";
import { GuardButton } from "@focuson/form_components";
//if there is an error message here... did you set the importFrom on this modal correctly, and also check that the PageD links to this DataD in a domain or rest block
import {OneOccupationIncomeDetailsDomain} from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains'; 
import {OneOccupationIncomeDetails} from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.render'
import {ListNextButton} from '@focuson/form_components';
import {ListPrevButton} from '@focuson/form_components';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '@focuson/form_components';
import {ToggleButton} from '@focuson/form_components';
import {ValidationButton} from '@focuson/form_components';
export function OccupationIncomeModalPage(){
  return focusedPage<FState, OneOccupationIncomeDetailsDomain, Context> ( s => '' ) (//If there is a compilation here have you added this to the 'domain' of the main page
     ( state, d, mode ) => {
          const id='root';
          const buttons =    {cancel:<ModalCancelButton id='cancel' state={state} />,
              commit:<ModalCommitButton id='commit'  state={state} />,
              list:<ModalButton id='list' text='list'  state={state} modal = 'ListOccupationsModal'  
                pageMode='edit'
                focusOn='~/searchList'
                copy={[{"from":"~/fromApi/customerOccupationIncomeDetails[~/selectedItem]/occupation"}]}
                copyOnClose={[{"to":"~/fromApi/customerOccupationIncomeDetails[~/selectedItem]/occupation"}]}
              />,
              otherSourcesOfIncome:<ModalButton id='otherSourcesOfIncome' text='otherSourcesOfIncome'  state={state} modal = 'OtherSourcesOfIncomeModal'  
                pageMode='edit'
                focusOn='~/otherSourcesOfIncome'
              />,}
          return <>
          <OneOccupationIncomeDetails id={`${id}`} state={state} mode={mode} buttons={buttons} />
          { buttons.cancel } 
          { buttons.commit } 
          { buttons.list } 
          { buttons.otherSourcesOfIncome } 
          </>})}