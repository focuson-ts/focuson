import * as domains from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains'

export const sampleAccountDetails0: domains.AccountDetailsDomain = 
{
  "contactTitle": "BARON",
  "contactForename": "Justin",
  "contactSurname": "Tesla",
  "practice": "PracXyz",
  "addressLine1": "Pinetrees Road",
  "addressLine2": "Norwich",
  "addressLine3": "Norfolk",
  "addressLine4": "Norfolkkk",
  "postcode": "PLXYZ",
  "telephone": "224567"
}
export const sampleAdditionalInformation0: domains.AdditionalInformationDomain = 
{
  "applicantName": "Mr XXXXXXXXXX ABCD Fred Bloggs",
  "employerName": "AnalystXYZ",
  "addressLine1": "Pinetrees Road",
  "addressLine2": "Norwich",
  "addressLine3": "Norfolk",
  "addressLine4": "Norfolkkk",
  "postcode": "PLXYZ"
}
export const sampleBusinessDetails0: domains.BusinessDetailsDomain = 
{
  "applicantName": "Mr XXXXXXXXXX ABCD Fred Bloggs",
  "businessName": "AnalystXYZ",
  "addressLine1": "Pinetrees Road",
  "addressLine2": "Norwich",
  "addressLine3": "Norfolk",
  "addressLine4": "Norfolkkk",
  "postcode": "PLXYZ"
}
export const sampleBusinessDetailsMain0: domains.BusinessDetailsMainDomain = 
{
  "businessDetails": {
    "applicantName": "Mr XXXXXXXXXX ABCD Fred Bloggs",
    "businessName": "AnalystXYZ",
    "addressLine1": "Pinetrees Road",
    "addressLine2": "Norwich",
    "addressLine3": "Norfolk",
    "addressLine4": "Norfolkkk",
    "postcode": "PLXYZ"
  },
  "businessFinancialDetails": {
    "turnoverLastYear": "10,000",
    "turnoverPenultimateYear": "11,000",
    "netProfitLastYear": "12,000",
    "netProfitPenultimateYear": "9,000",
    "drawingsLastYear": "13,000",
    "drawingsPenultimateYear": "100,000",
    "dividendsLastYear": "15,000",
    "dividendsPenultimateYear": "3,000",
    "netAssetsLastYear": "1,000",
    "netAssetsPenultimateYear": "2,000"
  },
  "detailsOfNonRecurringItems": {
    "nonRecurringItems": "Not Available"
  },
  "detailsOfReevaluationOfAssets": {
    "revaluationOfAssets": "Not Available"
  },
  "accountantDetails": {
    "contactTitle": "BARON",
    "contactForename": "Justin",
    "contactSurname": "Tesla",
    "practice": "PracXyz",
    "addressLine1": "Pinetrees Road",
    "addressLine2": "Norwich",
    "addressLine3": "Norfolk",
    "addressLine4": "Norfolkkk",
    "postcode": "PLXYZ",
    "telephone": "224567"
  }
}
export const sampleBusinessFinancialDetails0: domains.BusinessFinancialDetailsDomain = 
{
  "turnoverLastYear": "10,000",
  "turnoverPenultimateYear": "11,000",
  "netProfitLastYear": "12,000",
  "netProfitPenultimateYear": "9,000",
  "drawingsLastYear": "13,000",
  "drawingsPenultimateYear": "100,000",
  "dividendsLastYear": "15,000",
  "dividendsPenultimateYear": "3,000",
  "netAssetsLastYear": "1,000",
  "netAssetsPenultimateYear": "2,000"
}
export const sampleContractTypesResponse0: domains.ContractTypesResponseDomain = 
{
  "contractTypeId": 123,
  "description": "someString"
}
export const sampleCustomerOccupationIncomeDetails0: domains.CustomerOccupationIncomeDetailsDomain = 
[
  {
    "areYou": "C",
    "occupation": "W045",
    "customerDescription": "XXXXXXXXX",
    "ownShareOfTheCompany": "N",
    "owningSharesPct": "N",
    "workFor": "S.C. Bosch S.R.L.",
    "employmentType": "0",
    "empStartDate": "10/2002",
    "empEndDate": "10/2003",
    "annualSalaryBeforeDeduction": 20315,
    "annualIncomeExcludingRent": 13255,
    "regularCommissionBonus": 500,
    "whatTypeOfBusiness": "Electrical Technical Support",
    "whatNameBusiness": "XXXXXXXXX",
    "establishedYear": "2006-04-01T00:00:00.000+01:00",
    "annualDrawing3Yrs": 100000,
    "otherSourceOfIncome": "N",
    "createdBy": "Seras Alin",
    "createdDate": "2007-07-03T10:52:27.000+01:00",
    "employerName": "My employer name",
    "sePositionHeld": "DIR",
    "occupationCategory": "SK",
    "empEmploymentSeq": 999999,
    "empAppRoleSeq": 14648851,
    "accountantAppRoleSeq": 14648851,
    "currentEmployment": "N"
  }
]
export const sampleDetailsOfNonRecurringItems0: domains.DetailsOfNonRecurringItemsDomain = 
{
  "nonRecurringItems": "Not Available"
}
export const sampleDetailsOfReevaluationOfAssets0: domains.DetailsOfReevaluationOfAssetsDomain = 
{
  "revaluationOfAssets": "Not Available"
}
export const sampleDropdowns0: domains.DropdownsDomain = 
{
  "occupationDescriptionResponse": {
    "descTypeValue": "W54",
    "descTypeName": "Engineer"
  },
  "employmentStatus": {
    "employmentName": "someString",
    "employmentValue": "someString"
  },
  "contractTypesResponse": {
    "contractTypeId": 123,
    "description": "someString"
  },
  "frequenciesResponse": {
    "frequencyId": 123,
    "frequencyDescription": "someString",
    "annualMultiple": 123
  }
}
export const sampleEmploymentStatus0: domains.EmploymentStatusDomain = 
{
  "employmentName": "someString",
  "employmentValue": "someString"
}
export const sampleFrequenciesResponse0: domains.FrequenciesResponseDomain = 
{
  "frequencyId": 123,
  "frequencyDescription": "someString",
  "annualMultiple": 123
}
export const sampleListOccupations0: domains.ListOccupationsDomain = 
{
  "search": "Hair dresser",
  "selectedOccupationName": "someString",
  "searchResults": [
    {
      "descTypeValue": "W54",
      "descTypeName": "Engineer"
    }
  ]
}
export const sampleOccupationAndIncomeFullDomain0: domains.OccupationAndIncomeFullDomainDomain = 
{
  "mainCustomerName": "Mr XXXXXXXXXX J ABCD Fred Bloggs",
  "jointCustomerName": "Mrs XXXXXXXXXX J ABCD Fred Bloggs",
  "mainClientRef": 13606326,
  "jointClientRef": -1,
  "customerOccupationIncomeDetails": [
    {
      "areYou": "C",
      "occupation": "W045",
      "customerDescription": "XXXXXXXXX",
      "ownShareOfTheCompany": "N",
      "owningSharesPct": "N",
      "workFor": "S.C. Bosch S.R.L.",
      "employmentType": "0",
      "empStartDate": "10/2002",
      "empEndDate": "10/2003",
      "annualSalaryBeforeDeduction": 20315,
      "annualIncomeExcludingRent": 13255,
      "regularCommissionBonus": 500,
      "whatTypeOfBusiness": "Electrical Technical Support",
      "whatNameBusiness": "XXXXXXXXX",
      "establishedYear": "2006-04-01T00:00:00.000+01:00",
      "annualDrawing3Yrs": 100000,
      "otherSourceOfIncome": "N",
      "createdBy": "Seras Alin",
      "createdDate": "2007-07-03T10:52:27.000+01:00",
      "employerName": "My employer name",
      "sePositionHeld": "DIR",
      "occupationCategory": "SK",
      "empEmploymentSeq": 999999,
      "empAppRoleSeq": 14648851,
      "accountantAppRoleSeq": 14648851,
      "currentEmployment": "N"
    }
  ]
}
export const sampleOccupationDescriptionResponse0: domains.OccupationDescriptionResponseDomain = 
{
  "descTypeValue": "W54",
  "descTypeName": "Engineer"
}
export const sampleOccupationsListData0: domains.OccupationsListDataDomain = 
[
  {
    "descTypeValue": "W54",
    "descTypeName": "Engineer"
  }
]
export const sampleOneOccupationIncomeDetails0: domains.OneOccupationIncomeDetailsDomain = 
{
  "areYou": "C",
  "occupation": "W045",
  "customerDescription": "XXXXXXXXX",
  "ownShareOfTheCompany": "N",
  "owningSharesPct": "N",
  "workFor": "S.C. Bosch S.R.L.",
  "employmentType": "0",
  "empStartDate": "10/2002",
  "empEndDate": "10/2003",
  "annualSalaryBeforeDeduction": 20315,
  "annualIncomeExcludingRent": 13255,
  "regularCommissionBonus": 500,
  "whatTypeOfBusiness": "Electrical Technical Support",
  "whatNameBusiness": "XXXXXXXXX",
  "establishedYear": "2006-04-01T00:00:00.000+01:00",
  "annualDrawing3Yrs": 100000,
  "otherSourceOfIncome": "N",
  "createdBy": "Seras Alin",
  "createdDate": "2007-07-03T10:52:27.000+01:00",
  "employerName": "My employer name",
  "sePositionHeld": "DIR",
  "occupationCategory": "SK",
  "empEmploymentSeq": 999999,
  "empAppRoleSeq": 14648851,
  "accountantAppRoleSeq": 14648851,
  "currentEmployment": "N"
}
export const sampleOtherIncomeResponse0: domains.OtherIncomeResponseDomain = 
{
  "clientOtherIncomeSeq": "someString",
  "otherIncomeType": "someString",
  "incomeFreqRef": "0",
  "amount": 123
}
export const sampleAccountDetails1: domains.AccountDetailsDomain = 
{
  "contactTitle": "BRIGADIER",
  "contactForename": "someString",
  "contactSurname": "someString",
  "practice": "someString",
  "addressLine1": "someString",
  "addressLine2": "someString",
  "addressLine3": "someString",
  "addressLine4": "someString",
  "postcode": "someString",
  "telephone": "someString"
}
export const sampleAdditionalInformation1: domains.AdditionalInformationDomain = 
{
  "applicantName": "someString",
  "employerName": "someString",
  "addressLine1": "someString",
  "addressLine2": "someString",
  "addressLine3": "someString",
  "addressLine4": "someString",
  "postcode": "someString"
}
export const sampleBusinessDetails1: domains.BusinessDetailsDomain = 
{
  "applicantName": "someString",
  "businessName": "someString",
  "addressLine1": "This is a one line string",
  "addressLine2": "This is a one line string",
  "addressLine3": "This is a one line string",
  "addressLine4": "This is a one line string",
  "postcode": "someString"
}
export const sampleBusinessDetailsMain1: domains.BusinessDetailsMainDomain = 
{
  "businessDetails": {
    "applicantName": "someString",
    "businessName": "someString",
    "addressLine1": "This is a one line string",
    "addressLine2": "This is a one line string",
    "addressLine3": "This is a one line string",
    "addressLine4": "This is a one line string",
    "postcode": "someString"
  },
  "businessFinancialDetails": {
    "turnoverLastYear": "someString",
    "turnoverPenultimateYear": "someString",
    "netProfitLastYear": "someString",
    "netProfitPenultimateYear": "someString",
    "drawingsLastYear": "someString",
    "drawingsPenultimateYear": "someString",
    "dividendsLastYear": "someString",
    "dividendsPenultimateYear": "someString",
    "netAssetsLastYear": "someString",
    "netAssetsPenultimateYear": "someString"
  },
  "detailsOfNonRecurringItems": {
    "nonRecurringItems": "someString"
  },
  "detailsOfReevaluationOfAssets": {
    "revaluationOfAssets": "someString"
  },
  "accountantDetails": {
    "contactTitle": "BRIGADIER",
    "contactForename": "someString",
    "contactSurname": "someString",
    "practice": "someString",
    "addressLine1": "someString",
    "addressLine2": "someString",
    "addressLine3": "someString",
    "addressLine4": "someString",
    "postcode": "someString",
    "telephone": "someString"
  }
}
export const sampleBusinessFinancialDetails1: domains.BusinessFinancialDetailsDomain = 
{
  "turnoverLastYear": "someString",
  "turnoverPenultimateYear": "someString",
  "netProfitLastYear": "someString",
  "netProfitPenultimateYear": "someString",
  "drawingsLastYear": "someString",
  "drawingsPenultimateYear": "someString",
  "dividendsLastYear": "someString",
  "dividendsPenultimateYear": "someString",
  "netAssetsLastYear": "someString",
  "netAssetsPenultimateYear": "someString"
}
export const sampleContractTypesResponse1: domains.ContractTypesResponseDomain = 
{
  "contractTypeId": 456,
  "description": "anotherString"
}
export const sampleCustomerOccupationIncomeDetails1: domains.CustomerOccupationIncomeDetailsDomain = 
[
  {
    "areYou": "E",
    "occupation": "someString",
    "customerDescription": "someString",
    "ownShareOfTheCompany": "X",
    "owningSharesPct": "X",
    "workFor": "someString",
    "employmentType": "1",
    "empStartDate": "2020-10-01",
    "empEndDate": "2020-10-01",
    "annualSalaryBeforeDeduction": 123,
    "annualIncomeExcludingRent": 123,
    "regularCommissionBonus": 123,
    "whatTypeOfBusiness": "someString",
    "whatNameBusiness": "someString",
    "establishedYear": "someString",
    "annualDrawing3Yrs": 123,
    "otherSourceOfIncome": "X",
    "createdBy": "someString",
    "createdDate": "2020-10-01",
    "employerName": "someString",
    "sePositionHeld": "someString",
    "occupationCategory": "someString",
    "empEmploymentSeq": 123,
    "empAppRoleSeq": 123,
    "accountantAppRoleSeq": 123,
    "currentEmployment": "X"
  }
]
export const sampleDetailsOfNonRecurringItems1: domains.DetailsOfNonRecurringItemsDomain = 
{
  "nonRecurringItems": "someString"
}
export const sampleDetailsOfReevaluationOfAssets1: domains.DetailsOfReevaluationOfAssetsDomain = 
{
  "revaluationOfAssets": "someString"
}
export const sampleDropdowns1: domains.DropdownsDomain = 
{
  "occupationDescriptionResponse": {
    "descTypeValue": "someString",
    "descTypeName": "someString"
  },
  "employmentStatus": {
    "employmentName": "anotherString",
    "employmentValue": "anotherString"
  },
  "contractTypesResponse": {
    "contractTypeId": 456,
    "description": "anotherString"
  },
  "frequenciesResponse": {
    "frequencyId": 456,
    "frequencyDescription": "anotherString",
    "annualMultiple": 456
  }
}
export const sampleEmploymentStatus1: domains.EmploymentStatusDomain = 
{
  "employmentName": "anotherString",
  "employmentValue": "anotherString"
}
export const sampleFrequenciesResponse1: domains.FrequenciesResponseDomain = 
{
  "frequencyId": 456,
  "frequencyDescription": "anotherString",
  "annualMultiple": 456
}
export const sampleListOccupations1: domains.ListOccupationsDomain = 
{
  "search": "This is a one line string",
  "selectedOccupationName": "anotherString",
  "searchResults": [
    {
      "descTypeValue": "someString",
      "descTypeName": "someString"
    }
  ]
}
export const sampleOccupationAndIncomeFullDomain1: domains.OccupationAndIncomeFullDomainDomain = 
{
  "mainCustomerName": "someString",
  "jointCustomerName": "someString",
  "mainClientRef": 123,
  "jointClientRef": 123,
  "customerOccupationIncomeDetails": [
    {
      "areYou": "E",
      "occupation": "someString",
      "customerDescription": "someString",
      "ownShareOfTheCompany": "X",
      "owningSharesPct": "X",
      "workFor": "someString",
      "employmentType": "1",
      "empStartDate": "2020-10-01",
      "empEndDate": "2020-10-01",
      "annualSalaryBeforeDeduction": 123,
      "annualIncomeExcludingRent": 123,
      "regularCommissionBonus": 123,
      "whatTypeOfBusiness": "someString",
      "whatNameBusiness": "someString",
      "establishedYear": "someString",
      "annualDrawing3Yrs": 123,
      "otherSourceOfIncome": "X",
      "createdBy": "someString",
      "createdDate": "2020-10-01",
      "employerName": "someString",
      "sePositionHeld": "someString",
      "occupationCategory": "someString",
      "empEmploymentSeq": 123,
      "empAppRoleSeq": 123,
      "accountantAppRoleSeq": 123,
      "currentEmployment": "X"
    }
  ]
}
export const sampleOccupationDescriptionResponse1: domains.OccupationDescriptionResponseDomain = 
{
  "descTypeValue": "someString",
  "descTypeName": "someString"
}
export const sampleOccupationsListData1: domains.OccupationsListDataDomain = 
[
  {
    "descTypeValue": "someString",
    "descTypeName": "someString"
  }
]
export const sampleOneOccupationIncomeDetails1: domains.OneOccupationIncomeDetailsDomain = 
{
  "areYou": "E",
  "occupation": "someString",
  "customerDescription": "someString",
  "ownShareOfTheCompany": "X",
  "owningSharesPct": "X",
  "workFor": "someString",
  "employmentType": "1",
  "empStartDate": "2020-10-01",
  "empEndDate": "2020-10-01",
  "annualSalaryBeforeDeduction": 123,
  "annualIncomeExcludingRent": 123,
  "regularCommissionBonus": 123,
  "whatTypeOfBusiness": "someString",
  "whatNameBusiness": "someString",
  "establishedYear": "someString",
  "annualDrawing3Yrs": 123,
  "otherSourceOfIncome": "X",
  "createdBy": "someString",
  "createdDate": "2020-10-01",
  "employerName": "someString",
  "sePositionHeld": "someString",
  "occupationCategory": "someString",
  "empEmploymentSeq": 123,
  "empAppRoleSeq": 123,
  "accountantAppRoleSeq": 123,
  "currentEmployment": "X"
}
export const sampleOtherIncomeResponse1: domains.OtherIncomeResponseDomain = 
{
  "clientOtherIncomeSeq": "anotherString",
  "otherIncomeType": "anotherString",
  "incomeFreqRef": "1",
  "amount": 456
}
export const sampleAccountDetails2: domains.AccountDetailsDomain = 
{
  "contactTitle": "CAPTAIN",
  "contactForename": "anotherString",
  "contactSurname": "anotherString",
  "practice": "anotherString",
  "addressLine1": "anotherString",
  "addressLine2": "anotherString",
  "addressLine3": "anotherString",
  "addressLine4": "anotherString",
  "postcode": "anotherString",
  "telephone": "anotherString"
}
export const sampleAdditionalInformation2: domains.AdditionalInformationDomain = 
{
  "applicantName": "anotherString",
  "employerName": "anotherString",
  "addressLine1": "anotherString",
  "addressLine2": "anotherString",
  "addressLine3": "anotherString",
  "addressLine4": "anotherString",
  "postcode": "anotherString"
}
export const sampleBusinessDetails2: domains.BusinessDetailsDomain = 
{
  "applicantName": "anotherString",
  "businessName": "anotherString",
  "addressLine1": "another one line string",
  "addressLine2": "another one line string",
  "addressLine3": "another one line string",
  "addressLine4": "another one line string",
  "postcode": "anotherString"
}
export const sampleBusinessDetailsMain2: domains.BusinessDetailsMainDomain = 
{
  "businessDetails": {
    "applicantName": "anotherString",
    "businessName": "anotherString",
    "addressLine1": "another one line string",
    "addressLine2": "another one line string",
    "addressLine3": "another one line string",
    "addressLine4": "another one line string",
    "postcode": "anotherString"
  },
  "businessFinancialDetails": {
    "turnoverLastYear": "anotherString",
    "turnoverPenultimateYear": "anotherString",
    "netProfitLastYear": "anotherString",
    "netProfitPenultimateYear": "anotherString",
    "drawingsLastYear": "anotherString",
    "drawingsPenultimateYear": "anotherString",
    "dividendsLastYear": "anotherString",
    "dividendsPenultimateYear": "anotherString",
    "netAssetsLastYear": "anotherString",
    "netAssetsPenultimateYear": "anotherString"
  },
  "detailsOfNonRecurringItems": {
    "nonRecurringItems": "anotherString"
  },
  "detailsOfReevaluationOfAssets": {
    "revaluationOfAssets": "anotherString"
  },
  "accountantDetails": {
    "contactTitle": "CAPTAIN",
    "contactForename": "anotherString",
    "contactSurname": "anotherString",
    "practice": "anotherString",
    "addressLine1": "anotherString",
    "addressLine2": "anotherString",
    "addressLine3": "anotherString",
    "addressLine4": "anotherString",
    "postcode": "anotherString",
    "telephone": "anotherString"
  }
}
export const sampleBusinessFinancialDetails2: domains.BusinessFinancialDetailsDomain = 
{
  "turnoverLastYear": "anotherString",
  "turnoverPenultimateYear": "anotherString",
  "netProfitLastYear": "anotherString",
  "netProfitPenultimateYear": "anotherString",
  "drawingsLastYear": "anotherString",
  "drawingsPenultimateYear": "anotherString",
  "dividendsLastYear": "anotherString",
  "dividendsPenultimateYear": "anotherString",
  "netAssetsLastYear": "anotherString",
  "netAssetsPenultimateYear": "anotherString"
}
export const sampleContractTypesResponse2: domains.ContractTypesResponseDomain = 
{
  "contractTypeId": 123,
  "description": "someString"
}
export const sampleCustomerOccupationIncomeDetails2: domains.CustomerOccupationIncomeDetailsDomain = 
[
  {
    "areYou": "H",
    "occupation": "anotherString",
    "customerDescription": "anotherString",
    "ownShareOfTheCompany": "Y",
    "owningSharesPct": "Y",
    "workFor": "anotherString",
    "employmentType": "2",
    "empStartDate": "2022-14-01",
    "empEndDate": "2022-14-01",
    "annualSalaryBeforeDeduction": 456,
    "annualIncomeExcludingRent": 456,
    "regularCommissionBonus": 456,
    "whatTypeOfBusiness": "anotherString",
    "whatNameBusiness": "anotherString",
    "establishedYear": "anotherString",
    "annualDrawing3Yrs": 456,
    "otherSourceOfIncome": "Y",
    "createdBy": "anotherString",
    "createdDate": "2022-14-01",
    "employerName": "anotherString",
    "sePositionHeld": "anotherString",
    "occupationCategory": "anotherString",
    "empEmploymentSeq": 456,
    "empAppRoleSeq": 456,
    "accountantAppRoleSeq": 456,
    "currentEmployment": "Y"
  }
]
export const sampleDetailsOfNonRecurringItems2: domains.DetailsOfNonRecurringItemsDomain = 
{
  "nonRecurringItems": "anotherString"
}
export const sampleDetailsOfReevaluationOfAssets2: domains.DetailsOfReevaluationOfAssetsDomain = 
{
  "revaluationOfAssets": "anotherString"
}
export const sampleDropdowns2: domains.DropdownsDomain = 
{
  "occupationDescriptionResponse": {
    "descTypeValue": "anotherString",
    "descTypeName": "anotherString"
  },
  "employmentStatus": {
    "employmentName": "someString",
    "employmentValue": "someString"
  },
  "contractTypesResponse": {
    "contractTypeId": 123,
    "description": "someString"
  },
  "frequenciesResponse": {
    "frequencyId": 123,
    "frequencyDescription": "someString",
    "annualMultiple": 123
  }
}
export const sampleEmploymentStatus2: domains.EmploymentStatusDomain = 
{
  "employmentName": "someString",
  "employmentValue": "someString"
}
export const sampleFrequenciesResponse2: domains.FrequenciesResponseDomain = 
{
  "frequencyId": 123,
  "frequencyDescription": "someString",
  "annualMultiple": 123
}
export const sampleListOccupations2: domains.ListOccupationsDomain = 
{
  "search": "another one line string",
  "selectedOccupationName": "someString",
  "searchResults": [
    {
      "descTypeValue": "anotherString",
      "descTypeName": "anotherString"
    }
  ]
}
export const sampleOccupationAndIncomeFullDomain2: domains.OccupationAndIncomeFullDomainDomain = 
{
  "mainCustomerName": "anotherString",
  "jointCustomerName": "anotherString",
  "mainClientRef": 456,
  "jointClientRef": 456,
  "customerOccupationIncomeDetails": [
    {
      "areYou": "H",
      "occupation": "anotherString",
      "customerDescription": "anotherString",
      "ownShareOfTheCompany": "Y",
      "owningSharesPct": "Y",
      "workFor": "anotherString",
      "employmentType": "2",
      "empStartDate": "2022-14-01",
      "empEndDate": "2022-14-01",
      "annualSalaryBeforeDeduction": 456,
      "annualIncomeExcludingRent": 456,
      "regularCommissionBonus": 456,
      "whatTypeOfBusiness": "anotherString",
      "whatNameBusiness": "anotherString",
      "establishedYear": "anotherString",
      "annualDrawing3Yrs": 456,
      "otherSourceOfIncome": "Y",
      "createdBy": "anotherString",
      "createdDate": "2022-14-01",
      "employerName": "anotherString",
      "sePositionHeld": "anotherString",
      "occupationCategory": "anotherString",
      "empEmploymentSeq": 456,
      "empAppRoleSeq": 456,
      "accountantAppRoleSeq": 456,
      "currentEmployment": "Y"
    }
  ]
}
export const sampleOccupationDescriptionResponse2: domains.OccupationDescriptionResponseDomain = 
{
  "descTypeValue": "anotherString",
  "descTypeName": "anotherString"
}
export const sampleOccupationsListData2: domains.OccupationsListDataDomain = 
[
  {
    "descTypeValue": "anotherString",
    "descTypeName": "anotherString"
  }
]
export const sampleOneOccupationIncomeDetails2: domains.OneOccupationIncomeDetailsDomain = 
{
  "areYou": "H",
  "occupation": "anotherString",
  "customerDescription": "anotherString",
  "ownShareOfTheCompany": "Y",
  "owningSharesPct": "Y",
  "workFor": "anotherString",
  "employmentType": "2",
  "empStartDate": "2022-14-01",
  "empEndDate": "2022-14-01",
  "annualSalaryBeforeDeduction": 456,
  "annualIncomeExcludingRent": 456,
  "regularCommissionBonus": 456,
  "whatTypeOfBusiness": "anotherString",
  "whatNameBusiness": "anotherString",
  "establishedYear": "anotherString",
  "annualDrawing3Yrs": 456,
  "otherSourceOfIncome": "Y",
  "createdBy": "anotherString",
  "createdDate": "2022-14-01",
  "employerName": "anotherString",
  "sePositionHeld": "anotherString",
  "occupationCategory": "anotherString",
  "empEmploymentSeq": 456,
  "empAppRoleSeq": 456,
  "accountantAppRoleSeq": 456,
  "currentEmployment": "Y"
}
export const sampleOtherIncomeResponse2: domains.OtherIncomeResponseDomain = 
{
  "clientOtherIncomeSeq": "someString",
  "otherIncomeType": "someString",
  "incomeFreqRef": "2",
  "amount": 123
}