import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL} from "@focuson/pages";
import { Lenses, massTransform, Transform } from "@focuson/lens";
import * as samples from '../ListOfPaymentsPage/ListOfPaymentsPage.samples'
import {emptyState, FState , commonIds, identityL, pathToLens } from "../common";
import * as rests from "../rests";
import { restUrlMutator } from "../rests";
import {PrintRecordHistoryFetcher} from './ListOfPaymentsPage.fetchers'
import {somePrefix_PrintRecordHistoryFetcher} from './ListOfPaymentsPage.fetchers'

describe("Allow pacts to be run from intelliJ for ListOfPaymentsPage", () =>{})

//GetFetcher pact test
pactWith ( { consumer: 'ListOfPaymentsPage', provider: 'ListOfPaymentsPageProvider', cors: true }, provider => {
describe ( 'ListOfPaymentsPage - paymentHistory - fetcher', () => {
  it ( 'should have a  fetcher for PrintRecordHistory', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for PrintRecordHistory',
      withRequest: {
        method: 'GET',
        path: '/api/printrecordhistory',
        query:{"accountId":"123"}
      },
      willRespondWith: {
        status: 200,
        body: samples.samplePrintRecordHistory0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'ListOfPaymentsPage', pageMode: 'view' }], CommonIds: {"accountId":"123"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= PrintRecordHistoryFetcher (Lenses.identity<FState>().focusQuery('ListOfPaymentsPage'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'ListOfPaymentsPage_~/display': ["123"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('ListOfPaymentsPage').focusQuery('display').set ( expectedRaw, samples.samplePrintRecordHistory0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest paymentHistory get pact test for ListOfPaymentsPage
pactWith ( { consumer: 'ListOfPaymentsPage', provider: 'ListOfPaymentsPageProvider', cors: true }, provider => {
  describe ( 'ListOfPaymentsPage - paymentHistory rest get', () => {
   it ( 'should have a get rest for PrintRecordHistory', async () => {
    const restCommand: RestCommand = { name: 'ListOfPaymentsPage_PrintRecordHistoryRestDetails', restAction: "get" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"123"},
       pageSelection: [ { pageName: 'ListOfPaymentsPage', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for ListOfPaymentsPage paymentHistory get',
      withRequest: {
         method: 'GET',
         path:   '/api/printrecordhistory',
         query:{"accountId":"123"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.samplePrintRecordHistory0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, pathToLens, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('ListOfPaymentsPage').focusQuery('display').set ( rawExpected, samples.samplePrintRecordHistory0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'ListOfPaymentsPage', provider: 'ListOfPaymentsPageProvider', cors: true }, provider => {
describe ( 'ListOfPaymentsPage - paymentHistoryNext - fetcher', () => {
  it ( 'should have a  fetcher for PrintRecordHistory', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for PrintRecordHistory',
      withRequest: {
        method: 'GET',
        path: '/api/printrecordhistoryx',
        query:{"accountId":"123"}
      },
      willRespondWith: {
        status: 200,
        body: samples.samplePrintRecordHistory0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'ListOfPaymentsPage', pageMode: 'view' }], CommonIds: {"accountId":"123"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= somePrefix_PrintRecordHistoryFetcher (Lenses.identity<FState>().focusQuery('ListOfPaymentsPage'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'ListOfPaymentsPage_~/display': ["123"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('ListOfPaymentsPage').focusQuery('display').set ( expectedRaw, samples.samplePrintRecordHistory0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest paymentHistoryNext get pact test for ListOfPaymentsPage
pactWith ( { consumer: 'ListOfPaymentsPage', provider: 'ListOfPaymentsPageProvider', cors: true }, provider => {
  describe ( 'ListOfPaymentsPage - paymentHistoryNext rest get', () => {
   it ( 'should have a get rest for PrintRecordHistory', async () => {
    const restCommand: RestCommand = { name: 'ListOfPaymentsPage_somePrefix_PrintRecordHistoryRestDetails', restAction: "get" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"123"},
       pageSelection: [ { pageName: 'ListOfPaymentsPage', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for ListOfPaymentsPage paymentHistoryNext get',
      withRequest: {
         method: 'GET',
         path:   '/api/printrecordhistoryx',
         query:{"accountId":"123"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.samplePrintRecordHistory0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, pathToLens, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('ListOfPaymentsPage').focusQuery('display').set ( rawExpected, samples.samplePrintRecordHistory0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//Rest paymentHistoryNext create pact test for ListOfPaymentsPage
pactWith ( { consumer: 'ListOfPaymentsPage', provider: 'ListOfPaymentsPageProvider', cors: true }, provider => {
  describe ( 'ListOfPaymentsPage - paymentHistoryNext rest create', () => {
   it ( 'should have a create rest for PrintRecordHistory', async () => {
    const restCommand: RestCommand = { name: 'ListOfPaymentsPage_somePrefix_PrintRecordHistoryRestDetails', restAction: "create" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"123"},
       pageSelection: [ { pageName: 'ListOfPaymentsPage', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for ListOfPaymentsPage paymentHistoryNext create',
      withRequest: {
         method: 'POST',
         path:   '/api/printrecordhistoryx',
         query:{"accountId":"123"},
         body: JSON.stringify(samples.samplePrintRecordHistory0),
      },
      willRespondWith: {
         status: 200,
         body: samples.samplePrintRecordHistory0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
      [Lenses.identity<FState>().focusQuery('ListOfPaymentsPage').focusQuery('display'), () => samples.samplePrintRecordHistory0]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, pathToLens, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('ListOfPaymentsPage').focusQuery('display').set ( rawExpected, samples.samplePrintRecordHistory0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//Rest paymentHistoryNext [object Object] pact test for ListOfPaymentsPage
pactWith ( { consumer: 'ListOfPaymentsPage', provider: 'ListOfPaymentsPageProvider', cors: true }, provider => {
  describe ( 'ListOfPaymentsPage - paymentHistoryNext rest state:print', () => {
   it ( 'should have a state:print rest for PrintRecordHistory', async () => {
    const restCommand: RestCommand = { name: 'ListOfPaymentsPage_somePrefix_PrintRecordHistoryRestDetails', restAction: {"state":"print"} }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"123"},
       pageSelection: [ { pageName: 'ListOfPaymentsPage', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for ListOfPaymentsPage paymentHistoryNext state:print',
      withRequest: {
         method: 'POST',
         path:   '/api/printrecord/print',
         query:{"accountId":"123"},
         //no request body needed for state:print,
      },
      willRespondWith: {
         status: 200,
         body: {"statesomePrefixPrintRecordItemprint": true}
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
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
