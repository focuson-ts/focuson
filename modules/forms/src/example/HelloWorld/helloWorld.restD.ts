import { helloWorldDD } from "./helloWorld.dataD";
import { ExampleRestD } from "../common";

export const helloWorldRD: ExampleRestD = {
  params: {},
  dataDD: helloWorldDD,
  url: '/helloWorld?{query}',
  actions: [ 'get' ],
}