import {emptyState, {stateName} } from "./{commonFile}";
import * as fetchers from "./fetchers";





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
      let newState = await loadTree ( {tree}, emptyState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... emptyState,
        {pageName}: {{target}: {body}},
        tags: { {pageName}_{target}:{commonParamsTagsValue} }
      } )
    } )
  } )
})