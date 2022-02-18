import { makeAllFetchers, makeFetchersDataStructure } from "../codegen/makeFetchers";
import { createPlanPD, EAccountsSummaryPD } from "../example/eAccountsSummary.pageD";
import { paramsForTest } from "./makeJavaResolvers.spec";

describe ( "makeAllFetchers", () => {
    it ( "should make a fetcher", () => {
      expect ( makeAllFetchers ( paramsForTest, [ EAccountsSummaryPD, createPlanPD ] ) ).toEqual ( [
        "export function EAccountsSummaryDDFetcher<S extends pageDomains.HasEAccountsSummaryPageDomain>(getUrlParams:  common.GetUrlParams<S>) {",
        "  return pageAndTagFetcher<S,  domains.EAccountsSummaryDDDomain, SimpleMessage>(",
        "    common.commonFetch<S,  domains.EAccountsSummaryDDDomain>(),",
        "     'eAccountsSummary',",
        "     'fromApi',",
        "     (s) => s.focusOn('fromApi'),",
        "     (s) => getUrlParams(s, 'accountId', 'customerId'),",
        "     (s) => [ common.makeUrl<S>('/api/accountsSummary?accountId={accountId}&customerId={customerId})', getUrlParams)(s), undefined])",
        "}"
      ] )
    } )
  }
)

describe ( 'makeFetchersDataStructure', () => {
  it ( "should record all the fetchers", () => {
    expect ( makeFetchersDataStructure ( paramsForTest, { variableName: 'fetchers', stateName: 'theState' }, [ EAccountsSummaryPD, createPlanPD ] ) ).toEqual ( [
      "export const fetchers: FetcherTree<common.theState> = {",
      "fetchers: [",
      "   EAccountsSummaryDDFetcher<common.theState>(common.getUrlParams)",
      "],",
      "children: []}"
    ] )
  } )
} );