import { DataD, MoneyDD, OneLineStringDD, StringPrimitiveDD } from "../../common/dataD";
import { EAccountDisplayTypeDD } from "../eAccounts/eAccountsSummary.dataD";
import { RadioCD } from "../../common/componentsD";

const SavingsStyleDD: StringPrimitiveDD = {
  name: "SavingsStyleDD",
  emptyValue: "adhoc",
  reactType: 'string',
  description: "Radio buttons that say how you want to accumulate  money",
  display: RadioCD,
  validation: { enum: true },
  enum: {
    adHoc: 'Save what you want, when you want it',
    payRegular: 'Pay a regular amount until you reach a target',
    paySettime: 'Pay a regular amount for a set time',
    targetTime: 'Reach a target balance by a set time',
  }
}
export const CreateEAccountDataD: DataD = {
  name: "CreateEAccountDataDD",
  description: "Let's make an eaccount together",
  structure: {
    name: { dataDD: OneLineStringDD },
    type: { dataDD: EAccountDisplayTypeDD },
    savingsStyle: { dataDD: SavingsStyleDD },
    initialAmount: { dataDD: MoneyDD }
  }
}

