import * as domains from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains'

export const emptyAccountDetails:domains.AccountDetailsDomain =
  {
    "contactTitle": "",
    "contactForename": "",
    "contactSurname": "",
    "practice": "",
    "addressLine1": "",
    "addressLine2": "",
    "addressLine3": "",
    "addressLine4": "",
    "postcode": "",
    "telephone": ""
  }
export const emptyAdditionalInformation:domains.AdditionalInformationDomain =
  {
    "applicantName": "",
    "employerName": "",
    "addressLine1": "",
    "addressLine2": "",
    "addressLine3": "",
    "addressLine4": "",
    "postcode": ""
  }
export const emptyBusinessDetails:domains.BusinessDetailsDomain =
  {
    "applicantName": "",
    "businessName": "",
    "addressLine1": "",
    "addressLine2": "",
    "addressLine3": "",
    "addressLine4": "",
    "postcode": ""
  }
export const emptyBusinessDetailsMain:domains.BusinessDetailsMainDomain =
  {
    "businessDetails": {
      "applicantName": "",
      "businessName": "",
      "addressLine1": "",
      "addressLine2": "",
      "addressLine3": "",
      "addressLine4": "",
      "postcode": ""
    },
    "businessFinancialDetails": {
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
    "detailsOfNonRecurringItems": {
      "nonRecurringItems": ""
    },
    "detailsOfReevaluationOfAssets": {
      "revaluationOfAssets": ""
    },
    "accountantDetails": {
      "contactTitle": "",
      "contactForename": "",
      "contactSurname": "",
      "practice": "",
      "addressLine1": "",
      "addressLine2": "",
      "addressLine3": "",
      "addressLine4": "",
      "postcode": "",
      "telephone": ""
    }
  }
export const emptyBusinessFinancialDetails:domains.BusinessFinancialDetailsDomain =
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
export const emptyContractTypesResponse:domains.ContractTypesResponseDomain =
  {
    "contractTypeId": 0,
    "description": ""
  }
export const emptyCustomerOccupationIncomeDetails:domains.CustomerOccupationIncomeDetailsDomain =
  [
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
      "createdDate": "2022-1-1",
      "employerName": "",
      "sePositionHeld": "",
      "occupationCategory": "",
      "empEmploymentSeq": 0,
      "empAppRoleSeq": 0,
      "accountantAppRoleSeq": 0,
      "currentEmployment": ""
    }
  ]
export const emptyDetailsOfNonRecurringItems:domains.DetailsOfNonRecurringItemsDomain =
  {
    "nonRecurringItems": ""
  }
export const emptyDetailsOfReevaluationOfAssets:domains.DetailsOfReevaluationOfAssetsDomain =
  {
    "revaluationOfAssets": ""
  }
export const emptyDropdowns:domains.DropdownsDomain =
  {
    "occupationDescriptionResponse": {
      "descTypeValue": "",
      "descTypeName": ""
    },
    "employmentStatus": {
      "employmentName": "",
      "employmentValue": ""
    },
    "contractTypesResponse": {
      "contractTypeId": 0,
      "description": ""
    },
    "frequenciesResponse": {
      "frequencyId": 0,
      "frequencyDescription": "",
      "annualMultiple": 0
    }
  }
export const emptyEmploymentStatus:domains.EmploymentStatusDomain =
  {
    "employmentName": "",
    "employmentValue": ""
  }
export const emptyFrequenciesResponse:domains.FrequenciesResponseDomain =
  {
    "frequencyId": 0,
    "frequencyDescription": "",
    "annualMultiple": 0
  }
export const emptyListOccupations:domains.ListOccupationsDomain =
  {
    "search": "",
    "selectedOccupationName": "",
    "searchResults": [
      {
        "descTypeValue": "",
        "descTypeName": ""
      }
    ]
  }
export const emptyOccupationAndIncomeFullDomain:domains.OccupationAndIncomeFullDomainDomain =
  {
    "mainCustomerName": "",
    "jointCustomerName": "",
    "mainClientRef": 0,
    "jointClientRef": 0,
    "customerOccupationIncomeDetails": [
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
        "createdDate": "2022-1-1",
        "employerName": "",
        "sePositionHeld": "",
        "occupationCategory": "",
        "empEmploymentSeq": 0,
        "empAppRoleSeq": 0,
        "accountantAppRoleSeq": 0,
        "currentEmployment": ""
      }
    ]
  }
export const emptyOccupationDescriptionResponse:domains.OccupationDescriptionResponseDomain =
  {
    "descTypeValue": "",
    "descTypeName": ""
  }
export const emptyOccupationsListData:domains.OccupationsListDataDomain =
  [
    {
      "descTypeValue": "",
      "descTypeName": ""
    }
  ]
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
    "createdDate": "2022-1-1",
    "employerName": "",
    "sePositionHeld": "",
    "occupationCategory": "",
    "empEmploymentSeq": 0,
    "empAppRoleSeq": 0,
    "accountantAppRoleSeq": 0,
    "currentEmployment": ""
  }
export const emptyOtherIncomeResponse:domains.OtherIncomeResponseDomain =
  {
    "clientOtherIncomeSeq": "",
    "otherIncomeType": "",
    "incomeFreqRef": "",
    "amount": 0
  }