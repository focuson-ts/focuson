import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL} from "@focuson/pages";
import { Lenses, massTransform, Transform } from "@focuson/lens";
import * as samples from '../LinkedAccountDetails/LinkedAccountDetails.samples'
import {emptyState, FState , commonIds, identityL, pathToLens } from "../common";
import * as rests from "../rests";
import { restUrlMutator } from "../rests";
import {CollectionsListFetcher} from './LinkedAccountDetails.fetchers'
import {CollectionSummaryFetcher} from './LinkedAccountDetails.fetchers'
import {OverpaymentPageFetcher} from './LinkedAccountDetails.fetchers'
import {MandateListFetcher} from './LinkedAccountDetails.fetchers'

describe("Allow pacts to be run from intelliJ for LinkedAccountDetails", () =>{})

//GetFetcher pact test
pactWith ( { consumer: 'LinkedAccountDetails', provider: 'LinkedAccountDetailsProvider', cors: true }, provider => {
describe ( 'LinkedAccountDetails - collectionHistoryList - fetcher', () => {
  it ( 'should have a  fetcher for CollectionsList', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for CollectionsList',
      withRequest: {
        method: 'GET',
        path: '/api/collections/list',
        query:{"accountId":"143598547-75","clientRef":"custId"}
      },
      willRespondWith: {
        status: 200,
        body: samples.sampleCollectionsList0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'LinkedAccountDetails', pageMode: 'view' }], CommonIds: {"clientRef":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
    [Lenses.identity<FState>().focusQuery('LinkedAccountDetails').focusQuery('display').focusQuery('mandate').focusQuery('accountId'), () =>"143598547-75" ]
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= CollectionsListFetcher (Lenses.identity<FState>().focusQuery('LinkedAccountDetails'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'LinkedAccountDetails_~/display/collectionHistory': ["143598547-75","custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('LinkedAccountDetails').focusQuery('display').focusQuery('collectionHistory').set ( expectedRaw, samples.sampleCollectionsList0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest collectionHistoryList get pact test for LinkedAccountDetails
pactWith ( { consumer: 'LinkedAccountDetails', provider: 'LinkedAccountDetailsProvider', cors: true }, provider => {
  describe ( 'LinkedAccountDetails - collectionHistoryList rest get', () => {
   it ( 'should have a get rest for CollectionsList', async () => {
    const restCommand: RestCommand = { name: 'LinkedAccountDetails_CollectionsListRestDetails', restAction: "get" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"clientRef":"custId"},
       pageSelection: [ { pageName: 'LinkedAccountDetails', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for LinkedAccountDetails collectionHistoryList get',
      withRequest: {
         method: 'GET',
         path:   '/api/collections/list',
         query:{"accountId":"143598547-75","clientRef":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleCollectionsList0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
      [Lenses.identity<FState>().focusQuery('LinkedAccountDetails').focusQuery('display').focusQuery('mandate').focusQuery('accountId'), () =>"143598547-75" ]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, pathToLens, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('LinkedAccountDetails').focusQuery('display').focusQuery('collectionHistory').set ( rawExpected, samples.sampleCollectionsList0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'LinkedAccountDetails', provider: 'LinkedAccountDetailsProvider', cors: true }, provider => {
describe ( 'LinkedAccountDetails - collectionSummary - fetcher', () => {
  it ( 'should have a  fetcher for CollectionSummary', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for CollectionSummary',
      withRequest: {
        method: 'GET',
        path: '/api/collections/summary',
        query:{"accountId":"143598547-75","clientRef":"custId"}
      },
      willRespondWith: {
        status: 200,
        body: samples.sampleCollectionSummary0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'LinkedAccountDetails', pageMode: 'view' }], CommonIds: {"clientRef":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
    [Lenses.identity<FState>().focusQuery('LinkedAccountDetails').focusQuery('display').focusQuery('mandate').focusQuery('accountId'), () =>"143598547-75" ]
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= CollectionSummaryFetcher (Lenses.identity<FState>().focusQuery('LinkedAccountDetails'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'LinkedAccountDetails_~/display/collectionSummary': ["143598547-75","custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('LinkedAccountDetails').focusQuery('display').focusQuery('collectionSummary').set ( expectedRaw, samples.sampleCollectionSummary0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest collectionSummary get pact test for LinkedAccountDetails
pactWith ( { consumer: 'LinkedAccountDetails', provider: 'LinkedAccountDetailsProvider', cors: true }, provider => {
  describe ( 'LinkedAccountDetails - collectionSummary rest get', () => {
   it ( 'should have a get rest for CollectionSummary', async () => {
    const restCommand: RestCommand = { name: 'LinkedAccountDetails_CollectionSummaryRestDetails', restAction: "get" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"clientRef":"custId"},
       pageSelection: [ { pageName: 'LinkedAccountDetails', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for LinkedAccountDetails collectionSummary get',
      withRequest: {
         method: 'GET',
         path:   '/api/collections/summary',
         query:{"accountId":"143598547-75","clientRef":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleCollectionSummary0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
      [Lenses.identity<FState>().focusQuery('LinkedAccountDetails').focusQuery('display').focusQuery('mandate').focusQuery('accountId'), () =>"143598547-75" ]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, pathToLens, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('LinkedAccountDetails').focusQuery('display').focusQuery('collectionSummary').set ( rawExpected, samples.sampleCollectionSummary0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//Rest createPayment create pact test for LinkedAccountDetails
pactWith ( { consumer: 'LinkedAccountDetails', provider: 'LinkedAccountDetailsProvider', cors: true }, provider => {
  describe ( 'LinkedAccountDetails - createPayment rest create', () => {
   it ( 'should have a create rest for CreatePayment', async () => {
    const restCommand: RestCommand = { name: 'LinkedAccountDetails_CreatePaymentRestDetails', restAction: "create" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"clientRef":"custId"},
       pageSelection: [ { pageName: 'LinkedAccountDetails', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for LinkedAccountDetails createPayment create',
      withRequest: {
         method: 'POST',
         path:   '/api/payment/create',
         query:{"accountId":"1","clientRef":"custId","paymentId":"123"},
         body: JSON.stringify(samples.sampleCreatePayment0),
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleCreatePayment0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
      [Lenses.identity<FState>().focusQuery('LinkedAccountDetails').focusQuery('createPayment'), () => samples.sampleCreatePayment0],
      [Lenses.identity<FState>().focusQuery('LinkedAccountDetails').focusQuery('display').focusQuery('mandate').focusQuery('accountId'), () =>"1" ],
      [Lenses.identity<FState>().focusQuery('LinkedAccountDetails').focusQuery('selectedCollectionItem').focusQuery('paymentId'), () =>"123" ]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, pathToLens, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('LinkedAccountDetails').focusQuery('createPayment').set ( rawExpected, samples.sampleCreatePayment0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'LinkedAccountDetails', provider: 'LinkedAccountDetailsProvider', cors: true }, provider => {
describe ( 'LinkedAccountDetails - overpaymentHistory - fetcher', () => {
  it ( 'should have a  fetcher for OverpaymentPage', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for OverpaymentPage',
      withRequest: {
        method: 'GET',
        path: '/api/payment/overpayment/history',
        query:{"accountId":"accId","clientRef":"custId"}
      },
      willRespondWith: {
        status: 200,
        body: samples.sampleOverpaymentPage0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'LinkedAccountDetails', pageMode: 'view' }], CommonIds: {"accountId":"accId","clientRef":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= OverpaymentPageFetcher (Lenses.identity<FState>().focusQuery('LinkedAccountDetails'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'LinkedAccountDetails_~/overpayment': ["accId","custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('LinkedAccountDetails').focusQuery('overpayment').set ( expectedRaw, samples.sampleOverpaymentPage0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest overpaymentHistory get pact test for LinkedAccountDetails
pactWith ( { consumer: 'LinkedAccountDetails', provider: 'LinkedAccountDetailsProvider', cors: true }, provider => {
  describe ( 'LinkedAccountDetails - overpaymentHistory rest get', () => {
   it ( 'should have a get rest for OverpaymentPage', async () => {
    const restCommand: RestCommand = { name: 'LinkedAccountDetails_OverpaymentPageRestDetails', restAction: "get" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","clientRef":"custId"},
       pageSelection: [ { pageName: 'LinkedAccountDetails', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for LinkedAccountDetails overpaymentHistory get',
      withRequest: {
         method: 'GET',
         path:   '/api/payment/overpayment/history',
         query:{"accountId":"accId","clientRef":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleOverpaymentPage0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, pathToLens, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('LinkedAccountDetails').focusQuery('overpayment').set ( rawExpected, samples.sampleOverpaymentPage0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//Rest payments [object Object] pact test for LinkedAccountDetails
pactWith ( { consumer: 'LinkedAccountDetails', provider: 'LinkedAccountDetailsProvider', cors: true }, provider => {
  describe ( 'LinkedAccountDetails - payments rest state:cancel', () => {
   it ( 'should have a state:cancel rest for CollectionItem', async () => {
    const restCommand: RestCommand = { name: 'LinkedAccountDetails_CollectionItemRestDetails', restAction: {"state":"cancel"} }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"clientRef":"custId"},
       pageSelection: [ { pageName: 'LinkedAccountDetails', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for LinkedAccountDetails payments state:cancel',
      withRequest: {
         method: 'POST',
         path:   '/api/payment/cancel',
         query:{"accountId":"1","clientRef":"custId","paymentId":"123"},
         //no request body needed for state:cancel,
      },
      willRespondWith: {
         status: 200,
         body: {"stateCollectionItemcancel": true}
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
      [Lenses.identity<FState>().focusQuery('LinkedAccountDetails').focusQuery('display').focusQuery('mandate').focusQuery('accountId'), () =>"1" ],
      [Lenses.identity<FState>().focusQuery('LinkedAccountDetails').focusQuery('selectedCollectionItem').focusQuery('paymentId'), () =>"123" ]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, pathToLens, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = rawExpected; // this rest action doesn't load data
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//Rest payments [object Object] pact test for LinkedAccountDetails
pactWith ( { consumer: 'LinkedAccountDetails', provider: 'LinkedAccountDetailsProvider', cors: true }, provider => {
  describe ( 'LinkedAccountDetails - payments rest state:revalidate', () => {
   it ( 'should have a state:revalidate rest for CollectionItem', async () => {
    const restCommand: RestCommand = { name: 'LinkedAccountDetails_CollectionItemRestDetails', restAction: {"state":"revalidate"} }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"clientRef":"custId"},
       pageSelection: [ { pageName: 'LinkedAccountDetails', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for LinkedAccountDetails payments state:revalidate',
      withRequest: {
         method: 'POST',
         path:   '/api/payment/revalidate',
         query:{"accountId":"1","clientRef":"custId","paymentId":"123"},
         //no request body needed for state:revalidate,
      },
      willRespondWith: {
         status: 200,
         body: {"stateCollectionItemrevalidate": true}
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
      [Lenses.identity<FState>().focusQuery('LinkedAccountDetails').focusQuery('display').focusQuery('mandate').focusQuery('accountId'), () =>"1" ],
      [Lenses.identity<FState>().focusQuery('LinkedAccountDetails').focusQuery('selectedCollectionItem').focusQuery('paymentId'), () =>"123" ]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, pathToLens, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = rawExpected; // this rest action doesn't load data
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'LinkedAccountDetails', provider: 'LinkedAccountDetailsProvider', cors: true }, provider => {
describe ( 'LinkedAccountDetails - searchMandate - fetcher', () => {
  it ( 'should have a  fetcher for MandateList', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for MandateList',
      withRequest: {
        method: 'GET',
        path: '/api/mandates/allForClient',
        query:{"clientRef":"custId"}
      },
      willRespondWith: {
        status: 200,
        body: samples.sampleMandateList0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'LinkedAccountDetails', pageMode: 'view' }], CommonIds: {"clientRef":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= MandateListFetcher (Lenses.identity<FState>().focusQuery('LinkedAccountDetails'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'LinkedAccountDetails_~/selectMandateSearch/searchResults': ["custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('LinkedAccountDetails').focusQuery('selectMandateSearch').focusQuery('searchResults').set ( expectedRaw, samples.sampleMandateList0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest searchMandate get pact test for LinkedAccountDetails
pactWith ( { consumer: 'LinkedAccountDetails', provider: 'LinkedAccountDetailsProvider', cors: true }, provider => {
  describe ( 'LinkedAccountDetails - searchMandate rest get', () => {
   it ( 'should have a get rest for MandateList', async () => {
    const restCommand: RestCommand = { name: 'LinkedAccountDetails_MandateListRestDetails', restAction: "get" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"clientRef":"custId"},
       pageSelection: [ { pageName: 'LinkedAccountDetails', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for LinkedAccountDetails searchMandate get',
      withRequest: {
         method: 'GET',
         path:   '/api/mandates/allForClient',
         query:{"clientRef":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleMandateList0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, pathToLens, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('LinkedAccountDetails').focusQuery('selectMandateSearch').focusQuery('searchResults').set ( rawExpected, samples.sampleMandateList0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})
