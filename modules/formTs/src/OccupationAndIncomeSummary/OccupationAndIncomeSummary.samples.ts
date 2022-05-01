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
  },
  {
    "areYou": "E",
    "occupation": "W045",
    "customerDescription": "XXXXXXXXX",
    "ownShareOfTheCompany": "X",
    "owningSharesPct": "X",
    "workFor": "S.C. Bosch S.R.L.",
    "employmentType": "1",
    "empStartDate": "10/2002",
    "empEndDate": "10/2003",
    "annualSalaryBeforeDeduction": 20315,
    "annualIncomeExcludingRent": 13255,
    "regularCommissionBonus": 500,
    "whatTypeOfBusiness": "Electrical Technical Support",
    "whatNameBusiness": "XXXXXXXXX",
    "establishedYear": "2006-04-01T00:00:00.000+01:00",
    "annualDrawing3Yrs": 100000,
    "otherSourceOfIncome": "X",
    "createdBy": "Seras Alin",
    "createdDate": "2007-07-03T10:52:27.000+01:00",
    "employerName": "My employer name",
    "sePositionHeld": "DIR",
    "occupationCategory": "SK",
    "empEmploymentSeq": 999999,
    "empAppRoleSeq": 14648851,
    "accountantAppRoleSeq": 14648851,
    "currentEmployment": "X"
  },
  {
    "areYou": "H",
    "occupation": "W045",
    "customerDescription": "XXXXXXXXX",
    "ownShareOfTheCompany": "Y",
    "owningSharesPct": "Y",
    "workFor": "S.C. Bosch S.R.L.",
    "employmentType": "2",
    "empStartDate": "10/2002",
    "empEndDate": "10/2003",
    "annualSalaryBeforeDeduction": 20315,
    "annualIncomeExcludingRent": 13255,
    "regularCommissionBonus": 500,
    "whatTypeOfBusiness": "Electrical Technical Support",
    "whatNameBusiness": "XXXXXXXXX",
    "establishedYear": "2006-04-01T00:00:00.000+01:00",
    "annualDrawing3Yrs": 100000,
    "otherSourceOfIncome": "Y",
    "createdBy": "Seras Alin",
    "createdDate": "2007-07-03T10:52:27.000+01:00",
    "employerName": "My employer name",
    "sePositionHeld": "DIR",
    "occupationCategory": "SK",
    "empEmploymentSeq": 999999,
    "empAppRoleSeq": 14648851,
    "accountantAppRoleSeq": 14648851,
    "currentEmployment": "Y"
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
    },
    {
      "descTypeValue": "W54",
      "descTypeName": "Engineer"
    },
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
    },
    {
      "areYou": "E",
      "occupation": "W045",
      "customerDescription": "XXXXXXXXX",
      "ownShareOfTheCompany": "X",
      "owningSharesPct": "X",
      "workFor": "S.C. Bosch S.R.L.",
      "employmentType": "1",
      "empStartDate": "10/2002",
      "empEndDate": "10/2003",
      "annualSalaryBeforeDeduction": 20315,
      "annualIncomeExcludingRent": 13255,
      "regularCommissionBonus": 500,
      "whatTypeOfBusiness": "Electrical Technical Support",
      "whatNameBusiness": "XXXXXXXXX",
      "establishedYear": "2006-04-01T00:00:00.000+01:00",
      "annualDrawing3Yrs": 100000,
      "otherSourceOfIncome": "X",
      "createdBy": "Seras Alin",
      "createdDate": "2007-07-03T10:52:27.000+01:00",
      "employerName": "My employer name",
      "sePositionHeld": "DIR",
      "occupationCategory": "SK",
      "empEmploymentSeq": 999999,
      "empAppRoleSeq": 14648851,
      "accountantAppRoleSeq": 14648851,
      "currentEmployment": "X"
    },
    {
      "areYou": "H",
      "occupation": "W045",
      "customerDescription": "XXXXXXXXX",
      "ownShareOfTheCompany": "Y",
      "owningSharesPct": "Y",
      "workFor": "S.C. Bosch S.R.L.",
      "employmentType": "2",
      "empStartDate": "10/2002",
      "empEndDate": "10/2003",
      "annualSalaryBeforeDeduction": 20315,
      "annualIncomeExcludingRent": 13255,
      "regularCommissionBonus": 500,
      "whatTypeOfBusiness": "Electrical Technical Support",
      "whatNameBusiness": "XXXXXXXXX",
      "establishedYear": "2006-04-01T00:00:00.000+01:00",
      "annualDrawing3Yrs": 100000,
      "otherSourceOfIncome": "Y",
      "createdBy": "Seras Alin",
      "createdDate": "2007-07-03T10:52:27.000+01:00",
      "employerName": "My employer name",
      "sePositionHeld": "DIR",
      "occupationCategory": "SK",
      "empEmploymentSeq": 999999,
      "empAppRoleSeq": 14648851,
      "accountantAppRoleSeq": 14648851,
      "currentEmployment": "Y"
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
  },
  {
    "descTypeValue": "W54",
    "descTypeName": "Engineer"
  },
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
export const sampleAdditionalInformation1: domains.AdditionalInformationDomain = 
{
  "applicantName": "Mr XXXXXXXXXX ABCD Fred Bloggs",
  "employerName": "AnalystXYZ",
  "addressLine1": "Pinetrees Road",
  "addressLine2": "Norwich",
  "addressLine3": "Norfolk",
  "addressLine4": "Norfolkkk",
  "postcode": "PLXYZ"
}
export const sampleBusinessDetails1: domains.BusinessDetailsDomain = 
{
  "applicantName": "Mr XXXXXXXXXX ABCD Fred Bloggs",
  "businessName": "AnalystXYZ",
  "addressLine1": "Pinetrees Road",
  "addressLine2": "Norwich",
  "addressLine3": "Norfolk",
  "addressLine4": "Norfolkkk",
  "postcode": "PLXYZ"
}
export const sampleBusinessDetailsMain1: domains.BusinessDetailsMainDomain = 
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
    "contactTitle": "BRIGADIER",
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
export const sampleBusinessFinancialDetails1: domains.BusinessFinancialDetailsDomain = 
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
export const sampleContractTypesResponse1: domains.ContractTypesResponseDomain = 
{
  "contractTypeId": 456,
  "description": "anotherString"
}
export const sampleCustomerOccupationIncomeDetails1: domains.CustomerOccupationIncomeDetailsDomain = 
[
  {
    "areYou": "E",
    "occupation": "W045",
    "customerDescription": "XXXXXXXXX",
    "ownShareOfTheCompany": "X",
    "owningSharesPct": "X",
    "workFor": "S.C. Bosch S.R.L.",
    "employmentType": "1",
    "empStartDate": "10/2002",
    "empEndDate": "10/2003",
    "annualSalaryBeforeDeduction": 20315,
    "annualIncomeExcludingRent": 13255,
    "regularCommissionBonus": 500,
    "whatTypeOfBusiness": "Electrical Technical Support",
    "whatNameBusiness": "XXXXXXXXX",
    "establishedYear": "2006-04-01T00:00:00.000+01:00",
    "annualDrawing3Yrs": 100000,
    "otherSourceOfIncome": "X",
    "createdBy": "Seras Alin",
    "createdDate": "2007-07-03T10:52:27.000+01:00",
    "employerName": "My employer name",
    "sePositionHeld": "DIR",
    "occupationCategory": "SK",
    "empEmploymentSeq": 999999,
    "empAppRoleSeq": 14648851,
    "accountantAppRoleSeq": 14648851,
    "currentEmployment": "X"
  },
  {
    "areYou": "S",
    "occupation": "W045",
    "customerDescription": "XXXXXXXXX",
    "ownShareOfTheCompany": "X",
    "owningSharesPct": "X",
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
    "otherSourceOfIncome": "X",
    "createdBy": "Seras Alin",
    "createdDate": "2007-07-03T10:52:27.000+01:00",
    "employerName": "My employer name",
    "sePositionHeld": "DIR",
    "occupationCategory": "SK",
    "empEmploymentSeq": 999999,
    "empAppRoleSeq": 14648851,
    "accountantAppRoleSeq": 14648851,
    "currentEmployment": "X"
  },
  {
    "areYou": "T",
    "occupation": "W045",
    "customerDescription": "XXXXXXXXX",
    "ownShareOfTheCompany": "Y",
    "owningSharesPct": "Y",
    "workFor": "S.C. Bosch S.R.L.",
    "employmentType": "1",
    "empStartDate": "10/2002",
    "empEndDate": "10/2003",
    "annualSalaryBeforeDeduction": 20315,
    "annualIncomeExcludingRent": 13255,
    "regularCommissionBonus": 500,
    "whatTypeOfBusiness": "Electrical Technical Support",
    "whatNameBusiness": "XXXXXXXXX",
    "establishedYear": "2006-04-01T00:00:00.000+01:00",
    "annualDrawing3Yrs": 100000,
    "otherSourceOfIncome": "Y",
    "createdBy": "Seras Alin",
    "createdDate": "2007-07-03T10:52:27.000+01:00",
    "employerName": "My employer name",
    "sePositionHeld": "DIR",
    "occupationCategory": "SK",
    "empEmploymentSeq": 999999,
    "empAppRoleSeq": 14648851,
    "accountantAppRoleSeq": 14648851,
    "currentEmployment": "Y"
  }
]
export const sampleDetailsOfNonRecurringItems1: domains.DetailsOfNonRecurringItemsDomain = 
{
  "nonRecurringItems": "Not Available"
}
export const sampleDetailsOfReevaluationOfAssets1: domains.DetailsOfReevaluationOfAssetsDomain = 
{
  "revaluationOfAssets": "Not Available"
}
export const sampleDropdowns1: domains.DropdownsDomain = 
{
  "occupationDescriptionResponse": {
    "descTypeValue": "W54",
    "descTypeName": "Engineer"
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
  "search": "Hair dresser",
  "selectedOccupationName": "anotherString",
  "searchResults": [
    {
      "descTypeValue": "W54",
      "descTypeName": "Engineer"
    },
    {
      "descTypeValue": "W54",
      "descTypeName": "Engineer"
    },
    {
      "descTypeValue": "W54",
      "descTypeName": "Engineer"
    }
  ]
}
export const sampleOccupationAndIncomeFullDomain1: domains.OccupationAndIncomeFullDomainDomain = 
{
  "mainCustomerName": "Mr XXXXXXXXXX J ABCD Fred Bloggs",
  "jointCustomerName": "Mrs XXXXXXXXXX J ABCD Fred Bloggs",
  "mainClientRef": 13606326,
  "jointClientRef": -1,
  "customerOccupationIncomeDetails": [
    {
      "areYou": "E",
      "occupation": "W045",
      "customerDescription": "XXXXXXXXX",
      "ownShareOfTheCompany": "X",
      "owningSharesPct": "X",
      "workFor": "S.C. Bosch S.R.L.",
      "employmentType": "1",
      "empStartDate": "10/2002",
      "empEndDate": "10/2003",
      "annualSalaryBeforeDeduction": 20315,
      "annualIncomeExcludingRent": 13255,
      "regularCommissionBonus": 500,
      "whatTypeOfBusiness": "Electrical Technical Support",
      "whatNameBusiness": "XXXXXXXXX",
      "establishedYear": "2006-04-01T00:00:00.000+01:00",
      "annualDrawing3Yrs": 100000,
      "otherSourceOfIncome": "X",
      "createdBy": "Seras Alin",
      "createdDate": "2007-07-03T10:52:27.000+01:00",
      "employerName": "My employer name",
      "sePositionHeld": "DIR",
      "occupationCategory": "SK",
      "empEmploymentSeq": 999999,
      "empAppRoleSeq": 14648851,
      "accountantAppRoleSeq": 14648851,
      "currentEmployment": "X"
    },
    {
      "areYou": "S",
      "occupation": "W045",
      "customerDescription": "XXXXXXXXX",
      "ownShareOfTheCompany": "X",
      "owningSharesPct": "X",
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
      "otherSourceOfIncome": "X",
      "createdBy": "Seras Alin",
      "createdDate": "2007-07-03T10:52:27.000+01:00",
      "employerName": "My employer name",
      "sePositionHeld": "DIR",
      "occupationCategory": "SK",
      "empEmploymentSeq": 999999,
      "empAppRoleSeq": 14648851,
      "accountantAppRoleSeq": 14648851,
      "currentEmployment": "X"
    },
    {
      "areYou": "T",
      "occupation": "W045",
      "customerDescription": "XXXXXXXXX",
      "ownShareOfTheCompany": "Y",
      "owningSharesPct": "Y",
      "workFor": "S.C. Bosch S.R.L.",
      "employmentType": "1",
      "empStartDate": "10/2002",
      "empEndDate": "10/2003",
      "annualSalaryBeforeDeduction": 20315,
      "annualIncomeExcludingRent": 13255,
      "regularCommissionBonus": 500,
      "whatTypeOfBusiness": "Electrical Technical Support",
      "whatNameBusiness": "XXXXXXXXX",
      "establishedYear": "2006-04-01T00:00:00.000+01:00",
      "annualDrawing3Yrs": 100000,
      "otherSourceOfIncome": "Y",
      "createdBy": "Seras Alin",
      "createdDate": "2007-07-03T10:52:27.000+01:00",
      "employerName": "My employer name",
      "sePositionHeld": "DIR",
      "occupationCategory": "SK",
      "empEmploymentSeq": 999999,
      "empAppRoleSeq": 14648851,
      "accountantAppRoleSeq": 14648851,
      "currentEmployment": "Y"
    }
  ]
}
export const sampleOccupationDescriptionResponse1: domains.OccupationDescriptionResponseDomain = 
{
  "descTypeValue": "W54",
  "descTypeName": "Engineer"
}
export const sampleOccupationsListData1: domains.OccupationsListDataDomain = 
[
  {
    "descTypeValue": "W54",
    "descTypeName": "Engineer"
  },
  {
    "descTypeValue": "W54",
    "descTypeName": "Engineer"
  },
  {
    "descTypeValue": "W54",
    "descTypeName": "Engineer"
  }
]
export const sampleOneOccupationIncomeDetails1: domains.OneOccupationIncomeDetailsDomain = 
{
  "areYou": "E",
  "occupation": "W045",
  "customerDescription": "XXXXXXXXX",
  "ownShareOfTheCompany": "X",
  "owningSharesPct": "X",
  "workFor": "S.C. Bosch S.R.L.",
  "employmentType": "1",
  "empStartDate": "10/2002",
  "empEndDate": "10/2003",
  "annualSalaryBeforeDeduction": 20315,
  "annualIncomeExcludingRent": 13255,
  "regularCommissionBonus": 500,
  "whatTypeOfBusiness": "Electrical Technical Support",
  "whatNameBusiness": "XXXXXXXXX",
  "establishedYear": "2006-04-01T00:00:00.000+01:00",
  "annualDrawing3Yrs": 100000,
  "otherSourceOfIncome": "X",
  "createdBy": "Seras Alin",
  "createdDate": "2007-07-03T10:52:27.000+01:00",
  "employerName": "My employer name",
  "sePositionHeld": "DIR",
  "occupationCategory": "SK",
  "empEmploymentSeq": 999999,
  "empAppRoleSeq": 14648851,
  "accountantAppRoleSeq": 14648851,
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
export const sampleAdditionalInformation2: domains.AdditionalInformationDomain = 
{
  "applicantName": "Mr XXXXXXXXXX ABCD Fred Bloggs",
  "employerName": "AnalystXYZ",
  "addressLine1": "Pinetrees Road",
  "addressLine2": "Norwich",
  "addressLine3": "Norfolk",
  "addressLine4": "Norfolkkk",
  "postcode": "PLXYZ"
}
export const sampleBusinessDetails2: domains.BusinessDetailsDomain = 
{
  "applicantName": "Mr XXXXXXXXXX ABCD Fred Bloggs",
  "businessName": "AnalystXYZ",
  "addressLine1": "Pinetrees Road",
  "addressLine2": "Norwich",
  "addressLine3": "Norfolk",
  "addressLine4": "Norfolkkk",
  "postcode": "PLXYZ"
}
export const sampleBusinessDetailsMain2: domains.BusinessDetailsMainDomain = 
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
    "contactTitle": "CAPTAIN",
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
export const sampleBusinessFinancialDetails2: domains.BusinessFinancialDetailsDomain = 
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
export const sampleContractTypesResponse2: domains.ContractTypesResponseDomain = 
{
  "contractTypeId": 123,
  "description": "someString"
}
export const sampleCustomerOccupationIncomeDetails2: domains.CustomerOccupationIncomeDetailsDomain = 
[
  {
    "areYou": "H",
    "occupation": "W045",
    "customerDescription": "XXXXXXXXX",
    "ownShareOfTheCompany": "Y",
    "owningSharesPct": "Y",
    "workFor": "S.C. Bosch S.R.L.",
    "employmentType": "2",
    "empStartDate": "10/2002",
    "empEndDate": "10/2003",
    "annualSalaryBeforeDeduction": 20315,
    "annualIncomeExcludingRent": 13255,
    "regularCommissionBonus": 500,
    "whatTypeOfBusiness": "Electrical Technical Support",
    "whatNameBusiness": "XXXXXXXXX",
    "establishedYear": "2006-04-01T00:00:00.000+01:00",
    "annualDrawing3Yrs": 100000,
    "otherSourceOfIncome": "Y",
    "createdBy": "Seras Alin",
    "createdDate": "2007-07-03T10:52:27.000+01:00",
    "employerName": "My employer name",
    "sePositionHeld": "DIR",
    "occupationCategory": "SK",
    "empEmploymentSeq": 999999,
    "empAppRoleSeq": 14648851,
    "accountantAppRoleSeq": 14648851,
    "currentEmployment": "Y"
  },
  {
    "areYou": "X",
    "occupation": "W045",
    "customerDescription": "XXXXXXXXX",
    "ownShareOfTheCompany": "X",
    "owningSharesPct": "X",
    "workFor": "S.C. Bosch S.R.L.",
    "employmentType": "3",
    "empStartDate": "10/2002",
    "empEndDate": "10/2003",
    "annualSalaryBeforeDeduction": 20315,
    "annualIncomeExcludingRent": 13255,
    "regularCommissionBonus": 500,
    "whatTypeOfBusiness": "Electrical Technical Support",
    "whatNameBusiness": "XXXXXXXXX",
    "establishedYear": "2006-04-01T00:00:00.000+01:00",
    "annualDrawing3Yrs": 100000,
    "otherSourceOfIncome": "X",
    "createdBy": "Seras Alin",
    "createdDate": "2007-07-03T10:52:27.000+01:00",
    "employerName": "My employer name",
    "sePositionHeld": "DIR",
    "occupationCategory": "SK",
    "empEmploymentSeq": 999999,
    "empAppRoleSeq": 14648851,
    "accountantAppRoleSeq": 14648851,
    "currentEmployment": "X"
  },
  {
    "areYou": "C",
    "occupation": "W045",
    "customerDescription": "XXXXXXXXX",
    "ownShareOfTheCompany": "Y",
    "owningSharesPct": "Y",
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
    "otherSourceOfIncome": "Y",
    "createdBy": "Seras Alin",
    "createdDate": "2007-07-03T10:52:27.000+01:00",
    "employerName": "My employer name",
    "sePositionHeld": "DIR",
    "occupationCategory": "SK",
    "empEmploymentSeq": 999999,
    "empAppRoleSeq": 14648851,
    "accountantAppRoleSeq": 14648851,
    "currentEmployment": "Y"
  }
]
export const sampleDetailsOfNonRecurringItems2: domains.DetailsOfNonRecurringItemsDomain = 
{
  "nonRecurringItems": "Not Available"
}
export const sampleDetailsOfReevaluationOfAssets2: domains.DetailsOfReevaluationOfAssetsDomain = 
{
  "revaluationOfAssets": "Not Available"
}
export const sampleDropdowns2: domains.DropdownsDomain = 
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
  "search": "Hair dresser",
  "selectedOccupationName": "someString",
  "searchResults": [
    {
      "descTypeValue": "W54",
      "descTypeName": "Engineer"
    },
    {
      "descTypeValue": "W54",
      "descTypeName": "Engineer"
    },
    {
      "descTypeValue": "W54",
      "descTypeName": "Engineer"
    }
  ]
}
export const sampleOccupationAndIncomeFullDomain2: domains.OccupationAndIncomeFullDomainDomain = 
{
  "mainCustomerName": "Mr XXXXXXXXXX J ABCD Fred Bloggs",
  "jointCustomerName": "Mrs XXXXXXXXXX J ABCD Fred Bloggs",
  "mainClientRef": 13606326,
  "jointClientRef": -1,
  "customerOccupationIncomeDetails": [
    {
      "areYou": "H",
      "occupation": "W045",
      "customerDescription": "XXXXXXXXX",
      "ownShareOfTheCompany": "Y",
      "owningSharesPct": "Y",
      "workFor": "S.C. Bosch S.R.L.",
      "employmentType": "2",
      "empStartDate": "10/2002",
      "empEndDate": "10/2003",
      "annualSalaryBeforeDeduction": 20315,
      "annualIncomeExcludingRent": 13255,
      "regularCommissionBonus": 500,
      "whatTypeOfBusiness": "Electrical Technical Support",
      "whatNameBusiness": "XXXXXXXXX",
      "establishedYear": "2006-04-01T00:00:00.000+01:00",
      "annualDrawing3Yrs": 100000,
      "otherSourceOfIncome": "Y",
      "createdBy": "Seras Alin",
      "createdDate": "2007-07-03T10:52:27.000+01:00",
      "employerName": "My employer name",
      "sePositionHeld": "DIR",
      "occupationCategory": "SK",
      "empEmploymentSeq": 999999,
      "empAppRoleSeq": 14648851,
      "accountantAppRoleSeq": 14648851,
      "currentEmployment": "Y"
    },
    {
      "areYou": "X",
      "occupation": "W045",
      "customerDescription": "XXXXXXXXX",
      "ownShareOfTheCompany": "X",
      "owningSharesPct": "X",
      "workFor": "S.C. Bosch S.R.L.",
      "employmentType": "3",
      "empStartDate": "10/2002",
      "empEndDate": "10/2003",
      "annualSalaryBeforeDeduction": 20315,
      "annualIncomeExcludingRent": 13255,
      "regularCommissionBonus": 500,
      "whatTypeOfBusiness": "Electrical Technical Support",
      "whatNameBusiness": "XXXXXXXXX",
      "establishedYear": "2006-04-01T00:00:00.000+01:00",
      "annualDrawing3Yrs": 100000,
      "otherSourceOfIncome": "X",
      "createdBy": "Seras Alin",
      "createdDate": "2007-07-03T10:52:27.000+01:00",
      "employerName": "My employer name",
      "sePositionHeld": "DIR",
      "occupationCategory": "SK",
      "empEmploymentSeq": 999999,
      "empAppRoleSeq": 14648851,
      "accountantAppRoleSeq": 14648851,
      "currentEmployment": "X"
    },
    {
      "areYou": "C",
      "occupation": "W045",
      "customerDescription": "XXXXXXXXX",
      "ownShareOfTheCompany": "Y",
      "owningSharesPct": "Y",
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
      "otherSourceOfIncome": "Y",
      "createdBy": "Seras Alin",
      "createdDate": "2007-07-03T10:52:27.000+01:00",
      "employerName": "My employer name",
      "sePositionHeld": "DIR",
      "occupationCategory": "SK",
      "empEmploymentSeq": 999999,
      "empAppRoleSeq": 14648851,
      "accountantAppRoleSeq": 14648851,
      "currentEmployment": "Y"
    }
  ]
}
export const sampleOccupationDescriptionResponse2: domains.OccupationDescriptionResponseDomain = 
{
  "descTypeValue": "W54",
  "descTypeName": "Engineer"
}
export const sampleOccupationsListData2: domains.OccupationsListDataDomain = 
[
  {
    "descTypeValue": "W54",
    "descTypeName": "Engineer"
  },
  {
    "descTypeValue": "W54",
    "descTypeName": "Engineer"
  },
  {
    "descTypeValue": "W54",
    "descTypeName": "Engineer"
  }
]
export const sampleOneOccupationIncomeDetails2: domains.OneOccupationIncomeDetailsDomain = 
{
  "areYou": "H",
  "occupation": "W045",
  "customerDescription": "XXXXXXXXX",
  "ownShareOfTheCompany": "Y",
  "owningSharesPct": "Y",
  "workFor": "S.C. Bosch S.R.L.",
  "employmentType": "2",
  "empStartDate": "10/2002",
  "empEndDate": "10/2003",
  "annualSalaryBeforeDeduction": 20315,
  "annualIncomeExcludingRent": 13255,
  "regularCommissionBonus": 500,
  "whatTypeOfBusiness": "Electrical Technical Support",
  "whatNameBusiness": "XXXXXXXXX",
  "establishedYear": "2006-04-01T00:00:00.000+01:00",
  "annualDrawing3Yrs": 100000,
  "otherSourceOfIncome": "Y",
  "createdBy": "Seras Alin",
  "createdDate": "2007-07-03T10:52:27.000+01:00",
  "employerName": "My employer name",
  "sePositionHeld": "DIR",
  "occupationCategory": "SK",
  "empEmploymentSeq": 999999,
  "empAppRoleSeq": 14648851,
  "accountantAppRoleSeq": 14648851,
  "currentEmployment": "Y"
}
export const sampleOtherIncomeResponse2: domains.OtherIncomeResponseDomain = 
{
  "clientOtherIncomeSeq": "someString",
  "otherIncomeType": "someString",
  "incomeFreqRef": "2",
  "amount": 123
}