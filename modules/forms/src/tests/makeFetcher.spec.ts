import { makeAllFetchers, makeFetchersDataStructure } from "../codegen/makeTSFetchers";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";
import { RepeatingPageD } from "../example/repeating/repeating.pageD";
import { postcodeRestD } from "../example/postCodeDemo/addressSearch.restD";
import { PostCodeMainPage } from "../example/postCodeDemo/addressSearch.pageD";

describe ( "makeAllFetchers", () => {
    it ( "should make a fetcher", () => {
      expect ( makeAllFetchers ( paramsForTest, [ EAccountsSummaryPD, CreatePlanPD ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
        "//fetcher type true",
        "export function EAccountsSummaryFetcher(fdLens:Optional<FState, domains.EAccountsSummaryPageDomain>,commonIds: NameAndLens<FState>) {",
        "  const localIds = {}",
        "  return pageAndTagFetcher<FState, domains.EAccountsSummaryPageDomain, domains.EAccountsSummaryDomain, SimpleMessage>(",
        "    common.commonFetch<FState,  domains.EAccountsSummaryDomain>(),",
        "     'EAccountsSummary',",
        "     '~/fromApi', fdLens, commonIds, localIds,['accountId'],['customerId'],",
        "      Lenses.identity<domains.EAccountsSummaryPageDomain>().focusQuery('fromApi'),",
        "     '/api/accountsSummary?{query}')",
        "}"
      ])
    } )
    it ( "should make a fetcher for a repeating", () => {
      expect ( makeAllFetchers ( paramsForTest, [ RepeatingPageD ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
        "//fetcher type true",
        "export function RepeatingWholeDataFetcher(fdLens:Optional<FState, domains.RepeatingPageDomain>,commonIds: NameAndLens<FState>) {",
        "  const localIds = {}",
        "  return pageAndTagFetcher<FState, domains.RepeatingPageDomain, domains.RepeatingWholeDataDomain, SimpleMessage>(",
        "    common.commonFetch<FState,  domains.RepeatingWholeDataDomain>(),",
        "     'Repeating',",
        "     '~/fromApi', fdLens, commonIds, localIds,['customerId'],[],",
        "      Lenses.identity<domains.RepeatingPageDomain>().focusQuery('fromApi'),",
        "     '/api/repeating?{query}')",
        "}"
      ])
    } )
    it ( "make a fetcher for address/postcode which has a nested target", () => {
      expect ( makeAllFetchers ( paramsForTest, [ PostCodeMainPage ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
        "//fetcher type true",
        "export function PostCodeDataFetcher(fdLens:Optional<FState, domains.PostCodeDemoPageDomain>,commonIds: NameAndLens<FState>) {",
        "  const localIds = {postcode: Lenses.identity< domains.PostCodeDemoPageDomain>().focusQuery('postcode').focusQuery('search')}",
        "  return pageAndTagFetcher<FState, domains.PostCodeDemoPageDomain, domains.PostCodeDataDomain, SimpleMessage>(",
        "    common.commonFetch<FState,  domains.PostCodeDataDomain>(),",
        "     'PostCodeDemo',",
        "     '~/postcode/searchResults', fdLens, commonIds, localIds,['postcode'],[],",
        "      Lenses.identity<domains.PostCodeDemoPageDomain>().focusQuery('postcode').focusQuery('searchResults'),",
        "     '/api/postCode?{query}')",
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
      "    EAccountsSummaryFetcher( identityL.focusQuery ( 'EAccountsSummary' ), commonIds )",
      "],",
      "children: []}"
    ] )
  } )
} );

