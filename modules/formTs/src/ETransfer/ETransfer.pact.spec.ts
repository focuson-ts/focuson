import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { Lenses, massTransform, Transform } from "@focuson/lens";
import * as samples from '../ETransfer/ETransfer.samples'
import {emptyState, FState , commonIds, identityL } from "../common";
import * as rests from "../rests";
import { restUrlMutator } from "../rests";

describe("Allow pacts to be run from intelliJ for ETransfer", () =>{})

//Rest eTransfer create pact test for ETransfer
pactWith ( { consumer: 'ETransfer', provider: 'ETransferProvider', cors: true }, provider => {
  describe ( 'ETransfer - eTransfer rest create', () => {
   it ( 'should have a create rest for ETransferDataD', async () => {
    const restCommand: RestCommand = { name: 'ETransfer__ETransferDataDRestDetails', restAction: 'create' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"customerId":"custId"},
       pageSelection: [ { pageName: 'ETransfer', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for ETransfer eTransfer create',
      withRequest: {
         method: 'POST',
         path:   '/api/eTransfers',
         query:{"customerId":"custId"},
         body: JSON.stringify(samples.sampleETransferDataD0),
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleETransferDataD0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    [Lenses.identity<FState>().focusQuery('ETransfer').focusQuery('fromApi'), () => samples.sampleETransferDataD0]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('ETransfer').focusQuery('fromApi').set ( rawExpected, samples.sampleETransferDataD0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})
