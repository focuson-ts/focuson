import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from "@focuson/pages";
import { Context, FocusedProps, FState } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "../copied/guard";
import { GuardButton } from "../copied/GuardButton";
//if there is an error message here... did you set the importFrom on this modal correctly, and also check that the PageD links to this DataD in a domain or rest block
import {OccupationIncomeDetailsDDDomain} from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains'; 
import {OccupationIncomeDetailsDD} from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.render'
import {ListNextButton} from '../copied/listNextPrevButtons';
import {ListPrevButton} from '../copied/listNextPrevButtons';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '../copied/rest';
import {ValidationButton} from '../copied/ValidationButton';
export function OccupationIncomeModalPDPage(){
  return focusedPage<FState, OccupationIncomeDetailsDDDomain, Context> ( s => '' ) (//If there is a compilation here have you added this to the 'domain' of the main page
     ( state, d, mode ) => {
          const id='root';
          const buttons =    {cancel:<ModalCancelButton id='cancel' state={state} />,
              commit:<ModalCommitButton id='commit' validate={true}  state={state} />,
              validate:<ValidationButton  id='validate'   name='validate'  />,}
          return <div className='modalPage'>
           {/*{"dataDD":"OccupationIncomeDetailsDD","display":{"import":"","name":"OccupationIncomeDetailsDD","params":{"id":{"paramType":"object","needed":"id"},"state":{"paramType":"state","needed":"defaultToPath"},"mode":{"paramType":"object","needed":"no","default":"mode"},"ariaLabel":{"paramType":"string","needed":"no"}}},"path":[]}*/}
          <OccupationIncomeDetailsDD id={`${id}`} state={state} mode={mode} buttons={buttons} />
          { buttons.cancel } 
          { buttons.commit } 
          { buttons.validate } 
          </div>})}