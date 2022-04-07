import { additionalInfoFirstSample, additionalInfoSecondSample, occupationAndIncomeSample } from "./singleOccupation.sample";

import { ExampleDataD, ExampleRepeatingD } from "../common";
import { CustomerStatus, EmploymentType, HowOften, YesNo } from "../commonEnums";
import { DateDD, IntegerDD, OneLineStringDD, StringDD, StringPrimitiveDD } from "../../common/dataD";
import { LabelAndDropDownCD, LayoutCd, TableCD } from "../../common/componentsD";

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
export const frequencyDD: StringPrimitiveDD = {
    ...OneLineStringDD,
    sample: [ 'Annual', 'Monthly' ],
    name: 'Frequency',
    description: "Income frequency",
    display: LabelAndDropDownCD,
    enum: HowOften
}
export const employmentTypeDD: StringPrimitiveDD = {
    ...OneLineStringDD,
    name: 'EmploymentType',
    description: "Employment contract type",
    display: LabelAndDropDownCD,
    enum: EmploymentType
}

/* ---------------- OTHER SOURCES OF INCOME DD START ---------------- */
export const otherIncomeResponseDD: ExampleDataD = {
    name: "OtherIncomeResponse",
    description: "This is a summary about other income data of a single record",
    structure: {
        clientOtherIncomeSeq: { dataDD: StringDD, sample: ['1', '2', '3'] },
        otherIncomeType: { dataDD: StringDD, sample: [''] },
        incomeFreqRef: { dataDD: frequencyDD, sample: [''] },
        amount: { dataDD: IntegerDD }
    }
}
export const otherSourcesOfIncomeDataDD: ExampleRepeatingD = {
    paged: false,
    display: TableCD,
    name: "OtherIncomeData",
    description: "This is a summary about other income data",
    displayParams: { order: [ 'otherIncomeType', 'incomeFreqRef', 'amount' ]  },
    dataDD: otherIncomeResponseDD,
    sampleCount: 3
}
/* ---------------- OTHER SOURCES OF INCOME DD END ---------------- */

/* ---------------- ADDITIONAL INFO SECOND DD START ---------------- */
export const businessDetailsDD: ExampleDataD = {
    name: 'BusinessDetails',
    description: 'This is a summary about business details data',
    structure: {
        applicantName: { dataDD: StringDD, sample: [additionalInfoSecondSample.businessDetails.applicantName] },
        businessName: { dataDD: StringDD, sample: [additionalInfoSecondSample.businessDetails.businessName] },
        addressLine1: { dataDD: OneLineStringDD, sample: [additionalInfoSecondSample.businessDetails.addressLine1] },
        addressLine2: { dataDD: OneLineStringDD, sample: [additionalInfoSecondSample.businessDetails.addressLine2] },
        addressLine3: { dataDD: OneLineStringDD, sample: [additionalInfoSecondSample.businessDetails.addressLine3] },
        addressLine4: { dataDD: OneLineStringDD, sample: [additionalInfoSecondSample.businessDetails.addressLine4] },
        postcode: { dataDD: StringDD, sample: [additionalInfoSecondSample.businessDetails.postcode] }
    }
}
export const additionalInfoSecondDD: ExampleDataD = {
    name: 'AdditionalInfoSecond',
    description: 'This is a summary about business details information data',
    structure: {
        turnoverLastYear: { dataDD: StringDD, sample: [additionalInfoSecondSample.businessFinancialDetails.turnoverLastYear] },
        turnoverPenultimateYear: { dataDD: StringDD, sample: [additionalInfoSecondSample.businessFinancialDetails.turnoverPenultimateYear] },
        netProfitLastYear: { dataDD: StringDD, sample: [additionalInfoSecondSample.businessFinancialDetails.netProfitLastYear] },
        netProfitPenultimateYear: { dataDD: StringDD, sample: [additionalInfoSecondSample.businessFinancialDetails.netProfitPenultimateYear] },
        drawingsLastYear: { dataDD: StringDD, sample: [additionalInfoSecondSample.businessFinancialDetails.drawingsLastYear] },
        drawingsPenultimateYear: { dataDD: StringDD, sample: [additionalInfoSecondSample.businessFinancialDetails.drawingsPenultimateYear] },
        dividendsLastYear: { dataDD: StringDD, sample: [additionalInfoSecondSample.businessFinancialDetails.dividendsLastYear] },
        dividendsPenultimateYear: { dataDD: StringDD, sample: [additionalInfoSecondSample.businessFinancialDetails.dividendsPenultimateYear] },
        netAssetsLastYear: { dataDD: StringDD, sample: [additionalInfoSecondSample.businessFinancialDetails.netAssetsLastYear] },
        netAssetsPenultimateYear: { dataDD: StringDD, sample: [additionalInfoSecondSample.businessFinancialDetails.netAssetsPenultimateYear] },
    }
}
/* ---------------- ADDITIONAL INFO SECOND DD END ---------------- */

