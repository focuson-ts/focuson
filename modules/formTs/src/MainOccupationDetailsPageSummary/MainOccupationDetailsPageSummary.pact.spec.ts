import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { Lenses, massTransform, Transform } from "@focuson/lens";
import * as samples from '../MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.samples'
import {emptyState, FState , commonIds, identityL } from "../common";
import * as rests from "../rests";
import { restUrlMutator } from "../rests";
import {AdditionalInfoFirstFetcher} from './MainOccupationDetailsPageSummary.fetchers'
import {AdditionalInfoSecondFetcher} from './MainOccupationDetailsPageSummary.fetchers'
import {OccupationAndIncomeFullDomainFetcher} from './MainOccupationDetailsPageSummary.fetchers'
import {ListOccupationsFetcher} from './MainOccupationDetailsPageSummary.fetchers'
import {OtherIncomeResponseFetcher} from './MainOccupationDetailsPageSummary.fetchers'

describe("Allow pacts to be run from intelliJ for MainOccupationDetailsPageSummary", () =>{})

//GetFetcher pact test
pactWith ( { consumer: 'MainOccupationDetailsPageSummary', provider: 'MainOccupationDetailsPageSummaryProvider', cors: true }, provider => {
describe ( 'MainOccupationDetailsPageSummary - additionalInfoFirstRD - fetcher', () => {
  it ( 'should have a  fetcher for AdditionalInfoFirst', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for AdditionalInfoFirst',
      withRequest: {
        method: 'GET',
        path: '/customer/occupation/v2/additionalInfoFirst',
        query:{"customerId":"custId"}
      },
      willRespondWith: {
        status: 200,
        body: samples.sampleAdditionalInfoFirst0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'MainOccupationDetailsPageSummary', pageMode: 'view' }], CommonIds: {"customerId":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= AdditionalInfoFirstFetcher (Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'MainOccupationDetailsPageSummary_~/fromApi/additionalInfoFirst': ["custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary').focusQuery('fromApi').focusQuery('additionalInfoFirst').set ( expectedRaw, samples.sampleAdditionalInfoFirst0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest additionalInfoFirstRD get pact test for MainOccupationDetailsPageSummary
pactWith ( { consumer: 'MainOccupationDetailsPageSummary', provider: 'MainOccupationDetailsPageSummaryProvider', cors: true }, provider => {
  describe ( 'MainOccupationDetailsPageSummary - additionalInfoFirstRD rest get', () => {
   it ( 'should have a get rest for AdditionalInfoFirst', async () => {
    const restCommand: RestCommand = { name: 'MainOccupationDetailsPageSummary_AdditionalInfoFirstRestDetails', restAction: 'get' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"customerId":"custId"},
       pageSelection: [ { pageName: 'MainOccupationDetailsPageSummary', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for MainOccupationDetailsPageSummary additionalInfoFirstRD get',
      withRequest: {
         method: 'GET',
         path:   '/customer/occupation/v2/additionalInfoFirst',
         query:{"customerId":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleAdditionalInfoFirst0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary').focusQuery('fromApi').focusQuery('additionalInfoFirst').set ( rawExpected, samples.sampleAdditionalInfoFirst0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//Rest additionalInfoFirstRD update pact test for MainOccupationDetailsPageSummary
pactWith ( { consumer: 'MainOccupationDetailsPageSummary', provider: 'MainOccupationDetailsPageSummaryProvider', cors: true }, provider => {
  describe ( 'MainOccupationDetailsPageSummary - additionalInfoFirstRD rest update', () => {
   it ( 'should have a update rest for AdditionalInfoFirst', async () => {
    const restCommand: RestCommand = { name: 'MainOccupationDetailsPageSummary_AdditionalInfoFirstRestDetails', restAction: 'update' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"customerId":"custId"},
       pageSelection: [ { pageName: 'MainOccupationDetailsPageSummary', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for MainOccupationDetailsPageSummary additionalInfoFirstRD update',
      withRequest: {
         method: 'PUT',
         path:   '/customer/occupation/v2/additionalInfoFirst',
         query:{"customerId":"custId"},
         body: JSON.stringify(samples.sampleAdditionalInfoFirst0),
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleAdditionalInfoFirst0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    [Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary').focusQuery('fromApi').focusQuery('additionalInfoFirst'), () => samples.sampleAdditionalInfoFirst0]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary').focusQuery('fromApi').focusQuery('additionalInfoFirst').set ( rawExpected, samples.sampleAdditionalInfoFirst0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'MainOccupationDetailsPageSummary', provider: 'MainOccupationDetailsPageSummaryProvider', cors: true }, provider => {
describe ( 'MainOccupationDetailsPageSummary - additionalInfoSecondRD - fetcher', () => {
  it ( 'should have a  fetcher for AdditionalInfoSecond', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for AdditionalInfoSecond',
      withRequest: {
        method: 'GET',
        path: '/customer/occupation/v2/additionalInfoSecond',
        query:{"customerId":"custId"}
      },
      willRespondWith: {
        status: 200,
        body: samples.sampleAdditionalInfoSecond0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'MainOccupationDetailsPageSummary', pageMode: 'view' }], CommonIds: {"customerId":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= AdditionalInfoSecondFetcher (Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'MainOccupationDetailsPageSummary_~/fromApi/additionalInfoSecond': ["custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary').focusQuery('fromApi').focusQuery('additionalInfoSecond').set ( expectedRaw, samples.sampleAdditionalInfoSecond0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest additionalInfoSecondRD get pact test for MainOccupationDetailsPageSummary
pactWith ( { consumer: 'MainOccupationDetailsPageSummary', provider: 'MainOccupationDetailsPageSummaryProvider', cors: true }, provider => {
  describe ( 'MainOccupationDetailsPageSummary - additionalInfoSecondRD rest get', () => {
   it ( 'should have a get rest for AdditionalInfoSecond', async () => {
    const restCommand: RestCommand = { name: 'MainOccupationDetailsPageSummary_AdditionalInfoSecondRestDetails', restAction: 'get' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"customerId":"custId"},
       pageSelection: [ { pageName: 'MainOccupationDetailsPageSummary', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for MainOccupationDetailsPageSummary additionalInfoSecondRD get',
      withRequest: {
         method: 'GET',
         path:   '/customer/occupation/v2/additionalInfoSecond',
         query:{"customerId":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleAdditionalInfoSecond0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary').focusQuery('fromApi').focusQuery('additionalInfoSecond').set ( rawExpected, samples.sampleAdditionalInfoSecond0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//Rest additionalInfoSecondRD update pact test for MainOccupationDetailsPageSummary
pactWith ( { consumer: 'MainOccupationDetailsPageSummary', provider: 'MainOccupationDetailsPageSummaryProvider', cors: true }, provider => {
  describe ( 'MainOccupationDetailsPageSummary - additionalInfoSecondRD rest update', () => {
   it ( 'should have a update rest for AdditionalInfoSecond', async () => {
    const restCommand: RestCommand = { name: 'MainOccupationDetailsPageSummary_AdditionalInfoSecondRestDetails', restAction: 'update' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"customerId":"custId"},
       pageSelection: [ { pageName: 'MainOccupationDetailsPageSummary', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for MainOccupationDetailsPageSummary additionalInfoSecondRD update',
      withRequest: {
         method: 'PUT',
         path:   '/customer/occupation/v2/additionalInfoSecond',
         query:{"customerId":"custId"},
         body: JSON.stringify(samples.sampleAdditionalInfoSecond0),
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleAdditionalInfoSecond0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    [Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary').focusQuery('fromApi').focusQuery('additionalInfoSecond'), () => samples.sampleAdditionalInfoSecond0]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary').focusQuery('fromApi').focusQuery('additionalInfoSecond').set ( rawExpected, samples.sampleAdditionalInfoSecond0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'MainOccupationDetailsPageSummary', provider: 'MainOccupationDetailsPageSummaryProvider', cors: true }, provider => {
describe ( 'MainOccupationDetailsPageSummary - occupationAndIncomeRD - fetcher', () => {
  it ( 'should have a  fetcher for OccupationAndIncomeFullDomain', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for OccupationAndIncomeFullDomain',
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
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'MainOccupationDetailsPageSummary', pageMode: 'view' }], CommonIds: {"customerId":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= OccupationAndIncomeFullDomainFetcher (Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'MainOccupationDetailsPageSummary_~/fromApi/occupationAndIncome': ["custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary').focusQuery('fromApi').focusQuery('occupationAndIncome').set ( expectedRaw, samples.sampleOccupationAndIncomeFullDomain0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest occupationAndIncomeRD get pact test for MainOccupationDetailsPageSummary
pactWith ( { consumer: 'MainOccupationDetailsPageSummary', provider: 'MainOccupationDetailsPageSummaryProvider', cors: true }, provider => {
  describe ( 'MainOccupationDetailsPageSummary - occupationAndIncomeRD rest get', () => {
   it ( 'should have a get rest for OccupationAndIncomeFullDomain', async () => {
    const restCommand: RestCommand = { name: 'MainOccupationDetailsPageSummary_OccupationAndIncomeFullDomainRestDetails', restAction: 'get' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"customerId":"custId"},
       pageSelection: [ { pageName: 'MainOccupationDetailsPageSummary', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for MainOccupationDetailsPageSummary occupationAndIncomeRD get',
      withRequest: {
         method: 'GET',
         path:   '/customer/occupation/v2/occupationIncomeDetails',
         query:{"customerId":"custId"},
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
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary').focusQuery('fromApi').focusQuery('occupationAndIncome').set ( rawExpected, samples.sampleOccupationAndIncomeFullDomain0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//Rest occupationAndIncomeRD update pact test for MainOccupationDetailsPageSummary
pactWith ( { consumer: 'MainOccupationDetailsPageSummary', provider: 'MainOccupationDetailsPageSummaryProvider', cors: true }, provider => {
  describe ( 'MainOccupationDetailsPageSummary - occupationAndIncomeRD rest update', () => {
   it ( 'should have a update rest for OccupationAndIncomeFullDomain', async () => {
    const restCommand: RestCommand = { name: 'MainOccupationDetailsPageSummary_OccupationAndIncomeFullDomainRestDetails', restAction: 'update' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"customerId":"custId"},
       pageSelection: [ { pageName: 'MainOccupationDetailsPageSummary', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for MainOccupationDetailsPageSummary occupationAndIncomeRD update',
      withRequest: {
         method: 'PUT',
         path:   '/customer/occupation/v2/occupationIncomeDetails',
         query:{"customerId":"custId"},
         body: JSON.stringify(samples.sampleOccupationAndIncomeFullDomain0),
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleOccupationAndIncomeFullDomain0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    [Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary').focusQuery('fromApi').focusQuery('occupationAndIncome'), () => samples.sampleOccupationAndIncomeFullDomain0]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary').focusQuery('fromApi').focusQuery('occupationAndIncome').set ( rawExpected, samples.sampleOccupationAndIncomeFullDomain0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'MainOccupationDetailsPageSummary', provider: 'MainOccupationDetailsPageSummaryProvider', cors: true }, provider => {
describe ( 'MainOccupationDetailsPageSummary - occupationsListRD - fetcher', () => {
  it ( 'should have a  fetcher for ListOccupations', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for ListOccupations',
      withRequest: {
        method: 'GET',
        path: '/customer/occupation/v2/occupationsList',
        query:{"customerId":"custId"}
      },
      willRespondWith: {
        status: 200,
        body: samples.sampleListOccupations0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'MainOccupationDetailsPageSummary', pageMode: 'view' }], CommonIds: {"customerId":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= ListOccupationsFetcher (Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'MainOccupationDetailsPageSummary_~/fromApi/occupationsList': ["custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary').focusQuery('fromApi').focusQuery('occupationsList').set ( expectedRaw, samples.sampleListOccupations0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest occupationsListRD get pact test for MainOccupationDetailsPageSummary
pactWith ( { consumer: 'MainOccupationDetailsPageSummary', provider: 'MainOccupationDetailsPageSummaryProvider', cors: true }, provider => {
  describe ( 'MainOccupationDetailsPageSummary - occupationsListRD rest get', () => {
   it ( 'should have a get rest for ListOccupations', async () => {
    const restCommand: RestCommand = { name: 'MainOccupationDetailsPageSummary_ListOccupationsRestDetails', restAction: 'get' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"customerId":"custId"},
       pageSelection: [ { pageName: 'MainOccupationDetailsPageSummary', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for MainOccupationDetailsPageSummary occupationsListRD get',
      withRequest: {
         method: 'GET',
         path:   '/customer/occupation/v2/occupationsList',
         query:{"customerId":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleListOccupations0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary').focusQuery('fromApi').focusQuery('occupationsList').set ( rawExpected, samples.sampleListOccupations0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'MainOccupationDetailsPageSummary', provider: 'MainOccupationDetailsPageSummaryProvider', cors: true }, provider => {
describe ( 'MainOccupationDetailsPageSummary - otherSourcesOfIncomeRD - fetcher', () => {
  it ( 'should have a  fetcher for OtherIncomeResponse', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for OtherIncomeResponse',
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
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'MainOccupationDetailsPageSummary', pageMode: 'view' }], CommonIds: {"customerId":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= OtherIncomeResponseFetcher (Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'MainOccupationDetailsPageSummary_~/fromApi/otherSourcesOfIncome': ["custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary').focusQuery('fromApi').focusQuery('otherSourcesOfIncome').set ( expectedRaw, samples.sampleOtherIncomeResponse0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest otherSourcesOfIncomeRD get pact test for MainOccupationDetailsPageSummary
pactWith ( { consumer: 'MainOccupationDetailsPageSummary', provider: 'MainOccupationDetailsPageSummaryProvider', cors: true }, provider => {
  describe ( 'MainOccupationDetailsPageSummary - otherSourcesOfIncomeRD rest get', () => {
   it ( 'should have a get rest for OtherIncomeResponse', async () => {
    const restCommand: RestCommand = { name: 'MainOccupationDetailsPageSummary_OtherIncomeResponseRestDetails', restAction: 'get' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"customerId":"custId"},
       pageSelection: [ { pageName: 'MainOccupationDetailsPageSummary', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for MainOccupationDetailsPageSummary otherSourcesOfIncomeRD get',
      withRequest: {
         method: 'GET',
         path:   '/customer/occupation/v2/otherIncome',
         query:{"customerId":"custId"},
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
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary').focusQuery('fromApi').focusQuery('otherSourcesOfIncome').set ( rawExpected, samples.sampleOtherIncomeResponse0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//Rest otherSourcesOfIncomeRD update pact test for MainOccupationDetailsPageSummary
pactWith ( { consumer: 'MainOccupationDetailsPageSummary', provider: 'MainOccupationDetailsPageSummaryProvider', cors: true }, provider => {
  describe ( 'MainOccupationDetailsPageSummary - otherSourcesOfIncomeRD rest update', () => {
   it ( 'should have a update rest for OtherIncomeResponse', async () => {
    const restCommand: RestCommand = { name: 'MainOccupationDetailsPageSummary_OtherIncomeResponseRestDetails', restAction: 'update' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"customerId":"custId"},
       pageSelection: [ { pageName: 'MainOccupationDetailsPageSummary', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for MainOccupationDetailsPageSummary otherSourcesOfIncomeRD update',
      withRequest: {
         method: 'PUT',
         path:   '/customer/occupation/v2/otherIncome',
         query:{"customerId":"custId"},
         body: JSON.stringify(samples.sampleOtherIncomeResponse0),
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleOtherIncomeResponse0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    [Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary').focusQuery('fromApi').focusQuery('otherSourcesOfIncome'), () => samples.sampleOtherIncomeResponse0]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary').focusQuery('fromApi').focusQuery('otherSourcesOfIncome').set ( rawExpected, samples.sampleOtherIncomeResponse0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})
