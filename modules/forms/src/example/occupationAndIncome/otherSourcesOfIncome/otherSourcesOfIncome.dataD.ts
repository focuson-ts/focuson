/* ---------------- OTHER SOURCES OF INCOME START ---------------- */
import { ExampleDataD, ExampleRepeatingD } from "../../common";
import { IntegerDD, OneLineStringDD, StringDD, StringPrimitiveDD } from "../../../common/dataD";
import { LabelAndDropDownCD, TableCD } from "../../../common/componentsD";
import { HowOften } from "../../commonEnums";

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
  displayParams: { order: [ 'otherIncomeType', 'incomeFreqRef', 'amount' ] },
  dataDD: otherIncomeResponseDD

}
