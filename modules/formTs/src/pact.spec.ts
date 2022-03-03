import { defaultDateFn, fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree, wouldLoad } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { applyToTemplate, url } from "@focuson/template";
import * as samples from './samples';
import { commonIds, emptyState, FState } from "./common";
import * as fetchers from "./fetchers";
import * as rests from "./rests";
import { OccupationAndIncomeDetails_OccupationAndIncomeRestDetails } from "./rests";
import { Lenses } from "@focuson/lens";
//Rest create pact test
pactWith ( { consumer: 'OccupationAndIncome', provider: 'OccupationAndIncomeProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeDetails', () => {
    it ( 'should have a create rest for OccupationAndIncome', async () => {
      const restCommand: RestCommand = { name: 'OccupationAndIncomeDetails_OccupationAndIncomeRestDetails', restAction: 'create', path: [ 'OccupationAndIncomeDetails' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
        OccupationAndIncomeDetails: { fromApi: samples.sampleOccupationAndIncome0 },
        pageSelection: [ { pageName: 'OccupationAndIncomeDetails', pageMode: 'view' } ]
      }
      const url = applyToTemplate ( '/api/oneOccupationAndIncome', firstState.CommonIds ).join ( '' )
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeDetails should have a create rest for OccupationAndIncome',
        withRequest: {
          method: 'POST',
          path: url,
          query: { "customerId": "custId" }
          , body: JSON.stringify ( samples.sampleOccupationAndIncome0 )
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleOccupationAndIncome0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL (), restL (), firstState )
      expect ( { ...newState, messages: [] } ).toEqual ( { ...firstState, restCommands: [], OccupationAndIncomeDetails: { fromApi: samples.sampleOccupationAndIncome0 } } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg ).toMatch ( /^200.*/ )
    } )
  } )
} )
//Rest update pact test
pactWith ( { consumer: 'OccupationAndIncome', provider: 'OccupationAndIncomeProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeDetails', () => {
    it ( 'should have a update rest for OccupationAndIncome', async () => {
      const restCommand: RestCommand = { name: 'OccupationAndIncomeDetails_OccupationAndIncomeRestDetails', restAction: 'update', path: [ 'OccupationAndIncomeDetails' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
        OccupationAndIncomeDetails: { fromApi: samples.sampleOccupationAndIncome0 },
        pageSelection: [ { pageName: 'OccupationAndIncomeDetails', pageMode: 'view' } ]
      }
      const url = applyToTemplate ( '/api/oneOccupationAndIncome', firstState.CommonIds ).join ( '' )
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeDetails should have a update rest for OccupationAndIncome',
        withRequest: {
          method: 'PUT',
          path: url,
          query: { "customerId": "custId" }
          , body: JSON.stringify ( samples.sampleOccupationAndIncome0 )
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleOccupationAndIncome0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL (), restL (), firstState )
      expect ( { ...newState, messages: [] } ).toEqual ( { ...firstState, restCommands: [], OccupationAndIncomeDetails: { fromApi: samples.sampleOccupationAndIncome0 } } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg ).toMatch ( /^200.*/ )
    } )
  } )
} )
//Rest get pact test
pactWith ( { consumer: 'OccupationAndIncome', provider: 'OccupationAndIncomeProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeDetails', () => {
    it ( 'should have a get rest for OccupationAndIncome', async () => {
      const restCommand: RestCommand = { name: 'OccupationAndIncomeDetails_OccupationAndIncomeRestDetails', restAction: 'get', path: [ 'OccupationAndIncomeDetails' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
        OccupationAndIncomeDetails: {},
        pageSelection: [ { pageName: 'OccupationAndIncomeDetails', pageMode: 'view' } ]
      }
      const url = applyToTemplate ( '/api/oneOccupationAndIncome', firstState.CommonIds ).join ( '' )
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeDetails should have a get rest for OccupationAndIncome',
        withRequest: {
          method: 'GET',
          path: url,
          query: { "customerId": "custId" }
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleOccupationAndIncome0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL (), restL (), firstState )
      expect ( { ...newState, messages: [] } ).toEqual ( { ...firstState, restCommands: [], OccupationAndIncomeDetails: { fromApi: samples.sampleOccupationAndIncome0 } } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg ).toMatch ( /^200.*/ )
    } )
  } )
} )
//Rest get pact test
pactWith ( { consumer: 'CreatePlanDD', provider: 'CreatePlanDDProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary', () => {
    it ( 'should have a get rest for CreatePlanDD', async () => {
      const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanDDRestDetails', restAction: 'get', path: [ 'EAccountsSummary' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
        EAccountsSummary: {},
        pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate ( '/api/createPlan/{createPlanId}', firstState.CommonIds ).join ( '' )
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a get rest for CreatePlanDD',
        withRequest: {
          method: 'GET',
          path: url,
          query: { "accountId": "accId", "createPlanId": "tbd", "customerId": "custId" }
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreatePlanDD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL (), restL (), firstState )
      expect ( { ...newState, messages: [] } ).toEqual ( { ...firstState, restCommands: [], EAccountsSummary: { tempCreatePlan: samples.sampleCreatePlanDD0 } } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg ).toMatch ( /^200.*/ )
    } )
  } )
} )
//Rest create pact test
pactWith ( { consumer: 'CreatePlanDD', provider: 'CreatePlanDDProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary', () => {
    it ( 'should have a create rest for CreatePlanDD', async () => {
      const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanDDRestDetails', restAction: 'create', path: [ 'EAccountsSummary' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
        EAccountsSummary: { tempCreatePlan: samples.sampleCreatePlanDD0 },
        pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate ( '/api/createPlan/{createPlanId}', firstState.CommonIds ).join ( '' )
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a create rest for CreatePlanDD',
        withRequest: {
          method: 'POST',
          path: url,
          query: { "accountId": "accId", "customerId": "custId" }
          , body: JSON.stringify ( samples.sampleCreatePlanDD0 )
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreatePlanDD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL (), restL (), firstState )
      expect ( { ...newState, messages: [] } ).toEqual ( { ...firstState, restCommands: [], EAccountsSummary: { tempCreatePlan: samples.sampleCreatePlanDD0 } } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg ).toMatch ( /^200.*/ )
    } )
  } )
} )
//Rest update pact test
pactWith ( { consumer: 'CreatePlanDD', provider: 'CreatePlanDDProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary', () => {
    it ( 'should have a update rest for CreatePlanDD', async () => {
      const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanDDRestDetails', restAction: 'update', path: [ 'EAccountsSummary' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
        EAccountsSummary: { tempCreatePlan: samples.sampleCreatePlanDD0 },
        pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate ( '/api/createPlan/{createPlanId}', firstState.CommonIds ).join ( '' )
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a update rest for CreatePlanDD',
        withRequest: {
          method: 'PUT',
          path: url,
          query: { "accountId": "accId", "createPlanId": "tbd", "customerId": "custId" }
          , body: JSON.stringify ( samples.sampleCreatePlanDD0 )
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreatePlanDD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL (), restL (), firstState )
      expect ( { ...newState, messages: [] } ).toEqual ( { ...firstState, restCommands: [], EAccountsSummary: { tempCreatePlan: samples.sampleCreatePlanDD0 } } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg ).toMatch ( /^200.*/ )
    } )
  } )
} )
//Rest delete pact test
pactWith ( { consumer: 'CreatePlanDD', provider: 'CreatePlanDDProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary', () => {
    it ( 'should have a delete rest for CreatePlanDD', async () => {
      const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanDDRestDetails', restAction: 'delete', path: [ 'EAccountsSummary' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
        EAccountsSummary: {},
        pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
      }
      const path: string= url ( { ...rests.restDetails.OccupationAndIncomeDetails_OccupationAndIncomeRestDetails,
        fdLens: Lenses.identity<FState> ().focusQuery ( 'OccupationAndIncomeDetails' ) },
        'delete' )(firstState)('')
      // const url = applyToTemplate('/api/createPlan/{createPlanId}', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a delete rest for CreatePlanDD',
        withRequest: {
          method: 'DELETE',
          path,
          query: { "accountId": "accId", "createPlanId": "tbd", "customerId": "custId" }
          //no body for delete
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreatePlanDD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL (), restL (), firstState )
      expect ( { ...newState, messages: [] } ).toEqual ( { ...firstState, restCommands: [], EAccountsSummary: { tempCreatePlan: samples.sampleCreatePlanDD0 } } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg ).toMatch ( /^200.*/ )
    } )
  } )
} )
//Rest list pact test
pactWith ( { consumer: 'CreatePlanDD', provider: 'CreatePlanDDProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary', () => {
    it ( 'should have a list rest for CreatePlanDD', async () => {
      const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanDDRestDetails', restAction: 'list', path: [ 'EAccountsSummary' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
        EAccountsSummary: {},
        pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate ( '/api/createPlan/{createPlanId}', firstState.CommonIds ).join ( '' )
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a list rest for CreatePlanDD',
        withRequest: {
          method: 'GET',
          path: url,
          query: { "accountId": "accId", "customerId": "custId" }
          //no body for list
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreatePlanDD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL (), restL (), firstState )
      expect ( { ...newState, messages: [] } ).toEqual ( { ...firstState, restCommands: [], EAccountsSummary: { tempCreatePlan: samples.sampleCreatePlanDD0 } } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg ).toMatch ( /^200.*/ )
    } )
  } )
} )
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
          query: { "accountId": "accId", "customerId": "custId" }
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleEAccountsSummaryDD0
        },
      } )
      const firstState: FState = { ...emptyState, pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ], EAccountsSummary: {} }
      let newState = await loadTree ( fetchers.fetchers, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ...firstState,
        EAccountsSummary: { fromApi: samples.sampleEAccountsSummaryDD0 },
        tags: { EAccountsSummary_fromApi: [ "accId", "custId" ] }
      } )
    } )
  } )
} )
//Rest get pact test
pactWith ( { consumer: 'EAccountsSummaryDD', provider: 'EAccountsSummaryDDProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary', () => {
    it ( 'should have a get rest for EAccountsSummaryDD', async () => {
      const restCommand: RestCommand = { name: 'EAccountsSummary_EAccountsSummaryDDRestDetails', restAction: 'get', path: [ 'EAccountsSummary' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
        EAccountsSummary: {},
        pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate ( '/api/accountsSummary', firstState.CommonIds ).join ( '' )
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a get rest for EAccountsSummaryDD',
        withRequest: {
          method: 'GET',
          path: url,
          query: { "accountId": "accId", "customerId": "custId" }
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleEAccountsSummaryDD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL (), restL (), firstState )
      expect ( { ...newState, messages: [] } ).toEqual ( { ...firstState, restCommands: [], EAccountsSummary: { fromApi: samples.sampleEAccountsSummaryDD0 } } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg ).toMatch ( /^200.*/ )
    } )
  } )
} )
//Rest create pact test
pactWith ( { consumer: 'ETransferDataD', provider: 'ETransferDataDProvider', cors: true }, provider => {
  describe ( 'ETransfer', () => {
    it ( 'should have a create rest for ETransferDataD', async () => {
      const restCommand: RestCommand = { name: 'ETransfer_ETransferDataDRestDetails', restAction: 'create', path: [ 'ETransfer' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
        ETransfer: { fromApi: samples.sampleETransferDataD0 },
        pageSelection: [ { pageName: 'ETransfer', pageMode: 'view' } ]
      }
      const url = applyToTemplate ( '/api/eTransfers', firstState.CommonIds ).join ( '' )
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'ETransfer should have a create rest for ETransferDataD',
        withRequest: {
          method: 'POST',
          path: url,
          query: { "customerId": "custId" }
          , body: JSON.stringify ( samples.sampleETransferDataD0 )
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleETransferDataD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL (), restL (), firstState )
      expect ( { ...newState, messages: [] } ).toEqual ( { ...firstState, restCommands: [], ETransfer: { fromApi: samples.sampleETransferDataD0 } } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg ).toMatch ( /^200.*/ )
    } )
  } )
} )
//Rest create pact test
pactWith ( { consumer: 'CreateEAccountDataDD', provider: 'CreateEAccountDataDDProvider', cors: true }, provider => {
  describe ( 'CreateEAccount', () => {
    it ( 'should have a create rest for CreateEAccountDataDD', async () => {
      const restCommand: RestCommand = { name: 'CreateEAccount_CreateEAccountDataDDRestDetails', restAction: 'create', path: [ 'CreateEAccount' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
        CreateEAccount: { editing: samples.sampleCreateEAccountDataDD0 },
        pageSelection: [ { pageName: 'CreateEAccount', pageMode: 'view' } ]
      }
      const url = applyToTemplate ( '/api/createEAccount/{createPlanId}', firstState.CommonIds ).join ( '' )
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'CreateEAccount should have a create rest for CreateEAccountDataDD',
        withRequest: {
          method: 'POST',
          path: url,
          query: { "accountId": "accId", "customerId": "custId" }
          , body: JSON.stringify ( samples.sampleCreateEAccountDataDD0 )
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreateEAccountDataDD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL (), restL (), firstState )
      expect ( { ...newState, messages: [] } ).toEqual ( { ...firstState, restCommands: [], CreateEAccount: { editing: samples.sampleCreateEAccountDataDD0 } } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg ).toMatch ( /^200.*/ )
    } )
  } )
} )
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
          query: { "accountId": "accId", "applRef": "appref", "brandRef": "brandRef", "customerId": "custId" }
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleChequeCreditbooksDD0
        },
      } )
      const firstState: FState = { ...emptyState, pageSelection: [ { pageName: 'ChequeCreditbooks', pageMode: 'view' } ], ChequeCreditbooks: {} }
      let newState = await loadTree ( fetchers.fetchers, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ...firstState,
        ChequeCreditbooks: { fromApi: samples.sampleChequeCreditbooksDD0 },
        tags: { ChequeCreditbooks_fromApi: [ "accId", "appref", "brandRef", "custId" ] }
      } )
    } )
  } )
} )
//Rest get pact test
pactWith ( { consumer: 'ChequeCreditbooksDD', provider: 'ChequeCreditbooksDDProvider', cors: true }, provider => {
  describe ( 'ChequeCreditbooks', () => {
    it ( 'should have a get rest for ChequeCreditbooksDD', async () => {
      const restCommand: RestCommand = { name: 'ChequeCreditbooks_ChequeCreditbooksDDRestDetails', restAction: 'get', path: [ 'ChequeCreditbooks' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
        ChequeCreditbooks: {},
        pageSelection: [ { pageName: 'ChequeCreditbooks', pageMode: 'view' } ]
      }
      const url = applyToTemplate ( '/api/chequeCreditBooks', firstState.CommonIds ).join ( '' )
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'ChequeCreditbooks should have a get rest for ChequeCreditbooksDD',
        withRequest: {
          method: 'GET',
          path: url,
          query: { "accountId": "accId", "applRef": "appref", "brandRef": "brandRef", "customerId": "custId" }
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleChequeCreditbooksDD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL (), restL (), firstState )
      expect ( { ...newState, messages: [] } ).toEqual ( { ...firstState, restCommands: [], ChequeCreditbooks: { fromApi: samples.sampleChequeCreditbooksDD0 } } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg ).toMatch ( /^200.*/ )
    } )
  } )
} )
//Rest create pact test
pactWith ( { consumer: 'ChequeCreditbooksDD', provider: 'ChequeCreditbooksDDProvider', cors: true }, provider => {
  describe ( 'ChequeCreditbooks', () => {
    it ( 'should have a create rest for ChequeCreditbooksDD', async () => {
      const restCommand: RestCommand = { name: 'ChequeCreditbooks_ChequeCreditbooksDDRestDetails', restAction: 'create', path: [ 'ChequeCreditbooks' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
        ChequeCreditbooks: { fromApi: samples.sampleChequeCreditbooksDD0 },
        pageSelection: [ { pageName: 'ChequeCreditbooks', pageMode: 'view' } ]
      }
      const url = applyToTemplate ( '/api/chequeCreditBooks', firstState.CommonIds ).join ( '' )
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'ChequeCreditbooks should have a create rest for ChequeCreditbooksDD',
        withRequest: {
          method: 'POST',
          path: url,
          query: { "accountId": "accId", "applRef": "appref", "brandRef": "brandRef", "customerId": "custId" }
          , body: JSON.stringify ( samples.sampleChequeCreditbooksDD0 )
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleChequeCreditbooksDD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL (), restL (), firstState )
      expect ( { ...newState, messages: [] } ).toEqual ( { ...firstState, restCommands: [], ChequeCreditbooks: { fromApi: samples.sampleChequeCreditbooksDD0 } } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg ).toMatch ( /^200.*/ )
    } )
  } )
} )