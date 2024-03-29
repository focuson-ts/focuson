import { CreatePlanDD } from "./eAccountsSummary.dataD";
import { ExampleModalPage } from "../common";

/** this is a modal window, so it's target is controlled by the caller */
export const CreatePlanPD:ExampleModalPage = {
  name: 'CreatePlan',
  pageType: 'ModalPage',
  /** This page can only view data */
  modes: [ 'view', 'create', 'edit' ],
  /** How we display the page.*/
  display: { target: '', dataDD: CreatePlanDD},
  /** As well as displaying/editing the data we have these buttons. These are passed to layout */
  buttons: {
    cancel: { control: 'ModalCancelButton', confirm: 'It will start on {~/tempCreatePlan/createPlanStart}' },
    commit: { control: 'ModalCommitButton' }
  },
}