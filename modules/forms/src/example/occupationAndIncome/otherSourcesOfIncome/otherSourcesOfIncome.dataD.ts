/* ---------------- OTHER SOURCES OF INCOME START ---------------- */
import {IntegerDD, LabelAndDropDownCD, OneLineStringDD, StringDD, StringPrimitiveDD, TableCD} from "@focuson/forms";
import {HowOften} from "@focuson/form_components";
import {ExampleDataD, ExampleRepeatingD} from "../../common";

export const frequencyDD: StringPrimitiveDD = {
    ...OneLineStringDD,
    sample: [ 'Annual', 'Monthly' ],
    name: 'Frequency',
    description: "Income frequency",
    display: LabelAndDropDownCD,
    enum: HowOften
}
export const otherIncomeResponseDD: ExampleDataD = {
    name: "OtherIncomeResponse",
    description: "This is a summary about other income data of a single record",
    structure: {
        clientOtherIncomeSeq: { dataDD: StringDD },
        otherIncomeType: { dataDD: StringDD },
        incomeFreqRef: { dataDD: frequencyDD },
        amount: { dataDD: IntegerDD }
    }
}
export const otherSourcesOfIncomeDataDD: ExampleRepeatingD = {
    paged: false,
    display: TableCD,
    name: "OtherIncomeData",
    description: "This is a summary about other income data",
    displayParams: { order: [ 'otherIncomeType', 'incomeFreqRef', 'amount' ]  },
    dataDD: otherIncomeResponseDD

}
/* ---------------- OTHER SOURCES OF INCOME END ---------------- */