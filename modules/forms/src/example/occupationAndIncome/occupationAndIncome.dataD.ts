import {
  commonParams,
  commonParamsWithLabel,
  DateDD,
  DisplayCompD,
  IntegerDD, LabelAndDropDownCD, LayoutCd,
  OneLineStringDD,
  StringDD,
  StringPrimitiveDD,
  TableCD,
} from "@focuson/forms";

import { additionalInformationDD } from "./additionalInformation/additionalInformation.dataD";
import { businessDetailsMainDD } from "./businessDetails/businessDetails.dataD";
import { frequencyDD, otherSourcesOfIncomeDataDD } from "./otherSourcesOfIncome/otherSourcesOfIncome.dataD";
import { occupationAndIncomeSample } from "./occupationAndIncome.sample";
import {postCodeDataLineD, postCodeSearchResponse} from "../addressSearch/addressSearch.dataD";
import {CustomerStatus, EmploymentType, YesNo} from "@focuson/form_components";
import {ExampleDataD, ExampleRepeatingD} from "../common";

const labelAndDropdownContainerStyle = {
  display: 'flex',
  margin: '5px'
}

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
  import: '../formComponents/table',
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
  layout: { component: LayoutCd,
    displayParams: {
      details:  '[[30]]' ,
      title:  ['Current employment details - '] ,
    } },
  guards: {
    areYou: { condition: 'in', path: [ 'areYou' ], values: customerStatusDD.enum },
    ownShareOfTheCompany: { condition: 'in', path: [ 'ownShareOfTheCompany' ], values: yesNoDD.enum },
    owningSharesPct: { condition: 'in', path: [ 'owningSharesPct' ], values: yesNoDD.enum },
    employmentType: { condition: 'in', path: [ 'employmentType' ], values: employmentTypeDD.enum },
    otherSourceOfIncome: { condition: 'in', path: [ 'otherSourceOfIncome' ], values: yesNoDD.enum },
  },
  structure: {
    areYou: { dataDD: customerStatusDD, displayParams: { label: "Are {~/mainOrJoint|you|they}... " } },
    occupation: { dataDD: StringDD, displayParams: { label: "What is {~/mainOrJoint|your|their} occupation? ", buttons: ['list'] }, guard: { areYou: [ 'E', 'S' ] }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails[0].occupation ]  },
    customerDescription: { dataDD: StringDD, displayParams: { label: "Customers description: " }, guard: { areYou: [ 'E', 'S' ] }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails[0].customerDescription ] },

    // TODO This needs to be displayed if regulatoryReport is Y
    // applicantEmploymentSector: { dataDD: StringDD, displayParams: { label: "Applicant employment sector: " }, guard: { areYou: [ 'E', 'S' ] } },

    ownShareOfTheCompany: { dataDD: yesNoDD, displayParams: { label: "Do {~/mainOrJoint|you|they} own a share of the company? " }, guard: { areYou: [ 'E' ] } },
    owningSharesPct: { dataDD: yesNoDD, displayParams: { label: "Is this 20% or more of it? " }, guard: { areYou: [ 'E' ], ownShareOfTheCompany: [ 'Y' ] } },

    workFor: { dataDD: StringDD, displayParams: { label: "Who do {~/mainOrJoint|you|they} work for? " }, guard: { areYou: [ 'E' ], owningSharesPct: [ 'N' ] }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails[0].workFor ] },
    employmentType: { dataDD: employmentTypeDD, displayParams: { label: "Is this employment... " }, guard: { areYou: [ 'E' ], owningSharesPct: [ 'N' ] }, sample:  [ occupationAndIncomeSample.customerOccupationIncomeDetails[0].employmentType ] },
    empStartDate: { dataDD: DateDD, displayParams: { label: "When did this employment start? (mm/yyyy) " }, guard: { areYou: [ 'E' ], employmentType: [ '1' ] }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails[0].empStartDate ] },
    empEndDate: { dataDD: DateDD, displayParams: { label: "When will it finish? (mm/yyyy) " }, guard: { areYou: [ 'E' ], employmentType: [ '2', '3' ] }, sample: [occupationAndIncomeSample.customerOccupationIncomeDetails[0].empEndDate] },
    // @ts-ignore
    annualSalaryBeforeDeduction: { dataDD: IntegerDD, displayParams: { label: "What is {~/mainOrJoint|your|their} annual salary? (before deductions) " }, guard: { areYou: [ 'E' ], owningSharesPct: [ 'N' ] }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails[0].annualSalaryBeforeDeduction ] },
    // @ts-ignore
    annualIncomeExcludingRent: { dataDD: IntegerDD, displayParams: { label: "Do {~/mainOrJoint|you|they} have any other guaranteed annual income? (excluding rent) " }, guard: { areYou: [ 'E' ], owningSharesPct: [ 'N' ] }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails[0].annualIncomeExcludingRent ] },
    // @ts-ignore
    regularCommissionBonus: { dataDD: IntegerDD, displayParams: { label: "Do {~/mainOrJoint|you|they} have any regular commission, bonus or overtime? " }, guard: { areYou: [ 'E' ], owningSharesPct: [ 'N' ] }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails[0].regularCommissionBonus ] },

    whatTypeOfBusiness: { dataDD: StringDD, displayParams: { label: "What type of business is it? " }, guard: { areYou: [ 'E', 'S' ], owningSharesPct: [ 'Y' ] }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails[0].whatTypeOfBusiness ] },
    whatNameBusiness: { dataDD: StringDD, displayParams: { label: "What is its name: " }, guard: { areYou: [ 'E', 'S' ], owningSharesPct: [ 'Y' ] }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails[0].whatNameBusiness ] },
    establishedYear: { dataDD: StringDD, displayParams: { label: "When was it established? (MM/YYYY) " }, guard: { areYou: [ 'E', 'S' ], owningSharesPct: [ 'Y' ] }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails[0].establishedYear ] },
    // @ts-ignore
    annualDrawing3Yrs: { dataDD: IntegerDD, displayParams: { label: "What are {~/mainOrJoint|your|their} average annual drawings over the past 3 years? " }, guard: { areYou: [ 'E', 'S' ], owningSharesPct: [ 'Y' ] }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails[0].annualDrawing3Yrs ] },

    // TODO This needs to be displayed if regulatoryReport is Y
    // netMonthlyIncome: { dataDD: StringDD, displayParams: { label: "What is your net monthly income: " }, guard: { areYou: [ 'E', 'S' ] } },

    otherSourceOfIncome: { dataDD: yesNoDD, displayParams: { label: "Do {~/mainOrJoint|you|they} have another sources of income (e.g. rental income) ? ", buttons: ['otherSourcesOfIncome'] }, },

    createdBy: { dataDD: StringDD, displayParams: { label: "Entry created by: " }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails[0].createdBy ] },
    createdDate: { dataDD: DateDD, displayParams: { label: "on " }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails[0].createdDate ] },

    employerName: { dataDD: StringDD, hidden: true, sample: [occupationAndIncomeSample.customerOccupationIncomeDetails[0].employerName] },
    sePositionHeld: { dataDD: StringDD, hidden: true, sample: [occupationAndIncomeSample.customerOccupationIncomeDetails[0].sePositionHeld] },
    occupationCategory: { dataDD: StringDD, hidden: true, sample: [occupationAndIncomeSample.customerOccupationIncomeDetails[0].occupationCategory] },
    // @ts-ignore
    empEmploymentSeq: { dataDD: IntegerDD, hidden: true, sample: [occupationAndIncomeSample.customerOccupationIncomeDetails[0].empEmploymentSeq] },
    // @ts-ignore
    empAppRoleSeq: { dataDD: IntegerDD, hidden: true, sample: [occupationAndIncomeSample.customerOccupationIncomeDetails[0].accountantAppRoleSeq] },
    // @ts-ignore
    accountantAppRoleSeq: { dataDD: IntegerDD, hidden: true, sample: [occupationAndIncomeSample.customerOccupationIncomeDetails[0].accountantAppRoleSeq] },
    currentEmployment: { dataDD: yesNoDD, hidden: true, sample: [occupationAndIncomeSample.customerOccupationIncomeDetails[0].currentEmployment] },
  }
}

