import { ExampleMainPage, ExampleModalPage } from "../common";

import { addressSearchDD } from "../ListOfPayments/listOfPayements.dataD";
import { HideButtonsCD } from "../../buttons/hideButtonsCD";
import { ChargeDetailsDD, PaymentDD, PaymentsLaunchDD, SummaryOfPaymentsLineDD } from "./payments.dataD";
import { newPaymentsRD, summaryOfPreviousPaymentsRD } from "./payments.restD";
import { NatNumDd } from "../../common/dataD";

// export const ChargeDetailsPD: ExampleModalPage = {
//   pageType: 'ModalPopup',
//   name: 'ChargeDetails',
//   display: { target: '~/onePayment/chargeDetails', dataDD: ChargeDetailsDD },
//   modes: [ 'edit', 'create' ],
//   buttons: {
//     commit: { control: 'ModalCommitButton', text: 'save' },
//     cancel: { control: 'ModalCancelButton', text: 'back' },
//   }
// }
export const EditPaymentsPD: ExampleModalPage = {
  pageType: 'ModalPage',
  name: 'EditPaymentsModalPage',
  display: { target: '~/onePayment', dataDD: PaymentDD },
  modes: [ 'edit', 'create' ],
  buttons: {
    commit: { control: 'ModalCommitButton', text: 'save' },
    cancel: { control: 'ModalCancelButton', text: 'back' },
    // chargeDetails: { control: 'ModalButton', modal: ChargeDetailsPD, mode: 'edit', focusOn: '~/onePayment/chargeDetails',
    // createEmptyIfUndefined: ChargeDetailsDD
    // },
  }
}
export const PaymentsPageD: ExampleMainPage = {
  name: 'Payments',
  pageType: 'MainPage',
  modes: [ 'view' ],
  display: { target: '~/summary', dataDD: PaymentsLaunchDD },
  initialValue: 'empty',
  // initialValue: { summary: {payment:{}} },
  domain: {
    summary: { dataDD: PaymentsLaunchDD },
    onePayment: { dataDD: PaymentDD },
    selectedPaymentIndex: { dataDD: NatNumDd },
    selectedPayment: { dataDD: SummaryOfPaymentsLineDD },
  },
  modals: [ { modal: EditPaymentsPD } ],
  rest: {
    listOfPreviousPayments: { rest: summaryOfPreviousPaymentsRD, fetcher: true, targetFromPath: '~/summary/summaryOfPaymentsTable' },
    newPayments: { rest: newPaymentsRD, targetFromPath: '~/onePayment' },
  },
  guards: {
    tableItemSelected: { condition: "isDefined", path: '~/selectedPaymentIndex' }
  },
  buttons: {
    new: {
      control: 'ModalButton', modal: EditPaymentsPD, mode: 'create', createEmpty: PaymentDD, focusOn: '~/onePayment',
      copyOnClose: { to: '~/summary/payment' }
    },
    amend: {
      control: 'ModalButton', modal: EditPaymentsPD, mode: 'create', createEmpty: PaymentDD, focusOn: '~/onePayment',
      copy: { from: '~/summary/payment' }, copyOnClose: { to: '~/summary/payment' }
    },
    copy: {
      control: 'ModalButton', modal: EditPaymentsPD, mode: 'create', createEmpty: PaymentDD, focusOn: '~/onePayment',
      enabledBy: 'tableItemSelected',
      copy: { from: '~/selectedPayment' }, copyOnClose: { to: '~/summary/payment' }
    }
  }
}
