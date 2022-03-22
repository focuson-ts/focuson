import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from "@focuson/pages";
import { Context, FocusedProps, FState } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "../formComponents/guard";
import { GuardButton } from "../formComponents/guardButton";
//if there is an error message here... did you set the importFrom on this modal correctly, and also check that the PageD links to this DataD in a domain or rest block
import {AccountOverviewHistoryDomain} from '../AccountOverview/AccountOverview.domains'; 
import {AccountOverviewHistory} from '../AccountOverview/AccountOverview.render'
import {ListNextButton} from '../formComponents/listNextPrevButtons';
import {ListPrevButton} from '../formComponents/listNextPrevButtons';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '../formComponents/rest';
import {ToggleButton} from '../formComponents/toggleButton';
import {ValidationButton} from '../formComponents/validationButton';
export function ExcessHistoryPage(){
  return focusedPage<FState, AccountOverviewHistoryDomain, Context> ( s => '' ) (//If there is a compilation here have you added this to the 'domain' of the main page
     ( state, d, mode ) => {
          const id='root';
          const buttons =    {cancel:<ModalCancelButton id='cancel' state={state} />,
              commit:<ModalCommitButton id='commit'  state={state} />,
              details:<ModalButton id='details' text='details'  state={state} modal = 'ArrearsDetails'  
                pageMode='view'
                focusOn={["{basePage}","arrearsDetails"]}
              />,}
          return <>
          <AccountOverviewHistory id={`${id}`} state={state} mode={mode} buttons={buttons} />
          { buttons.cancel } 
          { buttons.commit } 
          { buttons.details } 
          </>})}