import { ExampleMainPage, ExampleRefD } from "./example/common";
import { EAccountsSummaryPD } from "./example/eAccounts/eAccountsSummary.pageD";
import { ETransferPageD } from "./example/eTransfers/eTransfers.pageD";
import { CreateEAccountPageD } from "./example/createEAccount/createEAccount.pageD";
import { ChequeCreditbooksPD } from "./example/chequeCreditBooks/chequeCreditBooks.pageD";
import { RepeatingPageD } from "./example/repeating/repeating.pageD";
import { PostCodeMainPage } from "./example/postCodeDemo/addressSearch.pageD";
import { OccupationAndIncomeSummaryPD } from "./example/occupationAndIncome/occupationAndIncome.pageD";
import { AccountOverviewMainPage } from "./example/accountOverview/accountOverview.pageD";
import { JointAccountPageD } from "./example/jointAccount/jointAccount.pageD";
import { HelloWorldPage } from "./example/HelloWorld/helloWorld.pageD";
import { LinkedAccountDetailsPD } from "./example/linkedAccount/linkedAccountDetails.pageD";
import { ListOfPaymentsPagePD } from "./example/ListOfPayments/listOfPayements.pageD";
import { PaymentsPageD } from "./example/payments/payments.pageD";
import { AuthoriseChargesPD } from "./example/authoriseCharges/authoriseCharges.pageD";
import { OverpaymentMainPage } from "./example/overpaymentHistory/overpaymentHistory.pageD";
import { OnChangePageD } from "./example/onChange/onChange.pageD";
import { FourOhFourPageD } from "./example/FourOhFour/FourOhFour.pageD";
import { EnabledByPageD } from "./example/enabledBy/enabledBy.pageD";
import { ReadOnlyPageD } from "./example/readonly/readOnly.pageD";
import { DatesPageD } from "./example/dates/dates.pageD";
import { wizardPD } from "./example/wizard/wizard.pageD";

import { ButtonsPageD } from "./example/buttons/buttonsPageD";
import { CreditAC, DirectDebitAC } from "./example/authoriseCharges/authoriseCharges.customise";
import { modalPagePD } from "./example/modalPages/modalPages.pageD";
import { resolversRefD } from "./example/resolvers/resolvers.refD";
import { inputsPageD } from "./example/inputs/inputs.pageD";
import { loaderPageD } from "./example/loader/loader.pageD";
import { tablePageD } from "./example/tables/table.pageD";
import {accountTypeRefD, RefConfiguration, timeDataRefD} from "./common/dateInfoRefD";
import {onlySchema} from "./example/database/tableNames";
import {NameAnd} from "@focuson/utils";
import {PrimaryMutations} from "./common/resolverD";
import {RestParams} from "./common/restD";
import {allCommonIds, fromCommonIds} from "./example/commonIds";


export const accountTypeRestParams: RestParams = {
  dbName: allCommonIds.dbName,
  ...fromCommonIds('vbAccountSeq')
}
export const accountTypeResolver: NameAnd<PrimaryMutations> = {
  getVbAccountTypeForRefD: [
    { type: 'sqlFunction', package: 'B003N_ACCOUNT_OPTIONS', name: 'Get_Account_Type', schema: onlySchema, params: [
        { type: "output", name: 'vbAccountType', sqlType: 'INTEGER', javaType: 'Integer' },
        'vbAccountSeq',
      ] },
  ]
}

export interface SqlInfo {
  name: string;
  sql: string;
}

export const sqlList: NameAnd<SqlInfo> = {
  today: { name: 'getTodaysDateSQL', sql: "select V061.CMS_SYSDATE as today from dual" },
  holiday: { name: 'getHolidaysSQL', sql: "SELECT BANKING_HOLIDAY_DATE, JURISDICTION_CODE FROM VPARAM.BANKING_HOLIDAYS WHERE BANKING_HOLIDAY_DATE > ? ORDER BY BANKING_HOLIDAY_DATE DESC" }
}

