import { DataD, OneLineStringDD } from "../../common/dataD";
import { AllGuards } from "../../buttons/guardButton";
import { ExampleDataD } from "../common";

export const helloWorldD: ExampleDataD = {
  name: "HelloWorld",
  description: "",
  structure: {
    hello: { dataDD: OneLineStringDD, sample: [ 'World' ] },
  }
}
