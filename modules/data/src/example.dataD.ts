import { AccountIdDD, DataD, DateDD, Input, MoneyDD, OneLineStringDD, PrimitiveDD, RepeatingDataD, Table } from "./dataD";


export const EAccountDisplayTypeDD: PrimitiveDD = {
  name: "EAccountDisplayTypeDD",
  description: "The component that displays an EAccountDisplayType (savings/checking)",
  display: Input,
  validation: { enum: true, maxLength: 7 },
  enum: { savings: 'Savings', checking: 'Checking' }
  //Note samples come from enum
}

export const EAccountSummaryDD: DataD = {
  name: "EAccountSummaryDD",
  description: "This is the summary data about a single EAccount",
  structure: {
    accountId: { dataDD: AccountIdDD, label: "Account Id" },
    displayType: { dataDD: EAccountDisplayTypeDD },//No label because it is derivable from the camelCase
    description: { dataDD: OneLineStringDD },
    frequency: { dataDD: OneLineStringDD, label: "Frequency/Amount" },
  }
}
export const EAccountsSummaryTableDD: RepeatingDataD = {
  name: "EAccountsSummaryTableDD",
  paged: false,
  description: "Just the raw EAccountSummaryDD data",
  dataDD: EAccountSummaryDD,
  display: Table
}
export const CreatePlanDD: DataD = {
  name: "CreatePlanDD",
  description: "The create plan data (actually just put in one place to allow a test for a structure)",
  structure: {
    createPlanStart: { label: 'Create Start', dataDD: DateDD },
    createPlanDate: { ariaLabel: 'The Create Plan Date', dataDD: DateDD },
    createPlanEnd: { dataDD: DateDD },
  }
}
export const EAccountsSummaryDD: DataD = {
  name: "EAccountsSummaryDD",
  description: "This is the summary data about all the EAccounts for a single user",
  structure: {
    eAccountsTable: { dataDD: EAccountsSummaryTableDD },
    totalMonthlyCost: { dataDD: MoneyDD },
    oneAccountBalance: { dataDD: MoneyDD },
    currentAccountBalance: { dataDD: MoneyDD },
    createPlan: { dataDD: CreatePlanDD }
  }
}
