import * as domains from './domains';
export const sampleCreatePlanDD0: domains.CreatePlanDDDomain = 
{
  "createPlanStart": "2022-01-01",
  "createPlanDate": "2022-03-01",
  "createPlanEnd": "2022-10-01"
}
export const sampleEAccountsSummaryDD0: domains.EAccountsSummaryDDDomain = 
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
export const sampleEAccountSummaryDD0: domains.EAccountSummaryDDDomain = 
{
  "accountId": 1233450,
  "displayType": "checking",
  "description": "This account has a description",
  "virtualBankSeq": "seq1",
  "total": 1000,
  "frequency": "23"
}
export const sampleCreatePlanDD1: domains.CreatePlanDDDomain = 
{
  "createPlanStart": "2020-10-01",
  "createPlanDate": "2020-10-01",
  "createPlanEnd": "2020-10-01"
}
export const sampleEAccountsSummaryDD1: domains.EAccountsSummaryDDDomain = 
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
export const sampleEAccountSummaryDD1: domains.EAccountSummaryDDDomain = 
{
  "accountId": 3233450,
  "displayType": "savings",
  "description": "This is a one line string",
  "virtualBankSeq": "seq2",
  "total": 2991,
  "frequency": "This is a one line string"
}
export const sampleCreatePlanDD2: domains.CreatePlanDDDomain = 
{
  "createPlanStart": "2022-14-01",
  "createPlanDate": "2022-14-01",
  "createPlanEnd": "2022-14-01"
}
export const sampleEAccountsSummaryDD2: domains.EAccountsSummaryDDDomain = 
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
export const sampleEAccountSummaryDD2: domains.EAccountSummaryDDDomain = 
{
  "accountId": 4333450,
  "displayType": "This is a one line string",
  "description": "another one line string",
  "virtualBankSeq": "seq3",
  "total": 1000,
  "frequency": "another one line string"
}