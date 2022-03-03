import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import * as samples from './samples';
import {emptyState, FState } from "./common";
import * as fetchers from "./fetchers";
//Rest create pact test
pactWith ( { consumer: 'OccupationAndIncome', provider: 'OccupationAndIncomeProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeDetails', () => {
    it ( 'should have a create rest for OccupationAndIncome', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeDetails should have a create rest for OccupationAndIncome',
        withRequest: {
          method: 'POST',
          path: '/api/oneOccupationAndIncome',
          query:{"customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleOccupationAndIncome0
        },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'OccupationAndIncomeDetails', pageMode: 'view' }] , OccupationAndIncomeDetails: { }}
      let newState = await loadTree ( {tree}, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... firstState,
        OccupationAndIncomeDetails: {fromApi: samples.sampleOccupationAndIncome0},
        tags: { OccupationAndIncomeDetails_fromApi:["custId"] }
      } )
    } )
  } )
})
//Rest update pact test
pactWith ( { consumer: 'OccupationAndIncome', provider: 'OccupationAndIncomeProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeDetails', () => {
    it ( 'should have a update rest for OccupationAndIncome', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeDetails should have a update rest for OccupationAndIncome',
        withRequest: {
          method: 'PUT',
          path: '/api/oneOccupationAndIncome',
          query:{"customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleOccupationAndIncome0
        },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'OccupationAndIncomeDetails', pageMode: 'view' }] , OccupationAndIncomeDetails: { }}
      let newState = await loadTree ( {tree}, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... firstState,
        OccupationAndIncomeDetails: {fromApi: samples.sampleOccupationAndIncome0},
        tags: { OccupationAndIncomeDetails_fromApi:["custId"] }
      } )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'OccupationAndIncome', provider: 'OccupationAndIncomeProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeDetails', () => {
    it ( 'should have a get rest for OccupationAndIncome', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeDetails should have a get rest for OccupationAndIncome',
        withRequest: {
          method: 'GET',
          path: '/api/oneOccupationAndIncome',
          query:{"customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleOccupationAndIncome0
        },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'OccupationAndIncomeDetails', pageMode: 'view' }] , OccupationAndIncomeDetails: { }}
      let newState = await loadTree ( {tree}, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... firstState,
        OccupationAndIncomeDetails: {fromApi: samples.sampleOccupationAndIncome0},
        tags: { OccupationAndIncomeDetails_fromApi:["custId"] }
      } )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'CreatePlanDD', provider: 'CreatePlanDDProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary', () => {
    it ( 'should have a get rest for CreatePlanDD', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a get rest for CreatePlanDD',
        withRequest: {
          method: 'GET',
          path: '/api/createPlan/{createPlanId}',
          query:{"accountId":"accId","createPlanId":"tbd","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreatePlanDD0
        },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'EAccountsSummary', pageMode: 'view' }] , EAccountsSummary: { }}
      let newState = await loadTree ( {tree}, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... firstState,
        EAccountsSummary: {fromApi: samples.sampleCreatePlanDD0},
        tags: { EAccountsSummary_fromApi:["accId","tbd","custId"] }
      } )
    } )
  } )
})
//Rest create pact test
pactWith ( { consumer: 'CreatePlanDD', provider: 'CreatePlanDDProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary', () => {
    it ( 'should have a create rest for CreatePlanDD', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a create rest for CreatePlanDD',
        withRequest: {
          method: 'POST',
          path: '/api/createPlan/{createPlanId}',
          query:{"accountId":"accId","createPlanId":"tbd","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreatePlanDD0
        },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'EAccountsSummary', pageMode: 'view' }] , EAccountsSummary: { }}
      let newState = await loadTree ( {tree}, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... firstState,
        EAccountsSummary: {fromApi: samples.sampleCreatePlanDD0},
        tags: { EAccountsSummary_fromApi:["accId","tbd","custId"] }
      } )
    } )
  } )
})
//Rest update pact test
pactWith ( { consumer: 'CreatePlanDD', provider: 'CreatePlanDDProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary', () => {
    it ( 'should have a update rest for CreatePlanDD', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a update rest for CreatePlanDD',
        withRequest: {
          method: 'PUT',
          path: '/api/createPlan/{createPlanId}',
          query:{"accountId":"accId","createPlanId":"tbd","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreatePlanDD0
        },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'EAccountsSummary', pageMode: 'view' }] , EAccountsSummary: { }}
      let newState = await loadTree ( {tree}, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... firstState,
        EAccountsSummary: {fromApi: samples.sampleCreatePlanDD0},
        tags: { EAccountsSummary_fromApi:["accId","tbd","custId"] }
      } )
    } )
  } )
})
//Rest delete pact test
pactWith ( { consumer: 'CreatePlanDD', provider: 'CreatePlanDDProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary', () => {
    it ( 'should have a delete rest for CreatePlanDD', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a delete rest for CreatePlanDD',
        withRequest: {
          method: 'DELETE',
          path: '/api/createPlan/{createPlanId}',
          query:{"accountId":"accId","createPlanId":"tbd","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreatePlanDD0
        },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'EAccountsSummary', pageMode: 'view' }] , EAccountsSummary: { }}
      let newState = await loadTree ( {tree}, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... firstState,
        EAccountsSummary: {fromApi: samples.sampleCreatePlanDD0},
        tags: { EAccountsSummary_fromApi:["accId","tbd","custId"] }
      } )
    } )
  } )
})
//Rest list pact test
pactWith ( { consumer: 'CreatePlanDD', provider: 'CreatePlanDDProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary', () => {
    it ( 'should have a list rest for CreatePlanDD', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a list rest for CreatePlanDD',
        withRequest: {
          method: 'GET',
          path: '/api/createPlan/{createPlanId}',
          query:{"accountId":"accId","createPlanId":"tbd","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreatePlanDD0
        },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'EAccountsSummary', pageMode: 'view' }] , EAccountsSummary: { }}
      let newState = await loadTree ( {tree}, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... firstState,
        EAccountsSummary: {fromApi: samples.sampleCreatePlanDD0},
        tags: { EAccountsSummary_fromApi:["accId","tbd","custId"] }
      } )
    } )
  } )
})
//GetFetcher pact test
pactWith ( { consumer: 'EAccountsSummaryDD', provider: 'EAccountsSummaryDDProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary', () => {
    it ( 'should have a get fetcher for EAccountsSummaryDD', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a get fetcher for EAccountsSummaryDD',
        withRequest: {
          method: 'GET',
          path: '/api/accountsSummary',
          query:{"accountId":"accId","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleEAccountsSummaryDD0
        },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'EAccountsSummary', pageMode: 'view' }] , EAccountsSummary: { }}
      let newState = await loadTree ( fetchers.fetchers, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... firstState,
        EAccountsSummary: {fromApi: samples.sampleEAccountsSummaryDD0},
        tags: { EAccountsSummary_fromApi:["accId","custId"] }
      } )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'EAccountsSummaryDD', provider: 'EAccountsSummaryDDProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary', () => {
    it ( 'should have a get rest for EAccountsSummaryDD', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a get rest for EAccountsSummaryDD',
        withRequest: {
          method: 'GET',
          path: '/api/accountsSummary',
          query:{"accountId":"accId","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleEAccountsSummaryDD0
        },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'EAccountsSummary', pageMode: 'view' }] , EAccountsSummary: { }}
      let newState = await loadTree ( {tree}, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... firstState,
        EAccountsSummary: {fromApi: samples.sampleEAccountsSummaryDD0},
        tags: { EAccountsSummary_fromApi:["accId","custId"] }
      } )
    } )
  } )
})
//Rest create pact test
pactWith ( { consumer: 'ETransferDataD', provider: 'ETransferDataDProvider', cors: true }, provider => {
  describe ( 'ETransfer', () => {
    it ( 'should have a create rest for ETransferDataD', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'ETransfer should have a create rest for ETransferDataD',
        withRequest: {
          method: 'POST',
          path: '/api/eTransfers',
          query:{"customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleETransferDataD0
        },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'ETransfer', pageMode: 'view' }] , ETransfer: { }}
      let newState = await loadTree ( {tree}, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... firstState,
        ETransfer: {fromApi: samples.sampleETransferDataD0},
        tags: { ETransfer_fromApi:["custId"] }
      } )
    } )
  } )
})
//Rest create pact test
pactWith ( { consumer: 'CreateEAccountDataDD', provider: 'CreateEAccountDataDDProvider', cors: true }, provider => {
  describe ( 'CreateEAccount', () => {
    it ( 'should have a create rest for CreateEAccountDataDD', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'CreateEAccount should have a create rest for CreateEAccountDataDD',
        withRequest: {
          method: 'POST',
          path: '/api/createEAccount/{createPlanId}',
          query:{"accountId":"accId","createPlanId":"tbd","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreateEAccountDataDD0
        },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'CreateEAccount', pageMode: 'view' }] , CreateEAccount: { }}
      let newState = await loadTree ( {tree}, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... firstState,
        CreateEAccount: {editing: samples.sampleCreateEAccountDataDD0},
        tags: { CreateEAccount_editing:["accId","tbd","custId"] }
      } )
    } )
  } )
})
//GetFetcher pact test
pactWith ( { consumer: 'ChequeCreditbooksDD', provider: 'ChequeCreditbooksDDProvider', cors: true }, provider => {
  describe ( 'ChequeCreditbooks', () => {
    it ( 'should have a get fetcher for ChequeCreditbooksDD', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'ChequeCreditbooks should have a get fetcher for ChequeCreditbooksDD',
        withRequest: {
          method: 'GET',
          path: '/api/chequeCreditBooks',
          query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleChequeCreditbooksDD0
        },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'ChequeCreditbooks', pageMode: 'view' }] , ChequeCreditbooks: { }}
      let newState = await loadTree ( fetchers.fetchers, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... firstState,
        ChequeCreditbooks: {fromApi: samples.sampleChequeCreditbooksDD0},
        tags: { ChequeCreditbooks_fromApi:["accId","appref","brandRef","custId"] }
      } )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'ChequeCreditbooksDD', provider: 'ChequeCreditbooksDDProvider', cors: true }, provider => {
  describe ( 'ChequeCreditbooks', () => {
    it ( 'should have a get rest for ChequeCreditbooksDD', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'ChequeCreditbooks should have a get rest for ChequeCreditbooksDD',
        withRequest: {
          method: 'GET',
          path: '/api/chequeCreditBooks',
          query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleChequeCreditbooksDD0
        },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'ChequeCreditbooks', pageMode: 'view' }] , ChequeCreditbooks: { }}
      let newState = await loadTree ( {tree}, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... firstState,
        ChequeCreditbooks: {fromApi: samples.sampleChequeCreditbooksDD0},
        tags: { ChequeCreditbooks_fromApi:["accId","appref","brandRef","custId"] }
      } )
    } )
  } )
})
//Rest create pact test
pactWith ( { consumer: 'ChequeCreditbooksDD', provider: 'ChequeCreditbooksDDProvider', cors: true }, provider => {
  describe ( 'ChequeCreditbooks', () => {
    it ( 'should have a create rest for ChequeCreditbooksDD', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'ChequeCreditbooks should have a create rest for ChequeCreditbooksDD',
        withRequest: {
          method: 'POST',
          path: '/api/chequeCreditBooks',
          query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleChequeCreditbooksDD0
        },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'ChequeCreditbooks', pageMode: 'view' }] , ChequeCreditbooks: { }}
      let newState = await loadTree ( {tree}, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... firstState,
        ChequeCreditbooks: {fromApi: samples.sampleChequeCreditbooksDD0},
        tags: { ChequeCreditbooks_fromApi:["accId","appref","brandRef","custId"] }
      } )
    } )
  } )
})