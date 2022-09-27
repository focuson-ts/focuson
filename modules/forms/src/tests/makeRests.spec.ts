import { makeRest } from "../codegen/makeRests";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { RepeatingPageD } from "../example/repeating/repeating.pageD";
import { paramsForTest } from "./paramsForTest";


describe ( "makeRest", () => {
  it ( "should create posters for a restD with one action", () => {
    expect ( makeRest ( paramsForTest, EAccountsSummaryPD ) ( 'eAccountsSummary', EAccountsSummaryPD.rest.eAccountsSummary ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ([
      "//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs",
      "export function EAccountsSummary_EAccountsSummaryRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.EAccountsSummaryPageDomain, domains.EAccountsSummaryDomain, SimpleMessage> {",
      "  const pageIdL = Lenses.identity<domains.EAccountsSummaryPageDomain>()",
      " //If you get a compilation here with duplicate names is it because you have the same parameter in rest.params, or in the state params with the same name and different paths?",
      "  const fdd: NameAndLens<domains.EAccountsSummaryPageDomain> = {}",
      "  return {",
      "    fdLens: Lenses.identity<FState>().focusQuery('EAccountsSummary'),",
      "//From EAccountsSummary.rest[eAccountsSummary].targetFromPath (~/fromApi). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?",
      "    dLens: Lenses.identity<domains.EAccountsSummaryPageDomain>().focusQuery('fromApi'),",
      "    cd, fdd,",
      "    ids: ['accountId','applRef','brandRef','dbName','employeeType'],",
      "    jwtIds:['applRef','employeeType','employeeType'],",
      "    resourceId:  ['clientRef'],",
      "    extractData: ( status: number | undefined, body: any ) => body.data,",
      "    messages: extractMessages(dateFn),",
      "    url: '/api/accountsSummary?{query}',",
      "    states : {",
      "      invalidate: {url: '/api/accountsSummary/invalidate?{query}',params: ['accountId','clientRef','employeeType','dbName']}",
      "    },",
      "    messagePostProcessors: justInfoToSuccessMessagesPostProcessor (),",
      "    postProcessors:[]",
      "  }",
      "}",
      ""
    ])
  } )
  it ( "should create posters for a restD with many actions", () => {
    expect ( makeRest ( paramsForTest, EAccountsSummaryPD ) ( 'eAccountsSummary', EAccountsSummaryPD.rest.createPlanRestD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs",
      "export function EAccountsSummary_CreatePlanRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.EAccountsSummaryPageDomain, domains.CreatePlanDomain, SimpleMessage> {",
      "  const pageIdL = Lenses.identity<domains.EAccountsSummaryPageDomain>()",
      " //If you get a compilation here with duplicate names is it because you have the same parameter in rest.params, or in the state params with the same name and different paths?",
      "  const fdd: NameAndLens<domains.EAccountsSummaryPageDomain> = {}",
      "  return {",
      "    fdLens: Lenses.identity<FState>().focusQuery('EAccountsSummary'),",
      "//From EAccountsSummary.rest[eAccountsSummary].targetFromPath (~/tempCreatePlan). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?",
      "    dLens: Lenses.identity<domains.EAccountsSummaryPageDomain>().focusQuery('tempCreatePlan'),",
      "    cd, fdd,",
      "    ids: ['accountId','applRef','brandRef','clientRef'],",
      "    jwtIds:['applRef'],",
      "    resourceId:  ['createPlanId'],",
      "    extractData: ( status: number | undefined, body: any ) => body.data,",
      "    messages: extractMessages(dateFn),",
      "    url: '/api/createPlan?{query}',",
      "    states : {",
      "    },",
      "    messagePostProcessors: justInfoToSuccessMessagesPostProcessor (),",
      "    postProcessors:[]",
      "  }",
      "}",
      ""
    ])
  } )

  it ( "should create rest for a repeating restD", () => {
    expect ( makeRest ( paramsForTest, RepeatingPageD ) ( 'repeating', RepeatingPageD.rest.repeating ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs",
      "export function Repeating_RepeatingWholeDataRestDetails ( cd: NameAndLens<FState>, dateFn: DateFn  ): OneRestDetails<FState, domains.RepeatingPageDomain, domains.RepeatingWholeDataDomain, SimpleMessage> {",
      "  const pageIdL = Lenses.identity<domains.RepeatingPageDomain>()",
      " //If you get a compilation here with duplicate names is it because you have the same parameter in rest.params, or in the state params with the same name and different paths?",
      "  const fdd: NameAndLens<domains.RepeatingPageDomain> = {}",
      "  return {",
      "    fdLens: Lenses.identity<FState>().focusQuery('Repeating'),",
      "//From Repeating.rest[repeating].targetFromPath (~/fromApi). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?",
      "    dLens: Lenses.identity<domains.RepeatingPageDomain>().focusQuery('fromApi'),",
      "    cd, fdd,",
      "    ids: ['clientRef'],",
      "    jwtIds:[],",
      "    resourceId:  [],",
      "    extractData: ( status: number | undefined, body: any ) => body.data,",
      "    messages: extractMessages(dateFn),",
      "    url: '/api/repeating?{query}',",
      "    states : {",
      "    },",
      "    messagePostProcessors: justInfoToSuccessMessagesPostProcessor (),",
      "    postProcessors:[]",
      "  }",
      "}",
      ""
    ])

  } )


} )