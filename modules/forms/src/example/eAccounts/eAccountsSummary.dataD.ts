import { AccountIdDD, BooleanDD, DataD, DateDD, MoneyDD, OneLineStringDD, RepeatingDataD, StringPrimitiveDD } from "../../common/dataD";
import { LabelAndRadioCD, LayoutCd, TableCD } from "../../common/componentsD";
import { AllGuards } from "../../buttons/guardButton";
import { accountT } from "../database/tableNames";


export const EAccountDisplayTypeDD: StringPrimitiveDD = {
  ...OneLineStringDD,
  emptyValue: "savings",
  name: "EAccountDisplayType",
  description: "The component that displays an EAccountDisplayType (savings/checking)",
  display: LabelAndRadioCD,
  enum: { savings: 'Savings', checking: 'Checking' },
}

export const EAccountSummaryDD: DataD<AllGuards> = {
  name: "EAccountSummary",
  description: "This is the summary data about a single EAccount",
  table: accountT,
  structure: {
    accountId: { dataDD: AccountIdDD, displayParams: { label: "Account Id" } },
    displayType: { dataDD: EAccountDisplayTypeDD },//No label because it is derivable from the camelCase
    description: { dataDD: { ...OneLineStringDD, resolver: 'getAccountSummaryDescription' }, sample:  ["This account's description"] },
    virtualBankSeq: { dataDD: OneLineStringDD, sample: [ 'seq1', 'seq2', 'seq3' ] },
    total: { dataDD: { ...MoneyDD, sample: [ 1000, 2991 ] } },
    frequency: { dataDD: OneLineStringDD, sample: [ '23' ], displayParams: { label: "Frequency/Amount" } },
  }
}
export const EAccountsSummaryTableDD: RepeatingDataD <AllGuards> = {
  name: "EAccountsSummaryTable",
  paged: false,
  description: "Just the raw EAccountSummaryDD data",
  dataDD: EAccountSummaryDD,
  display: TableCD,
  displayParams: { order: [ 'accountId', 'displayType', 'description', 'virtualBankSeq', 'frequency', 'total' ] }
}

export const CreatePlanDD: DataD<AllGuards> = {
  name: "CreatePlan",
  description: "The create plan data (actually just put in one place to allow a test for a structure)",
  structure: {
    createPlanStart: { displayParams: { label: 'Create Start', dateFormat: 'yyyy/MM/dd' }, dataDD: DateDD, sample: [ '2022-01-01' ] },
    createPlanDate: { displayParams: { ariaLabel: 'The Create Plan Date' }, dataDD: DateDD, sample: [ '2022-03-01' ] },
    createPlanEnd: { dataDD: DateDD, sample: [ '2022-10-01' ] }
  }
}

export const oneAccountBalanceResolver: any = {
  name: 'totalMonthlyCost',
  get: { kicks: 'name', params: [] },
  put: { sql: 'select {vars} from {table} where {query}', params: [] }
}

export const BalancesAndMonthlyCostDD: DataD<AllGuards> = {
  name: "BalancesAndMonthlyCost",
  description: "This is the summary data about all the EAccounts for a single user",
  // tableName: 'CustomerSUmmaryView',
  structure: {
    totalMonthlyCost: { dataDD: { ...MoneyDD, resolver: 'totalMonthlyCost', sample: [ 1000 ] } },
    oneAccountBalance: { dataDD: { ...MoneyDD,  sample: [ 9921 ] } },
    currentAccountBalance: { dataDD: { ...MoneyDD,  sample: [ 12321 ] } },
  }
}

export const EAccountsSummaryDD: DataD<AllGuards> = {
  name: "EAccountsSummary",
  description: "This is the summary data about all the EAccounts for a single user",
  layout: { component: LayoutCd, displayParams: { details: '[[10]]', defaultProps: `{"valueWidth": 50}`}},
  // tableName: 'CustomerSUmmaryView',
  structure: {
    useEStatements: { dataDD: BooleanDD },
    eAccountsTable: { dataDD: EAccountsSummaryTableDD },
    balancesAndMonthlyCost: { dataDD: { ...BalancesAndMonthlyCostDD,  resolver: 'balancesAndMonthlyCostResolver', sample: [ 1000 ] } },
    createPlan: { dataDD: CreatePlanDD }
  }
}

