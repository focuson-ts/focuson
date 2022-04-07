import { CustomerStatus, HowOften, YesNo } from "../commonEnums";

export const occupationAndIncomeSample = {
    regulatoryReport: 'N',
    mainCustomerName: 'Mr XXXXXXXXXX J ABCD Fred Bloggs',
    mainClientRef: 13606326,
    customerOccupationIncomeDetails: {
            areYou: CustomerStatus.S,
            customerDescription: 'XXXXXXXXX',
            occupation: 'W045',
            ownShareOfTheCompany: '',
            owningSharesPct: '',
            workFor: 'S.C. Bosch S.R.L.',
            employmentType: '',
            annualSalaryBeforeDeduction: 20315,
            annualIncomeExcludingRent: 13255,
            regularCommissionBonus: 500,
            dateOfEmploymentStart: '10/1996',
            otherSourceOfIncome: YesNo.N,
            createdBy: 'Seras Alin',
            createdDate: '2007-07-03T10:52:27.000+01:00',
            employerName: 'My employer name',
            whatTypeOfBusiness: 'Electrical Technical Support',
            whatNameBusiness: 'XXXXXXXXX',
            establishedYear: '2006-04-01T00:00:00.000+01:00',
            annualDrawing3Yrs: 100000,
            empStartDate: '10/2002',
            empEndDate: '10/2003',
            sePositionHeld: 'DIR',
            occupationCategory: 'SK',
            empEmploymentSeq: 999999,
            empAppRoleSeq: 14648850,
            accountantAppRoleSeq: 14648851,
            currentEmployment: YesNo.N
    }
}

export const additionalInfoFirstSample = {
    applicantName: 'Mr XXXXXXXXXX ABCD Fred Bloggs',
    employerName: 'AnalystXYZ',
    addressLine1: 'Pinetrees Road',
    addressLine2: 'Norwich',
    addressLine3: 'Norfolk',
    addressLine4: 'Norfolkkk',
    postcode: 'PLXYZ'
}

export const additionalInfoSecondSample = {
    businessDetails: {
        applicantName: 'Mr XXXXXXXXXX ABCD Fred Bloggs',
        businessName: 'AnalystXYZ',
        addressLine1: 'Pinetrees Road',
        addressLine2: 'Norwich',
        addressLine3: 'Norfolk',
        addressLine4: 'Norfolkkk',
        postcode: 'PLXYZ'
    },
    businessFinancialDetails: {
        turnoverLastYear: '10,000',
        turnoverPenultimateYear: '11,000',
        netProfitLastYear: '12,000',
        netProfitPenultimateYear: '9,000',
        drawingsLastYear: '13,000',
        drawingsPenultimateYear: '100,000',
        dividendsLastYear: '15,000',
        dividendsPenultimateYear: '3,000',
        netAssetsLastYear: '1,000',
        netAssetsPenultimateYear: '2,000'
    },
    detailsOfNonRecurringItems: {
        nonRecurringItems: 'Not Available'
    },
    detailsOfReevaluationOfAssets: {
        revaluationOfAssets: 'Not Available'
    },
    accountantDetails: {
        contactForename: 'Justin',
        contactSurname: 'Tesla',
        practice: 'PracXyz',
        addressLine1: 'Pinetrees Road',
        addressLine2: 'Norwich',
        addressLine3: 'Norfolk',
        addressLine4: 'Norfolkkk',
        postcode: 'PLXYZ',
        telephone: '224567'
    }
}

export const otherSourcesOfIncomeSample = {
    otherIncomeResponse: [
        {
            clientOtherIncomeSeq: '6743',
            otherIncomeType: 'share holdings in public compa',
            incomeFreqRef: HowOften["2"],
            amount: '470000'
        },
        {
            clientOtherIncomeSeq: '6744',
            otherIncomeType: 'bonus',
            incomeFreqRef: HowOften["1"],
            amount: '10000'
        }
    ],
}

export const dropdownsSample = {
    contractTypesResponse: [
        {
            contractTypeId: 1,
            description: 'Permanent'
        },
        {
            contractTypeId: 2,
            description: 'Temporary'
        },
        {
            contractTypeId: 3,
            description: 'Contract'
        }
    ],
    employmentStatus: [
        {
            employmentName: ' ',
            employmentValue: ' '
        },
        {
            employmentName: 'E',
            employmentValue: 'Employed'
        },
        {
            employmentName: 'S',
            employmentValue: 'Self Employed'
        },
        {
            employmentName: 'C',
            employmentValue: 'Currently not earning'
        },
        {
            employmentName: 'R',
            employmentValue: 'Retired'
        },
        {
            employmentName: 'S',
            employmentValue: 'Student'
        },
        {
            employmentName: 'U',
            employmentValue: 'Unknown'
        },
        {
            employmentName: 'H',
            employmentValue: 'Home Family Responsibilites'
        }
    ],
    frequenciesResponse: [
        {
            frequencyId: 1,
            frequencyDescription: ''
        },
        {
            frequencyId: 2,
            frequencyDescription: 'Monthly'
        },
        {
            frequencyId: 3,
            frequencyDescription: 'Quarterly'
        },
        {
            frequencyId: 4,
            frequencyDescription: 'Half Yearly'
        },
        {
            frequencyId: 5,
            frequencyDescription: 'Fortnightly'
        },
        {
            frequencyId: 6,
            frequencyDescription: 'Weekly'
        }
    ]
}

export const occupationsList = {
    occupationDescriptionResponse: [
        {
            descTypeValue: 'W045',
            descTypeName: 'Wharf Manager'
        },
        {
            descTypeValue: 'W046',
            descTypeName: 'White Metaller (Metal Processing)'
        },
        {
            descTypeValue: 'W047',
            descTypeName: 'Wholesale Buyer'
        },
        {
            descTypeValue: 'W048',
            descTypeName: 'Wholesaler'
        },
        {
            descTypeValue: 'W049',
            descTypeName: 'Wicker Products Maker'
        },
        {
            descTypeValue: 'W050',
            descTypeName: 'Wig Dresser'
        }
    ]
}