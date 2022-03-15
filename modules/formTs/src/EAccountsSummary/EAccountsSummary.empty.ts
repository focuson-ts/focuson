import * as domains from '../EAccountsSummary/EAccountsSummary.domains'

export const emptyCreatePlan:domains.CreatePlanDomain =
  {
    "createPlanStart": "2022-1-1",
    "createPlanDate": "2022-1-1",
    "createPlanEnd": "2022-1-1"
  }
export const emptyEAccountsSummary:domains.EAccountsSummaryDomain =
  {
    "useEStatements": false,
    "eAccountsTable": [
      {
        "accountId": 0,
        "displayType": "savings",
        "description": "",
        "virtualBankSeq": "",
        "total": 0,
        "frequency": ""
      }
    ],
    "totalMonthlyCost": 0,
    "oneAccountBalance": 0,
    "currentAccountBalance": 0,
    "createPlan": {
      "createPlanStart": "2022-1-1",
      "createPlanDate": "2022-1-1",
      "createPlanEnd": "2022-1-1"
    }
  }
export const emptyEAccountsSummaryTable:domains.EAccountsSummaryTableDomain =
  [
    {
      "accountId": 0,
      "displayType": "savings",
      "description": "",
      "virtualBankSeq": "",
      "total": 0,
      "frequency": ""
    }
  ]
export const emptyEAccountSummary:domains.EAccountSummaryDomain =
  {
    "accountId": 0,
    "displayType": "savings",
    "description": "",
    "virtualBankSeq": "",
    "total": 0,
    "frequency": ""
  }