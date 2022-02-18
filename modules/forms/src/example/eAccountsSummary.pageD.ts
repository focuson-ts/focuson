import { CreatePlanDD, EAccountsSummaryDD } from "./eAccountsSummary.dataD";
import { createPlanRestD, eAccountsSummaryRestD } from "./eAccountsSummary.restD";
import { PageD } from "../common/pageD";


/** This is the 'bringing it all together */
export const EAccountsSummaryPD: PageD = {
  name: 'EAccountsSummary',
  pageType: 'MainPage',
  /** Where we are in the state. We 'could' and maybe should defualt this to name*/
  path: [ 'eAccountsSummary' ],
  /** This page can only view data */
  modes: [ 'view' ],
  /** How we display the page.*/
  display: { layout: { name: 'Layout', details: '[1][3,3][5]' }, target: [ 'fromApi' ], dataDD: EAccountsSummaryDD },
  /** When the page is selected for the first time this is the initial state */
  initialValue: {},
  /** This defines the domain data structures in react*/
  domain: {
    fromApi: { dataDD: EAccountsSummaryDD },
    temp: { dataDD: EAccountsSummaryDD },
    createPlan: { dataDD: EAccountsSummaryDD } //TDB
  },


  /** Binds the rest to 'where it takes place'. So we have these rest actions, and the gui data is at the location defined by 'targetFromPath'. Fetcher 'true' means set up a fetcher to go get the data when the page is selected */
  rest: {
    eAccountsSummary: { rest: eAccountsSummaryRestD, targetFromPath: 'fromApi', fetcher: true },
    /** this will probably need to specify 'the current' plan in some way */
    createPlanRestD: { rest: createPlanRestD, targetFromPath: 'createPlan' }
  },
  /** As well as displaying/editing the data we have these buttons. These are passed to layout */
  buttons: {
    createNewPlan: { control: 'ModalButton', modal: 'createPlan', mode: 'create', tempData: 'temp', restOnCommit: { rest: 'createPlanRestD', action: 'create' } },
    //questions: how do we know which is the existing plan... is there a list? are we an entry in the list? do we need to navigate to it?
    amendExistingPlan: { control: 'ModalButton', modal: 'createPlan', mode: 'edit', mainData: 'fromApi', tempData: 'temp', restOnCommit: { rest: 'createPlanRestD', action: 'update' } },
    deleteExistingPlan: { control: 'RestButton', rest: 'createPlanRestD', action: 'delete', confirm: true },
    refresh: { control: 'RestButton', rest: 'exportAccountsSummary', action: 'get' },
    requestInfo: { control: 'ModalButton', modal: 'requestInfo', mode: 'view', mainData: 'TDB', tempData: 'TBD' },
  }
}

/** this is a modal window, so it's target is controlled by the caller */
export const createPlanPD: PageD = {
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