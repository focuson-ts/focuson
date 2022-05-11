import { makeGuardsReportForPage, makeReport, makeReportData, makeRestReport } from "../reporting/report";
import { AllButtonsInPage } from "../buttons/allButtons";
import { AllGuards } from "../buttons/guardButton";
import { JointAccountPageD } from "../example/jointAccount/jointAccount.pageD";
import { MainPageD } from "../common/pageD";
import { jointAccountRestD } from "../example/jointAccount/jointAccount.restD";
import { HelloWorldPage } from "../example/HelloWorld/helloWorld.pageD";
import { helloWorldDD } from "../example/HelloWorld/helloWorld.dataD";
import { ExampleDataD } from "../example/common";
import { StringDD } from "../common/dataD";
import { helloWorldSample } from "../example/HelloWorld/helloWorld.sample";
import { MainOccupationDetailsPageSummaryPD } from "../example/SingleOccupation/singleOccupation.pageD";
import { editOccupationIncomeSummaryModalPD } from "../example/SingleOccupation/singleOccupation.modalD";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";


describe ( "makeReports", () => {
  describe ( "makeRestReport", () => {
    it ( "should include the state data", () => {
      expect ( makeRestReport ( EAccountsSummaryPD, { generatedDomainNames: [] } ).general ).toEqual ( [
        "|createPlanRestD | /api/createPlan?{query}| accountId,applRef,brandRef,clientRef,createPlanId |  | ",
        "|eAccountsSummary | /api/accountsSummary?{query}| accountId,applRef,brandRef,clientRef,customerId,employeeType | employeeType in teamLeader | state:invalidate->auditStuff",
        "| | /api/accountsSummary/invalidate?{query}| accountId,applRef,brandRef,clientRef,customerId,employeeType |"
      ])

    } )
  } )

  it ( "should make a report, when everything is ok", () => {
    const reports = makeReportData<AllButtonsInPage<AllGuards>, AllGuards> ( [ JointAccountPageD ] );
    expect ( makeReport ( reports ) ).toEqual ( [
      "# All Pages",
      "## Common Params",
      "| Name | Location",
      "| --- | ---",
      "|accountId|accountId",
      "|brandRef|brandRef",
      "|dbName|dbName",
      "# All endpoints",
      "| Page | Rest | Url | Params | Access | Audit",
      "| --- | --- | ---  |  --- | --- | --- |",
      "|JointAccount|jointAccount | /api/jointAccount?{query}| accountId,brandRef,dbName |  | ",
      "",
      "---",
      "# JointAccount - MainPage",
      "## Common Params",
      "| Name | Location",
      "| --- | ---",
      "|accountId|accountId",
      "|brandRef|brandRef",
      "|dbName|dbName",
      "  ## domains ",
      "    JointAccount",
      "    JointAccountAddress",
      "    JointAccountAddresses",
      "    JointAccountCustomer",
      "  ## rests   ",
      "  |name|url|params|access|audit",
      "  | --- | --- | --- | --- | --- ",
      "    |jointAccount | /api/jointAccount?{query}| accountId,brandRef,dbName |  | ",
      "  ## modals  ",
      "  |name|displayed with",
      "  | --- | --- ",
      "    | JointAccountEditModalPage |JointAccountCustomer",
      "  ## display ",
      "    JointAccount",
      "  ## buttons ",
      "    Modal Button ==> JointAccountEditModalPage in mode edit",
      "      Focused on \"#selectedAccount\"",
      "    toggle       ToggleButton toggles ~/joint",
      "  ## dataMapping",
      "  ## Table CUST_TBL (Schema TheSchema)",
      "  |Display path | Database Field",
      "  | --- | --- |",
      "  ",
      "  ## Table NAME_TBL (Schema TheSchema)",
      "  |Display path | Database Field",
      "  | --- | --- |",
      "  | main,name  |  zzname ",
      "  ",
      "  ## Table ACC_TBL (Schema TheSchema)",
      "  |Display path | Database Field",
      "  | --- | --- |",
      "  | balance  |  blnc ",
      "  ",
      "  ## Table ADD_TBL (Schema TheSchema)",
      "  |Display path | Database Field",
      "  | --- | --- |",
      "  | main,addresses,line1  |  zzline1 ",
      "  | main,addresses,line2  |  zzline2 ",
      "  ",
      "",
      "---"
    ])
  } )
  it ( "should make a report, when have critical issue", () => {
    let page: MainPageD<any, any> = { ...JointAccountPageD, rest: { jointAccount: { rest: jointAccountRestD, targetFromPath: '#fromApi', fetcher: true }, } };
    const reports = makeReportData<AllButtonsInPage<AllGuards>, AllGuards> ( [ page ] );
    expect ( makeReport ( reports ) ).toEqual ( [
      "# All Pages",
      "# Critical Issues",
      "## Critical Issues in JointAccount",
      "* CRITICAL - Currently do not support variable names in 'rest' jointAccount 'targetFromPath'. #fromApi ",
      "",
      "---",
      "## Common Params",
      "| Name | Location",
      "| --- | ---",
      "|accountId|accountId",
      "|brandRef|brandRef",
      "|dbName|dbName",
      "# All endpoints",
      "| Page | Rest | Url | Params | Access | Audit",
      "| --- | --- | ---  |  --- | --- | --- |",
      "|JointAccount|jointAccount | /api/jointAccount?{query}| accountId,brandRef,dbName |  | ",
      "",
      "---",
      "# JointAccount - MainPage",
      "CRITICAL - Currently do not support variable names in 'rest' jointAccount 'targetFromPath'. #fromApi ",
      "",
      "## Common Params",
      "| Name | Location",
      "| --- | ---",
      "|accountId|accountId",
      "|brandRef|brandRef",
      "|dbName|dbName",
      "  ## domains ",
      "    JointAccount",
      "    JointAccountAddress",
      "    JointAccountAddresses",
      "    JointAccountCustomer",
      "  ## rests   ",
      "  |name|url|params|access|audit",
      "  | --- | --- | --- | --- | --- ",
      "    |jointAccount | /api/jointAccount?{query}| accountId,brandRef,dbName |  | ",
      "  ## modals  ",
      "  |name|displayed with",
      "  | --- | --- ",
      "    | JointAccountEditModalPage |JointAccountCustomer",
      "  ## display ",
      "    JointAccount",
      "  ## buttons ",
      "    Modal Button ==> JointAccountEditModalPage in mode edit",
      "      Focused on \"#selectedAccount\"",
      "    toggle       ToggleButton toggles ~/joint",
      "  ## dataMapping",
      "  ## Table CUST_TBL (Schema TheSchema)",
      "  |Display path | Database Field",
      "  | --- | --- |",
      "  ",
      "  ## Table NAME_TBL (Schema TheSchema)",
      "  |Display path | Database Field",
      "  | --- | --- |",
      "  | main,name  |  zzname ",
      "  ",
      "  ## Table ACC_TBL (Schema TheSchema)",
      "  |Display path | Database Field",
      "  | --- | --- |",
      "  | balance  |  blnc ",
      "  ",
      "  ## Table ADD_TBL (Schema TheSchema)",
      "  |Display path | Database Field",
      "  | --- | --- |",
      "  | main,addresses,line1  |  zzline1 ",
      "  | main,addresses,line2  |  zzline2 ",
      "  ",
      "",
      "---"
    ])
  } )

  it ( "should report duplicate names", () => {
      const duphelloWorldDD: ExampleDataD = {
        name: 'HelloWorldDomainData',
        description: 'This should cause a duplicate name error',
        structure: { dup: { dataDD: helloWorldDD } }
      }
      let page: MainPageD<any, any> = { ...HelloWorldPage, display: { target: '~/fromApi', dataDD: duphelloWorldDD } };
      const reports = makeReportData<AllButtonsInPage<AllGuards>, AllGuards> ( [ page ] );
      expect ( makeReport ( reports ).slice ( 0, 6 ) ).toEqual ( [
        "# All Pages",
        "# Critical Issues",
        "## Critical Issues in HelloWorldMainPage",
        "* CRITICAL duplicate name in dataD HelloWorldDomainData",
        "",
        "---"
      ] )
    }
  )
} )


