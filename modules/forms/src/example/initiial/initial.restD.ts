import { ExampleRestD } from "../common";
import { timeDataD } from "./initial.dateD";

export const timeDataRD: ExampleRestD = {
  params: {},
  url: '/api/timedata',
  actions: [ 'get' ],
  dataDD: timeDataD
}