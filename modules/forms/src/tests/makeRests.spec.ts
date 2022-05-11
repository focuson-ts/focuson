import { makeRest } from "../codegen/makeRests";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { RepeatingPageD } from "../example/repeating/repeating.pageD";
import { PostCodeMainPage } from "../example/postCodeDemo/addressSearch.pageD";
import { paramsForTest } from "./paramsForTest";


describe ( "makeRest", () => {
  it ( "should create posters for a restD with one action", () => {
    expect ( makeRest ( paramsForTest, EAccountsSummaryPD ) ( 'eAccountsSummary', EAccountsSummaryPD.rest.eAccountsSummary ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs",
      "export function EAccountsSummary_EAccountsSummaryRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.EAccountsSummaryPageDomain, domains.EAccountsSummaryDomain, SimpleMessage> {",
      "  const fdd: NameAndLens<domains.EAccountsSummaryPageDomain> = {}",
      "  return {",
      "    fdLens: Lenses.identity<FState>().focusQuery('EAccountsSummary'),",
      "//From EAccountsSummary.rest[eAccountsSummary].targetFromPath (~/fromApi). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?",
      "    dLens: Lenses.identity<domains.EAccountsSummaryPageDomain>().focusQuery('fromApi'),",
      "    cd, fdd,",
      "    ids: ['accountId','applRef','brandRef','clientRef','employeeType'],",
      "    resourceId:  ['customerId'],",
      "    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],",
      "    url: '/api/accountsSummary?{query}',",
      "    states : {'invalidate':{'url':'/api/accountsSummary/invalidate?{query}'}}",
      "  }",
      "}",
      ""
    ] )
  } )
  it ( "should create posters for a restD with many actions", () => {
    expect ( makeRest ( paramsForTest, EAccountsSummaryPD ) ( 'eAccountsSummary', EAccountsSummaryPD.rest.createPlanRestD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs",
      "export function EAccountsSummary_CreatePlanRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.EAccountsSummaryPageDomain, domains.CreatePlanDomain, SimpleMessage> {",
      "  const fdd: NameAndLens<domains.EAccountsSummaryPageDomain> = {}",
      "  return {",
      "    fdLens: Lenses.identity<FState>().focusQuery('EAccountsSummary'),",
      "//From EAccountsSummary.rest[eAccountsSummary].targetFromPath (~/tempCreatePlan). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?",
      "    dLens: Lenses.identity<domains.EAccountsSummaryPageDomain>().focusQuery('tempCreatePlan'),",
      "    cd, fdd,",
      "    ids: ['accountId','applRef','brandRef','clientRef'],",
      "    resourceId:  ['createPlanId'],",
      "    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],",
      "    url: '/api/createPlan?{query}',",
      "    states : {}",
      "  }",
      "}",
      ""
    ] )
  } )

  it ( "should create rest for a repeating restD", () => {
    expect ( makeRest ( paramsForTest, RepeatingPageD ) ( 'repeating', RepeatingPageD.rest.repeating ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs",
      "export function Repeating_RepeatingWholeDataRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.RepeatingPageDomain, domains.RepeatingWholeDataDomain, SimpleMessage> {",
      "  const fdd: NameAndLens<domains.RepeatingPageDomain> = {}",
      "  return {",
      "    fdLens: Lenses.identity<FState>().focusQuery('Repeating'),",
      "//From Repeating.rest[repeating].targetFromPath (~/fromApi). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?",
      "    dLens: Lenses.identity<domains.RepeatingPageDomain>().focusQuery('fromApi'),",
      "    cd, fdd,",
      "    ids: ['clientRef'],",
      "    resourceId:  [],",
      "    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],",
      "    url: '/api/repeating?{query}',",
      "    states : {}",
      "  }",
      "}",
      ""
    ] )

  } )


} )