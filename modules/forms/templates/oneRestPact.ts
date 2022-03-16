pactWith ( { consumer: '{consumer}', provider: '{provider}', cors: true }, provider => {
  describe ( '{description1} - rest {action}', () => {

    it ( '{description2}', async () => {
      const restCommand: RestCommand = { name: '{restDetailsName}', restAction: '{action}' }
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
{content}
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, {restsFile}.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], {pageName}: { {target}: samples.{sample}{closeTarget} }
      {expected}
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)

    } )
  } )
})