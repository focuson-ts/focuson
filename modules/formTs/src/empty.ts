import * as domains from './domains';
export const emptyChequeCreditbooksDD:domains.ChequeCreditbooksDDDomain =
 {
   "history": [
     {
       "serialNumber": 0,
       "howOrdered": "",
       "dateOrder": "2022-1-1"
     }
   ]
 }
export const emptyChequeCreditbooksHistoryLineDD:domains.ChequeCreditbooksHistoryLineDDDomain =
 {
   "serialNumber": 0,
   "howOrdered": "",
   "dateOrder": "2022-1-1"
 }
export const emptyCreateEAccountDataDD:domains.CreateEAccountDataDDDomain =
 {
   "name": "",
   "type": "savings",
   "savingsStyle": "adhoc",
   "initialAmount": 0
 }
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
       "accountId": "",
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
   "accountId": "",
   "displayType": "savings",
   "description": "",
   "virtualBankSeq": "",
   "total": 0,
   "frequency": ""
 }
export const emptyETransferDataD:domains.ETransferDataDDomain =
 {
   "amount": "",
   "dateOfETransfer": "2022-1-1",
   "description": "",
   "fromAccount": "",
   "toAccount": "",
   "monitoringAccount": "",
   "type": "savings",
   "balance": 0,
   "notes": ""
 }
export const emptyOccupationAndIncomeDetailsDD:domains.OccupationAndIncomeDetailsDDDomain =
 {
   "regulatoryReport": "",
   "mainCustomerName": "",
   "jointCustomerName": "",
   "mainClientRef": 0,
   "jointClientRef": 0,
   "customerOccupationIncomeDetails": [
     {
       "areYou": "",
       "currentEmployment": "",
       "occupation": "",
       "customerDescription": "",
       "ownShareOfTheCompany": "",
       "owningSharesPct": "",
       "workFor": "",
       "employmentType": "",
       "annualSalaryBeforeDeduction": 0,
       "annualIncomeExcludingRent": 0,
       "regularCommissionBonus": 0,
       "dateOfEmploymentStart": "",
       "otherSourceOfIncome": "",
       "createdBy": "",
       "createdDate": "2022-1-1",
       "employerName": "",
       "whatTypeOfBusiness": "",
       "whatNameBusiness": "",
       "establishedYear": "",
       "annualDrawing3Yrs": 0,
       "empStartDate": "2022-1-1",
       "empEndDate": "2022-1-1",
       "sePositionHeld": "",
       "occupationCategory": "",
       "empEmploymentSeq": 0,
       "empAppRoleSeq": 0,
       "accountantAppRoleSeq": 0
     }
   ]
 }
export const emptyOccupationIncomeDetailsDD:domains.OccupationIncomeDetailsDDDomain =
 {
   "areYou": "",
   "currentEmployment": "",
   "occupation": "",
   "customerDescription": "",
   "ownShareOfTheCompany": "",
   "owningSharesPct": "",
   "workFor": "",
   "employmentType": "",
   "annualSalaryBeforeDeduction": 0,
   "annualIncomeExcludingRent": 0,
   "regularCommissionBonus": 0,
   "dateOfEmploymentStart": "",
   "otherSourceOfIncome": "",
   "createdBy": "",
   "createdDate": "2022-1-1",
   "employerName": "",
   "whatTypeOfBusiness": "",
   "whatNameBusiness": "",
   "establishedYear": "",
   "annualDrawing3Yrs": 0,
   "empStartDate": "2022-1-1",
   "empEndDate": "2022-1-1",
   "sePositionHeld": "",
   "occupationCategory": "",
   "empEmploymentSeq": 0,
   "empAppRoleSeq": 0,
   "accountantAppRoleSeq": 0
 }