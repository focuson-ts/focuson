import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccountsSummary.restD";
import { makeGraphQlSchema, makeQueryOrMutateBlock, makeSchemaBlock } from "../codegen/makeGraphQlTypes";
import { CreatePlanDD, EAccountsSummaryDD, EAccountsSummaryTableDD, EAccountSummaryDD } from "../example/eAccountsSummary.dataD";

const rs = [ eAccountsSummaryRestD, createPlanRestD, eAccountsSummaryRestD, createPlanRestD ];
describe ( "makeGraphQlSchema", () => {

  describe ( "makeQueryOrMutateBlock", () => {

    it ( "should make type Query", () => {
      expect ( makeQueryOrMutateBlock ( rs, 'query' ) ).toEqual ( [
        "type Query{",
        "  getEAccountsSummaryDD(id: String!):EAccountsSummaryDD!",
        "  getCreatePlanDD(id: String!):CreatePlanDD!",
        "  listCreatePlanDD:[CreatePlanDD!]!",
        "}"
      ] )
    } )
    it ( "should make type Mutation", () => {
      expect ( makeQueryOrMutateBlock ( rs, 'mutation' ) ).toEqual ( [
        "type Mutation{",
        "  createCreatePlanDD(obj :CreatePlanDDInp):CreatePlanDD!",
        "  updateCreatePlanDD(id: String!,obj :CreatePlanDDIdAndInp):CreatePlanDD!",
        "  deleteCreatePlanDD(id: String!):String",
        "}"
      ] )
    } )
  } )

  it ( "should be able to  makeSchemaBlock", () => {
    expect ( makeSchemaBlock ( 'input', 'xx' ) ( EAccountsSummaryDD ) ).toEqual ( [
      "input EAccountsSummaryDDxx{",
      "  eAccountsTable: EAccountSummaryDDxx!",
      "  totalMonthlyCost: String!",
      "  oneAccountBalance: String!",
      "  currentAccountBalance: String!",
      "  createPlan: CreatePlanDDxx!",
      "}"
    ] )
    expect ( makeSchemaBlock ( 'input', 'xx' ) ( EAccountSummaryDD ) ).toEqual ( [
      "input EAccountSummaryDDxx{",
      "  accountId: String!",
      "  displayType: String!",
      "  description: String!",
      "  virtualBankSeq: String!",
      "  total: String!",
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
      "  getEAccountsSummaryDD(id: String!):EAccountsSummaryDD!",
      "  getCreatePlanDD(id: String!):CreatePlanDD!",
      "  listCreatePlanDD:[CreatePlanDD!]!",
      "}",
      "type Mutation{",
      "  createCreatePlanDD(obj :CreatePlanDDInp):CreatePlanDD!",
      "  updateCreatePlanDD(id: String!,obj :CreatePlanDDIdAndInp):CreatePlanDD!",
      "  deleteCreatePlanDD(id: String!):String",
      "}",
      "type CreatePlanDD{",
      "  createPlanStart: String!",
      "  createPlanDate: String!",
      "  createPlanEnd: String!",
      "}",
      "type EAccountsSummaryDD{",
      "  eAccountsTable: [EAccountSummaryDD!]!",
      "  totalMonthlyCost: String!",
      "  oneAccountBalance: String!",
      "  currentAccountBalance: String!",
      "  createPlan: CreatePlanDD!",
      "}",
      "type EAccountSummaryDD{",
      "  accountId: String!",
      "  displayType: String!",
      "  description: String!",
      "  virtualBankSeq: String!",
      "  total: String!",
      "  frequency: String!",
      "}",
      "input CreatePlanDDInp{",
      "  createPlanStart: String!",
      "  createPlanDate: String!",
      "  createPlanEnd: String!",
      "}",
      "input CreatePlanDDIdAndInp{",
      "  createPlanStart: String!",
      "  createPlanDate: String!",
      "  createPlanEnd: String!",
      "}"
    ] )
  } )
} )
