import { numberPrimDD, NumberPrimitiveDD, stringPrimDD, StringPrimitiveDD } from "../common/dataD";
import { LabelAndDropDownCD, LabelAndNumberInputCD } from "../common/componentsD";

export enum ContactTitle {
  X = '',
  MR = 'Mr',
  MRS = 'Mrs',
  MISS = 'Miss',
  MS = 'Ms',
  DR = 'Dr',
  REV = 'Rev',
  PROF = 'Prof',
  SIR = 'Sir',
  CAPTAIN = 'Captain',
  LADY = 'Lady',
  MAJOR = 'Major',
  MASTER = 'Master',
  LORD = 'Lord',
  COLONEL = 'Colonel',
  BARON = 'Baron',
  VISCOUNT = 'Viscount',
  BRIGADIER = 'Brigadier',
  LIEUT_COL = 'Lieut Col',
  FRAU = 'Frau',
  HERR = 'Herr',
  FATHER = 'Father',
  MESSRS = 'Messrs',
  MADAM = 'Madam'
}
export const CustomerStatus = {
  X: '',
  E: 'Employed',
  S: 'Self Employed',
  C: 'Currently not earning',
  R: 'Retired',
  T: 'Student',
  U: 'Unknown',
  H: 'Home Family Responsibilities'
}
export const YesNo = {
  X: '',
  N: 'No',
  Y: 'Yes'
}
export const EmploymentType = {
  0: '',
  1: 'Permanent',
  2: 'Temporary',
  3: 'Contract'
}
export const HowOften = {
  0: '',
  1: 'Annual',
  2: 'Monthly',
  3: 'Quarterly',
  4: 'Half-Yearly',
  5: 'Fortnightly',
  6: 'Weekly'
}

export const NatNumDd: NumberPrimitiveDD = {
  ...numberPrimDD,
  name: 'NaturalNumber',
  description: "A positive integer",
  display: LabelAndNumberInputCD,
  displayParams: { min: 0 } ,
  sample: [123, 456]
}

export const PaymentTypeDd: StringPrimitiveDD = {
  ...stringPrimDD,
  name: 'PaymentType',
  description: "A payment type",
  display: LabelAndDropDownCD,
  enum: {dd: 'DD', ddResubmit: "DD Resubmit"}
}

