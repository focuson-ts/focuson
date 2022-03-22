import * as domains from '../EAccountsSummary/EAccountsSummary.domains'

export const sampleCreatePlan0: domains.CreatePlanDomain = 
{
  "createPlanStart": "2022-01-01",
  "createPlanDate": "2022-03-01",
  "createPlanEnd": "2022-10-01"
}
export const sampleEAccountsSummary0: domains.EAccountsSummaryDomain = 
{
  "useEStatements": true,
  "eAccountsTable": [
    {
      "accountId": 1233450,
      "displayType": "checking",
      "description": "This account has a description",
      "virtualBankSeq": "seq1",
      "total": 1000,
      "frequency": "23"
    }
  ],
  "totalMonthlyCost": 1000,
  "oneAccountBalance": 9921,
  "currentAccountBalance": 12321,
  "createPlan": {
    "createPlanStart": "2022-01-01",
    "createPlanDate": "2022-03-01",
    "createPlanEnd": "2022-10-01"
  }
}
export const sampleEAccountsSummaryTable0: domains.EAccountsSummaryTableDomain = 
[
  {
    "accountId": 1233450,
    "displayType": "checking",
    "description": "This account has a description",
    "virtualBankSeq": "seq1",
    "total": 1000,
    "frequency": "23"
  }
]
export const sampleEAccountSummary0: domains.EAccountSummaryDomain = 
{
  "accountId": 1233450,
  "displayType": "checking",
  "description": "This account has a description",
  "virtualBankSeq": "seq1",
  "total": 1000,
  "frequency": "23"
}
export const sampleCreatePlan1: domains.CreatePlanDomain = 
{
  "createPlanStart": "2020-10-01",
  "createPlanDate": "2020-10-01",
  "createPlanEnd": "2020-10-01"
}
export const sampleEAccountsSummary1: domains.EAccountsSummaryDomain = 
{
  "useEStatements": false,
  "eAccountsTable": [
    {
      "accountId": 3233450,
      "displayType": "savings",
      "description": "This is a one line string",
      "virtualBankSeq": "seq2",
      "total": 2991,
      "frequency": "This is a one line string"
    }
  ],
  "totalMonthlyCost": 1000,
  "oneAccountBalance": 9921,
  "currentAccountBalance": 12321,
  "createPlan": {
    "createPlanStart": "2020-10-01",
    "createPlanDate": "2020-10-01",
    "createPlanEnd": "2020-10-01"
  }
}
export const sampleEAccountsSummaryTable1: domains.EAccountsSummaryTableDomain = 
[
  {
    "accountId": 3233450,
    "displayType": "savings",
    "description": "This is a one line string",
    "virtualBankSeq": "seq2",
    "total": 2991,
    "frequency": "This is a one line string"
  }
]
export const sampleEAccountSummary1: domains.EAccountSummaryDomain = 
{
  "accountId": 3233450,
  "displayType": "savings",
  "description": "This is a one line string",
  "virtualBankSeq": "seq2",
  "total": 2991,
  "frequency": "This is a one line string"
}
export const sampleCreatePlan2: domains.CreatePlanDomain = 
{
  "createPlanStart": "2022-14-01",
  "createPlanDate": "2022-14-01",
  "createPlanEnd": "2022-14-01"
}
export const sampleEAccountsSummary2: domains.EAccountsSummaryDomain = 
{
  "useEStatements": true,
  "eAccountsTable": [
    {
      "accountId": 4333450,
      "displayType": "This is a one line string",
      "description": "another one line string",
      "virtualBankSeq": "seq3",
      "total": 1000,
      "frequency": "another one line string"
    }
  ],
  "totalMonthlyCost": 1000,
  "oneAccountBalance": 9921,
  "currentAccountBalance": 12321,
  "createPlan": {
    "createPlanStart": "2022-14-01",
    "createPlanDate": "2022-14-01",
    "createPlanEnd": "2022-14-01"
  }
}
export const sampleEAccountsSummaryTable2: domains.EAccountsSummaryTableDomain = 
[
  {
    "accountId": 4333450,
    "displayType": "This is a one line string",
    "description": "another one line string",
    "virtualBankSeq": "seq3",
    "total": 1000,
    "frequency": "another one line string"
  }
]
export const sampleEAccountSummary2: domains.EAccountSummaryDomain = 
{
  "accountId": 4333450,
  "displayType": "This is a one line string",
  "description": "another one line string",
  "virtualBankSeq": "seq3",
  "total": 1000,
  "frequency": "another one line string"
}