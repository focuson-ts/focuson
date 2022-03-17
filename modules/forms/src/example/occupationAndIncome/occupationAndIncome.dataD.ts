

import { additionalInformationDD } from "./additionalInformation/additionalInformation.dataD";
import { businessDetailsMainDD } from "./businessDetails/businessDetails.dataD";
import { otherSourcesOfIncomeDataDD } from "./otherSourcesOfIncome/otherSourcesOfIncome.dataD";
import { ExampleDataD, ExampleRepeatingD } from "../common";
import { occupationAndIncomeSample } from "./occupationAndIncome.sample";
import { commonParams, DisplayCompD, LabelAndDropDownCD, TableCD } from "../../common/componentsD";
import { CustomerStatus, EmploymentType, YesNo } from "../commonEnums";
import { DateDD, IntegerDD, OneLineStringDD, StringDD, StringPrimitiveDD } from "../../common/dataD";


/* ---------------- OCCUPATION AND INCOME DETAILS START ---------------- */
export const yesNoDD: StringPrimitiveDD = {
  ...OneLineStringDD,
  name: 'YesNo',
  description: "yes/no enum",
  display: LabelAndDropDownCD,
  enum: YesNo
}
export const customerStatusDD: StringPrimitiveDD = {
  ...OneLineStringDD,
  name: 'CustomerStatus',
  description: "Customer status enum",
  display: LabelAndDropDownCD,
  enum: CustomerStatus,
}

export const employmentTypeDD: StringPrimitiveDD = {
  ...OneLineStringDD,
  name: 'EmploymentType',
  description: "Employment contract type",
  display: LabelAndDropDownCD,
  enum: EmploymentType
}

export const SelectedItemCD: DisplayCompD = {
  import: '../copied/table',
  name: "SelectedItem",
  params: {
    ...commonParams,
    index: { paramType: 'pageStateValue', needed: 'yes' },
    display: { paramType: 'object', needed: 'yes' },
    buttons: { paramType: 'object', needed: 'defaultToButtons' }
  }
}

