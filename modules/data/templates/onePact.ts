pactWith ( { consumer: '<consumer>', provider: '<provider>', cors: true }, provider => {
  describe ( '<description1>', () => {

    it ( '<description2>', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: '<description1> <description2>',
        withRequest: {
          method: '<method>',
          path: '<path>'
        },
        willRespondWith: {
          status: <status>,
          body: <body>
        },
      } )
      let newState = await loadTree ( <tree>, <emptyState>, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... <emptyState>,
        <target>: <body>,
        tags: { eTransfers: [ 'mycid' ] }
      } )
    } )
  } )
})