import { FState } from "ExampleApp/src/common";
import * as fetchers from "ExampleApp/src/fetchers";
import * as common from "ExampleApp/src/common";

const emptyState: FState = {
  {commonParams}: {commonParamsValue},
  tags: {},
  messages: [],
  pageSelection: { pageName: '{pageName}' },
  {pageName}:{}
}

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