describe ( "makeGuardsReport", () => {
  it ( "should make a truth table for each component (page/dataD) with guards - main page", () => {
    expect ( makeGuardsReportForPage ( MainOccupationDetailsPageSummaryPD ) ).toEqual ( {
      "critical": [],
      "dontIndent": true,
      "general": [
        "| OneOccupationIncomeDetails|areYou|ownShareOfTheCompany|owningSharesPct|employmentType|otherSourceOfIncome",
        "| --- | --- | --- | --- | --- | --- ",
        "occupation|E,S| | | | ",
        "customerDescription|E,S| | | | ",
        "ownShareOfTheCompany|E| | | | ",
        "owningSharesPct|E|Y| | | ",
        "workFor|E| |N| | ",
        "employmentType|E| |N| | ",
        "empStartDate|E| | |1| ",
        "empEndDate|E| | |2,3| ",
        "annualSalaryBeforeDeduction|E| |N| | ",
        "annualIncomeExcludingRent|E| |N| | ",
        "regularCommissionBonus|E| |N| | ",
        "whatTypeOfBusiness|E,S| |Y| | ",
        "whatNameBusiness|E,S| |Y| | ",
        "establishedYear|E,S| |Y| | ",
        "annualDrawing3Yrs|E,S| |Y| | ",
        "",
        "| OccupationIncomeModal button | condition",
        "| --- | --- |",
        "| otherSourcesOfIncome | {\"condition\":\"equals\",\"path\":\"~/fromApi/occupationAndIncome/customerOccupationIncomeDetails/otherSourceOfIncome\",\"value\":\"\\\"Y\\\"\"}}"
      ],
      "headers": [],
      "part": "guards"
    } )
  } )
} )