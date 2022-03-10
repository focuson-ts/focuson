import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { makeGraphQlSchema, makeQueryOrMutateBlock, makeSchemaBlock } from "../codegen/makeGraphQlTypes";
import { CreatePlanDD, EAccountsSummaryDD, EAccountsSummaryTableDD, EAccountSummaryDD } from "../example/eAccounts/eAccountsSummary.dataD";

const rs = [ eAccountsSummaryRestD, createPlanRestD, eAccountsSummaryRestD, createPlanRestD ];
describe ( "makeGraphQlSchema", () => {

  describe ( "makeQueryOrMutateBlock", () => {

    it ( "should make type Query", () => {
      expect ( makeQueryOrMutateBlock ( rs, 'Query' ) ).toEqual ( [
        "type Query{",
        "  getEAccountsSummaryDD(accountId: String!, customerId: String!):EAccountsSummaryDD!",
        "  getCreatePlanDD(accountId: String!, createPlanId: String!, customerId: String!):CreatePlanDD!",
        "  listCreatePlanDD(accountId: String!, customerId: String!):[CreatePlanDD!]!",
        "}"
      ])
    } )
    it ( "should make type Mutation", () => {
      expect ( makeQueryOrMutateBlock ( rs, 'Mutation' ) ).toEqual ( [
        "type Mutation{",
        "  createCreatePlanDD(accountId: String!, customerId: String!,obj: CreatePlanDDInp!):CreatePlanDD!",
        "  updateCreatePlanDD(accountId: String!, createPlanId: String!, customerId: String!,obj: CreatePlanDDInp!):CreatePlanDD!",
        "  deleteCreatePlanDD(accountId: String!, createPlanId: String!, customerId: String!):String",
        "}"
      ])
    } )
  } )

  it ( "should be able to  makeSchemaBlock", () => {
    expect ( makeSchemaBlock ( 'input', 'xx' ) ( EAccountsSummaryDD ) ).toEqual ( [
      "input EAccountsSummaryDDxx{",
      "  useEStatements: Boolean!",
      "  eAccountsTable: [EAccountSummaryDDxx!]!",
      "  totalMonthlyCost: Int!",
      "  oneAccountBalance: Int!",
      "  currentAccountBalance: Int!",
      "  createPlan: CreatePlanDDxx!",
      "}"
    ] )
    expect ( makeSchemaBlock ( 'input', 'xx' ) ( EAccountSummaryDD ) ).toEqual ( [
      "input EAccountSummaryDDxx{",
      "  accountId: Int!",
      "  displayType: String!",
      "  description: String!",
      "  virtualBankSeq: String!",
      "  total: Int!",
      "  frequency: String!",
      "}"
    ] )
    expect ( makeSchemaBlock ( 'input', 'xx' ) ( CreatePlanDD ) ).toEqual ( [
      "input CreatePlanDDxx{",
      "  createPlanStart: String!",
      "  createPlanDate: String!",
      "  createPlanEnd: String!",
      "}"
    ] )
  } )

  it ( "should make a schema from RestDs", () => {
    expect ( makeGraphQlSchema ( rs ) ).toEqual ( [
      "type Query{",
      "  getEAccountsSummaryDD(accountId: String!, customerId: String!):EAccountsSummaryDD!",
      "  getCreatePlanDD(accountId: String!, createPlanId: String!, customerId: String!):CreatePlanDD!",
      "  listCreatePlanDD(accountId: String!, customerId: String!):[CreatePlanDD!]!",
      "}",
      "type Mutation{",
      "  createCreatePlanDD(accountId: String!, customerId: String!,obj: CreatePlanDDInp!):CreatePlanDD!",
      "  updateCreatePlanDD(accountId: String!, createPlanId: String!, customerId: String!,obj: CreatePlanDDInp!):CreatePlanDD!",
      "  deleteCreatePlanDD(accountId: String!, createPlanId: String!, customerId: String!):String",
      "}",
      "type CreatePlanDD{",
      "  createPlanStart: String!",
      "  createPlanDate: String!",
      "  createPlanEnd: String!",
      "}",
      "type EAccountsSummaryDD{",
      "  useEStatements: Boolean!",
      "  eAccountsTable: [EAccountSummaryDD!]!",
      "  totalMonthlyCost: Int!",
      "  oneAccountBalance: Int!",
      "  currentAccountBalance: Int!",
      "  createPlan: CreatePlanDD!",
      "}",
      "type EAccountSummaryDD{",
      "  accountId: Int!",
      "  displayType: String!",
      "  description: String!",
      "  virtualBankSeq: String!",
      "  total: Int!",
      "  frequency: String!",
      "}",
      "input CreatePlanDDInp{",
      "  createPlanStart: String!",
      "  createPlanDate: String!",
      "  createPlanEnd: String!",
      "}"
    ])
  } )

  it ("should make a schema for something with a repeating block in the fetcher", () =>{



  })
} )