/* ---------------- ADDITIONAL INFO FIRST DD START ---------------- */
export const additionalInfoFirstDD: ExampleDataD = {
    name: 'AdditionalInfoFirst',
    description: 'This is a summary about first additional information data',
    structure: {
        applicantName: { dataDD: StringDD, sample: [ additionalInfoFirstSample.applicantName ] },
        employerName: { dataDD: StringDD, sample: [ additionalInfoFirstSample.employerName ] },
        addressLine1: { dataDD: StringDD, sample: [ additionalInfoFirstSample.addressLine1 ] },
        addressLine2: { dataDD: StringDD, sample: [ additionalInfoFirstSample.addressLine2 ] },
        addressLine3: { dataDD: StringDD, sample: [ additionalInfoFirstSample.addressLine3 ] },
        addressLine4: { dataDD: StringDD, sample: [ additionalInfoFirstSample.addressLine4 ] },
        postcode: { dataDD: StringDD, sample: [ additionalInfoFirstSample.postcode ] },
    }
}
/* ---------------- ADDITIONAL INFO FIRST DD END ---------------- */

/* ---------------- LIST OCCUPATIONS DD START ---------------- */
export const listOccupationsDD: ExampleDataD = {
    name: "ListOccupations",
    description: "The search for occupation in the big list of occupations: occupation field ",
    structure: {
        descTypeValue: { dataDD: StringDD, hidden: true, sample: ['W54'] },
        descTypeName: { dataDD: StringDD, sample: ['Engineer'] },
    }
}
/* ---------------- LIST OCCUPATIONS DD END ---------------- */

