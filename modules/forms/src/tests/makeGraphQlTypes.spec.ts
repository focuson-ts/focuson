import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { makeGraphQlSchema, makeQueryOrMutateBlock, makeSchemaBlock } from "../codegen/makeGraphQlTypes";
import { CreatePlanDD, EAccountsSummaryDD, EAccountsSummaryTableDD, EAccountSummaryDD } from "../example/eAccounts/eAccountsSummary.dataD";
import { RepeatingPageD } from "../example/repeating/repeating.pageD";
import { repeatingRestRD } from "../example/repeating/repeating.restD";
import { ListOfPaymentsDD } from "../example/ListOfPayments/listOfPayements.dataD";
import { ListOfPaymentsPagePD } from "../example/ListOfPayments/listOfPayements.pageD";
import { PrintRecordHistoryRD, PrintRecordRD } from "../example/ListOfPayments/listOfPayements.restD";

const rs = [ eAccountsSummaryRestD, createPlanRestD, eAccountsSummaryRestD, createPlanRestD ];
describe ( "makeGraphQlSchema", () => {

  describe ( "makeQueryOrMutateBlock", () => {

    it ( "should make type Query", () => {
      expect ( makeQueryOrMutateBlock ( rs, 'Query' ) ).toEqual ( [
        "type Query{",
        "  getEAccountsSummary(accountId: Int!, applRef: Int!, brandRef: Int!, clientRef: Int!, dbName: String!, employeeType: String!):EAccountsSummary",
        "  getCreatePlan(accountId: Int!, applRef: Int!, brandRef: Int!, clientRef: Int!, createPlanId: Int!):CreatePlan",
        "}"
      ] )
    } )
    it ( "should make type Mutation", () => {
      expect ( makeQueryOrMutateBlock ( rs, 'Mutation' ) ).toEqual ( [
        "type Mutation{",
        "  stateinvalidateEAccountsSummary(accountId: Int!, clientRef: Int!, dbName: String!, employeeType: String!):Boolean",
        "  createCreatePlan(accountId: Int!, applRef: Int!, brandRef: Int!, clientRef: Int!,obj: CreatePlanInp!):CreatePlan",
        "  updateCreatePlan(accountId: Int!, applRef: Int!, brandRef: Int!, clientRef: Int!, createPlanId: Int!,obj: CreatePlanInp!):CreatePlan",
        "  deleteCreatePlan(accountId: Int!, applRef: Int!, brandRef: Int!, clientRef: Int!, createPlanId: Int!):Boolean",
        "}"
      ] )
    } )
  } )

  it ( "should be able to  makeSchemaBlock", () => {
    expect ( makeSchemaBlock ( 'input', 'xx' ) ( EAccountsSummaryDD ) ).toEqual ( [
      "input EAccountsSummaryxx{",
      "  useEStatements: Boolean",
      "  eAccountsTable: [EAccountSummaryxx]",
      "  balancesAndMonthlyCost: BalancesAndMonthlyCostxx",
      "  createPlan: CreatePlanxx",
      "}"
    ])
    expect ( makeSchemaBlock ( 'input', 'xx' ) ( EAccountSummaryDD ) ).toEqual ( [
      "input EAccountSummaryxx{",
      "  accountId: Int",
      "  displayType: String",
      "  description: String",
      "  virtualBankSeq: String",
      "  total: Int",
      "  frequency: String",
      "}"
    ] )
    expect ( makeSchemaBlock ( 'input', 'xx' ) ( CreatePlanDD ) ).toEqual ( [
      "input CreatePlanxx{",
      "  createPlanStart: String",
      "  createPlanDate: String",
      "  createPlanEnd: String",
      "}"
    ] )
  } )

  it ( "should make a schema from RestDs", () => {
    expect ( makeGraphQlSchema ( rs ) ).toEqual ( [
      "type Query{",
      "  getEAccountsSummary(accountId: Int!, applRef: Int!, brandRef: Int!, clientRef: Int!, dbName: String!, employeeType: String!):EAccountsSummary",
      "  getCreatePlan(accountId: Int!, applRef: Int!, brandRef: Int!, clientRef: Int!, createPlanId: Int!):CreatePlan",
      "}",
      "type Mutation{",
      "  stateinvalidateEAccountsSummary(accountId: Int!, clientRef: Int!, dbName: String!, employeeType: String!):Boolean",
      "  createCreatePlan(accountId: Int!, applRef: Int!, brandRef: Int!, clientRef: Int!,obj: CreatePlanInp!):CreatePlan",
      "  updateCreatePlan(accountId: Int!, applRef: Int!, brandRef: Int!, clientRef: Int!, createPlanId: Int!,obj: CreatePlanInp!):CreatePlan",
      "  deleteCreatePlan(accountId: Int!, applRef: Int!, brandRef: Int!, clientRef: Int!, createPlanId: Int!):Boolean",
      "}",
      "type BalancesAndMonthlyCost{",
      "  totalMonthlyCost: Int",
      "  oneAccountBalance: Int",
      "  currentAccountBalance: Int",
      "}",
      "type CreatePlan{",
      "  createPlanStart: String",
      "  createPlanDate: String",
      "  createPlanEnd: String",
      "}",
      "type EAccountsSummary{",
      "  useEStatements: Boolean",
      "  eAccountsTable: [EAccountSummary]",
      "  balancesAndMonthlyCost: BalancesAndMonthlyCost",
      "  createPlan: CreatePlan",
      "}",
      "type EAccountSummary{",
      "  accountId: Int",
      "  displayType: String",
      "  description: String",
      "  virtualBankSeq: String",
      "  total: Int",
      "  frequency: String",
      "}",
      "input CreatePlanInp{",
      "  createPlanStart: String",
      "  createPlanDate: String",
      "  createPlanEnd: String",
      "}"
    ] )
  } )

  it ( "should make a schema for something with a repeating block in the fetcher", () => {
    expect ( makeGraphQlSchema ( [ repeatingRestRD ] ) ).toEqual ( [
      "type Query{",
      "  getRepeatingLine(clientRef: Int!):[RepeatingLine]",
      "}",
      "type Mutation{",
      "  createRepeatingLine(clientRef: Int!,obj: [RepeatingLineInp!]!):[RepeatingLine]",
      "}",
      "type RepeatingLine{",
      "  name: String",
      "  age: Int",
      "}",
      "input RepeatingLineInp{",
      "  name: String",
      "  age: Int",
      "}"
    ])
  } )

  it ( "should make sometthing with name prefixes", () => {
    expect ( makeGraphQlSchema ( [PrintRecordHistoryRD, PrintRecordRD,  ] ) ).toEqual ( [
      "type Query{",
      "  gethistoryPrintRecordItem(accountId: Int!, employeeId: Int!, vbAcountSeq: Int!):[PrintRecordItem]",
      "}",
      "type Mutation{",
      "  createsinglePrintRecordItem(accountId: Int!, employeeId: Int!, vbAcountSeq: Int!,obj: [PrintRecordItemInp!]!):[PrintRecordItem]",
      "  stateprintsinglePrintRecordItem(accountId: Int!, employeeId: Int!, paymentId: Int!, vbAcountSeq: Int!):[Boolean]",
      "}",
      "type ListOfPayments{",
      "  standingOrders: SinglePrint",
      "  openBankingStandingOrders: SinglePrint",
      "  directDebits: SinglePrint",
      "  billPayments: SinglePrint",
      "  openBanking: SinglePrint",
      "}",
      "type NewBankDetails{",
      "  title: String",
      "  forename: String",
      "  surname: String",
      "  bank: String",
      "  line1: String",
      "  line2: String",
      "  line3: String",
      "  line4: String",
      "  postcode: String",
      "  sortCode: String",
      "  accountNo: Int",
      "}",
      "type PrintRecordItem{",
      "  id: Int",
      "  requestedBy: String",
      "  newBankDetails: NewBankDetails",
      "  listOfPayments: ListOfPayments",
      "  includeSingleAndInitialDirectDebits: Boolean",
      "  alreadyPrinted: Boolean",
      "  authorisedByCustomer: String",
      "  datePrinted: String",
      "}",
      "type SinglePrint{",
      "  shouldPrint: Boolean",
      "  numberOfItems: Int",
      "}",
      "input ListOfPaymentsInp{",
      "  standingOrders: SinglePrintInp",
      "  openBankingStandingOrders: SinglePrintInp",
      "  directDebits: SinglePrintInp",
      "  billPayments: SinglePrintInp",
      "  openBanking: SinglePrintInp",
      "}",
      "input NewBankDetailsInp{",
      "  title: String",
      "  forename: String",
      "  surname: String",
      "  bank: String",
      "  line1: String",
      "  line2: String",
      "  line3: String",
      "  line4: String",
      "  postcode: String",
      "  sortCode: String",
      "  accountNo: Int",
      "}",
      "input PrintRecordItemInp{",
      "  id: Int",
      "  requestedBy: String",
      "  newBankDetails: NewBankDetailsInp",
      "  listOfPayments: ListOfPaymentsInp",
      "  includeSingleAndInitialDirectDebits: Boolean",
      "  alreadyPrinted: Boolean",
      "  authorisedByCustomer: String",
      "  datePrinted: String",
      "}",
      "input SinglePrintInp{",
      "  shouldPrint: Boolean",
      "  numberOfItems: Int",
      "}"
    ])
  } )

} )
