import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { Lenses, massTransform, Transform } from "@focuson/lens";
import * as samples from '../AccountOverview/AccountOverview.samples'
import {emptyState, FState , commonIds, identityL } from "../common";
import * as rests from "../rests";
import { restUrlMutator } from "../rests";
import {AccountAllFlagsFetcher} from './AccountOverview.fetchers'
import {AccountOverviewAgreementTypeFetcher} from './AccountOverview.fetchers'
import {ArrearsDetailsFetcher} from './AccountOverview.fetchers'
import {AccountOverviewHistoryFetcher} from './AccountOverview.fetchers'
import {AccountOverviewExcessInfoFetcher} from './AccountOverview.fetchers'
import {AccountOverviewFetcher} from './AccountOverview.fetchers'
import {AccountOverviewOptOutFetcher} from './AccountOverview.fetchers'
import {AccountOverviewReasonFetcher} from './AccountOverview.fetchers'

describe("Allow pacts to be run from intelliJ for AccountOverview", () =>{})

//GetFetcher pact test
pactWith ( { consumer: 'AccountOverview', provider: 'AccountOverviewProvider', cors: true }, provider => {
describe ( 'AccountOverview - accountFlags - fetcher', () => {
  it ( 'should have a  fetcher for AccountAllFlags', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for AccountAllFlags',
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
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'AccountOverview', pageMode: 'view' }], CommonIds: {"accountId":"accId","customerId":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= AccountAllFlagsFetcher (Lenses.identity<FState>().focusQuery('AccountOverview'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'AccountOverview_~/accountFlags': ["accId","custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('AccountOverview').focusQuery('accountFlags').set ( expectedRaw, samples.sampleAccountAllFlags0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest accountFlags get pact test for AccountOverview
pactWith ( { consumer: 'AccountOverview', provider: 'AccountOverviewProvider', cors: true }, provider => {
  describe ( 'AccountOverview - accountFlags rest get', () => {
   it ( 'should have a get rest for AccountAllFlags', async () => {
    const restCommand: RestCommand = { name: 'AccountOverview_AccountAllFlagsRestDetails', restAction: 'get' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","customerId":"custId"},
       pageSelection: [ { pageName: 'AccountOverview', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for AccountOverview accountFlags get',
      withRequest: {
         method: 'GET',
         path:   '/api/accountOverview/flags',
         query:{"accountId":"accId","customerId":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleAccountAllFlags0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('AccountOverview').focusQuery('accountFlags').set ( rawExpected, samples.sampleAccountAllFlags0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'AccountOverview', provider: 'AccountOverviewProvider', cors: true }, provider => {
describe ( 'AccountOverview - agreementType - fetcher', () => {
  it ( 'should have a  fetcher for AccountOverviewAgreementType', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for AccountOverviewAgreementType',
      withRequest: {
        method: 'GET',
        path: '/api/accountOverview/agreementType',
        query:{"accountId":"accId","customerId":"custId"}
      },
      willRespondWith: {
        status: 200,
        body: samples.sampleAccountOverviewAgreementType0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'AccountOverview', pageMode: 'view' }], CommonIds: {"accountId":"accId","customerId":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= AccountOverviewAgreementTypeFetcher (Lenses.identity<FState>().focusQuery('AccountOverview'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'AccountOverview_~/agreementType': ["accId","custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('AccountOverview').focusQuery('agreementType').set ( expectedRaw, samples.sampleAccountOverviewAgreementType0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest agreementType get pact test for AccountOverview
pactWith ( { consumer: 'AccountOverview', provider: 'AccountOverviewProvider', cors: true }, provider => {
  describe ( 'AccountOverview - agreementType rest get', () => {
   it ( 'should have a get rest for AccountOverviewAgreementType', async () => {
    const restCommand: RestCommand = { name: 'AccountOverview_AccountOverviewAgreementTypeRestDetails', restAction: 'get' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","customerId":"custId"},
       pageSelection: [ { pageName: 'AccountOverview', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for AccountOverview agreementType get',
      withRequest: {
         method: 'GET',
         path:   '/api/accountOverview/agreementType',
         query:{"accountId":"accId","customerId":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleAccountOverviewAgreementType0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('AccountOverview').focusQuery('agreementType').set ( rawExpected, samples.sampleAccountOverviewAgreementType0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'AccountOverview', provider: 'AccountOverviewProvider', cors: true }, provider => {
describe ( 'AccountOverview - arrearsDetails - fetcher', () => {
  it ( 'should have a  fetcher for ArrearsDetails', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for ArrearsDetails',
      withRequest: {
        method: 'GET',
        path: '/api/accountOverview/arrearsDetails',
        query:{"startDate":"2020-01-20","accountId":"accId","customerId":"custId"}
      },
      willRespondWith: {
        status: 200,
        body: samples.sampleArrearsDetails0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'AccountOverview', pageMode: 'view' }], CommonIds: {"accountId":"accId","customerId":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
    [Lenses.identity<FState>().focusQuery('AccountOverview').focusQuery('currentSelectedExcessHistory').focusQuery('start'), () =>"2020-01-20" ]
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= ArrearsDetailsFetcher (Lenses.identity<FState>().focusQuery('AccountOverview'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'AccountOverview_~/arrearsDetails': ["2020-01-20","accId","custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('AccountOverview').focusQuery('arrearsDetails').set ( expectedRaw, samples.sampleArrearsDetails0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest arrearsDetails get pact test for AccountOverview
pactWith ( { consumer: 'AccountOverview', provider: 'AccountOverviewProvider', cors: true }, provider => {
  describe ( 'AccountOverview - arrearsDetails rest get', () => {
   it ( 'should have a get rest for ArrearsDetails', async () => {
    const restCommand: RestCommand = { name: 'AccountOverview_ArrearsDetailsRestDetails', restAction: 'get' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","customerId":"custId"},
       pageSelection: [ { pageName: 'AccountOverview', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for AccountOverview arrearsDetails get',
      withRequest: {
         method: 'GET',
         path:   '/api/accountOverview/arrearsDetails',
         query:{"startDate":"2020-01-20","accountId":"accId","customerId":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleArrearsDetails0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
      [Lenses.identity<FState>().focusQuery('AccountOverview').focusQuery('currentSelectedExcessHistory').focusQuery('start'), () =>"2020-01-20" ]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('AccountOverview').focusQuery('arrearsDetails').set ( rawExpected, samples.sampleArrearsDetails0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'AccountOverview', provider: 'AccountOverviewProvider', cors: true }, provider => {
describe ( 'AccountOverview - excessHistory - fetcher', () => {
  it ( 'should have a  fetcher for AccountOverviewHistory', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for AccountOverviewHistory',
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
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'AccountOverview', pageMode: 'view' }], CommonIds: {"accountId":"accId","customerId":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= AccountOverviewHistoryFetcher (Lenses.identity<FState>().focusQuery('AccountOverview'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'AccountOverview_~/excessHistory': ["accId","custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('AccountOverview').focusQuery('excessHistory').set ( expectedRaw, samples.sampleAccountOverviewHistory0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest excessHistory get pact test for AccountOverview
pactWith ( { consumer: 'AccountOverview', provider: 'AccountOverviewProvider', cors: true }, provider => {
  describe ( 'AccountOverview - excessHistory rest get', () => {
   it ( 'should have a get rest for AccountOverviewHistory', async () => {
    const restCommand: RestCommand = { name: 'AccountOverview_AccountOverviewHistoryRestDetails', restAction: 'get' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","customerId":"custId"},
       pageSelection: [ { pageName: 'AccountOverview', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for AccountOverview excessHistory get',
      withRequest: {
         method: 'GET',
         path:   '/api/accountOverview/excessHistory',
         query:{"accountId":"accId","customerId":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleAccountOverviewHistory0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('AccountOverview').focusQuery('excessHistory').set ( rawExpected, samples.sampleAccountOverviewHistory0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'AccountOverview', provider: 'AccountOverviewProvider', cors: true }, provider => {
describe ( 'AccountOverview - excessInfo - fetcher', () => {
  it ( 'should have a  fetcher for AccountOverviewExcessInfo', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for AccountOverviewExcessInfo',
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
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'AccountOverview', pageMode: 'view' }], CommonIds: {"accountId":"accId","customerId":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= AccountOverviewExcessInfoFetcher (Lenses.identity<FState>().focusQuery('AccountOverview'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'AccountOverview_~/excessInfo': ["accId","custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('AccountOverview').focusQuery('excessInfo').set ( expectedRaw, samples.sampleAccountOverviewExcessInfo0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest excessInfo get pact test for AccountOverview
pactWith ( { consumer: 'AccountOverview', provider: 'AccountOverviewProvider', cors: true }, provider => {
  describe ( 'AccountOverview - excessInfo rest get', () => {
   it ( 'should have a get rest for AccountOverviewExcessInfo', async () => {
    const restCommand: RestCommand = { name: 'AccountOverview_AccountOverviewExcessInfoRestDetails', restAction: 'get' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","customerId":"custId"},
       pageSelection: [ { pageName: 'AccountOverview', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for AccountOverview excessInfo get',
      withRequest: {
         method: 'GET',
         path:   '/api/accountOverview/excessInfo',
         query:{"accountId":"accId","customerId":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleAccountOverviewExcessInfo0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('AccountOverview').focusQuery('excessInfo').set ( rawExpected, samples.sampleAccountOverviewExcessInfo0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'AccountOverview', provider: 'AccountOverviewProvider', cors: true }, provider => {
describe ( 'AccountOverview - main - fetcher', () => {
  it ( 'should have a  fetcher for AccountOverview', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for AccountOverview',
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
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'AccountOverview', pageMode: 'view' }], CommonIds: {"accountId":"accId","customerId":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= AccountOverviewFetcher (Lenses.identity<FState>().focusQuery('AccountOverview'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'AccountOverview_~/main': ["accId","custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('AccountOverview').focusQuery('main').set ( expectedRaw, samples.sampleAccountOverview0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest main get pact test for AccountOverview
pactWith ( { consumer: 'AccountOverview', provider: 'AccountOverviewProvider', cors: true }, provider => {
  describe ( 'AccountOverview - main rest get', () => {
   it ( 'should have a get rest for AccountOverview', async () => {
    const restCommand: RestCommand = { name: 'AccountOverview_AccountOverviewRestDetails', restAction: 'get' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","customerId":"custId"},
       pageSelection: [ { pageName: 'AccountOverview', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for AccountOverview main get',
      withRequest: {
         method: 'GET',
         path:   '/api/accountOverview',
         query:{"accountId":"accId","customerId":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleAccountOverview0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('AccountOverview').focusQuery('main').set ( rawExpected, samples.sampleAccountOverview0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'AccountOverview', provider: 'AccountOverviewProvider', cors: true }, provider => {
describe ( 'AccountOverview - optOut - fetcher', () => {
  it ( 'should have a  fetcher for AccountOverviewOptOut', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for AccountOverviewOptOut',
      withRequest: {
        method: 'GET',
        path: '/api/accountOverview/optOut',
        query:{"accountId":"accId","customerId":"custId"}
      },
      willRespondWith: {
        status: 200,
        body: samples.sampleAccountOverviewOptOut0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'AccountOverview', pageMode: 'view' }], CommonIds: {"accountId":"accId","customerId":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= AccountOverviewOptOutFetcher (Lenses.identity<FState>().focusQuery('AccountOverview'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'AccountOverview_~/optOut': ["accId","custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('AccountOverview').focusQuery('optOut').set ( expectedRaw, samples.sampleAccountOverviewOptOut0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest optOut get pact test for AccountOverview
pactWith ( { consumer: 'AccountOverview', provider: 'AccountOverviewProvider', cors: true }, provider => {
  describe ( 'AccountOverview - optOut rest get', () => {
   it ( 'should have a get rest for AccountOverviewOptOut', async () => {
    const restCommand: RestCommand = { name: 'AccountOverview_AccountOverviewOptOutRestDetails', restAction: 'get' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","customerId":"custId"},
       pageSelection: [ { pageName: 'AccountOverview', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for AccountOverview optOut get',
      withRequest: {
         method: 'GET',
         path:   '/api/accountOverview/optOut',
         query:{"accountId":"accId","customerId":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleAccountOverviewOptOut0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('AccountOverview').focusQuery('optOut').set ( rawExpected, samples.sampleAccountOverviewOptOut0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'AccountOverview', provider: 'AccountOverviewProvider', cors: true }, provider => {
describe ( 'AccountOverview - reason - fetcher', () => {
  it ( 'should have a  fetcher for AccountOverviewReason', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for AccountOverviewReason',
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
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'AccountOverview', pageMode: 'view' }], CommonIds: {"accountId":"accId","customerId":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= AccountOverviewReasonFetcher (Lenses.identity<FState>().focusQuery('AccountOverview'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'AccountOverview_~/reason': ["accId","custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('AccountOverview').focusQuery('reason').set ( expectedRaw, samples.sampleAccountOverviewReason0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest reason get pact test for AccountOverview
pactWith ( { consumer: 'AccountOverview', provider: 'AccountOverviewProvider', cors: true }, provider => {
  describe ( 'AccountOverview - reason rest get', () => {
   it ( 'should have a get rest for AccountOverviewReason', async () => {
    const restCommand: RestCommand = { name: 'AccountOverview_AccountOverviewReasonRestDetails', restAction: 'get' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","customerId":"custId"},
       pageSelection: [ { pageName: 'AccountOverview', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for AccountOverview reason get',
      withRequest: {
         method: 'GET',
         path:   '/api/accountOverview/reason',
         query:{"accountId":"accId","customerId":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleAccountOverviewReason0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('AccountOverview').focusQuery('reason').set ( rawExpected, samples.sampleAccountOverviewReason0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})
