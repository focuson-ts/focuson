import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { applyToTemplate } from "@focuson/template";
import { Lenses, massTransform } from "@focuson/lens";
import * as samples from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.samples'
import {emptyState, FState } from "../common";
import * as fetchers from "../fetchers";
import * as rests from "../rests";
//GetFetcher pact test
pactWith ( { consumer: 'AdditionalInformation', provider: 'AdditionalInformationProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary - fetcher', () => {
    it ( 'should have a get fetcher for AdditionalInformation', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeSummary should have a get fetcher for AdditionalInformation',
        withRequest: {
          method: 'GET',
          path: '/customer/occupation/v2/additionalInfo',
          query:{"customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleAdditionalInformation0
        },
      } )
      const ids = {
      }
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'OccupationAndIncomeSummary', pageMode: 'view' }] , OccupationAndIncomeSummary: { }}
      const withIds = massTransform(firstState,)
      let newState = await loadTree ( fetchers.fetchers, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      let expectedRaw: any = {
        ... firstState,
         OccupationAndIncomeSummary: {additionalInformation:samples.sampleAdditionalInformation0},
        tags: { OccupationAndIncomeSummary_additionalInformation:["custId"]}
      };
      const expected = massTransform(expectedRaw,)
      expect ( newState ).toEqual ( expected )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'AdditionalInformation', provider: 'AdditionalInformationProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary - rest get', () => {
    it ( 'should have a get rest for AdditionalInformation', async () => {
      const restCommand: RestCommand = { name: 'OccupationAndIncomeSummary_AdditionalInformationRestDetails', restAction: 'get' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      OccupationAndIncomeSummary:{},
        pageSelection: [ { pageName: 'OccupationAndIncomeSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/customer/occupation/v2/additionalInfo', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeSummary should have a get rest for AdditionalInformation',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"customerId":"custId"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleAdditionalInformation0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], OccupationAndIncomeSummary: { additionalInformation: samples.sampleAdditionalInformation0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//GetFetcher pact test
pactWith ( { consumer: 'BusinessDetailsMain', provider: 'BusinessDetailsMainProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary - fetcher', () => {
    it ( 'should have a get fetcher for BusinessDetailsMain', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeSummary should have a get fetcher for BusinessDetailsMain',
        withRequest: {
          method: 'GET',
          path: '/customer/occupation/v2/businessDetails',
          query:{"customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleBusinessDetailsMain0
        },
      } )
      const ids = {
      }
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'OccupationAndIncomeSummary', pageMode: 'view' }] , OccupationAndIncomeSummary: { }}
      const withIds = massTransform(firstState,)
      let newState = await loadTree ( fetchers.fetchers, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      let expectedRaw: any = {
        ... firstState,
         OccupationAndIncomeSummary: {businessDetails:samples.sampleBusinessDetailsMain0},
        tags: { OccupationAndIncomeSummary_businessDetails:["custId"]}
      };
      const expected = massTransform(expectedRaw,)
      expect ( newState ).toEqual ( expected )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'BusinessDetailsMain', provider: 'BusinessDetailsMainProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary - rest get', () => {
    it ( 'should have a get rest for BusinessDetailsMain', async () => {
      const restCommand: RestCommand = { name: 'OccupationAndIncomeSummary_BusinessDetailsMainRestDetails', restAction: 'get' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      OccupationAndIncomeSummary:{},
        pageSelection: [ { pageName: 'OccupationAndIncomeSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/customer/occupation/v2/businessDetails', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeSummary should have a get rest for BusinessDetailsMain',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"customerId":"custId"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleBusinessDetailsMain0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], OccupationAndIncomeSummary: { businessDetails: samples.sampleBusinessDetailsMain0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//GetFetcher pact test
pactWith ( { consumer: 'Dropdowns', provider: 'DropdownsProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary - fetcher', () => {
    it ( 'should have a get fetcher for Dropdowns', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeSummary should have a get fetcher for Dropdowns',
        withRequest: {
          method: 'GET',
          path: '/customer/occupation/v2/occupationDetails',
          query:{"customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleDropdowns0
        },
      } )
      const ids = {
      }
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'OccupationAndIncomeSummary', pageMode: 'view' }] , OccupationAndIncomeSummary: { }}
      const withIds = massTransform(firstState,)
      let newState = await loadTree ( fetchers.fetchers, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      let expectedRaw: any = {
        ... firstState,
         OccupationAndIncomeSummary: {dropdowns:samples.sampleDropdowns0},
        tags: { OccupationAndIncomeSummary_dropdowns:["custId"]}
      };
      const expected = massTransform(expectedRaw,)
      expect ( newState ).toEqual ( expected )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'Dropdowns', provider: 'DropdownsProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary - rest get', () => {
    it ( 'should have a get rest for Dropdowns', async () => {
      const restCommand: RestCommand = { name: 'OccupationAndIncomeSummary_DropdownsRestDetails', restAction: 'get' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      OccupationAndIncomeSummary:{},
        pageSelection: [ { pageName: 'OccupationAndIncomeSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/customer/occupation/v2/occupationDetails', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeSummary should have a get rest for Dropdowns',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"customerId":"custId"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleDropdowns0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], OccupationAndIncomeSummary: { dropdowns: samples.sampleDropdowns0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//GetFetcher pact test
pactWith ( { consumer: 'OccupationAndIncomeFullDomain', provider: 'OccupationAndIncomeFullDomainProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary - fetcher', () => {
    it ( 'should have a get fetcher for OccupationAndIncomeFullDomain', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeSummary should have a get fetcher for OccupationAndIncomeFullDomain',
        withRequest: {
          method: 'GET',
          path: '/customer/occupation/v2/occupationIncomeDetails',
          query:{"customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleOccupationAndIncomeFullDomain0
        },
      } )
      const ids = {
      }
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'OccupationAndIncomeSummary', pageMode: 'view' }] , OccupationAndIncomeSummary: { }}
      const withIds = massTransform(firstState,)
      let newState = await loadTree ( fetchers.fetchers, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      let expectedRaw: any = {
        ... firstState,
         OccupationAndIncomeSummary: {fromApi:samples.sampleOccupationAndIncomeFullDomain0},
        tags: { OccupationAndIncomeSummary_fromApi:["custId"]}
      };
      const expected = massTransform(expectedRaw,)
      expect ( newState ).toEqual ( expected )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'OccupationAndIncomeFullDomain', provider: 'OccupationAndIncomeFullDomainProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary - rest get', () => {
    it ( 'should have a get rest for OccupationAndIncomeFullDomain', async () => {
      const restCommand: RestCommand = { name: 'OccupationAndIncomeSummary_OccupationAndIncomeFullDomainRestDetails', restAction: 'get' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      OccupationAndIncomeSummary:{},
        pageSelection: [ { pageName: 'OccupationAndIncomeSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/customer/occupation/v2/occupationIncomeDetails', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeSummary should have a get rest for OccupationAndIncomeFullDomain',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"customerId":"custId"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleOccupationAndIncomeFullDomain0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], OccupationAndIncomeSummary: { fromApi: samples.sampleOccupationAndIncomeFullDomain0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//Rest update pact test
pactWith ( { consumer: 'OccupationAndIncomeFullDomain', provider: 'OccupationAndIncomeFullDomainProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary - rest update', () => {
    it ( 'should have a update rest for OccupationAndIncomeFullDomain', async () => {
      const restCommand: RestCommand = { name: 'OccupationAndIncomeSummary_OccupationAndIncomeFullDomainRestDetails', restAction: 'update' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      OccupationAndIncomeSummary: { fromApi:samples.sampleOccupationAndIncomeFullDomain0 },
        pageSelection: [ { pageName: 'OccupationAndIncomeSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/customer/occupation/v2/occupationIncomeDetails', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeSummary should have a update rest for OccupationAndIncomeFullDomain',
        withRequest: {
          method: 'PUT',
          path: url,
          query:{"customerId":"custId"}
          ,body: JSON.stringify(samples.sampleOccupationAndIncomeFullDomain0)
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleOccupationAndIncomeFullDomain0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], OccupationAndIncomeSummary: { fromApi: samples.sampleOccupationAndIncomeFullDomain0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//GetFetcher pact test
pactWith ( { consumer: 'OtherIncomeResponse', provider: 'OtherIncomeResponseProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary - fetcher', () => {
    it ( 'should have a get fetcher for OtherIncomeResponse', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeSummary should have a get fetcher for OtherIncomeResponse',
        withRequest: {
          method: 'GET',
          path: '/customer/occupation/v2/otherIncome',
          query:{"customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleOtherIncomeResponse0
        },
      } )
      const ids = {
      }
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'OccupationAndIncomeSummary', pageMode: 'view' }] , OccupationAndIncomeSummary: { }}
      const withIds = massTransform(firstState,)
      let newState = await loadTree ( fetchers.fetchers, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      let expectedRaw: any = {
        ... firstState,
         OccupationAndIncomeSummary: {otherSourcesOfIncome:samples.sampleOtherIncomeResponse0},
        tags: { OccupationAndIncomeSummary_otherSourcesOfIncome:["custId"]}
      };
      const expected = massTransform(expectedRaw,)
      expect ( newState ).toEqual ( expected )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'OtherIncomeResponse', provider: 'OtherIncomeResponseProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary - rest get', () => {
    it ( 'should have a get rest for OtherIncomeResponse', async () => {
      const restCommand: RestCommand = { name: 'OccupationAndIncomeSummary_OtherIncomeResponseRestDetails', restAction: 'get' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      OccupationAndIncomeSummary:{},
        pageSelection: [ { pageName: 'OccupationAndIncomeSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/customer/occupation/v2/otherIncome', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeSummary should have a get rest for OtherIncomeResponse',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"customerId":"custId"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleOtherIncomeResponse0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], OccupationAndIncomeSummary: { otherSourcesOfIncome: samples.sampleOtherIncomeResponse0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})