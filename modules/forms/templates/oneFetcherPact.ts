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
      {content}
    } )
  } )
})