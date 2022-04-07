import * as domains from '../MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.domains'

export const emptyAdditionalInfoFirst:domains.AdditionalInfoFirstDomain =
  {
    "applicantName": "",
    "employerName": "",
    "addressLine1": "",
    "addressLine2": "",
    "addressLine3": "",
    "addressLine4": "",
    "postcode": ""
  }
export const emptyAdditionalInfoSecond:domains.AdditionalInfoSecondDomain =
  {
    "turnoverLastYear": "",
    "turnoverPenultimateYear": "",
    "netProfitLastYear": "",
    "netProfitPenultimateYear": "",
    "drawingsLastYear": "",
    "drawingsPenultimateYear": "",
    "dividendsLastYear": "",
    "dividendsPenultimateYear": "",
    "netAssetsLastYear": "",
    "netAssetsPenultimateYear": ""
  }
export const emptyFromApi:domains.FromApiDomain =
  {
    "occupationAndIncome": {
      "mainCustomerName": "",
      "mainClientRef": 0,
      "customerOccupationIncomeDetails": {
        "areYou": "",
        "occupation": "",
        "customerDescription": "",
        "ownShareOfTheCompany": "",
        "owningSharesPct": "",
        "workFor": "",
        "employmentType": "",
        "empStartDate": "2022-1-1",
        "empEndDate": "2022-1-1",
        "annualSalaryBeforeDeduction": 0,
        "annualIncomeExcludingRent": 0,
        "regularCommissionBonus": 0,
        "whatTypeOfBusiness": "",
        "whatNameBusiness": "",
        "establishedYear": "",
        "annualDrawing3Yrs": 0,
        "otherSourceOfIncome": "",
        "createdBy": "",
        "empEmploymentSeq": 0,
        "accountantAppRoleSeq": 0
      }
    },
    "additionalInfoFirst": {
      "applicantName": "",
      "employerName": "",
      "addressLine1": "",
      "addressLine2": "",
      "addressLine3": "",
      "addressLine4": "",
      "postcode": ""
    },
    "additionalInfoSecond": {
      "turnoverLastYear": "",
      "turnoverPenultimateYear": "",
      "netProfitLastYear": "",
      "netProfitPenultimateYear": "",
      "drawingsLastYear": "",
      "drawingsPenultimateYear": "",
      "dividendsLastYear": "",
      "dividendsPenultimateYear": "",
      "netAssetsLastYear": "",
      "netAssetsPenultimateYear": ""
    },
    "otherSourcesOfIncome": {
      "clientOtherIncomeSeq": "",
      "otherIncomeType": "",
      "incomeFreqRef": "",
      "amount": 0
    },
    "occupationsList": {
      "descTypeValue": "",
      "descTypeName": ""
    }
  }
export const emptyListOccupations:domains.ListOccupationsDomain =
  {
    "descTypeValue": "",
    "descTypeName": ""
  }
export const emptyOccupationAndIncomeFullDomain:domains.OccupationAndIncomeFullDomainDomain =
  {
    "mainCustomerName": "",
    "mainClientRef": 0,
    "customerOccupationIncomeDetails": {
      "areYou": "",
      "occupation": "",
      "customerDescription": "",
      "ownShareOfTheCompany": "",
      "owningSharesPct": "",
      "workFor": "",
      "employmentType": "",
      "empStartDate": "2022-1-1",
      "empEndDate": "2022-1-1",
      "annualSalaryBeforeDeduction": 0,
      "annualIncomeExcludingRent": 0,
      "regularCommissionBonus": 0,
      "whatTypeOfBusiness": "",
      "whatNameBusiness": "",
      "establishedYear": "",
      "annualDrawing3Yrs": 0,
      "otherSourceOfIncome": "",
      "createdBy": "",
      "empEmploymentSeq": 0,
      "accountantAppRoleSeq": 0
    }
  }
export const emptyOneOccupationIncomeDetails:domains.OneOccupationIncomeDetailsDomain =
  {
    "areYou": "",
    "occupation": "",
    "customerDescription": "",
    "ownShareOfTheCompany": "",
    "owningSharesPct": "",
    "workFor": "",
    "employmentType": "",
    "empStartDate": "2022-1-1",
    "empEndDate": "2022-1-1",
    "annualSalaryBeforeDeduction": 0,
    "annualIncomeExcludingRent": 0,
    "regularCommissionBonus": 0,
    "whatTypeOfBusiness": "",
    "whatNameBusiness": "",
    "establishedYear": "",
    "annualDrawing3Yrs": 0,
    "otherSourceOfIncome": "",
    "createdBy": "",
    "empEmploymentSeq": 0,
    "accountantAppRoleSeq": 0
  }
export const emptyOtherIncomeResponse:domains.OtherIncomeResponseDomain =
  {
    "clientOtherIncomeSeq": "",
    "otherIncomeType": "",
    "incomeFreqRef": "",
    "amount": 0
  }