export const oneOccupationIncomeDetailsDD: ExampleDataD = {
  name: "OneOccupationIncomeDetails",
  description: "This is a summary about occupation income details data of a single occupation",
  guards: {
    areYou: { condition: 'in', path: [ 'areYou' ], values: customerStatusDD.enum },
    ownShareOfTheCompany: { condition: 'in', path: [ 'ownShareOfTheCompany' ], values: yesNoDD.enum },
    owningSharesPct: { condition: 'in', path: [ 'owningSharesPct' ], values: yesNoDD.enum },
    employmentType: { condition: 'in', path: [ 'employmentType' ], values: employmentTypeDD.enum },
    otherSourceOfIncome: { condition: 'in', path: [ 'otherSourceOfIncome' ], values: yesNoDD.enum },
  },
  structure: {
    areYou: { dataDD: customerStatusDD, displayParams: { label: "Are you... " } },
    occupation: { dataDD: StringDD, displayParams: { label: "What is your occupation? ", button: 'list' }, guard: { areYou: [ 'E', 'S' ] } },
    customerDescription: { dataDD: StringDD, displayParams: { label: "Customers description: " }, guard: { areYou: [ 'E', 'S' ] } },
    ownShareOfTheCompany: { dataDD: yesNoDD, displayParams: { label: "Do you own a share of the company? " }, guard: { areYou: [ 'E' ] } },
    owningSharesPct: { dataDD: yesNoDD, displayParams: { label: "Is this 20% or more of it? " }, guard: { areYou: [ 'E' ], ownShareOfTheCompany: [ 'Y' ] } },

    // TODO This needs to be displayed if regulatoryReport is Y
    // applicantEmploymentSector: { dataDD: StringDD, displayParams: { label: "Applicant employment sector: " }, guard: { areYou: [ 'E', 'S' ] } },

    workFor: { dataDD: StringDD, displayParams: { label: "Who do you work for? " }, guard: { areYou: [ 'E' ], } },
    annualSalaryBeforeDeduction: { dataDD: IntegerDD, displayParams: { label: "What is your annual salary? (before deductions) " }, guard: { areYou: [ 'E' ], owningSharesPct: [ 'N' ] } },
    annualIncomeExcludingRent: { dataDD: IntegerDD, displayParams: { label: "Do you have any other guaranteed annual income? (excluding rent) " }, guard: { areYou: [ 'E' ], owningSharesPct: [ 'N' ] } },
    regularCommissionBonus: { dataDD: IntegerDD, displayParams: { label: "Do you have any regular commission, bonus or overtime? " }, guard: { areYou: [ 'E' ], owningSharesPct: [ 'N' ] } },

    whatTypeOfBusiness: { dataDD: StringDD, displayParams: { label: "What type of business is it? " }, guard: { areYou: [ 'E', 'S' ], owningSharesPct: [ 'Y' ] } },
    whatNameBusiness: { dataDD: StringDD, displayParams: { label: "What is its name: " }, guard: { areYou: [ 'E', 'S' ], owningSharesPct: [ 'Y' ] } },
    establishedYear: { dataDD: StringDD, displayParams: { label: "When was it established? (MM/YYYY) " }, guard: { areYou: [ 'E', 'S' ], owningSharesPct: [ 'Y' ] } },
    annualDrawing3Yrs: { dataDD: IntegerDD, displayParams: { label: "What are your average annual drawings over the past 3 years? " }, guard: { areYou: [ 'E', 'S' ], owningSharesPct: [ 'Y' ] } },

    employmentType: { dataDD: employmentTypeDD, displayParams: { label: "Is this employment... " }, guard: { areYou: [ 'E' ], owningSharesPct: [ 'N' ] } },

    empStartDate: { dataDD: DateDD, displayParams: { label: "When did the contract start? (mm/yyyy) " }, guard: { areYou: [ 'E' ], employmentType: [ '1' ] } },
    empEndDate: { dataDD: DateDD, displayParams: { label: "When will it finish? (mm/yyyy) " }, guard: { areYou: [ 'E' ], employmentType: [ '2', '3' ] } },
    dateOfEmploymentStart: { dataDD: StringDD, displayParams: { label: "When did this employment start? (mm/yyyy) " }, guard: { areYou: [ 'E' ], employmentType: [ '2', '3' ], owningSharesPct: [ 'N' ] } },

    // TODO This needs to be displayed if regulatoryReport is Y
    // netMonthlyIncome: { dataDD: StringDD, displayParams: { label: "What is your net monthly income: " }, guard: { areYou: [ 'E', 'S' ] } },

    otherSourceOfIncome: { dataDD: yesNoDD, displayParams: { label: "Do you have another sources of income (e.g. rental income) ? ", button: 'otherSourcesOfIncome' }, },

    createdBy: { dataDD: StringDD, displayParams: { label: "Entry created by: " }, hidden: true },
    createdDate: { dataDD: DateDD, displayParams: { label: "on " }, hidden: true },

    employerName: { dataDD: StringDD, hidden: true },
    sePositionHeld: { dataDD: StringDD, hidden: true },
    occupationCategory: { dataDD: StringDD, hidden: true },
    empEmploymentSeq: { dataDD: IntegerDD, hidden: true },
    empAppRoleSeq: { dataDD: IntegerDD, hidden: true },
    accountantAppRoleSeq: { dataDD: IntegerDD, hidden: true },
    currentEmployment: { dataDD: yesNoDD, hidden: true },
  }
}

export const customerOccupationIncomeDetailsDD: ExampleRepeatingD = {
  paged: false,
  display: SelectedItemCD,
  name: "CustomerOccupationIncomeDetails",
  description: "This is a summary customer occupations data",
  displayParams: { index: [ 'selectedItem' ] , display: oneOccupationIncomeDetailsDD.name },
  dataDD: oneOccupationIncomeDetailsDD
}

// @ts-ignore
export const occupationAndIncomeFullDomainDD: ExampleDataD = {
  name: 'OccupationAndIncomeFullDomain',
  description: 'This is a summary about occupation and income details data',
  structure: {
    mainCustomerName: { dataDD: StringDD, sample: [ occupationAndIncomeSample.mainCustomerName ] },
    jointCustomerName: { dataDD: StringDD, sample: [ occupationAndIncomeSample.jointCustomerName ], hidden: true  },
    // @ts-ignore
    mainClientRef: { dataDD: IntegerDD, hidden: true, sample: [ occupationAndIncomeSample.mainClientRef ] },
    // @ts-ignore
    jointClientRef: { dataDD: IntegerDD, hidden: true, sample: [ occupationAndIncomeSample.jointClientRef ] },
    customerOccupationIncomeDetails: { dataDD: customerOccupationIncomeDetailsDD }
  }
}
/* ---------------- OCCUPATION AND INCOME DETAILS END ---------------- */

