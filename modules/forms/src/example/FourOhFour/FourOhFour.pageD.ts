import { ExampleMainPage } from "../common";
import { FourOhFourSearchDD } from "./FourOhFour.dataD";
import { fourOhFourRepeatingRD, fourOhFourSingleRD } from "./FourOhFour.restD";

export const FourOhFourPageD: ExampleMainPage = {
  name: 'FourOhFourPage',
  pageType: "MainPage",
  modes: [ 'edit' ],
  modals: [],
  initialValue: 'empty',
  display: { dataDD: FourOhFourSearchDD, target: '~/display' },
  domain: { display: { dataDD: FourOhFourSearchDD } },
  rest: {
    single: { rest: fourOhFourSingleRD, targetFromPath: '~/display/singleResult', fetcher: true },
    multiple: { rest: fourOhFourRepeatingRD, targetFromPath: '~/display/multipleResult', fetcher: true },
  },
  buttons: {}
}