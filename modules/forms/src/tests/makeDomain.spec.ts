import { makeAllDomainsFor, makeDomainForDataD, makePageDomainsFor } from "../codegen/makeDomain";
import { CreatePlanDD, EAccountsSummaryDD, EAccountSummaryDD } from "../example/eAccounts/eAccountsSummary.dataD";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";
import { RepeatingLinePageD, RepeatingPageD } from "../example/repeating/repeating.pageD";
import { paramsForTest } from "./paramsForTest";


describe ( "makeDomainFor", () => {
  it ( "should create an interface representing the dataD", () => {
    expect ( makeDomainForDataD ( EAccountsSummaryDD ) ).toEqual ( [
      "export interface EAccountsSummaryDomain{",
      "  balancesAndMonthlyCost: BalancesAndMonthlyCostDomain;",
      "  createPlan: CreatePlanDomain;",
      "  eAccountsTable: EAccountSummaryDomain[];",
      "  useEStatements: boolean;",
      "}",
      ""
    ])
    expect ( makeDomainForDataD ( EAccountSummaryDD ) ).toEqual ( [
      "export interface EAccountSummaryDomain{",
      "  accountId: number;",
      "  description: string;",
      "  displayType: string;",
      "  frequency: string;",
      "  total: number;",
      "  virtualBankSeq: string;",
      "}",
      ""
    ])
    expect ( makeDomainForDataD ( CreatePlanDD ) ).toEqual ( [
      "export interface CreatePlanDomain{",
      "  createPlanDate: string;",
      "  createPlanEnd: string;",
      "  createPlanStart: string;",
      "}",
      ""
    ] )

  } )


} )

describe ( "makeAllDomainsFor", () => {
  it ( "should make all the interfaces ", () => {
    expect ( makeAllDomainsFor ( [ EAccountsSummaryPD, CreatePlanPD, EAccountsSummaryPD, CreatePlanPD ] ) ).toEqual ( [
      "export interface BalancesAndMonthlyCostDomain{",
      "  currentAccountBalance: number;",
      "  oneAccountBalance: number;",
      "  totalMonthlyCost: number;",
      "}",
      "",
      "export interface CreatePlanDomain{",
      "  createPlanDate: string;",
      "  createPlanEnd: string;",
      "  createPlanStart: string;",
      "}",
      "",
      "export interface EAccountsSummaryDomain{",
      "  balancesAndMonthlyCost: BalancesAndMonthlyCostDomain;",
      "  createPlan: CreatePlanDomain;",
      "  eAccountsTable: EAccountSummaryDomain[];",
      "  useEStatements: boolean;",
      "}",
      "",
      "export type EAccountsSummaryTableDomain = EAccountSummaryDomain[]",
      "",
      "export interface EAccountSummaryDomain{",
      "  accountId: number;",
      "  description: string;",
      "  displayType: string;",
      "  frequency: string;",
      "  total: number;",
      "  virtualBankSeq: string;",
      "}",
      ""
    ])

  } )
} )

describe ( "makePageDomainsFor", () => {
  it ( " Should make the has, and the page domain", () => {
    expect ( makePageDomainsFor ( paramsForTest, [ EAccountsSummaryPD, CreatePlanPD ] ) ).toEqual ( [
      "export interface HasEAccountsSummaryPageDomain {   EAccountsSummary?: EAccountsSummaryPageDomain}",
      "",
      "export interface EAccountsSummaryPageDomain{",
      "  createPlan?:EAccountsSummaryDomain;",
      "  fromApi?:EAccountsSummaryDomain;",
      "  tempCreatePlan?:CreatePlanDomain;",
      "}",
      ""
    ])

  } )
} )

describe ( "make for repeating", () => {
  it ( "should make domains", () => {
    expect ( makeAllDomainsFor ( [ RepeatingPageD, RepeatingLinePageD ] ) ).toEqual ( [
      "export interface RepeatingLineDomain{",
      "  age: number;",
      "  name: string;",
      "}",
      "",
      "export type RepeatingWholeDataDomain = RepeatingLineDomain[]",
      ""
    ] )

  } )


  it ( "should make pageDomains", () => {
    expect ( makePageDomainsFor ( paramsForTest, [ RepeatingPageD, RepeatingLinePageD ] ) ).toEqual ( [
      "export interface HasRepeatingPageDomain {   Repeating?: RepeatingPageDomain}",
      "",
      "export interface RepeatingPageDomain{",
      "  fromApi?:RepeatingLineDomain[];",
      "  selectedItem?:number;",
      "  temp?:RepeatingLineDomain;",
      "}",
      ""
    ] )
  } )
} )