/* ---------------- DROPDOWNS START ---------------- */
export const occupationDescriptionResponseDD: ExampleDataD = {
  name: 'OccupationDescriptionResponse',
  description: 'This is a summary about occupation description dropdown',
  structure: {
    descTypeValue: { dataDD: StringDD, hidden: true },
    descTypeName: { dataDD: StringDD, hidden: true },
  }
}
export const employmentStatusDD: ExampleDataD = {
  name: 'EmploymentStatus',
  description: 'This is a summary about employment status',
  structure: {
    employmentName: { dataDD: StringDD, hidden: true },
    employmentValue: { dataDD: StringDD, hidden: true },
  }
}
export const contractTypesResponseDD: ExampleDataD = {
  name: 'ContractTypesResponse',
  description: 'This is a summary about contract types',
  structure: {
    contractTypeId: { dataDD: IntegerDD, hidden: true },
    description: { dataDD: StringDD, hidden: true }
  }
}
export const frequenciesResponseDD: ExampleDataD = {
  name: 'FrequenciesResponse',
  description: 'This is a summary about frequencies',
  structure: {
    frequencyId: { dataDD: IntegerDD, hidden: true },
    frequencyDescription: { dataDD: StringDD, hidden: true },
    annualMultiple: { dataDD: IntegerDD, hidden: true }
  }
}
export const dropdownsDD: ExampleDataD = {
  name: 'Dropdowns',
  description: 'This is a summary about dropdown values',
  structure: {
    occupationDescriptionResponse: { dataDD: occupationDescriptionResponseDD },
    employmentStatus: { dataDD: employmentStatusDD },
    contractTypesResponse: { dataDD: contractTypesResponseDD },
    frequenciesResponse: { dataDD: frequenciesResponseDD }
  }
}
/* ---------------- DROPDOWNS END ---------------- */

/* ---------------- OCCUPATIONS LIST START ---------------- */
export const ListItemsCD: DisplayCompD = {
  import: '../copied/listItems',
  name: "ListItemsCD",
  params: {
    ...commonParams,
  }
}
export const occupationsListDD: ExampleRepeatingD = {
  paged: false,
  display: TableCD,
  name: "OccupationsList",
  displayParams: { order: [ 'descTypeName' ] },
  description: "This is a list of all the occupations",
  dataDD: occupationDescriptionResponseDD
}
export const SearchListCD: DisplayCompD = {
  import: '../copied/SearchListItems',
  name: "SearchListItemsCD",
  params: { ...commonParams,
    title: { paramType: 'string', needed: 'yes' },
    children: { paramType: 'object', needed: 'no' }
  }
}
export const listOccupationsDD: ExampleDataD = {
  name: "ListOccupations",
  description: "This is the search occupation popup",
  display: SearchListCD,
  // displayParams: { children: { value: occupationsListDD.name }, title: { value: 'Search for occupations' } },
  displayParams: { title: 'Search for occupations' },
  structure: {
    occupationsList: { dataDD: occupationsListDD }
  },
}
/* ---------------- OCCUPATIONS LIST END ---------------- */

/* ---------------- OCCUPATION AND INCOME SUMMARY START ---------------- */
export const occupationAndIncomeSummaryDD: ExampleDataD = {
  name: "OccupationAndIncomeSummary",
  description: "This is the summary data about all the occupation and income details for a single user",
  structure: {
    occupationAndIncomeDetails: { dataDD: occupationAndIncomeFullDomainDD },
    additionalInformation: { dataDD: additionalInformationDD },
    businessDetails: { dataDD: businessDetailsMainDD },
    otherSourcesOfIncome: { dataDD: otherSourcesOfIncomeDataDD },
    dropdowns: { dataDD: dropdownsDD },
    searchList: { dataDD: listOccupationsDD }
  }
}
/* ---------------- OCCUPATION AND INCOME SUMMARY END ---------------- */
