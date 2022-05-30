import { DataD, MoneyDD, OneLineStringDD, StringPrimitiveDD } from "../../common/dataD";
import { EAccountDisplayTypeDD } from "../eAccounts/eAccountsSummary.dataD";
import { LayoutCd, RadioCD } from "../../common/componentsD";
import { AllGuards } from "../../buttons/guardButton";

const SavingsStyleDD: StringPrimitiveDD = {
  ...OneLineStringDD,
  name: "SavingsStyle",
  emptyValue: "adhoc",
  description: "Radio buttons that say how you want to accumulate  money",
  display: RadioCD,
  enum: {
    adHoc: 'Save what you want, when you want it',
    payRegular: 'Pay a regular amount until you reach a target',
    paySettime: 'Pay a regular amount for a set time',
    targetTime: 'Reach a target balance by a set time',
  }
}
export const CreateEAccountDataD: DataD<AllGuards> = {
  name: "CreateEAccountData",
  description: "Let's make an eaccount together",
  layout: { component: LayoutCd, displayParams: { details: '[[4]]', defaultProps: `{"valueWidth": 50}`}},
  structure: {
    name: { dataDD: OneLineStringDD },
    type: { dataDD: EAccountDisplayTypeDD },
    savingsStyle: { dataDD: SavingsStyleDD },
    initialAmount: { dataDD: MoneyDD }
  }
}

