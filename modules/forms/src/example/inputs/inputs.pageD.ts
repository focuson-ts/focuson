import { ExampleDataD, ExampleMainPage } from "../common";
import { IntegerDD, ManyLineStringDD, MoneyDD, MoneyStringDD, NatNumDd, StringDD } from "../../common/dataD";
import { inputsDD } from "./inputs.dataD";

export const inputsPageD: ExampleMainPage = {
  name: 'Inputs',
  description: `A load of inputs to allow to check the validity behaviour`,
  pageType: "MainPage",
  modes: [ 'edit' ],
  initialValue: 'empty',
  display: { dataDD: inputsDD, target: '~/data' },
  domain: { data: { dataDD: inputsDD } },
  rest: {},
  buttons: {}
}