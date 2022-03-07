import { AccountIdDD, BooleanDD, DataD, DateDD, MoneyDD, OneLineStringDD, RepeatingDataD, StringPrimitiveDD } from "../../common/dataD";
import { LabelAndRadioCD, TableCD } from "../../common/componentsD";


export const EAccountDisplayTypeDD: StringPrimitiveDD = {
  ...OneLineStringDD,
  emptyValue: "savings",
  name: "EAccountDisplayTypeDD",
  description: "The component that displays an EAccountDisplayType (savings/checking)",
  display: LabelAndRadioCD,
  enum: { savings: 'Savings', checking: 'Checking' }
  //Note samples come from enum
}

export const EAccountSummaryDD: DataD = {
  name: "EAccountSummaryDD",
  description: "This is the summary data about a single EAccount",
  structure: {
    accountId: { dataDD: AccountIdDD, displayParams: { label: "Account Id" } },
    displayType: { dataDD: EAccountDisplayTypeDD },//No label because it is derivable from the camelCase
    description: { dataDD: { ...OneLineStringDD, resolver: 'getAccountSummaryDescription' }, sample: [ 'This account has a description' ] },
    virtualBankSeq: { dataDD: OneLineStringDD, sample: [ 'seq1', 'seq2', 'seq3' ] },
    total: { dataDD: { ...MoneyDD, sample: [ 1000, 2991 ] } },
    frequency: { dataDD: OneLineStringDD, sample: [ '23' ], displayParams: { label: "Frequency/Amount" } },
  }
}
export const EAccountsSummaryTableDD: RepeatingDataD = {
  name: "EAccountsSummaryTableDD",
  paged: false,
  description: "Just the raw EAccountSummaryDD data",
  dataDD: EAccountSummaryDD,
  display: TableCD,
  displayParams: { order: { value: [ 'accountId', 'displayType', 'description', 'virtualBankSeq', 'frequency', 'total' ] } }
}

export const CreatePlanDD: DataD = {
  name: "CreatePlanDD",
  description: "The create plan data (actually just put in one place to allow a test for a structure)",
  structure: {
    createPlanStart: { displayParams: { label: 'Create Start' }, dataDD: DateDD, sample: [ '2022-01-01' ] },
    createPlanDate: { displayParams: { ariaLabel: 'The Create Plan Date' }, dataDD: DateDD, sample: [ '2022-03-01' ] },
    createPlanEnd: { dataDD: DateDD, sample: [ '2022-10-01' ] }
  }
}

export const oneAccountBalanceResolver: any = {
  name: 'totalMonthlyCost',
get: { kicks: 'name', params: []},
put: {sql: 'select {vars} from {table} where {query}', params: []}
}
export const EAccountsSummaryDD: DataD = {
  name: "EAccountsSummaryDD",
  description: "This is the summary data about all the EAccounts for a single user",
  // tableName: 'CustomerSUmmaryView',
  structure: {
    useEStatements: { dataDD: BooleanDD },
    eAccountsTable: { dataDD: EAccountsSummaryTableDD },
    totalMonthlyCost: { dataDD: { ...MoneyDD, resolver: 'getTotalMonthlyCost', sample: [ 1000 ] } },
    oneAccountBalance: { dataDD: { ...MoneyDD, resolver: 'getOneAccountBalance', sample: [ 9921 ] } },
    currentAccountBalance: { dataDD: { ...MoneyDD, resolver: 'getCurrentAccountBalance', sample: [ 12321 ] } },
    createPlan: { dataDD: CreatePlanDD }
  }
}

