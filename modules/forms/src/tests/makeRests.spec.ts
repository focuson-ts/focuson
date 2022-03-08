import { makeRest } from "../codegen/makeRests";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";


describe ( "makeRest", () => {
  it ( "should create posters for a restD with one action", () => {
    expect ( makeRest ( paramsForTest, EAccountsSummaryPD ) ( EAccountsSummaryPD.rest.eAccountsSummary ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export function EAccountsSummary_EAccountsSummaryDDRestDetails<S> ( cd: NameAndLens<S>, dateFn: DateFn  ): OneRestDetails<S, domains.EAccountsSummaryPageDomain, domains.EAccountsSummaryDDDomain, SimpleMessage> {",
      "  const fdd: NameAndLens<domains.EAccountsSummaryPageDomain> = {}",
      "  return {",
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
    expect ( makeRest ( paramsForTest, EAccountsSummaryPD ) ( EAccountsSummaryPD.rest.createPlanRestD ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export function EAccountsSummary_CreatePlanDDRestDetails<S> ( cd: NameAndLens<S>, dateFn: DateFn  ): OneRestDetails<S, domains.EAccountsSummaryPageDomain, domains.CreatePlanDDDomain, SimpleMessage> {",
      "  const fdd: NameAndLens<domains.EAccountsSummaryPageDomain> = {}",
      "  return {",
      "    dLens: Lenses.identity<domains.EAccountsSummaryPageDomain>().focusQuery('tempCreatePlan'),",
      "    cd, fdd,",
      "    ids: ['accountId','customerId'],",
      "    resourceId:  ['createPlanId'],",
      "    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],",
      "    url: '/api/createPlan/{createPlanId}?{query}'",
      "  }",
      "}",
      ""
    ])
  } )

} )