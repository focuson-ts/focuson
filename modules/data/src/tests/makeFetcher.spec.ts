import { makeAllFetchers, makeFetchersDataStructure } from "../codegen/makeFetchers";
import { createPlanPD, EAccountsSummaryPD } from "../example/eAccountsSummary.pageD";

describe ( "makeAllFetchers", () => {
    it ( "should make a fetcher", () => {
      expect ( makeAllFetchers ( [ EAccountsSummaryPD, createPlanPD ] ) ).toEqual ( [
        "export function EAccountsSummaryDDFetcher<S>(getUrlParams: GetUrlParams<S>) {",
        "  return stateAndFromApiTagFetcherForModal<S, HasEAccountsSummaryDD, EAccountsSummaryDDDomain, 'EAccountsSummary'>(",
        "    commonFetch<S, HasEAccountsSummaryDD>(),",
        "     'EAccountsSummary',",
        "     'fromApi',",
        "     (s) => (s.focusOn('fromApi'),",
        "     (s) => getUrlParams(s, 'accountId', 'customerId'),",
        "     (s) => [makeUrl<S>('/api/accountsSummary?accountId={accountId}&customerId={customerId})',getUrlParams)(s), undefined]))",
        "}"
      ])
    } )
  }
)

describe ( 'makeFetchersDataStructure', () => {
  it ( "should record all the fetchers", () => {
    expect ( makeFetchersDataStructure ( { variableName: 'fetchers', stateName: 'theState',getUrlParamsName: 'getUrlParams' }, [ EAccountsSummaryPD, createPlanPD ] ) ).toEqual ( [
      "export const fetchers: FetcherTree<theState> = {",
      "fetchers: [",
      "   EAccountsSummaryDDFetcher<theState>(getUrlParams)",
      "]}"
    ] )
  } )
} );