import { ExampleMainPage, ExampleModalPage } from "../common";
import { PaymentDD, PaymentsLaunchDD, SummaryOfPaymentsLineDD, ValidatedPayeeDetailsDD } from "./payments.dataD";
import { currencyListDD, currencyRD, newPaymentsRD, nothingDD, summaryOfPreviousPaymentsRD, ValidatePayeeRD } from "./payments.restD";
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


export const ValidatePD: ExampleModalPage = {
  pageType: 'ModalPopup',
  name: 'ValidatePayeeModalPage',
  display: { target: '~/nothing', dataDD: nothingDD },
  modes: [ 'view' ],
  buttons: {
    ok: { control: "ModalCommitButton", text: 'ok' }
  }
}
export const EditPaymentsPD: ExampleModalPage = {
  pageType: 'ModalPage',
  title: 'Payments {~/onePayment/paymentType}',
  name: 'EditPaymentsModalPage',
  display: { target: '~/onePayment', dataDD: PaymentDD },
  modes: [ 'edit', 'create' ],
  buttons: {
    commit: { control: 'ModalCommitButton', text: 'save' },
    cancel: { control: 'ModalCancelButton', text: 'back', confirm: 'Are you sure?' },
    validate: {
      control: 'ModalButton', modal: ValidatePD, focusOn: '~/nothing', mode: 'view',
      createEmpty: nothingDD,
      restOnOpen: { restName: 'validatePayee', action: { state: 'validate' } },
      copyOnSuccess: { from: 'payeeStatus', to: '~/singlePayment/payeeStatus' },
      changeOnClose: {command: 'deleteAllMessages'}
    }
    // chargeDetails: { control: 'ModalButton', modal: ChargeDetailsPD, mode: 'edit', focusOn: '~/onePayment/chargeDetails',
    // createEmptyIfUndefined: ChargeDetailsDD
    // },
  }
}
export const PaymentsPageD: ExampleMainPage = {
  name: 'Payments',
  pageType: 'MainPage',
  modes: [ 'edit' ],
  display: { target: '~/summary', dataDD: PaymentsLaunchDD },
  initialValue: 'empty',
  // initialValue: { summary: {payment:{}} },
  domain: {
    summary: { dataDD: PaymentsLaunchDD },
    onePayment: { dataDD: PaymentDD },
    selectedPaymentIndex: { dataDD: NatNumDd },
    selectedPayment: { dataDD: SummaryOfPaymentsLineDD },
    currency: { dataDD: currencyListDD },
    nothing: { dataDD: nothingDD },
    validatedPayeeDetails: { dataDD: ValidatedPayeeDetailsDD }
  },
  modals: [ { modal: EditPaymentsPD }, { modal: ValidatePD } ],
  rest: {
    listOfPreviousPayments: { rest: summaryOfPreviousPaymentsRD, fetcher: true, targetFromPath: '~/summary/summaryOfPaymentsTable' },
    newPayments: { rest: newPaymentsRD, targetFromPath: '~/onePayment' },
    currency: { rest: currencyRD, targetFromPath: '~/currency', fetcher: true },
    validatePayee: { rest: ValidatePayeeRD, targetFromPath: '~/validatedPayeeDetails' }
  },
  guards: {
    tableItemSelected: { condition: "isDefined", path: '~/selectedPaymentIndex' }
  },
  buttons: {
    new: {
      control: 'ModalButton', modal: EditPaymentsPD, mode: 'create', createEmpty: PaymentDD, focusOn: '~/onePayment',
      copyOnClose: { to: '~/summary/payment' },
      copy: { from: '~/summary/payment/paymentType', to: '~/onePayment/paymentType' },
      change: { command: 'set', path: '~/summary/payment/action', value: 'new' }

    },
    amend: {
      control: 'ModalButton', modal: EditPaymentsPD, mode: 'create', createEmpty: PaymentDD, focusOn: '~/onePayment',
      copy: { from: '~/summary/payment' }, copyOnClose: { to: '~/summary/payment' },
      change: { command: 'set', path: '~/summary/payment/action', value: 'amend' }
    },
    copy: {
      control: 'ModalButton', modal: EditPaymentsPD, mode: 'create', createEmpty: PaymentDD, focusOn: '~/onePayment',
      enabledBy: 'tableItemSelected',
      copy: [ { from: '~/selectedPayment/payeeName', 'to': '~/editablePayemnt/payeeName' } ], copyOnClose: { to: '~/summary/payment' },
      change: { command: 'set', path: '~/summary/payment/action', value: 'copy' }
    },
    // cancel: { control: 'RestButton', validate: false, enabledBy: ['tableItemSelected','tableItemSelected','tableItemSelected','tableItemSelected'], restName: 'newPayments', action: 'create', messageOnSuccess: 'canceled', confirm: "dont say yes" }
  }
}
