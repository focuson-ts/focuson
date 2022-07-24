import { ExampleRestD } from "../common";
import { DateInfoDataD } from "./dates.dataD";


export const datesRestD: ExampleRestD = {
  actions: [ 'get' ],
  dataDD: DateInfoDataD,
  params: {},
  url: '/api/dateinfo'

}