import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { applyToTemplate } from "@focuson/template";
import { Lenses, massTransform } from "@focuson/lens";
import * as samples from '../AccountOverview/AccountOverview.samples'
import {emptyState, FState } from "../common";
import * as fetchers from "../fetchers";
import * as rests from "../rests";
//GetFetcher pact test
pactWith ( { consumer: 'AccountAllFlags', provider: 'AccountAllFlagsProvider', cors: true }, provider => {
  describe ( 'AccountOverview - fetcher', () => {
    it ( 'should have a get fetcher for AccountAllFlags', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'AccountOverview should have a get fetcher for AccountAllFlags',
        withRequest: {
          method: 'GET',
          path: '/api/accountOverview/flags',
          query:{"accountId":"accId","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleAccountAllFlags0
        },
      } )
      const ids = {
      }
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'AccountOverview', pageMode: 'view' }] , AccountOverview: { }}
      const withIds = massTransform(firstState,)
      let newState = await loadTree ( fetchers.fetchers, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      let expectedRaw: any = {
        ... firstState,
         AccountOverview: {accountFlags:samples.sampleAccountAllFlags0},
        tags: { AccountOverview_accountFlags:["accId","custId"]}
      };
      const expected = massTransform(expectedRaw,)
      expect ( newState ).toEqual ( expected )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'AccountAllFlags', provider: 'AccountAllFlagsProvider', cors: true }, provider => {
  describe ( 'AccountOverview - rest get', () => {
    it ( 'should have a get rest for AccountAllFlags', async () => {
      const restCommand: RestCommand = { name: 'AccountOverview_AccountAllFlagsRestDetails', restAction: 'get' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      AccountOverview:{},
        pageSelection: [ { pageName: 'AccountOverview', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/accountOverview/flags', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'AccountOverview should have a get rest for AccountAllFlags',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"accountId":"accId","customerId":"custId"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleAccountAllFlags0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], AccountOverview: { accountFlags: samples.sampleAccountAllFlags0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//GetFetcher pact test
pactWith ( { consumer: 'ArrearsDetails', provider: 'ArrearsDetailsProvider', cors: true }, provider => {
  describe ( 'AccountOverview - fetcher', () => {
    it ( 'should have a get fetcher for ArrearsDetails', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'AccountOverview should have a get fetcher for ArrearsDetails',
        withRequest: {
          method: 'GET',
          path: '/api/accountOverview/arrearsDetails',
          query:{"accountId":"accId","customerId":"custId","startDate":"2020-01-20"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleArrearsDetails0
        },
      } )
      const ids = {
        startDate: Lenses.identity<FState>().focusQuery('AccountOverview').focusQuery('currentSelectedExcessHistory').focusQuery('start')
      }
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'AccountOverview', pageMode: 'view' }] , AccountOverview: { }}
      const withIds = massTransform(firstState,[ids.startDate, () =>"2020-01-20"])
      let newState = await loadTree ( fetchers.fetchers, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      let expectedRaw: any = {
        ... firstState,
         AccountOverview: {arrearsDetails:samples.sampleArrearsDetails0},
        tags: { AccountOverview_arrearsDetails:["accId","custId","2020-01-20"]}
      };
      const expected = massTransform(expectedRaw,[ids.startDate, () =>"2020-01-20"])
      expect ( newState ).toEqual ( expected )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'ArrearsDetails', provider: 'ArrearsDetailsProvider', cors: true }, provider => {
  describe ( 'AccountOverview - rest get', () => {
    it ( 'should have a get rest for ArrearsDetails', async () => {
      const restCommand: RestCommand = { name: 'AccountOverview_ArrearsDetailsRestDetails', restAction: 'get' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      AccountOverview:{},
        pageSelection: [ { pageName: 'AccountOverview', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/accountOverview/arrearsDetails', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'AccountOverview should have a get rest for ArrearsDetails',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"accountId":"accId","customerId":"custId","startDate":"2020-01-20"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleArrearsDetails0
        },
      } )
      const ids = {
        startDate: Lenses.identity<FState>().focusQuery('AccountOverview').focusQuery('currentSelectedExcessHistory').focusQuery('start')
      }
      const withIds = massTransform(firstState,[ids.startDate, () =>"2020-01-20"])
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], AccountOverview: { arrearsDetails: samples.sampleArrearsDetails0} }
      const expected = massTransform(rawExpected,[ids.startDate, () =>"2020-01-20"])
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//GetFetcher pact test
pactWith ( { consumer: 'AccountOverviewHistory', provider: 'AccountOverviewHistoryProvider', cors: true }, provider => {
  describe ( 'AccountOverview - fetcher', () => {
    it ( 'should have a get fetcher for AccountOverviewHistory', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'AccountOverview should have a get fetcher for AccountOverviewHistory',
        withRequest: {
          method: 'GET',
          path: '/api/accountOverview/excessHistory',
          query:{"accountId":"accId","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleAccountOverviewHistory0
        },
      } )
      const ids = {
      }
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'AccountOverview', pageMode: 'view' }] , AccountOverview: { }}
      const withIds = massTransform(firstState,)
      let newState = await loadTree ( fetchers.fetchers, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      let expectedRaw: any = {
        ... firstState,
         AccountOverview: {excessHistory:samples.sampleAccountOverviewHistory0},
        tags: { AccountOverview_excessHistory:["accId","custId"]}
      };
      const expected = massTransform(expectedRaw,)
      expect ( newState ).toEqual ( expected )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'AccountOverviewHistory', provider: 'AccountOverviewHistoryProvider', cors: true }, provider => {
  describe ( 'AccountOverview - rest get', () => {
    it ( 'should have a get rest for AccountOverviewHistory', async () => {
      const restCommand: RestCommand = { name: 'AccountOverview_AccountOverviewHistoryRestDetails', restAction: 'get' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      AccountOverview:{},
        pageSelection: [ { pageName: 'AccountOverview', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/accountOverview/excessHistory', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'AccountOverview should have a get rest for AccountOverviewHistory',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"accountId":"accId","customerId":"custId"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleAccountOverviewHistory0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], AccountOverview: { excessHistory: samples.sampleAccountOverviewHistory0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//GetFetcher pact test
pactWith ( { consumer: 'AccountOverviewExcessInfo', provider: 'AccountOverviewExcessInfoProvider', cors: true }, provider => {
  describe ( 'AccountOverview - fetcher', () => {
    it ( 'should have a get fetcher for AccountOverviewExcessInfo', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'AccountOverview should have a get fetcher for AccountOverviewExcessInfo',
        withRequest: {
          method: 'GET',
          path: '/api/accountOverview/excessInfo',
          query:{"accountId":"accId","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleAccountOverviewExcessInfo0
        },
      } )
      const ids = {
      }
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'AccountOverview', pageMode: 'view' }] , AccountOverview: { }}
      const withIds = massTransform(firstState,)
      let newState = await loadTree ( fetchers.fetchers, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      let expectedRaw: any = {
        ... firstState,
         AccountOverview: {excessInfo:samples.sampleAccountOverviewExcessInfo0},
        tags: { AccountOverview_excessInfo:["accId","custId"]}
      };
      const expected = massTransform(expectedRaw,)
      expect ( newState ).toEqual ( expected )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'AccountOverviewExcessInfo', provider: 'AccountOverviewExcessInfoProvider', cors: true }, provider => {
  describe ( 'AccountOverview - rest get', () => {
    it ( 'should have a get rest for AccountOverviewExcessInfo', async () => {
      const restCommand: RestCommand = { name: 'AccountOverview_AccountOverviewExcessInfoRestDetails', restAction: 'get' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      AccountOverview:{},
        pageSelection: [ { pageName: 'AccountOverview', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/accountOverview/excessInfo', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'AccountOverview should have a get rest for AccountOverviewExcessInfo',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"accountId":"accId","customerId":"custId"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleAccountOverviewExcessInfo0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], AccountOverview: { excessInfo: samples.sampleAccountOverviewExcessInfo0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//GetFetcher pact test
pactWith ( { consumer: 'AccountOverview', provider: 'AccountOverviewProvider', cors: true }, provider => {
  describe ( 'AccountOverview - fetcher', () => {
    it ( 'should have a get fetcher for AccountOverview', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'AccountOverview should have a get fetcher for AccountOverview',
        withRequest: {
          method: 'GET',
          path: '/api/accountOverview',
          query:{"accountId":"accId","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleAccountOverview0
        },
      } )
      const ids = {
      }
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'AccountOverview', pageMode: 'view' }] , AccountOverview: { }}
      const withIds = massTransform(firstState,)
      let newState = await loadTree ( fetchers.fetchers, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      let expectedRaw: any = {
        ... firstState,
         AccountOverview: {main:samples.sampleAccountOverview0},
        tags: { AccountOverview_main:["accId","custId"]}
      };
      const expected = massTransform(expectedRaw,)
      expect ( newState ).toEqual ( expected )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'AccountOverview', provider: 'AccountOverviewProvider', cors: true }, provider => {
  describe ( 'AccountOverview - rest get', () => {
    it ( 'should have a get rest for AccountOverview', async () => {
      const restCommand: RestCommand = { name: 'AccountOverview_AccountOverviewRestDetails', restAction: 'get' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      AccountOverview:{},
        pageSelection: [ { pageName: 'AccountOverview', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/accountOverview', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'AccountOverview should have a get rest for AccountOverview',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"accountId":"accId","customerId":"custId"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleAccountOverview0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], AccountOverview: { main: samples.sampleAccountOverview0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//GetFetcher pact test
pactWith ( { consumer: 'AccountOverviewReason', provider: 'AccountOverviewReasonProvider', cors: true }, provider => {
  describe ( 'AccountOverview - fetcher', () => {
    it ( 'should have a get fetcher for AccountOverviewReason', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'AccountOverview should have a get fetcher for AccountOverviewReason',
        withRequest: {
          method: 'GET',
          path: '/api/accountOverview/reason',
          query:{"accountId":"accId","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleAccountOverviewReason0
        },
      } )
      const ids = {
      }
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'AccountOverview', pageMode: 'view' }] , AccountOverview: { }}
      const withIds = massTransform(firstState,)
      let newState = await loadTree ( fetchers.fetchers, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      let expectedRaw: any = {
        ... firstState,
         AccountOverview: {reason:samples.sampleAccountOverviewReason0},
        tags: { AccountOverview_reason:["accId","custId"]}
      };
      const expected = massTransform(expectedRaw,)
      expect ( newState ).toEqual ( expected )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'AccountOverviewReason', provider: 'AccountOverviewReasonProvider', cors: true }, provider => {
  describe ( 'AccountOverview - rest get', () => {
    it ( 'should have a get rest for AccountOverviewReason', async () => {
      const restCommand: RestCommand = { name: 'AccountOverview_AccountOverviewReasonRestDetails', restAction: 'get' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      AccountOverview:{},
        pageSelection: [ { pageName: 'AccountOverview', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/accountOverview/reason', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'AccountOverview should have a get rest for AccountOverviewReason',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"accountId":"accId","customerId":"custId"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleAccountOverviewReason0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], AccountOverview: { reason: samples.sampleAccountOverviewReason0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})