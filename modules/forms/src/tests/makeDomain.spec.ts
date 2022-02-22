import { makeAllDomainsFor, makeDomainFor, makePageDomainsFor } from "../codegen/makeDomain";
import { CreatePlanDD, EAccountsSummaryDD, EAccountSummaryDD } from "../example/eAccounts/eAccountsSummary.dataD";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";


describe ( "makeDomainFor", () => {
  it ( "should create an interface representing the dataD", () => {
    expect ( makeDomainFor ( EAccountsSummaryDD ) ).toEqual ( [
      "export interface EAccountsSummaryDDDomain{",
      "  createPlan: CreatePlanDDDomain;",
      "  currentAccountBalance: string;",
      "  eAccountsTable: EAccountSummaryDDDomain[];",
      "  oneAccountBalance: string;",
      "  totalMonthlyCost: string;",
      "}"
    ])
    expect ( makeDomainFor ( EAccountSummaryDD ) ).toEqual ( [
      "export interface EAccountSummaryDDDomain{",
      "  accountId: string;",
      "  description: string;",
      "  displayType: string;",
      "  frequency: string;",
      "  total: string;",
      "  virtualBankSeq: string;",
      "}"
    ] )
    expect ( makeDomainFor ( CreatePlanDD ) ).toEqual ( [
      "export interface CreatePlanDDDomain{",
      "  createPlanDate: string;",
      "  createPlanEnd: string;",
      "  createPlanStart: string;",
      "}"
    ] )

  } )



} )

describe ( "makeAllDomainsFor", () => {
  it ( "should make all the interfaces for the apges", () => {
    expect ( makeAllDomainsFor ( [ EAccountsSummaryPD, CreatePlanPD, EAccountsSummaryPD, CreatePlanPD ] ) ).toEqual ( [
      "export interface CreatePlanDDDomain{",
      "  createPlanDate: string;",
      "  createPlanEnd: string;",
      "  createPlanStart: string;",
      "}",
      "export interface EAccountsSummaryDDDomain{",
      "  createPlan: CreatePlanDDDomain;",
      "  currentAccountBalance: string;",
      "  eAccountsTable: EAccountSummaryDDDomain[];",
      "  oneAccountBalance: string;",
      "  totalMonthlyCost: string;",
      "}",
      "export interface EAccountSummaryDDDomain{",
      "  accountId: string;",
      "  description: string;",
      "  displayType: string;",
      "  frequency: string;",
      "  total: string;",
      "  virtualBankSeq: string;",
      "}"
    ])

  } )
} )

describe ( "makePageDomainsFor", () => {
  it ( " Should make the has, and the page domain", () => {
    expect ( makePageDomainsFor ( paramsForTest, [ EAccountsSummaryPD, CreatePlanPD ] ) ).toEqual ( [
      "import * as domains from './domains';",
      "export interface HasEAccountsSummaryPageDomain {   EAccountsSummary?: EAccountsSummaryPageDomain}",
      "export interface EAccountsSummaryPageDomain{",
      " createPlan?: domains.EAccountsSummaryDDDomain;",
      " fromApi?: domains.EAccountsSummaryDDDomain;",
      " temp?: domains.EAccountsSummaryDDDomain;",
      "}"
    ])

  } )
} )