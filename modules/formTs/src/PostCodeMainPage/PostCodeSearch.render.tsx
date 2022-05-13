import * as empty from '../PostCodeMainPage/PostCodeMainPage.empty';
import * as domain from '../PostCodeMainPage/PostCodeMainPage.domains';
import * as render from "./PostCodeMainPage.render";
import { LensProps } from "@focuson/state";
import { FocusOnContext } from '@focuson/focuson';
import {  focusedPage, focusedPageWithExtraState, fullState, pageState} from "@focuson/pages";
import { Context, FocusedProps, FState, identityL } from "../common";
import { Lenses } from '@focuson/lens';
import { Guard } from "@focuson/form_components";
import { GuardButton } from "@focuson/form_components";
//if there is an error message here... did you set the importFrom on this modal correctly, and also check that the PageD links to this DataD in a domain or rest block
import {PostCodeSearchDomain} from '../PostCodeMainPage/PostCodeMainPage.domains'; 
import {PostCodeSearch} from '../PostCodeMainPage/PostCodeMainPage.render'
import {DeleteStateButton} from '@focuson/form_components';
import {ListNextButton} from '@focuson/form_components';
import {ListPrevButton} from '@focuson/form_components';
import {ModalButton} from '@focuson/pages';
import {ModalCancelButton} from '@focuson/pages';
import {ModalCommitButton} from '@focuson/pages';
import {RestButton} from '@focuson/form_components';
import {ToggleButton} from '@focuson/form_components';
import {ValidationButton} from '@focuson/form_components';
export function PostCodeSearchPage(){
  return focusedPage<FState, PostCodeSearchDomain, Context> ( s => '' ) (//If there is a compilation here have you added this to the 'domain' of the main page
     ( state, d, mode, index ) => {
          const id=`page${index}`;
          const allButtons =    {cancel:<ModalCancelButton id={`${id}.cancel`} state={state} />,
              commit:<ModalCommitButton id={`${id}.commit`}   state={state} />,}
          return <>
          <PostCodeSearch id={`${id}`} state={state} mode={mode} label='' allButtons={allButtons} />
          { allButtons.cancel } 
          { allButtons.commit } 
          </>})}