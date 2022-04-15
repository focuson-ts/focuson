import { makeReport, makeReportData } from "../reporting/report";
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


describe ( "makeReports", () => {
  it ( "should make a report, when everything is ok", () => {
    const reports = makeReportData<AllButtonsInPage<AllGuards>, AllGuards> ( [ JointAccountPageD ] );
    expect ( makeReport ( reports ) ).toEqual ( [
      "# All Pages",
      "## Common Params",
      "| Name | Location",
      "| --- | ---",
      "|accountId|accountId",
      "|brandId|brandId",
      "|dbName|dbName",
      "# All endpoints",
      "| Page | Rest | Url | Params |",
      "| --- | --- | ---  |  --- |",
      "|JointAccount|jointAccount | /api/jointAccount?{query}.| accountId,brandId,dbName",
      "",
      "---",
      "#JointAccount - MainPage",
      "## Common Params",
      "| Name | Location",
      "| --- | ---",
      "|accountId|accountId",
      "|brandId|brandId",
      "|dbName|dbName",
      "  ##domains ",
      "    JointAccount",
      "    JointAccountAddress",
      "    JointAccountAddresses",
      "    JointAccountCustomer",
      "  ##rests   ",
      "  |name|url|params",
      "  | --- | --- | --- ",
      "    |jointAccount | /api/jointAccount?{query}.| accountId,brandId,dbName",
      "  ##modals  ",
      "  |name|displayed with",
      "  | --- | --- ",
      "    | JointAccountEditModalPage |JointAccountCustomer",
      "  ##display ",
      "    JointAccount",
      "  ##buttons ",
      "    Modal Button ==> JointAccountEditModalPage in mode edit",
      "      Focused on \"#selectedAccount\"",
      "    toggle       ToggleButton",
      "",
      "---"
    ])
  } )
  it ( "should make a report, when have critcal issue", () => {
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
      "|brandId|brandId",
      "|dbName|dbName",
      "# All endpoints",
      "| Page | Rest | Url | Params |",
      "| --- | --- | ---  |  --- |",
      "|JointAccount|jointAccount | /api/jointAccount?{query}.| accountId,brandId,dbName",
      "",
      "---",
      "#JointAccount - MainPage",
      "CRITICAL - Currently do not support variable names in 'rest' jointAccount 'targetFromPath'. #fromApi ",
      "",
      "## Common Params",
      "| Name | Location",
      "| --- | ---",
      "|accountId|accountId",
      "|brandId|brandId",
      "|dbName|dbName",
      "  ##domains ",
      "    JointAccount",
      "    JointAccountAddress",
      "    JointAccountAddresses",
      "    JointAccountCustomer",
      "  ##rests   ",
      "  |name|url|params",
      "  | --- | --- | --- ",
      "    |jointAccount | /api/jointAccount?{query}.| accountId,brandId,dbName",
      "  ##modals  ",
      "  |name|displayed with",
      "  | --- | --- ",
      "    | JointAccountEditModalPage |JointAccountCustomer",
      "  ##display ",
      "    JointAccount",
      "  ##buttons ",
      "    Modal Button ==> JointAccountEditModalPage in mode edit",
      "      Focused on \"#selectedAccount\"",
      "    toggle       ToggleButton",
      "",
      "---"
    ] )
  } )

  it ( "should report duplicate names", () => {
      const duphelloWorldDD: ExampleDataD = {
        name: 'HelloWorldDomainData',
        description: 'This should cause a duplicate name error',
        structure: { dup: { dataDD: helloWorldDD } }
      }
      let page: MainPageD<any, any> = { ...HelloWorldPage, display: { target: '~/fromApi', dataDD: duphelloWorldDD } };
      const reports = makeReportData<AllButtonsInPage<AllGuards>, AllGuards> ( [ page ] );
      expect ( makeReport ( reports ) ).toEqual ( [
        "# All Pages",
        "# Critical Issues",
        "## Critical Issues in HelloWorldMainPage",
        "* CRITICAL duplicate name in dataD HelloWorldDomainData",
        "",
        "---",
        "# All endpoints",
        "| Page | Rest | Url | Params |",
        "| --- | --- | ---  |  --- |",
        "|HelloWorldMainPage|restDataRD | /helloWorld?{query}.| ",
        "",
        "---",
        "#HelloWorldMainPage - MainPage",
        "CRITICAL duplicate name in dataD HelloWorldDomainData",
        "",
        "  ##domains ",
        "    HelloWorldDomainData",
        "  ##rests   ",
        "  |name|url|params",
        "  | --- | --- | --- ",
        "    |restDataRD | /helloWorld?{query}.| ",
        "  # modals - None",
        "  ##display ",
        "    HelloWorldDomainData",
        "  # buttons - None",
        "",
        "---"
      ] )
    }
  )

} )