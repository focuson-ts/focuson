import { CreatePlanDD, EAccountsSummaryDD } from "./eAccountsSummary.dataD";
import { createPlanRestD, eAccountsSummaryRestD } from "./eAccountsSummary.restD";
import { CreatePlanPD } from "./createPlanPD";
import { ExampleMainPage } from "../common";


/** This is the 'bringing it all together */
export const EAccountsSummaryPD: ExampleMainPage = {
  name: 'EAccountsSummary',
  pageType: 'MainPage',
  /** This page can only view data */
  modes: [ 'view' ],
  /** How we display the page.*/
  display: { target: '~/fromApi', dataDD: EAccountsSummaryDD },
  /** When the page is selected for the first time this is the initial state */
  initialValue: {},
  /** This defines the domain data structures in react*/
  domain: {
    fromApi: { dataDD: EAccountsSummaryDD },
    tempCreatePlan: { dataDD: CreatePlanDD },
    createPlan: { dataDD: EAccountsSummaryDD } //TDB
  },
  modals: [ { modal: CreatePlanPD } ],
  /** Binds the rest to 'where it takes place'. So we have these rest actions, and the gui data is at the location defined by 'targetFromPath'. Fetcher 'true' means set up a fetcher to go get the data when the page is selected */
  rest: {
    eAccountsSummary: { rest: eAccountsSummaryRestD, targetFromPath: '~/fromApi', fetcher: true },
    /** this will probably need to specify 'the current' plan in some way */
    createPlanRestD: { rest: createPlanRestD, targetFromPath: '~/tempCreatePlan' }
  },
  /** As well as displaying/editing the data we have these buttons. These are passed to layout */
  buttons: {                                                                      //interestingly these will be type checked in the target system...
    createNewPlan: {
      control: 'ModalButton', modal: CreatePlanPD, mode: 'create',
      createEmpty: CreatePlanDD,
      focusOn: '~/tempCreatePlan',//not type checked here... should be type checked in target
      restOnCommit: { restName: 'createPlanRestD', action: 'create', result: 'refresh' }
    },
    //questions: how do we know which is the existing plan... is there a list? are we an entry in the list? do we need to navigate to it?
    amendExistingPlan: {
      control: 'ModalButton', modal: CreatePlanPD, mode: 'edit',
      focusOn: '~/tempCreatePlan',
      copy: { from: '~/fromApi/createPlan' },
      restOnCommit: { restName: 'createPlanRestD', action: 'update', result: 'refresh' }
    },
    deleteExistingPlan: { control: 'RestButton', restName: 'createPlanRestD', action: 'delete', confirm: true, result: 'refresh' },
    // refresh: { control: 'ResetStateButton' },
    // requestInfo: { control: 'ModalButton', modal: CreatePlanPD, mode: 'view', mainData: 'TDB', tempData: 'TBD' },
  }
}

