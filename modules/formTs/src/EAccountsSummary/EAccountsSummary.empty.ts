import * as domains from '../EAccountsSummary/EAccountsSummary.domains'

export const emptyCreatePlanDD:domains.CreatePlanDDDomain =
  {
    "createPlanStart": "2022-1-1",
    "createPlanDate": "2022-1-1",
    "createPlanEnd": "2022-1-1"
  }
export const emptyEAccountsSummaryDD:domains.EAccountsSummaryDDDomain =
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
export const emptyEAccountSummaryDD:domains.EAccountSummaryDDDomain =
  {
    "accountId": 0,
    "displayType": "savings",
    "description": "",
    "virtualBankSeq": "",
    "total": 0,
    "frequency": ""
  }