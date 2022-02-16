import { makeAllDomainsFor, makeDomainFor } from "../codegen/makeDomain";
import { CreatePlanDD, EAccountsSummaryDD, EAccountSummaryDD } from "../example/eAccountsSummary.dataD";
import { createPlanPD, EAccountsSummaryPD } from "../example/eAccountsSummary.pageD";


describe ( "makeDomainFor", () => {
  it ( "should create an interface representing the dataD", () => {
    expect ( makeDomainFor ( EAccountsSummaryDD ) ).toEqual ( [
      "interface EAccountsSummaryDDDomain{",
      "  createPlan: CreatePlanDDDomain;",
      "  currentAccountBalance: string;",
      "  eAccountsTable: EAccountSummaryDDDomain;",
      "  oneAccountBalance: string;",
      "  totalMonthlyCost: string;",
      "}"
    ] )
    expect ( makeDomainFor ( EAccountSummaryDD ) ).toEqual ( [
      "interface EAccountSummaryDDDomain{",
      "  accountId: string;",
      "  description: string;",
      "  displayType: string;",
      "  frequency: string;",
      "  total: string;",
      "  virtualBankSeq: string;",
      "}"
    ] )
    expect ( makeDomainFor ( CreatePlanDD ) ).toEqual ( [
      "interface CreatePlanDDDomain{",
      "  createPlanDate: string;",
      "  createPlanEnd: string;",
      "  createPlanStart: string;",
      "}"
    ] )
  } )


} )

describe ( "makeAllDomainsFor", () => {
  it ( "should make all the interfaces for the apges", () => {
    expect ( makeAllDomainsFor ( [ EAccountsSummaryPD, createPlanPD, EAccountsSummaryPD, createPlanPD ] ) ).toEqual ( [
      "interface CreatePlanDDDomain{",
      "  createPlanDate: string;",
      "  createPlanEnd: string;",
      "  createPlanStart: string;",
      "}",
      "interface EAccountsSummaryDDDomain{",
      "  createPlan: CreatePlanDDDomain;",
      "  currentAccountBalance: string;",
      "  eAccountsTable: EAccountSummaryDDDomain;",
      "  oneAccountBalance: string;",
      "  totalMonthlyCost: string;",
      "}",
      "interface EAccountSummaryDDDomain{",
      "  accountId: string;",
      "  description: string;",
      "  displayType: string;",
      "  frequency: string;",
      "  total: string;",
      "  virtualBankSeq: string;",
      "}"
    ] )

  } )
} )