pactWith ( { consumer: '{consumer}', provider: '{provider}', cors: true }, provider => {
  describe ( '{description1}', () => {

    it ( '{description2}', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: '{description1} {description2}',
        withRequest: {
          method: '{method}',
          path: '{path}',
          query:{commonParamsValue}
        },
        willRespondWith: {
          status: {status},
          body: {body}
        },
      } )
      const firstState: {stateName}  = { ...emptyState, pageSelection: { pageName: '{pageName}', pageMode: 'view' } , {pageName}: { }}
      let newState = await loadTree ( {tree}, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... firstState,
        {pageName}: {{target}: {body}},
        tags: { {pageName}_{target}:{commonParamsTagsValue} }
      } )
    } )
  } )
})