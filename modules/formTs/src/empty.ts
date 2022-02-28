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
export const emptyOccupationAndIncome:domains.OccupationAndIncomeDomain =
 {
   "typeOfProfession": "selfEmployed",
   "occupation": "",
   "customersDescription": "",
   "businessType": "",
   "businessName": "",
   "dateStarted": "2022-1-1",
   "averageAnnualDrawings": 0
 }