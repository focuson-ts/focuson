import { ExampleDataD } from "../common";
import { StringDD } from "../../common/dataD";
import { ExternalComponentCD } from "../../common/componentsD";
import { nothingDD } from "../../common/commonDataDs";

export const modalPageDD: ExampleDataD = {
  name: "ModalPage",
  description: '',
  structure: {
    string: { dataDD: StringDD },
    external: {dataDD: {...nothingDD, display: ExternalComponentCD, displayParams: {nameOfComponentFn: 'external'}}}
  }
}