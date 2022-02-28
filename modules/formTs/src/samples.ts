import * as domains from './domains';
export const sampleChequeCreditbooksDD0: domains.ChequeCreditbooksDDDomain = 
{
  "history": [
    {
      "serialNumber": 937453,
      "howOrdered": "Manually",
      "dateOrder": "2022-10-01"
    }
  ]
}
export const sampleChequeCreditbooksHistoryLineDD0: domains.ChequeCreditbooksHistoryLineDDDomain = 
{
  "serialNumber": 937453,
  "howOrdered": "Manually",
  "dateOrder": "2022-10-01"
}
export const sampleCreateEAccountDataDD0: domains.CreateEAccountDataDDDomain = 
{
  "name": "This is a one line string",
  "type": "checking",
  "savingsStyle": "adHoc",
  "initialAmount": 123
}
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
      "accountId": "1233450",
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
  "accountId": "1233450",
  "displayType": "checking",
  "description": "This account has a description",
  "virtualBankSeq": "seq1",
  "total": 1000,
  "frequency": "23"
}
export const sampleETransferDataD0: domains.ETransferDataDDomain = 
{
  "amount": "1233450",
  "dateOfETransfer": "2020-10-01",
  "description": "Why we are doing this transfer",
  "fromAccount": "1233450",
  "toAccount": "1233450",
  "monitoringAccount": "1233450",
  "type": "checking",
  "balance": 123,
  "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit"
}
export const sampleOccupationAndIncome0: domains.OccupationAndIncomeDomain = 
{
  "typeOfProfession": "selfEmployed",
  "occupation": "plumber",
  "customersDescription": "This is a one line string",
  "businessType": "Electrical Technical Support",
  "businessName": "This is a one line string",
  "dateStarted": "2020-10-01",
  "averageAnnualDrawings": 123
}
export const sampleChequeCreditbooksDD1: domains.ChequeCreditbooksDDDomain = 
{
  "history": [
    {
      "serialNumber": 937453,
      "howOrdered": "This is a one line string",
      "dateOrder": "2020-10-01"
    }
  ]
}
export const sampleChequeCreditbooksHistoryLineDD1: domains.ChequeCreditbooksHistoryLineDDDomain = 
{
  "serialNumber": 937453,
  "howOrdered": "This is a one line string",
  "dateOrder": "2020-10-01"
}
export const sampleCreateEAccountDataDD1: domains.CreateEAccountDataDDDomain = 
{
  "name": "another one line string",
  "type": "savings",
  "savingsStyle": "payRegular",
  "initialAmount": 456
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
      "accountId": "3233450",
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
  "accountId": "3233450",
  "displayType": "savings",
  "description": "This is a one line string",
  "virtualBankSeq": "seq2",
  "total": 2991,
  "frequency": "This is a one line string"
}
export const sampleETransferDataD1: domains.ETransferDataDDomain = 
{
  "amount": "3233450",
  "dateOfETransfer": "2022-14-01",
  "description": "This is a one line string",
  "fromAccount": "3233450",
  "toAccount": "3233450",
  "monitoringAccount": "3233450",
  "type": "savings",
  "balance": 456,
  "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit"
}
export const sampleOccupationAndIncome1: domains.OccupationAndIncomeDomain = 
{
  "typeOfProfession": "This is a one line string",
  "occupation": "school teacher",
  "customersDescription": "another one line string",
  "businessType": "Electrical Technical Support",
  "businessName": "another one line string",
  "dateStarted": "2022-14-01",
  "averageAnnualDrawings": 456
}
export const sampleChequeCreditbooksDD2: domains.ChequeCreditbooksDDDomain = 
{
  "history": [
    {
      "serialNumber": 937453,
      "howOrdered": "another one line string",
      "dateOrder": "2022-14-01"
    }
  ]
}
export const sampleChequeCreditbooksHistoryLineDD2: domains.ChequeCreditbooksHistoryLineDDDomain = 
{
  "serialNumber": 937453,
  "howOrdered": "another one line string",
  "dateOrder": "2022-14-01"
}
export const sampleCreateEAccountDataDD2: domains.CreateEAccountDataDDDomain = 
{
  "name": "This is a one line string",
  "type": "This is a one line string",
  "savingsStyle": "paySettime",
  "initialAmount": 123
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
      "accountId": "4333450",
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
  "accountId": "4333450",
  "displayType": "This is a one line string",
  "description": "another one line string",
  "virtualBankSeq": "seq3",
  "total": 1000,
  "frequency": "another one line string"
}
export const sampleETransferDataD2: domains.ETransferDataDDomain = 
{
  "amount": "4333450",
  "dateOfETransfer": "2020-10-01",
  "description": "another one line string",
  "fromAccount": "4333450",
  "toAccount": "4333450",
  "monitoringAccount": "4333450",
  "type": "This is a one line string",
  "balance": 123,
  "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit"
}
export const sampleOccupationAndIncome2: domains.OccupationAndIncomeDomain = 
{
  "typeOfProfession": "another one line string",
  "occupation": "plumber",
  "customersDescription": "This is a one line string",
  "businessType": "Electrical Technical Support",
  "businessName": "This is a one line string",
  "dateStarted": "2020-10-01",
  "averageAnnualDrawings": 123
}