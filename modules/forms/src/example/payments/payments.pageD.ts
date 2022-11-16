import { ExampleMainPage, ExampleModalPage } from "../common";
import { PaymentDD, PaymentsLaunchDD, SummaryOfPaymentsLineDD, ValidatedPayeeDetailsDD } from "./payments.dataD";
import { currencyListDD, currencyRD, newPaymentsRD, summaryOfPreviousPaymentsRD, ValidatePayeeRD } from "./payments.restD";
import { NatNumDd } from "../../common/dataD";
import { nothingDD } from "../../common/commonDataDs";
import { isDifferentDayOrIsBefore } from "../../guardFns";
import { GuardLayoutCD } from "../../common/componentsD";

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
  guards:{
    isDifferentDayOrIsBefore:{condition: 'fn', path: '~/onePayment/forActionOn', name: `isDifferentDayOrIsBefore(15, 15)`, message: 'It is after 15:15 today and cannot do a same day payment'}
  },
  buttons: {
    commit: { control: 'ModalCommitButton', text: 'save' , enabledBy: 'isDifferentDayOrIsBefore'},
    cancel: { control: 'ModalCancelButton', text: 'back', confirm: 'Are you sure?' },
    validate: {
      control: 'ModalButton', modal: ValidatePD, focusOn: '~/nothing', mode: 'view',
      createEmpty: nothingDD,
      restOnOpen: { restName: 'validatePayee', action: { state: 'validate' } },
      copyOnSuccess: { from: 'payeeStatus', to: '~/singlePayment/payeeStatus' },
      changeOnClose: { command: 'deleteAllMessages' }
    }
    // chargeDetails: { control: 'ModalButton', modal: ChargeDetailsPD, mode: 'edit', focusOn: '~/onePayment/chargeDetails',
    // createEmptyIfUndefined: ChargeDetailsDD
    // },
  }
}
export const PaymentsPageD: ExampleMainPage = {
  title: 'Payment {#isChaps|Equivalent to| Current amount}',
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
  layout: {
    component: GuardLayoutCD,
    displayParams: { guard: 'brandOk', message: 'Does not display when Brand is {/CommonIds/brandRef}', className: 'someClassName', displayGuardMessages: false }
  },

  variables: {
    amount: {
      constructedBy: 'code', code: `id =>{
    const amountL = id.focusQuery ( 'Payments' ).focusQuery ( 'summary' ).focusQuery ( 'payment' ).focusQuery ( 'amount' )
    const sterlingL = amountL.focusQuery ( 'sterlingAmount' )
    const currencyL = amountL.focusQuery ( 'currencyAmount' )
    return Lenses.condition ( sterlingL, ( sterling ) => sterling != 0, sterlingL, currencyL )
}`
    },
    isChaps: {
      constructedBy: 'code', imports: [ `import {optional} from '@focuson/lens'` ], code: `id => {
      const paymentType: Optional<FState, string> = id.focusQuery ( 'Payments' ).focusQuery ( 'summary' ).focusQuery ( 'payment' ).focusQuery ( 'paymentType' )
      const getter = ( s: string ): boolean | undefined => s === 'CHAPS'
      const setter = ( s: string, b: boolean ): string | undefined => b ? 'CHAPS' : 'EMT'
      return paymentType.chain ( optional ( getter, setter, paymentType.description + ".toEqualsChaps" ) )
    }`
    },
    currency: {
      constructedBy: 'code', imports: [ `import { CurrencyDomain } from "./Payments.domains";` ],
      code: `id => {
    const currencyIdL: Optional<FState, string> = id.focusQuery ( 'Payments' ).focusQuery ( 'summary' ).focusQuery ( 'payment' ).focusQuery ( 'amount' ).focusOn ( 'currency' )
    const listOfCurrencies: Optional<FState, CurrencyDomain[]> = id.focusQuery ( 'Payments' ).focusQuery ( 'currency' )
    return Lenses.chainLookupTable ( currencyIdL, listOfCurrencies, 'id', 'currency' )
  }`
    }
  },
  guards: {
    brandOk: {condition: "contains", path: '/CommonIds/brandRef', values: ["1","2","3","4","5","6","10"]},
    tableItemSelected: { condition: "isDefined", path: '~/selectedPaymentIndex', message: 'Please select a row to copy (you need to choose EMT or Chaps first)' }
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
