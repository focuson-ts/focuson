import { EAccountsSummaryPD } from "./eAccountsSummary.pageD";
import { CreateEAccountPageD } from "../createEAccount/createEAccount.pageD";
import { eAccountsSummaryRestD } from "./eAccountsSummary.restD";
import { CreatePlanDD, EAccountsSummaryDD } from "./eAccountsSummary.dataD";

//This allows us to make pact tests AND selenium tests
//The data can be inserted into the state directly, or by clicking on buttons
const eAccountsSummarySD: any = {
  createNewPlan: {
    for: EAccountsSummaryPD,
    initial: {
      pages: [ EAccountsSummaryPD ],
      commonIds: {},
    },
    actions: [
      { pagesAre: [ EAccountsSummaryPD ] },
      {
        fetcher: {
          rest: eAccountsSummaryRestD, status: 200, response: { data: EAccountsSummaryDD, sample: 0 },
          backend: [
            // this is particularly awesome because it jumps onto the server and validates that when we get this query we generate these queries
            //but even better we know what the resulting data is going to look like, so we have a contract test for api to oracle
            { sql: '', params: [] },
            { call: '', params: [] },
          ]
        },
      },
      { dataIs: { lens: [ 'EAccountsSummaryPD', 'fromApi' ], value: { sample: 0 } } },
      { button: EAccountsSummaryPD.buttons.createNewPlan },
      { pagesAre: [ EAccountsSummaryPD, CreateEAccountPageD ] },
      { pageDataIs: { lens: [ 'fromApi' ], sample: 0 } },
      { set: { input: CreatePlanDD.structure.createPlanStart, value: '2022-10-11' } },
      { set: { input: CreatePlanDD.structure.createPlanDate, value: '2022-10-13' } },
      { set: { input: CreatePlanDD.structure.createPlanEnd, value: '2022-10-15' } },
      { modalButton: 'commit' },
      { pageDataIs: { lens: [ 'fromApi' ], sample: 0, with: { lens: [], data: {} } } },
      {
        restIs: {},
        backend: [
          { sql: '', params: [] },
          { call: '', params: [] },
        ]
      },
      { processRest: { url: '', info: '', status: 200, response: {} } },
      { pageDataIs: { lens: [ 'fromApi' ], sample: 0, with: { lens: [], data: {} } } },
    ]
  }
}