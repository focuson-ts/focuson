import { AccountIdDD, DataD, DateDD, ManyLineStringDD, MoneyDD, OneLineStringDD, PrimitiveDD, RepeatingDataD } from "../../common/dataD";
import { LabelAndInputCD, TableCD } from "../../common/componentsD";
import { EAccountDisplayTypeDD } from "../eAccounts/eAccountsSummary.dataD";

export const TypeOfProfessionDD: PrimitiveDD = {
  name: 'TypeOfProfessionDD',
  reactType: 'string',
  description: "What type of profession are you (self employed/employed/...)",
  display: LabelAndInputCD,
  validation: { regex: "\d+", maxLength: 7 },
  enum: { selfEmployed: 'selfEmployed' }
}
export const OccupationDD: PrimitiveDD = {
  name: 'OccupationDD',
  reactType: 'string',
  description: "Your occupation (plumber/school teacher/...)",
  display: LabelAndInputCD,
  validation: {},
  sample: [ 'plumber', 'school teacher' ]
}
export const BusinessTypeDD: PrimitiveDD = {
  name: 'BusinessTypeDD',
  reactType: 'string',
  description: "What kind of business type ",
  display: LabelAndInputCD,
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