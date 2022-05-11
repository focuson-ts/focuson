import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL} from "@focuson/pages";
import { Lenses, massTransform, Transform } from "@focuson/lens";
import * as samples from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.samples'
import {emptyState, FState , commonIds, identityL, pathToLens } from "../common";
import * as rests from "../rests";
import { restUrlMutator } from "../rests";
import {AdditionalInformationFetcher} from './OccupationAndIncomeSummary.fetchers'
import {BusinessDetailsMainFetcher} from './OccupationAndIncomeSummary.fetchers'
import {DropdownsFetcher} from './OccupationAndIncomeSummary.fetchers'
import {OccupationAndIncomeFullDomainFetcher} from './OccupationAndIncomeSummary.fetchers'
import {OtherIncomeResponseFetcher} from './OccupationAndIncomeSummary.fetchers'

describe("Allow pacts to be run from intelliJ for OccupationAndIncomeSummary", () =>{})

//GetFetcher pact test
pactWith ( { consumer: 'OccupationAndIncomeSummary', provider: 'OccupationAndIncomeSummaryProvider', cors: true }, provider => {
describe ( 'OccupationAndIncomeSummary - additionalInformationRD - fetcher', () => {
  it ( 'should have a  fetcher for AdditionalInformation', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for AdditionalInformation',
      withRequest: {
        method: 'GET',
        path: '/customer/occupation/v2/additionalInfo',
        query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","clientRef":"custId"}
      },
      willRespondWith: {
        status: 200,
        body: samples.sampleAdditionalInformation0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'OccupationAndIncomeSummary', pageMode: 'view' }], CommonIds: {"accountId":"accId","applRef":"appref","brandRef":"brandRef","clientRef":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= AdditionalInformationFetcher (Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'OccupationAndIncomeSummary_~/additionalInformation': ["accId","appref","brandRef","custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary').focusQuery('additionalInformation').set ( expectedRaw, samples.sampleAdditionalInformation0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest additionalInformationRD get pact test for OccupationAndIncomeSummary
pactWith ( { consumer: 'OccupationAndIncomeSummary', provider: 'OccupationAndIncomeSummaryProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary - additionalInformationRD rest get', () => {
   it ( 'should have a get rest for AdditionalInformation', async () => {
    const restCommand: RestCommand = { name: 'OccupationAndIncomeSummary_AdditionalInformationRestDetails', restAction: "get" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","applRef":"appref","brandRef":"brandRef","clientRef":"custId"},
       pageSelection: [ { pageName: 'OccupationAndIncomeSummary', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for OccupationAndIncomeSummary additionalInformationRD get',
      withRequest: {
         method: 'GET',
         path:   '/customer/occupation/v2/additionalInfo',
         query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","clientRef":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleAdditionalInformation0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, pathToLens, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary').focusQuery('additionalInformation').set ( rawExpected, samples.sampleAdditionalInformation0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'OccupationAndIncomeSummary', provider: 'OccupationAndIncomeSummaryProvider', cors: true }, provider => {
describe ( 'OccupationAndIncomeSummary - businessDetailsRD - fetcher', () => {
  it ( 'should have a  fetcher for BusinessDetailsMain', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for BusinessDetailsMain',
      withRequest: {
        method: 'GET',
        path: '/customer/occupation/v2/businessDetails',
        query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","clientRef":"custId"}
      },
      willRespondWith: {
        status: 200,
        body: samples.sampleBusinessDetailsMain0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'OccupationAndIncomeSummary', pageMode: 'view' }], CommonIds: {"accountId":"accId","applRef":"appref","brandRef":"brandRef","clientRef":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= BusinessDetailsMainFetcher (Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'OccupationAndIncomeSummary_~/businessDetails': ["accId","appref","brandRef","custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary').focusQuery('businessDetails').set ( expectedRaw, samples.sampleBusinessDetailsMain0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest businessDetailsRD get pact test for OccupationAndIncomeSummary
pactWith ( { consumer: 'OccupationAndIncomeSummary', provider: 'OccupationAndIncomeSummaryProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary - businessDetailsRD rest get', () => {
   it ( 'should have a get rest for BusinessDetailsMain', async () => {
    const restCommand: RestCommand = { name: 'OccupationAndIncomeSummary_BusinessDetailsMainRestDetails', restAction: "get" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","applRef":"appref","brandRef":"brandRef","clientRef":"custId"},
       pageSelection: [ { pageName: 'OccupationAndIncomeSummary', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for OccupationAndIncomeSummary businessDetailsRD get',
      withRequest: {
         method: 'GET',
         path:   '/customer/occupation/v2/businessDetails',
         query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","clientRef":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleBusinessDetailsMain0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, pathToLens, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary').focusQuery('businessDetails').set ( rawExpected, samples.sampleBusinessDetailsMain0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'OccupationAndIncomeSummary', provider: 'OccupationAndIncomeSummaryProvider', cors: true }, provider => {
describe ( 'OccupationAndIncomeSummary - dropdownsRD - fetcher', () => {
  it ( 'should have a  fetcher for Dropdowns', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for Dropdowns',
      withRequest: {
        method: 'GET',
        path: '/customer/occupation/v2/occupationDetails',
        query:{}
      },
      willRespondWith: {
        status: 200,
        body: samples.sampleDropdowns0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'OccupationAndIncomeSummary', pageMode: 'view' }], CommonIds: {} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= DropdownsFetcher (Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'OccupationAndIncomeSummary_~/dropdowns': []}
      };
      const expected = Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary').focusQuery('dropdowns').set ( expectedRaw, samples.sampleDropdowns0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest dropdownsRD get pact test for OccupationAndIncomeSummary
pactWith ( { consumer: 'OccupationAndIncomeSummary', provider: 'OccupationAndIncomeSummaryProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary - dropdownsRD rest get', () => {
   it ( 'should have a get rest for Dropdowns', async () => {
    const restCommand: RestCommand = { name: 'OccupationAndIncomeSummary_DropdownsRestDetails', restAction: "get" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {},
       pageSelection: [ { pageName: 'OccupationAndIncomeSummary', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for OccupationAndIncomeSummary dropdownsRD get',
      withRequest: {
         method: 'GET',
         path:   '/customer/occupation/v2/occupationDetails',
         query:{},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleDropdowns0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, pathToLens, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary').focusQuery('dropdowns').set ( rawExpected, samples.sampleDropdowns0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'OccupationAndIncomeSummary', provider: 'OccupationAndIncomeSummaryProvider', cors: true }, provider => {
describe ( 'OccupationAndIncomeSummary - occupationAndIncomeRD - fetcher', () => {
  it ( 'should have a  fetcher for OccupationAndIncomeFullDomain', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for OccupationAndIncomeFullDomain',
      withRequest: {
        method: 'GET',
        path: '/customer/occupation/v2/occupationIncomeDetails',
        query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","clientRef":"custId"}
      },
      willRespondWith: {
        status: 200,
        body: samples.sampleOccupationAndIncomeFullDomain0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'OccupationAndIncomeSummary', pageMode: 'view' }], CommonIds: {"accountId":"accId","applRef":"appref","brandRef":"brandRef","clientRef":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= OccupationAndIncomeFullDomainFetcher (Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'OccupationAndIncomeSummary_~/fromApi': ["accId","appref","brandRef","custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary').focusQuery('fromApi').set ( expectedRaw, samples.sampleOccupationAndIncomeFullDomain0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest occupationAndIncomeRD get pact test for OccupationAndIncomeSummary
pactWith ( { consumer: 'OccupationAndIncomeSummary', provider: 'OccupationAndIncomeSummaryProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary - occupationAndIncomeRD rest get', () => {
   it ( 'should have a get rest for OccupationAndIncomeFullDomain', async () => {
    const restCommand: RestCommand = { name: 'OccupationAndIncomeSummary_OccupationAndIncomeFullDomainRestDetails', restAction: "get" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","applRef":"appref","brandRef":"brandRef","clientRef":"custId"},
       pageSelection: [ { pageName: 'OccupationAndIncomeSummary', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for OccupationAndIncomeSummary occupationAndIncomeRD get',
      withRequest: {
         method: 'GET',
         path:   '/customer/occupation/v2/occupationIncomeDetails',
         query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","clientRef":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleOccupationAndIncomeFullDomain0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, pathToLens, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary').focusQuery('fromApi').set ( rawExpected, samples.sampleOccupationAndIncomeFullDomain0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//Rest occupationAndIncomeRD update pact test for OccupationAndIncomeSummary
pactWith ( { consumer: 'OccupationAndIncomeSummary', provider: 'OccupationAndIncomeSummaryProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary - occupationAndIncomeRD rest update', () => {
   it ( 'should have a update rest for OccupationAndIncomeFullDomain', async () => {
    const restCommand: RestCommand = { name: 'OccupationAndIncomeSummary_OccupationAndIncomeFullDomainRestDetails', restAction: "update" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","applRef":"appref","brandRef":"brandRef","clientRef":"custId"},
       pageSelection: [ { pageName: 'OccupationAndIncomeSummary', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for OccupationAndIncomeSummary occupationAndIncomeRD update',
      withRequest: {
         method: 'PUT',
         path:   '/customer/occupation/v2/occupationIncomeDetails',
         query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","clientRef":"custId"},
         body: JSON.stringify(samples.sampleOccupationAndIncomeFullDomain0),
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleOccupationAndIncomeFullDomain0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
      [Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary').focusQuery('fromApi'), () => samples.sampleOccupationAndIncomeFullDomain0]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, pathToLens, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary').focusQuery('fromApi').set ( rawExpected, samples.sampleOccupationAndIncomeFullDomain0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'OccupationAndIncomeSummary', provider: 'OccupationAndIncomeSummaryProvider', cors: true }, provider => {
describe ( 'OccupationAndIncomeSummary - otherSourcesOfIncomeRD - fetcher', () => {
  it ( 'should have a  fetcher for OtherIncomeResponse', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for OtherIncomeResponse',
      withRequest: {
        method: 'GET',
        path: '/customer/occupation/v2/otherIncome',
        query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","clientRef":"custId"}
      },
      willRespondWith: {
        status: 200,
        body: samples.sampleOtherIncomeResponse0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'OccupationAndIncomeSummary', pageMode: 'view' }], CommonIds: {"accountId":"accId","applRef":"appref","brandRef":"brandRef","clientRef":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= OtherIncomeResponseFetcher (Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'OccupationAndIncomeSummary_~/otherSourcesOfIncome': ["accId","appref","brandRef","custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary').focusQuery('otherSourcesOfIncome').set ( expectedRaw, samples.sampleOtherIncomeResponse0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest otherSourcesOfIncomeRD get pact test for OccupationAndIncomeSummary
pactWith ( { consumer: 'OccupationAndIncomeSummary', provider: 'OccupationAndIncomeSummaryProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary - otherSourcesOfIncomeRD rest get', () => {
   it ( 'should have a get rest for OtherIncomeResponse', async () => {
    const restCommand: RestCommand = { name: 'OccupationAndIncomeSummary_OtherIncomeResponseRestDetails', restAction: "get" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","applRef":"appref","brandRef":"brandRef","clientRef":"custId"},
       pageSelection: [ { pageName: 'OccupationAndIncomeSummary', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for OccupationAndIncomeSummary otherSourcesOfIncomeRD get',
      withRequest: {
         method: 'GET',
         path:   '/customer/occupation/v2/otherIncome',
         query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","clientRef":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleOtherIncomeResponse0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, pathToLens, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary').focusQuery('otherSourcesOfIncome').set ( rawExpected, samples.sampleOtherIncomeResponse0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})
