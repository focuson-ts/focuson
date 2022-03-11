import { makeAllFetchers, makeFetchersDataStructure } from "../codegen/makeFetchers";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";
import { RepeatingPageD } from "../example/repeating/repeating.pageD";
import { postcodeRestD } from "../example/addressSearch/addressSearch.restD";
import { PostCodeMainPage } from "../example/addressSearch/addressSearch.pageD";

describe ( "makeAllFetchers", () => {
    it ( "should make a fetcher", () => {
      expect ( makeAllFetchers ( paramsForTest, [ EAccountsSummaryPD, CreatePlanPD ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
        "//fetcher type true",
        "export function EAccountsSummaryDDFetcher<S extends  HasSimpleMessages & HasTagHolder & HasPageSelection>(fdLens:Optional<S, domains.EAccountsSummaryPageDomain>,commonIds: NameAndLens<S>) {",
        "  return pageAndTagFetcher<S, domains.EAccountsSummaryPageDomain, domains.EAccountsSummaryDDDomain, SimpleMessage>(",
        "    common.commonFetch<S,  domains.EAccountsSummaryDDDomain>(),",
        "     'EAccountsSummary',",
        "     'fromApi', fdLens, commonIds, {},['accountId'],['customerId'],",
        "      Lenses.identity< domains.EAccountsSummaryPageDomain> ().focusQuery('fromApi'),",
        "     '/api/accountsSummary?{query}')",
        "}"
      ])
    } )
    it ( "should make a fetcher for a repeating", () => {
      expect ( makeAllFetchers ( paramsForTest, [ RepeatingPageD ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
        "//fetcher type true",
        "export function RepeatingWholeDataFetcher<S extends  HasSimpleMessages & HasTagHolder & HasPageSelection>(fdLens:Optional<S, domains.RepeatingPageDomain>,commonIds: NameAndLens<S>) {",
        "  return pageAndTagFetcher<S, domains.RepeatingPageDomain, domains.RepeatingWholeDataDomain, SimpleMessage>(",
        "    common.commonFetch<S,  domains.RepeatingWholeDataDomain>(),",
        "     'Repeating',",
        "     'fromApi', fdLens, commonIds, {},['customerId'],[],",
        "      Lenses.identity< domains.RepeatingPageDomain> ().focusQuery('fromApi'),",
        "     '/api/repeating?{query}')",
        "}"
      ] )
    } )
    it ( "make a fetcher for address/postcode which has a nested target", () => {
      expect ( makeAllFetchers ( paramsForTest, [ PostCodeMainPage ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
        "//fetcher type true",
        "export function PostCodeDataFetcher<S extends  HasSimpleMessages & HasTagHolder & HasPageSelection>(fdLens:Optional<S, domains.PostCodeDemoPageDomain>,commonIds: NameAndLens<S>) {",
        "  return pageAndTagFetcher<S, domains.PostCodeDemoPageDomain, domains.PostCodeDataDomain, SimpleMessage>(",
        "    common.commonFetch<S,  domains.PostCodeDataDomain>(),",
        "     'PostCodeDemo',",
        "     'postcode_searchResults', fdLens, commonIds, {},['customerId'],[],",
        "      Lenses.identity< domains.PostCodeDemoPageDomain> ().focusQuery('postcode').focusQuery('searchResults'),",
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
      "    EAccountsSummaryDDFetcher<common.theState> ( identityL.focusQuery ( 'EAccountsSummary' ), commonIds )",
      "],",
      "children: []}"
    ] )
  } )
} );