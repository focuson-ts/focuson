import { ExampleMainPage } from "../common";
import { initialDataD } from "./initial.dateD";
import { timeDataRD } from "./initial.restD";

export const initialPageD: ExampleMainPage = {
  name: "InitialPage",
  display: { dataDD: initialDataD, target: '~/initial' },
  domain: { initial: { dataDD: initialDataD } },
  initialValue: undefined,
  modals: [],
  modes: [ 'view' ],
  pageType: 'MainPage',
  rest: {
    time: { rest: timeDataRD, targetFromPath: '~/initial/time', fetcher: true }
  },
  buttons: {}

}