export const timeDataRestParams: RestParams = {
  dbName: allCommonIds.dbName,
}
export function timeDataResolver(sqlList: NameAnd<SqlInfo>): NameAnd<PrimaryMutations> {
  return {
    getTimeData: [
      { type: 'sql', name: sqlList.today.name, schema: onlySchema, sql: sqlList.today.sql, params: [
          { type: "output", name: 'today', rsName: 'TODAY', javaType: 'String', format: { pattern: 'dd-MM-yyyy', type: 'Date' } },
        ]
      },
      // // Keep me I am very useful for debugging
      // { type: 'manual', name: 'manualToday', code: [
      //   'String today = "20-11-2022";'
      //   ],
      //   params: [
      //     { type: 'output', name: 'today', javaType: 'String', format: { type: 'Date', pattern: 'dd-MM-yyyy' } }
      //   ]},
      { type:'manual', name: 'getServerNow', import: [
          'import java.text.DateFormat;',
          'import java.text.SimpleDateFormat;',
          'import java.util.TimeZone;',
        ], code: [
          `DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");`,
          `dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));`,
          `java.util.Date now = new java.util.Date();`,
          'String serverNow = dateFormat.format(now);'
        ], params: [
          { type: 'output', name: 'serverNow', javaType: 'String' }
        ]
      },
      { type: 'manual', name: 'dateFormat', code: [
          'String dateFormat = "dd-MM-yyyy";'
        ], params: [
          { type: 'output', name: 'dateFormat', javaType: 'String' }
        ]
      },
      { type: 'manual', name: 'getServerOffsetFromGMT', code: [
          'Integer serverOffsetHoursFromGMT = 0;'
        ], params: [
          { type: 'output', name: 'serverOffsetHoursFromGMT', javaType: 'Integer' }
        ]
      },
    ],
    getHolidays: [
      { type: 'sql', name: sqlList.today.name, schema: onlySchema, sql: sqlList.today.sql, params: [
          { type: "output", name: 'today', rsName: 'TODAY', javaType: 'String', format: { pattern: 'dd-MM-yyyy', type: 'Date' } },
        ] },
      { type: 'sql', name: sqlList.holiday.name, sql: sqlList.holiday.sql, schema: onlySchema, params: [
          { type: 'input', name: 'today', javaType: 'String', format: { type: 'Date', pattern:  'dd-MM-yyyy' } },
          { type: 'output', name: 'date', rsName: 'BANKING_HOLIDAY_DATE', javaType: 'String', format: { type: 'Date', pattern: 'dd-MM-yyyy' } },
          { type: 'output', name: 'jurisdiction', rsName: 'JURISDICTION_CODE', javaType: 'String' },
        ], list: true }
    ]
  }
}

export const accountTypeConfig: RefConfiguration = {
  urlPrefix: '/v1/focuson',
  teamName: 'Focuson',
  params: accountTypeRestParams,
  resolver: accountTypeResolver
}

export const timeDataConfig: RefConfiguration = {
  urlPrefix: '/v1/focuson',
  teamName: 'Focuson',
  params: timeDataRestParams,
  resolver: timeDataResolver(sqlList)
}


// export const generatedRefs: ExampleRefD[] = [ dateInfoRefD ( { ... dateRefconfig, urlPrefix: "/api/focuson"} ) , resolversRefD]
export const generatedRefs: ExampleRefD[] = [ accountTypeRefD ( accountTypeConfig ) , timeDataRefD( timeDataConfig ), resolversRefD ]

export const generatedPages: ExampleMainPage[] = [
  tablePageD,
  loaderPageD,
  inputsPageD,
  ButtonsPageD,
  modalPagePD,
  DatesPageD,
  wizardPD,
  EnabledByPageD,
  ReadOnlyPageD,
  FourOhFourPageD,
  OnChangePageD,
  HelloWorldPage,
  AuthoriseChargesPD ( DirectDebitAC ),
  AuthoriseChargesPD ( CreditAC ),
  PaymentsPageD,
  ListOfPaymentsPagePD,
  LinkedAccountDetailsPD,
  OverpaymentMainPage,
  AccountOverviewMainPage,
  JointAccountPageD,
  // MainOccupationDetailsPageSummaryPD,
  OccupationAndIncomeSummaryPD,
  EAccountsSummaryPD,
  ETransferPageD,
  CreateEAccountPageD,
  ChequeCreditbooksPD,
  RepeatingPageD,
  PostCodeMainPage ];
