import { PageD } from "../../common/pageD";
import { CreatePlanDD } from "./eAccountsSummary.dataD";
import { AllButtonsInPage } from "../../buttons/allButtons";

/** this is a modal window, so it's target is controlled by the caller */
export const CreatePlanPD: PageD<AllButtonsInPage> = {
  name: 'CreatePlan',
  pageType: 'ModalPage',
  /** This page can only view data */
  modes: [ 'view', 'create', 'edit' ],
  /** How we display the page.*/
  display: { layout: { name: 'Layout', details: '[3]' }, target: [], dataDD: CreatePlanDD },
  /** As well as displaying/editing the data we have these buttons. These are passed to layout */
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  },
  //Not sure what to do about these
  domain: {},
  initialValue: {},
  rest: {}
}