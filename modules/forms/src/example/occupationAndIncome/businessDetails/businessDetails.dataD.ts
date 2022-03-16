/* ---------------- BUSINESS DETAILS START ---------------- */

import { businessDetailsSample } from "./businessDetails.sample";
import { ExampleDataD } from "../../common";
import { LabelAndDropDownCD } from "../../../common/componentsD";
import { ContactTitle } from "../../commonEnums";
import { OneLineStringDD, StringDD, StringPrimitiveDD } from "../../../common/dataD";


export const businessDetailsDD: ExampleDataD = {
    name: 'BusinessDetails',
    description: 'This is a summary about business details data',
    structure: {
        applicantName: { dataDD: StringDD, sample: [businessDetailsSample.businessDetails.applicantName] },
        businessName: { dataDD: StringDD, sample: [businessDetailsSample.businessDetails.businessName] },
        addressLine1: { dataDD: OneLineStringDD, sample: [businessDetailsSample.businessDetails.addressLine1] },
        addressLine2: { dataDD: OneLineStringDD, sample: [businessDetailsSample.businessDetails.addressLine2] },
        addressLine3: { dataDD: OneLineStringDD, sample: [businessDetailsSample.businessDetails.addressLine3] },
        addressLine4: { dataDD: OneLineStringDD, sample: [businessDetailsSample.businessDetails.addressLine4] },
        postcode: { dataDD: StringDD, sample: [businessDetailsSample.businessDetails.postcode] }
    }
}
export const businessFinancialDetailsDD: ExampleDataD = {
    name: 'BusinessFinancialDetails',
    description: 'This is a summary about business financial details data',
    structure: {
        turnoverLastYear: { dataDD: StringDD, sample: [businessDetailsSample.businessFinancialDetails.turnoverLastYear] },
        turnoverPenultimateYear: { dataDD: StringDD, sample: [businessDetailsSample.businessFinancialDetails.turnoverPenultimateYear] },
        netProfitLastYear: { dataDD: StringDD, sample: [businessDetailsSample.businessFinancialDetails.netProfitLastYear] },
        netProfitPenultimateYear: { dataDD: StringDD, sample: [businessDetailsSample.businessFinancialDetails.netProfitPenultimateYear] },
        drawingsLastYear: { dataDD: StringDD, sample: [businessDetailsSample.businessFinancialDetails.drawingsLastYear] },
        drawingsPenultimateYear: { dataDD: StringDD, sample: [businessDetailsSample.businessFinancialDetails.drawingsPenultimateYear] },
        dividendsLastYear: { dataDD: StringDD, sample: [businessDetailsSample.businessFinancialDetails.dividendsLastYear] },
        dividendsPenultimateYear: { dataDD: StringDD, sample: [businessDetailsSample.businessFinancialDetails.dividendsPenultimateYear] },
        netAssetsLastYear: { dataDD: StringDD, sample: [businessDetailsSample.businessFinancialDetails.netAssetsLastYear] },
        netAssetsPenultimateYear: { dataDD: StringDD, sample: [businessDetailsSample.businessFinancialDetails.netAssetsPenultimateYear] },
    }
}
export const detailsOfNonRecurringItemsDD: ExampleDataD = {
    name: 'DetailsOfNonRecurringItems',
    description: 'This is a summary about details of non-recurring items data',
    structure: {
        nonRecurringItems: { dataDD: StringDD, sample: [ businessDetailsSample.detailsOfNonRecurringItems.nonRecurringItems ] }
    }
}
export const detailsOfReevaluationOfAssetsDD: ExampleDataD = {
    name: 'DetailsOfReevaluationOfAssets',
    description: 'This is a summary about details of reevaluations of assets data',
    structure: {
        revaluationOfAssets: { dataDD: StringDD, sample: [ businessDetailsSample.detailsOfReevaluationOfAssets.revaluationOfAssets ] }
    }
}
export const contactTitleDD: StringPrimitiveDD = {
    ...OneLineStringDD,
    name: 'ContactTitle',
    description: "contact title to address with",
    display: LabelAndDropDownCD,
    enum: ContactTitle
}
export const accountDetailsDD: ExampleDataD = {
    name: 'AccountDetails',
    description: 'This is a summary about account details data',
    structure: {
        contactTitle: { dataDD: contactTitleDD, sample: [ businessDetailsSample.accountantDetails.contactTitle ] },
        contactForename: { dataDD: StringDD, sample: [ businessDetailsSample.accountantDetails.contactForename ] },
        contactSurname: { dataDD: StringDD, sample: [ businessDetailsSample.accountantDetails.contactSurname ] },
        practice: { dataDD: StringDD, sample: [ businessDetailsSample.accountantDetails.practice ] },
        addressLine1: { dataDD: StringDD, sample: [ businessDetailsSample.accountantDetails.addressLine1 ] },
        addressLine2: { dataDD: StringDD, sample: [ businessDetailsSample.accountantDetails.addressLine2 ] },
        addressLine3: { dataDD: StringDD, sample: [ businessDetailsSample.accountantDetails.addressLine3 ] },
        addressLine4: { dataDD: StringDD, sample: [ businessDetailsSample.accountantDetails.addressLine4 ] },
        postcode: { dataDD: StringDD, sample: [ businessDetailsSample.accountantDetails.postcode ] },
        telephone: { dataDD: StringDD, sample: [ businessDetailsSample.accountantDetails.telephone ] }
    }
}
export const businessDetailsMainDD: ExampleDataD = {
    name: 'BusinessDetailsMain',
    description: 'This is a summary about self employed additional information data',
    structure: {
        businessDetails: { dataDD: businessDetailsDD },
        businessFinancialDetails: { dataDD: businessFinancialDetailsDD },
        detailsOfNonRecurringItems: { dataDD: detailsOfNonRecurringItemsDD },
        detailsOfReevaluationOfAssets: { dataDD: detailsOfReevaluationOfAssetsDD },
        accountantDetails: { dataDD: accountDetailsDD }
    }
}
/* ---------------- BUSINESS DETAILS END ---------------- */