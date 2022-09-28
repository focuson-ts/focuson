import { ExampleRestD } from "../common";
import { datesDataD } from "./dates.dataD";

export const datesRestD: ExampleRestD = {
  url: '/api/dates/notused',
  params: {},
  dataDD: datesDataD,
  actions: [ 'get' ]
}