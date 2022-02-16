import { makeAllFetchers } from "../codegen/makeFetchers";
import { createPlanPD, EAccountsSummaryPD } from "../example/eAccountsSummary.pageD";

describe ( "makeAllFetchers", () => {
    it ( "should make a fetcher", () => {
      expect ( makeAllFetchers ( [ EAccountsSummaryPD, createPlanPD ] ) ).toEqual ( [
        "export function optOutFetcher<S>(getUrlParams: GetUrlParams<S>) {",
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