/* ---------------- ONE OCCUPATION INCOME DETAILS DD START ---------------- */
export const oneOccupationIncomeDetailsDD: ExampleDataD = {
    name: "OneOccupationIncomeDetails",
    description: "This is a summary about occupation income details data of a single occupation",
    layout: { component: LayoutCd, displayParams: { details:  '[[30]]' , title:  ['Current employment details - '] } },
    guards: {
        areYou: { condition: 'in', path: 'areYou', values: customerStatusDD.enum },
        ownShareOfTheCompany: { condition: 'in', path: 'ownShareOfTheCompany', values: yesNoDD.enum },
        owningSharesPct: { condition: 'in', path: 'owningSharesPct', values: yesNoDD.enum },
        employmentType: { condition: 'in', path: 'employmentType', values: employmentTypeDD.enum },
        otherSourceOfIncome: { condition: 'in', path: 'otherSourceOfIncome', values: yesNoDD.enum },
    },
    structure: {
        areYou: { dataDD: customerStatusDD, displayParams: { label: "Are you... ", buttons: ['additionalInfoFirst', 'additionalInfoSecond'] } },
        occupation: { dataDD: StringDD, displayParams: { label: "What is your occupation? ", buttons: ['list'] }, guard: { areYou: [ 'E', 'S' ] }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails.occupation ]  },
        customerDescription: { dataDD: StringDD, displayParams: { label: "Customers description: " }, guard: { areYou: [ 'E', 'S' ] }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails.customerDescription ] },
        ownShareOfTheCompany: { dataDD: yesNoDD, displayParams: { label: "Do you own a share of the company? " }, guard: { areYou: [ 'E' ] } },
        owningSharesPct: { dataDD: yesNoDD, displayParams: { label: "Is this 20% or more of it? " }, guard: { areYou: [ 'E' ], ownShareOfTheCompany: [ 'Y' ] } },
        workFor: { dataDD: StringDD, displayParams: { label: "Who do you work for? " }, guard: { areYou: [ 'E' ], owningSharesPct: [ 'N' ] }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails.workFor ] },
        employmentType: { dataDD: employmentTypeDD, displayParams: { label: "Is this employment... " }, guard: { areYou: [ 'E' ], owningSharesPct: [ 'N' ] }, sample:  [ occupationAndIncomeSample.customerOccupationIncomeDetails.employmentType ] },
        empStartDate: { dataDD: DateDD, displayParams: { label: "When did this employment start? (mm/yyyy) " }, guard: { areYou: [ 'E' ], employmentType: [ '1' ] }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails.empStartDate ] },
        empEndDate: { dataDD: DateDD, displayParams: { label: "When will it finish? (mm/yyyy) " }, guard: { areYou: [ 'E' ], employmentType: [ '2', '3' ] }, sample: [occupationAndIncomeSample.customerOccupationIncomeDetails.empEndDate] },
        annualSalaryBeforeDeduction: { dataDD: IntegerDD, displayParams: { label: "What is your annual salary? (before deductions) " }, guard: { areYou: [ 'E' ], owningSharesPct: [ 'N' ] }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails.annualSalaryBeforeDeduction ] },
        annualIncomeExcludingRent: { dataDD: IntegerDD, displayParams: { label: "Do you have any other guaranteed annual income? (excluding rent) " }, guard: { areYou: [ 'E' ], owningSharesPct: [ 'N' ] }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails.annualIncomeExcludingRent ] },
        regularCommissionBonus: { dataDD: IntegerDD, displayParams: { label: "Do you have any regular commission, bonus or overtime? " }, guard: { areYou: [ 'E' ], owningSharesPct: [ 'N' ] }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails.regularCommissionBonus ] },
        whatTypeOfBusiness: { dataDD: StringDD, displayParams: { label: "What type of business is it? " }, guard: { areYou: [ 'E', 'S' ], owningSharesPct: [ 'Y' ] }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails.whatTypeOfBusiness ] },
        whatNameBusiness: { dataDD: StringDD, displayParams: { label: "What is its name: " }, guard: { areYou: [ 'E', 'S' ], owningSharesPct: [ 'Y' ] }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails.whatNameBusiness ] },
        establishedYear: { dataDD: StringDD, displayParams: { label: "When was it established? (MM/YYYY) " }, guard: { areYou: [ 'E', 'S' ], owningSharesPct: [ 'Y' ] }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails.establishedYear ] },
        annualDrawing3Yrs: { dataDD: IntegerDD, displayParams: { label: "What are your average annual drawings over the past 3 years? " }, guard: { areYou: [ 'E', 'S' ], owningSharesPct: [ 'Y' ] }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails.annualDrawing3Yrs ] },
        otherSourceOfIncome: { dataDD: yesNoDD, displayParams: { label: "Do you have another sources of income (e.g. rental income) ? ", buttons: ['otherSourcesOfIncome'] }, },
        createdBy: { dataDD: StringDD, displayParams: { label: "Entry created by: " }, sample: [ occupationAndIncomeSample.customerOccupationIncomeDetails.createdBy ] },
        empEmploymentSeq: { dataDD: IntegerDD, hidden: true, sample: [occupationAndIncomeSample.customerOccupationIncomeDetails.empEmploymentSeq] },
        accountantAppRoleSeq: { dataDD: IntegerDD, hidden: true, sample: [occupationAndIncomeSample.customerOccupationIncomeDetails.accountantAppRoleSeq] },
    }
}
/* ---------------- ONE OCCUPATION INCOME DETAILS DD START ---------------- */

/* ---------------- OCCUPATION AND INCOME DETAILS FULL DD START ---------------- */
export const occupationAndIncomeFullDomainDD: ExampleDataD = {
    name: 'OccupationAndIncomeFullDomain',
    description: 'This is a summary about occupation and income details data',
    layout: { component: LayoutCd, displayParams: { details: '[[1,1],[30]]' }  },
    structure: {
        mainCustomerName: { dataDD: StringDD, sample: [ occupationAndIncomeSample.mainCustomerName ] },
        mainClientRef: { dataDD: IntegerDD, hidden: true, sample: [ occupationAndIncomeSample.mainClientRef ] },
        customerOccupationIncomeDetails: { dataDD: oneOccupationIncomeDetailsDD },
    }
}
/* ---------------- OCCUPATION AND INCOME DETAILS FULL DD END ---------------- */

/* ---------------- FROM API DD START ---------------- */
export const fromApiDD: ExampleDataD = {
    name: 'FromApi',
    description: 'This is a summary about what comes from the API',
    structure: {
        occupationAndIncome: { dataDD: occupationAndIncomeFullDomainDD },
        additionalInfoFirst: { dataDD: additionalInfoFirstDD },
        additionalInfoSecond: { dataDD: additionalInfoSecondDD },
        otherSourcesOfIncome: { dataDD: otherIncomeResponseDD },
        occupationsList: { dataDD: listOccupationsDD }
    }
}
/* ---------------- FROM API DD END ---------------- */


