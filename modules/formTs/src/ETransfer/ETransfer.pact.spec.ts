import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { Lenses, massTransform } from "@focuson/lens";
import * as samples from '../ETransfer/ETransfer.samples'
import {emptyState, FState , commonIds, identityL } from "../common";
import * as rests from "../rests";

//Rest eTransfer create pact test for ETransfer
  pactWith ( { consumer: 'ETransfer', provider: 'ETransferProvider', cors: true }, provider => {
    describe ( 'ETransfer - eTransfer rest create', () => {
      it ( 'should have a create rest for ETransferDataD', async () => {
        const restCommand: RestCommand = { name: 'ETransfer_ETransferDataDRestDetails', restAction: 'create' }
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
            path:  '/api/eTransfers',
            query:{"customerId":"custId"},
            body: samples.sampleETransferDataD0,
          },
          willRespondWith: {
            status: 200,
            body: samples.sampleETransferDataD0
          },
        } )
        const withIds = massTransform(firstState,)
        let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
        let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
        const rawExpected:any = { ...firstState, restCommands: []}
        const expected = Lenses.identity<FState>().focusQuery('ETransfer').focusQuery('fromApi').set ( rawExpected, samples.sampleETransferDataD0 )
        expect ( { ...newState, messages: []}).toEqual ( expected )
        expect ( newState.messages.length ).toEqual ( 1 )
        expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
      } )
      } )
      })
  