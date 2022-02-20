import { DataD, MoneyDD, OneLineStringDD, PrimitiveDD } from "../../common/dataD";
import { CreatePlanDD, EAccountDisplayTypeDD, EAccountsSummaryTableDD } from "../eAccounts/eAccountsSummary.dataD";
import { LabelAndInputCD } from "../../common/componentsD";

const SavingsStyleDD: PrimitiveDD = {
  name: "SavingsStyleDD",
  reactType: 'string',
  description: "Radio buttons that say how you want to accumulate  money",
  display: LabelAndInputCD,
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

