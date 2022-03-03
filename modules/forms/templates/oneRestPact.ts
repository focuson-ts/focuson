pactWith ( { consumer: '{consumer}', provider: '{provider}', cors: true }, provider => {
  describe ( '{description1}', () => {

    it ( '{description2}', async () => {
      const restCommand: RestCommand = { name: '{restDetailsName}', restAction: '{action}', path: [ '{pageName}' ] }
      const firstState: {stateName} = {
        ...emptyState, restCommands: [ restCommand ],
      {object},
        pageSelection: [ { pageName: '{pageName}', pageMode: 'view' } ]
      }
      const url = applyToTemplate('{path}', firstState.{commonParams}).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: '{description1} {description2}',
        withRequest: {
          method: '{method}',
          path: url,
          query:{commonParamsValue}
          {requestObject}
        },
        willRespondWith: {
          status: {status},
          body: {body}
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, {restsFile}.restDetails, simpleMessagesL(), restL(), firstState )
      expect ( { ...newState, messages: []}).toEqual ( { ...firstState, restCommands: [], {pageName}: { {target}: samples.{sample}} } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)

    } )
  } )
})