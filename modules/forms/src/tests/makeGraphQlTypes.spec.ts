import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { makeGraphQlSchema, makeQueryOrMutateBlock, makeSchemaBlock } from "../codegen/makeGraphQlTypes";
import { CreatePlanDD, EAccountsSummaryDD, EAccountsSummaryTableDD, EAccountSummaryDD } from "../example/eAccounts/eAccountsSummary.dataD";
import { RepeatingPageD } from "../example/repeating/repeating.pageD";
import { repeatingRestRD } from "../example/repeating/repeating.restD";

const rs = [ eAccountsSummaryRestD, createPlanRestD, eAccountsSummaryRestD, createPlanRestD ];
describe ( "makeGraphQlSchema", () => {

  describe ( "makeQueryOrMutateBlock", () => {

    it ( "should make type Query", () => {
      expect ( makeQueryOrMutateBlock ( rs, 'Query' ) ).toEqual ( [
        "type Query{",
        "  getEAccountsSummary(accountId: Int!, applRef: Int!, brandRef: Int!, clientRef: Int!, dbName: String!, employeeType: String!):EAccountsSummary!",
        "  getCreatePlan(accountId: Int!, applRef: Int!, brandRef: Int!, clientRef: Int!, createPlanId: Int!):CreatePlan!",
        "}"
      ])
    } )
    it ( "should make type Mutation", () => {
      expect ( makeQueryOrMutateBlock ( rs, 'Mutation' ) ).toEqual ( [
        "type Mutation{",
        "  stateinvalidateEAccountsSummary(accountId: Int!, clientRef: Int!, dbName: String!, employeeType: String!):Boolean",
        "  createCreatePlan(accountId: Int!, applRef: Int!, brandRef: Int!, clientRef: Int!,obj: CreatePlanInp!):CreatePlan!",
        "  updateCreatePlan(accountId: Int!, applRef: Int!, brandRef: Int!, clientRef: Int!, createPlanId: Int!,obj: CreatePlanInp!):CreatePlan!",
        "  deleteCreatePlan(accountId: Int!, applRef: Int!, brandRef: Int!, clientRef: Int!, createPlanId: Int!):Boolean",
        "}"
      ])
    } )
  } )

  it ( "should be able to  makeSchemaBlock", () => {
    expect ( makeSchemaBlock ( 'input', 'xx' ) ( EAccountsSummaryDD ) ).toEqual ( [
      "input EAccountsSummaryxx{",
      "  useEStatements: Boolean!",
      "  eAccountsTable: [EAccountSummaryxx!]!",
      "  totalMonthlyCost: Int!",
      "  oneAccountBalance: Int!",
      "  currentAccountBalance: Int!",
      "  createPlan: CreatePlanxx!",
      "}"
    ] )
    expect ( makeSchemaBlock ( 'input', 'xx' ) ( EAccountSummaryDD ) ).toEqual ( [
      "input EAccountSummaryxx{",
      "  accountId: Int!",
      "  displayType: String!",
      "  description: String!",
      "  virtualBankSeq: String!",
      "  total: Int!",
      "  frequency: String!",
      "}"
    ] )
    expect ( makeSchemaBlock ( 'input', 'xx' ) ( CreatePlanDD ) ).toEqual ( [
      "input CreatePlanxx{",
      "  createPlanStart: String!",
      "  createPlanDate: String!",
      "  createPlanEnd: String!",
      "}"
    ] )
  } )

  it ( "should make a schema from RestDs", () => {
    expect ( makeGraphQlSchema ( rs ) ).toEqual ( [
      "type Query{",
      "  getEAccountsSummary(accountId: Int!, applRef: Int!, brandRef: Int!, clientRef: Int!, dbName: String!, employeeType: String!):EAccountsSummary!",
      "  getCreatePlan(accountId: Int!, applRef: Int!, brandRef: Int!, clientRef: Int!, createPlanId: Int!):CreatePlan!",
      "}",
      "type Mutation{",
      "  stateinvalidateEAccountsSummary(accountId: Int!, clientRef: Int!, dbName: String!, employeeType: String!):Boolean",
      "  createCreatePlan(accountId: Int!, applRef: Int!, brandRef: Int!, clientRef: Int!,obj: CreatePlanInp!):CreatePlan!",
      "  updateCreatePlan(accountId: Int!, applRef: Int!, brandRef: Int!, clientRef: Int!, createPlanId: Int!,obj: CreatePlanInp!):CreatePlan!",
      "  deleteCreatePlan(accountId: Int!, applRef: Int!, brandRef: Int!, clientRef: Int!, createPlanId: Int!):Boolean",
      "}",
      "type CreatePlan{",
      "  createPlanStart: String!",
      "  createPlanDate: String!",
      "  createPlanEnd: String!",
      "}",
      "type EAccountsSummary{",
      "  useEStatements: Boolean!",
      "  eAccountsTable: [EAccountSummary!]!",
      "  totalMonthlyCost: Int!",
      "  oneAccountBalance: Int!",
      "  currentAccountBalance: Int!",
      "  createPlan: CreatePlan!",
      "}",
      "type EAccountSummary{",
      "  accountId: Int!",
      "  displayType: String!",
      "  description: String!",
      "  virtualBankSeq: String!",
      "  total: Int!",
      "  frequency: String!",
      "}",
      "input CreatePlanInp{",
      "  createPlanStart: String!",
      "  createPlanDate: String!",
      "  createPlanEnd: String!",
      "}"
    ])
  } )

  it ( "should make a schema for something with a repeating block in the fetcher", () => {
    expect ( makeGraphQlSchema ( [ repeatingRestRD ] ) ).toEqual ( [
      "type Query{",
      "  getRepeatingLine(clientRef: Int!):[RepeatingLine!]!",
      "}",
      "type Mutation{",
      "  createRepeatingLine(clientRef: Int!,obj: [RepeatingLineInp!]!):[RepeatingLine!]!",
      "}",
      "type RepeatingLine{",
      "  name: String!",
      "  age: Int!",
      "}",
      "input RepeatingLineInp{",
      "  name: String!",
      "  age: Int!",
      "}"
    ])

  } )
} )
