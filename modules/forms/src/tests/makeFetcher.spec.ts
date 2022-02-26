import { makeAllFetchers, makeFetchersDataStructure } from "../codegen/makeFetchers";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";

describe ( "makeAllFetchers", () => {
    it ( "should make a fetcher", () => {
      expect ( makeAllFetchers ( paramsForTest, [ EAccountsSummaryPD, CreatePlanPD ] ).map(s => s.replace(/"/g, "'")) ).toEqual ( [
        "//fetcher type get",
        "export function EAccountsSummaryDDFetcher<S extends  HasSimpleMessages & HasTagHolder & HasPageSelection>(fdLens:Optional<S, pageDomains.EAccountsSummaryPageDomain>,commonIds: NameAndLens<S>) {",
        "  return pageAndTagFetcher<S, pageDomains.EAccountsSummaryPageDomain, domains.EAccountsSummaryDDDomain, SimpleMessage>(",
        "    common.commonFetch<S,  domains.EAccountsSummaryDDDomain>(),",
        "     'EAccountsSummary',",
        "     'fromApi', fdLens, commonIds, {},['accountId'],['customerId'],",
        "     (s) => s.focusQuery('fromApi'),",
        "     '/api/accountsSummary?{query}')",
        "}"
      ])
    } )
  }
)

describe ( 'makeFetchersDataStructure', () => {
  it ( "should record all the fetchers", () => {
    expect ( makeFetchersDataStructure ( paramsForTest, { variableName: 'fetchers', stateName: 'theState' }, [ EAccountsSummaryPD, CreatePlanPD ] ) ).toEqual ( [
      "export const fetchers: FetcherTree<common.theState> = {",
      "fetchers: [",
      "    EAccountsSummaryDDFetcher<common.theState> ( identityL.focusQuery ( 'EAccountsSummary' ), commonIds )",
      "],",
      "children: []}"
    ])
  } )
} );