import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { applyToTemplate } from "@focuson/template";
import { Lenses, massTransform } from "@focuson/lens";
import * as samples from '../ETransfer/ETransfer.samples'
import {emptyState, FState } from "../common";
import * as fetchers from "../fetchers";
import * as rests from "../rests";
//Rest create pact test
pactWith ( { consumer: 'ETransferDataD', provider: 'ETransferDataDProvider', cors: true }, provider => {
  describe ( 'ETransfer', () => {
    it ( 'should have a create rest for ETransferDataD', async () => {
      const restCommand: RestCommand = { name: 'ETransfer_ETransferDataDRestDetails', restAction: 'create', path: [ 'ETransfer' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      ETransfer: { fromApi:samples.sampleETransferDataD0 },
        pageSelection: [ { pageName: 'ETransfer', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/eTransfers', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'ETransfer should have a create rest for ETransferDataD',
        withRequest: {
          method: 'POST',
          path: url,
          query:{"customerId":"custId"}
          ,body: JSON.stringify(samples.sampleETransferDataD0)
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleETransferDataD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), firstState )
      expect ( { ...newState, messages: []}).toEqual ( { ...firstState, restCommands: [], ETransfer: { fromApi: samples.sampleETransferDataD0} } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})