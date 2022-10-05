import { ExampleDataD } from "../common";
import { IntegerDD, ManyLineStringDD, MoneyDD, MoneyStringDD, NatNumDd, StringDD } from "../../common/dataD";

export const inputsDD: ExampleDataD = {
  name: 'Inputs',
  description: `A load of inputs to allow to check the validity behaviour`,
  structure: {
    natNum: { dataDD: NatNumDd },
    integerMax100: { dataDD: IntegerDD, displayParams: { max: 100 } },
    integerMax100WithCustomMessage: { dataDD: IntegerDD, displayParams: { required: true, max: 100, errorMessage: 'Please enter a value < 100' } },
    money: { dataDD: MoneyDD },
    moneyString: { dataDD: MoneyStringDD },
    string: { dataDD: StringDD },
    stringWithRegex0To9: { dataDD: StringDD, displayParams: {pattern: '^[0-9]*$'} },
    stringWithRegex0To9CustomMessage: { dataDD: StringDD, displayParams: {pattern: '^[0-9]*$', errorMessage: 'Please enter a value using just the digits 0-9'} },
    textMaxLength10: { dataDD: ManyLineStringDD , displayParams: {maxlength: 10}},
    textMaxLength10WithCustomMessage: { dataDD: ManyLineStringDD, displayParams: {required: true, errorMessage: 'Please enter the text', maxlength: 10} },
  }
}