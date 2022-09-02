import { ExampleDataD, ExampleMainPage, ExampleModalPage, ExampleRestD } from "../common";
import { StringDD } from "../../common/dataD";
import { modalPageDD } from "./modalPages.dataD";

export const modalPageRD: ExampleRestD = {
  params: {},
  url: '/api/modal/one',
  actions: [ { state: 'one' }, { state: 'two' } ],
  dataDD: modalPageDD,
  states: {
    one: { url: '/api/modal/one', params: {} },
    two: { url: '/api/modal/two', params: {} }
  }
}
