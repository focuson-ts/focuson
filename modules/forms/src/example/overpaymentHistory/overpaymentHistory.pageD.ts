import { ExampleMainPage } from "../common";
import { OverpaymentPageDD } from "./overpaymentHistory.dataD";
import { overpaymentHistoryRD } from "./overpaymentHistory.restD";

export const OverpaymentMainPage: ExampleMainPage = {
  name: "OverpaymentMainPage",
  pageType: 'MainPage',
  display: { dataDD: OverpaymentPageDD, target: '~/overpayment' },
  modes: [ 'view' ],
  initialValue: undefined,
  modals: [],
  domain: { overpayment: { dataDD: OverpaymentPageDD } },
  rest: { overpaymentHistory: { rest: overpaymentHistoryRD, targetFromPath: '~/overpayment', fetcher: true } },
  buttons: {
    cancel: { control: 'ModalCancelButton' },
  },
}
