import { EAccountsSummaryDD } from "./example.dataD";

export const commonParams = {
  customerId: { commonLens: [ 'customerId' ] },
  accountId: { commonLens: [ 'accountId' ] },
}

/** This should fully define the api*/
const exportAccountsSummaryRestD: any = {
  params: { ...commonParams },
  dataDD: EAccountsSummaryDD,
  url: '/api/accountsSummary?accountId={accountId}&customerId={customerId}',
  actions: [ 'get' ],
}
const createPlanRestD: any = {
  params: { ...commonParams, createPlanId: { lens: [ 'TBD' ] } },
  dataDD: 'not sure',
  url: '/api/createPlan/{createPlanId}?accountId={accountId}&customerId={customerId}',
  actions: [ 'get', 'create', 'update', 'delete' ],
}

/** This is the 'bringing it all together */
export const EAccountsSummaryPD: any = {
  modal: false,
  /** Where we are in the state */
  path: [ 'eAccountsSummary' ],
  /** This page can only view data */
  modes: [ 'view' ],
  /** How we display the page.*/
  display: { layout: '', target: [ 'fromApi' ], dataDD: EAccountsSummaryDD },
  /** When the page is selected for the first time this is the initial state */
  initialValue: {},
  /** This defines the domain data structures in react*/
  domain: {
    fromApi: { dataDD: EAccountsSummaryDD },
    temp: { dataDD: EAccountsSummaryDD },
    createPlan: 'TBD'
  },

  /** Binds the rest to 'where it takes place'. So we have these rest actions, and the gui data is at the location defined by 'targetFromPath'. Fetcher 'true' means set up a fetcher to go get the data when the page is selected */
  rest: {
    exportAccountsSummary: { rest: exportAccountsSummaryRestD, targetFromPath: 'fromApi', fetcher: true },
    createPlanRestD: { rest: createPlanRestD, targetFromPath: 'createPlan' }
  },
  /** As well as displaying/editing the data we have these buttons. These are passed to layout */
  buttons: {
    createNewPlan: { control: 'ModalButton', modal: 'createPlan', mode: 'create', tempData: 'temp', restOnCommit: { rest: 'createPlanRestD', action: 'create' } },
    //questions: how do we know which is the existing plan... is there a list? are we an entry in the list? do we need to navigate to it?
    amendExistingPlan: { control: 'ModalButton', modal: 'createPlan', mode: 'edit', mainData: 'fromApi', tempData: 'temp', restOnCommit: { rest: 'createPlanRestD', action: 'update' } },
    deleteExistingPlan: { control: 'RestButton', rest: 'createPlanRestD', action: 'delete', confirm: true },
    refresh: { control: 'RestButton', rest: 'exportAccountsSummary', action: 'get' },
    requestInfo: { control: 'ModalButton', modal: 'requestInfo' },
  }
}

/** this is a modal window, so it's target is controlled by the caller */
export const createPlanPD: any = {
  modal: true,
  /** This page can only view data */
  modes: [ 'view', 'create', 'edit' ],
  /** How we display the page.*/
  display: { layout: 'TDB', target: [], dataDD: 'Not created yet' },
  /** As well as displaying/editing the data we have these buttons. These are passed to layout */
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  }
}