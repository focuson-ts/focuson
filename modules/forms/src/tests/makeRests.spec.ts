import { makeRest } from "../codegen/makeRests";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { RepeatingPageD } from "../example/repeating/repeating.pageD";
import { PostCodeMainPage } from "../example/addressSearch/addressSearch.pageD";


describe ( "makeRest", () => {
  it ( "should create posters for a restD with one action", () => {
    expect ( makeRest ( paramsForTest, EAccountsSummaryPD ) ( 'eAccountsSummary', EAccountsSummaryPD.rest.eAccountsSummary ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs",
      "export function EAccountsSummary_EAccountsSummaryRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.EAccountsSummaryPageDomain, domains.EAccountsSummaryDomain, SimpleMessage> {",
      "  const fdd: NameAndLens<domains.EAccountsSummaryPageDomain> = {}",
      "  return {",
      "    fdLens: Lenses.identity<FState>().focusQuery('EAccountsSummary'),",
      "    dLens: Lenses.identity<domains.EAccountsSummaryPageDomain>().focusQuery('fromApi'),",
      "    cd, fdd,",
      "    ids: ['accountId'],",
      "    resourceId:  ['customerId'],",
      "    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],",
      "    url: '/api/accountsSummary?{query}'",
      "  }",
      "}",
      ""
    ])
  } )
  it ( "should create posters for a restD with many actions", () => {
    expect ( makeRest ( paramsForTest, EAccountsSummaryPD ) ('eAccountsSummary',  EAccountsSummaryPD.rest.createPlanRestD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs",
      "export function EAccountsSummary_CreatePlanRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.EAccountsSummaryPageDomain, domains.CreatePlanDomain, SimpleMessage> {",
      "  const fdd: NameAndLens<domains.EAccountsSummaryPageDomain> = {}",
      "  return {",
      "    fdLens: Lenses.identity<FState>().focusQuery('EAccountsSummary'),",
      "    dLens: Lenses.identity<domains.EAccountsSummaryPageDomain>().focusQuery('tempCreatePlan'),",
      "    cd, fdd,",
      "    ids: ['accountId','customerId'],",
      "    resourceId:  ['createPlanId'],",
      "    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],",
      "    url: '/api/createPlan?{query}'",
      "  }",
      "}",
      ""
    ])
  } )

  it ( "should create rest for a repeating restD", () => {
    expect ( makeRest ( paramsForTest, RepeatingPageD ) ( 'repeating', RepeatingPageD.rest.repeating ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs",
      "export function Repeating_RepeatingWholeDataRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.RepeatingPageDomain, domains.RepeatingWholeDataDomain, SimpleMessage> {",
      "  const fdd: NameAndLens<domains.RepeatingPageDomain> = {}",
      "  return {",
      "    fdLens: Lenses.identity<FState>().focusQuery('Repeating'),",
      "    dLens: Lenses.identity<domains.RepeatingPageDomain>().focusQuery('fromApi'),",
      "    cd, fdd,",
      "    ids: ['customerId'],",
      "    resourceId:  [],",
      "    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],",
      "    url: '/api/repeating?{query}'",
      "  }",
      "}",
      ""
    ])

  } )


} )