export const customerOccupationIncomeDetailsDD: ExampleRepeatingD = {
  paged: false,
  display: SelectedItemCD,
  name: "CustomerOccupationIncomeDetails",
  description: "This is a summary customer occupations data",
  displayParams: { index: [ 'selectedItem' ] , display: oneOccupationIncomeDetailsDD.name  },
  dataDD: oneOccupationIncomeDetailsDD
}

// @ts-ignore
export const occupationAndIncomeFullDomainDD: ExampleDataD = {
  name: 'OccupationAndIncomeFullDomain',
  description: 'This is a summary about occupation and income details data',

  structure: {
    mainCustomerName: { dataDD: StringDD, sample: [ occupationAndIncomeSample.mainCustomerName ] },
    jointCustomerName: { dataDD: StringDD, sample: [ occupationAndIncomeSample.jointCustomerName ] },
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
    descTypeValue: { dataDD: StringDD, hidden: true, sample: ['W54'] },
    descTypeName: { dataDD: StringDD, sample: ['Engineer'] },
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
  import: '../formComponents/listItems',
  name: "ListItemsCD",
  params: {
    ...commonParams,
  }
}
// export const occupationsListDD: ExampleRepeatingDataD = {
//   paged: false,
//   display: TableCD,
//   name: "OccupationsList",
//   displayParams: { order: { value: [ 'descTypeName' ] } },
//   description: "This is a list of all the occupations",
//   dataDD: occupationDescriptionResponseDD
// }
// export const SearchListCD: DisplayCompD = {
//   import: '../formComponents/SearchListItems',
//   name: "SearchListItemsCD",
//   params: {
//     ...commonParams,
//     title: { paramType: 'string', needed: 'yes' },
//     children: { paramType: 'object', needed: 'no' }
//   }
// }
export const occupationSearchResponse: ExampleRepeatingD = {
  name: "OccupationsListData",
  description: "The list of occupations",
  dataDD: occupationDescriptionResponseDD,
  paged: false,
  display: TableCD,
  displayParams: {
    order: [ 'descTypeName' ] ,
    copySelectedItemTo:  [ '{basePage}','fromApi', 'customerOccupationIncomeDetails', '{selectedItem}', 'occupation' ]
  }
}

export const listOccupationsDD: ExampleDataD = {
  name: "ListOccupations",
  description: "The search for occupation in the big list of occupations: type occupation get results ",
  structure: {
    search: { dataDD: OneLineStringDD, sample: [ 'Hair dresser' ] },
    selectedOccupationName: { dataDD: StringDD, hidden: true },
    searchResults: { dataDD: occupationSearchResponse },
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
    occupation: { dataDD: listOccupationsDD }
  }
}
/* ---------------- OCCUPATION AND INCOME SUMMARY END ---------------- */
