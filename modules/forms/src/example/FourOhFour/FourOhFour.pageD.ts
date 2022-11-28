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
      loader: { msg: 'Some Message', button: 'ButtonText' },
      // onSuccess: {command: 'deleteRestWindow', rest: "FourOhFourPage_single_FourOhFourRestDetails", action: 'get'},
      on404:  { command: 'message', msg: 'single 404 {/CommonIds/accountId}' },
      onSuccess: { command: 'message', msg: `single 404 - on success. Shouldn't see this if a 404 {/CommonIds/accountId}` },
      onComplete: [
        { command: 'copy', from: '~/display/id', to: '~/display/copiedOfIdUpdatedBySingle' },
        { command: 'message', msg: `single 404 - on completion` },
      ],
    },
    multiple: {
      control: 'RestButton', restName: 'multiple', result: 'nothing', action: 'get', on404: { command: 'message', msg: 'multiple 404' },
      loader: { msg: 'Some Message', button: 'ButtonText' },
      confirm: { type: 'window' }
    },
    singleByResolver: { control: 'RestButton', restName: 'singleByResolver', result: 'nothing', action: 'get', on404: { command: 'message', msg: 'singleByResolver 404 {/CommonIds/accountId}' } },
  }
}