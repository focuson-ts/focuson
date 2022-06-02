import { makeAllFetchers, makeFetcherCode, makeFetchersDataStructure } from "../codegen/makeTSFetchers";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";
import { RepeatingPageD } from "../example/repeating/repeating.pageD";
import { postcodeRestD } from "../example/postCodeDemo/addressSearch.restD";
import { PostCodeMainPage } from "../example/postCodeDemo/addressSearch.pageD";
import { paramsForTest } from "./paramsForTest";
import { ListOfPaymentsPagePD } from "../example/ListOfPayments/listOfPayements.pageD";
import { safeObject } from "@focuson/utils";
import { OccupationAndIncomeSummaryPD } from "../example/occupationAndIncome/occupationAndIncome.pageD";

describe ( "makeAllFetchers", () => {
  it ( "should make a fetcher for a single item", () => {
    expect ( makeAllFetchers ( paramsForTest, [ EAccountsSummaryPD, CreatePlanPD ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "//fetcher type true",
      "export function EAccountsSummaryFetcher(fdLens:Optional<FState, domains.EAccountsSummaryPageDomain>,commonIds: NameAndLens<FState>) {",
      "  const pageIdL = Lenses.identity< domains.EAccountsSummaryPageDomain>()",
      "//If you have a compilation here it might be because of the 'local' params in EAccountsSummary.rest[eAccountsSummary].params",
      "  const localIds = {}",
      "  return pageAndTagFetcher<FState, domains.EAccountsSummaryPageDomain, domains.EAccountsSummaryDomain, SimpleMessage>(",
      "    common.commonFetch<FState,  domains.EAccountsSummaryDomain>(),",
      "     'EAccountsSummary',",
      "     '~/fromApi', fdLens, commonIds, localIds,['accountId','applRef','brandRef','dbName','employeeType'],['clientRef'],",
      "      //From EAccountsSummary.rest[eAccountsSummary].targetFromPath ~/fromApi Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?",
      "      Lenses.identity<domains.EAccountsSummaryPageDomain>().focusQuery('fromApi'),",
      "     '/api/accountsSummary?{query}')",
      "}"
    ] )
  } )
  it ( "should make a fetcher for a repeating", () => {
    expect ( makeAllFetchers ( paramsForTest, [ RepeatingPageD ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "//fetcher type true",
      "export function RepeatingWholeDataFetcher(fdLens:Optional<FState, domains.RepeatingPageDomain>,commonIds: NameAndLens<FState>) {",
      "  const pageIdL = Lenses.identity< domains.RepeatingPageDomain>()",
      "//If you have a compilation here it might be because of the 'local' params in Repeating.rest[repeating].params",
      "  const localIds = {}",
      "  return pageAndTagFetcher<FState, domains.RepeatingPageDomain, domains.RepeatingWholeDataDomain, SimpleMessage>(",
      "    common.commonFetch<FState,  domains.RepeatingWholeDataDomain>(),",
      "     'Repeating',",
      "     '~/fromApi', fdLens, commonIds, localIds,['clientRef'],[],",
      "      //From Repeating.rest[repeating].targetFromPath ~/fromApi Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?",
      "      Lenses.identity<domains.RepeatingPageDomain>().focusQuery('fromApi'),",
      "     '/api/repeating?{query}')",
      "}"
    ] )
  } )
  it ( "make a fetcher for address/postcode which has a nested target", () => {
    expect ( makeAllFetchers ( paramsForTest, [ PostCodeMainPage ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "//fetcher type true",
      "export function PostCodeSearchResponseFetcher(fdLens:Optional<FState, domains.PostCodeMainPagePageDomain>,commonIds: NameAndLens<FState>) {",
      "  const pageIdL = Lenses.identity< domains.PostCodeMainPagePageDomain>()",
      "//If you have a compilation here it might be because of the 'local' params in PostCodeMainPage.rest[postcode].params",
      "  const localIds = {postcode: pageIdL.focusQuery('postcode').focusQuery('search')}",
      "  return pageAndTagFetcher<FState, domains.PostCodeMainPagePageDomain, domains.PostCodeSearchResponseDomain, SimpleMessage>(",
      "    common.commonFetch<FState,  domains.PostCodeSearchResponseDomain>(),",
      "     'PostCodeMainPage',",
      "     '~/postcode/searchResults', fdLens, commonIds, localIds,['dbName','postcode'],[],",
      "      //From PostCodeMainPage.rest[postcode].targetFromPath ~/postcode/searchResults Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?",
      "      Lenses.identity<domains.PostCodeMainPagePageDomain>().focusQuery('postcode').focusQuery('searchResults'),",
      "     '/api/postCode?{query}')",
      "}"
    ] )
  } )
  // it ("should work with header lens as well as common lens", () =>{
  // expect ( makeAllFetchers ( paramsForTest, [ OccupationAndIncomeSummaryPD ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [])
  //
  // })

} )

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

describe ( 'makeFetches with a lens pointing to a parameter', () => {

  it ( "should make the right data structure", () => {
    expect ( makeFetcherCode ( paramsForTest ) ( ListOfPaymentsPagePD ) ( 'paymentHistory', safeObject ( ListOfPaymentsPagePD.rest ).paymentHistory ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "//fetcher type true",
      "export function history_PrintRecordHistoryFetcher(fdLens:Optional<FState, domains.ListOfPaymentsPagePageDomain>,commonIds: NameAndLens<FState>) {",
      "  const pageIdL = Lenses.identity< domains.ListOfPaymentsPagePageDomain>()",
      "//If you have a compilation here it might be because of the 'local' params in ListOfPaymentsPage.rest[paymentHistory].params",
      "  const localIds = {}",
      "  return pageAndTagFetcher<FState, domains.ListOfPaymentsPagePageDomain, domains.PrintRecordHistoryDomain, SimpleMessage>(",
      "    common.commonFetch<FState,  domains.PrintRecordHistoryDomain>(),",
      "     'ListOfPaymentsPage',",
      "     '~/display', fdLens, commonIds, localIds,['accountId','employeeId','vbAcountSeq'],[],",
      "      //From ListOfPaymentsPage.rest[paymentHistory].targetFromPath ~/display Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?",
      "      Lenses.identity<domains.ListOfPaymentsPagePageDomain>().focusQuery('display'),",
      "     '/api/printrecord/history?{query}')",
      "}"
    ] )
  } )
} )
