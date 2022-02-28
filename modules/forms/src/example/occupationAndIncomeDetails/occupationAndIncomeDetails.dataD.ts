import { DataD, DateDD, MoneyDD, OneLineStringDD, StringPrimitiveDD } from "../../common/dataD";
import { LabelAndStringInputCD } from "../../common/componentsD";

export const TypeOfProfessionDD: StringPrimitiveDD = {
  name: 'TypeOfProfessionDD',
  reactType: 'string',
  emptyValue: "selfEmployed",
  description: "What type of profession are you (self employed/employed/...)",
  display: LabelAndStringInputCD,
  validation: { regex: "\d+", maxLength: 7 },
  enum: { selfEmployed: 'selfEmployed' }
}
export const OccupationDD: StringPrimitiveDD = {
  name: 'OccupationDD',
  emptyValue: '',
  reactType: 'string',
  description: "Your occupation (plumber/school teacher/...)",
  display: LabelAndStringInputCD,
  validation: {},
  sample: [ 'plumber', 'school teacher' ]
}
export const BusinessTypeDD: StringPrimitiveDD = {
  name: 'BusinessTypeDD',
  reactType: 'string',
  emptyValue: '',
  description: "What kind of business type ",
  display: LabelAndStringInputCD,
  validation: {},
  sample: [ 'Electrical Technical Support' ]
}


export const OccupationAndIncomeDetailsDataD: DataD = {
  name: "OccupationAndIncome",
  description: "Occupation and Income information",
  structure: {
    typeOfProfession: { dataDD: TypeOfProfessionDD },
    occupation: { dataDD: OccupationDD },
    customersDescription: { dataDD: OneLineStringDD },
    businessType: { dataDD: BusinessTypeDD },
    businessName: { dataDD: OneLineStringDD },
    dateStarted: { dataDD: DateDD },
    averageAnnualDrawings: { dataDD: MoneyDD }
  }
}