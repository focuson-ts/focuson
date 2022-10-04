import { ExampleMainPage } from "../common";
import { FourOhFourSearchDD } from "./FourOhFour.dataD";
import { fourOhFourRepeatingRD, fourOhFourSingleByResolverRD, fourOhFourSingleRD } from "./FourOhFour.restD";

export const FourOhFourPageD: ExampleMainPage = {
  name: 'FourOhFourPage',
  pageType: "MainPage",
  modes: [ 'edit' ],
  modals: [],
  initialValue: 'empty',
  display: { dataDD: FourOhFourSearchDD, target: '~/display' },
  domain: { display: { dataDD: FourOhFourSearchDD } },
  rest: {
    single: { rest: fourOhFourSingleRD, targetFromPath: '~/display/singleResult', fetcher: true, on404: { command: 'message', msg: 'on404 fetcher for single' }, onError: { command: 'message', msg: 'onError - fetcher for single' } },
    multiple: { rest: fourOhFourRepeatingRD, targetFromPath: '~/display/multipleResult', fetcher: true },
    singleByResolver: { rest: fourOhFourSingleByResolverRD, targetFromPath: '~/display/singleResultByResolver', fetcher: true },
  },
  buttons: {
    single: {
      control: 'RestButton', restName: 'single', result: 'nothing', action: 'get',
      on404: { command: 'message', msg: 'single 404 {/CommonIds/accountId}' }
    },
    multiple: { control: 'RestButton', restName: 'multiple', result: 'nothing', action: 'get', on404: { command: 'message', msg: 'multiple 404' } },
    singleByResolver: { control: 'RestButton', restName: 'singleByResolver', result: 'nothing', action: 'get', on404: { command: 'message', msg: 'singleByResolver 404 {/CommonIds/accountId}' } },
  }
}