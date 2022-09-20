import { ExampleDataD, ExampleRepeatingD } from "../common";
import { BooleanDD, DateDD, DateDDMMYYY_DD, MoneyDD, StringDD, stringPrimDD, StringPrimitiveDD } from "../../common/dataD";
import { ConfirmChangesToAnyCD, LabelAndDropDownCD, LabelAndDropDownFromDataCD, LabelAndRadioCD, LayoutCd, TableWithVaryingOrderCD } from "../../common/componentsD";
import { ConfirmChangesToAny } from "@focuson/form_components";

export const PaymentTypeDd: StringPrimitiveDD = {
  ...stringPrimDD,
  name: 'PaymentType',
  description: "A payment type",
  display: LabelAndDropDownCD,
  displayParams: { pleaseSelect: 'Please select' },
  enum: { EMT: "Express money transfer", CHAPS: 'Chaps' }
}

export const ChargeDetailsEnum: StringPrimitiveDD = {
  ...stringPrimDD,
  name: 'ChargeDetailsEnum',
  description: "How the charges will be paid",
  display: LabelAndRadioCD,
  // displayParams: { vertical: true },
  enum: { 1: 'Debited from Payees one account', d: "Debited from draft account", o: 'Other account' }
}
export const CurrencyEnum: StringPrimitiveDD = {
  ...stringPrimDD,
  name: 'CurrencyEnum',
  description: "Euros or GBP",
  display: LabelAndDropDownFromDataCD,
  displayParams: { data: '~/currency', dataId: 'id', dataField: 'currency', pleaseSelect: 'Please select' },
}
export const ChapsPaymentTypeDD: StringPrimitiveDD = {
  ...stringPrimDD,
  name: 'ChapsPaymentType',
  description: "",
  display: LabelAndRadioCD,
  // displayParams: { pleaseSelect: 'Please select' },
  enum: { N: "Notify and pay", P: "Pay on personal application" }
}

export const SummaryOfPaymentsLineDD: ExampleDataD = {
  description: "This is the data loaded from the backend for one line.",
  name: "SummaryOfPaymentsLine",
  structure: {
    currency: { dataDD: { ...StringDD, emptyValue: 'GBP' }, sample: [ 'Euro', 'GBP' ] },
    nameOfPayee: { dataDD: StringDD, sample: [ 'Bob', 'Phil', 'Andrew' ] },
    sterlingAmount: { dataDD: MoneyDD, sample: [ 123, 2345, 5654 ] },
    currencyAmount: { dataDD: MoneyDD, sample: [ 222, 333, 444 ] },
    amtInWords: { dataDD: StringDD, sample: [ 'one hundred', 'two hundred', 'three hundred' ] },
    forActionOn: { dataDD: DateDDMMYYY_DD, sample: [ '5/12/2021', '6/12/2022' ], },
    dateCreated: { dataDD: DateDD },
    status: { dataDD: StringDD, sample: [ 'cancel', 'paid', '' ] },
  }
}
export const SummaryOfPaymentsTableDD: ExampleRepeatingD = {
  name: "SummaryOfPaymentsTable",
  description: "",
  dataDD: SummaryOfPaymentsLineDD,
  display: TableWithVaryingOrderCD,
  sampleCount: 10,
  displayParams: {
    order: {
      EMT: [ 'nameOfPayee', 'currency', 'sterlingAmount', 'currencyAmount', 'dateCreated', 'forActionOn', 'status' ],
      CHAPS: [ 'nameOfPayee', 'sterlingAmount', 'dateCreated', 'forActionOn', 'status' ],
    },
    select: '~/summary/payment/paymentType',
    rights: [ 'sterlingAmount', 'currencyAmount', 'dateCreated', 'forActionOn', 'status' ],
    scrollAfter: '100px',
    copySelectedIndexTo: [ 'selectedPaymentIndex' ],
    copySelectedItemTo: [ 'selectedPayment' ]
  },
  paged: false
}

export const ChargeDetailsDD: ExampleDataD = {
  name: 'ChargeDetails',
  description: '',
  structure: {
    debitedFrom: { dataDD: ChargeDetailsEnum },
  }
}

export const amountDD: ExampleDataD = {
  name: 'Amount',
  description: '',
  layout: { component: ConfirmChangesToAnyCD, displayParams: { confirm: { messageText: 'Are you sure you want {#amount} {~/summary/payment/amount/amountInWords}:'}, useRawMessage: true , layoutDetails: '[[1,1,1], [1]]' } },
  guards: {
    sterlingZero: { condition: 'equals', path: 'sterlingAmount', value: 0 },
    currencyZero: { condition: 'equals', path: 'currencyAmount', value: 0 }
  },
  structure: {
    currency: { dataDD: CurrencyEnum },
    sterlingAmount: { dataDD: MoneyDD, guard: { currencyZero: true }, sample: [ 123, 2345, 5654 ], displayParams: { min: 0.01, step: 0.01 } },
    currencyAmount: { dataDD: MoneyDD, guard: { sterlingZero: true }, sample: [ 222, 333, 444 ], displayParams: { min: 0.01, step: 0.01 } },
    amountInWords: { dataDD: StringDD, sample: [ 'one hundred', 'two hundred', 'three hundred' ] },
  }

}

export const PayeeBankDD: ExampleDataD = {
  name: 'PayeeBank',
  description: '',
  structure: {
    name: { dataDD: StringDD },
    addressLine1: { dataDD: StringDD },
    addressLine2: { dataDD: StringDD },
    addressLine3: { dataDD: StringDD },
    addressLine4: { dataDD: StringDD },
    addressLine5: { dataDD: StringDD },
    country: { dataDD: StringDD },
    postcode: { dataDD: StringDD },
  }
}
export const PayeeDetailsDD: ExampleDataD = {
  name: 'PayeeDetails',
  description: '',
  structure: {
    addressLine1: { dataDD: StringDD },
    addressLine2: { dataDD: StringDD },
    addressLine3: { dataDD: StringDD },
    addressLine4: { dataDD: StringDD },
    addressLine5: { dataDD: StringDD },
  }
}

export const ExpressDetailsDD: ExampleDataD = {
  name: 'ExpressDetails',
  description: '',
  layout: { component: LayoutCd, displayParams: { details: '[[1,1]]' } },
  structure: {
    payeeBank: { dataDD: PayeeBankDD },
    payeeDetails: { dataDD: PayeeDetailsDD },
    paymentType: { dataDD: ChapsPaymentTypeDD },
    payeeStatus: { dataDD: StringDD }

  }
}
export const ChapDetailsDD: ExampleDataD = {
  name: 'ChapDetails',
  description: '',
  layout: { component: LayoutCd, displayParams: { details: '[[6,5]]' } },
  structure: {
    sortCode: { dataDD: StringDD },
    payeeAccountNumber: { dataDD: StringDD },
    payeeAccountType: { dataDD: StringDD },
    firstName: { dataDD: StringDD },
    lastName: { dataDD: StringDD },
    paymentType: { dataDD: StringDD },
    payeeNotification: { dataDD: BooleanDD },
    payeesBank: { dataDD: StringDD },
    payeesBranch: { dataDD: StringDD },
    reference: { dataDD: StringDD },
    informationForPayeesBank: { dataDD: StringDD },
    anyAdditionalInformation: { dataDD: StringDD },
  }
}


export const PaymentDD: ExampleDataD = {
  name: 'Payment',
  description: '',
  layout: { component: LayoutCd, displayParams: { details: '[[2,1]]' } },
  guards: {
    paymentType: { condition: 'in', path: 'paymentType', values: PaymentTypeDd.enum },
    action: { condition: 'in', path: 'action', values: { copy: 'copy', ammend: 'ammend', new: 'new' } },
  },
  structure: {
    action: { dataDD: StringDD, hidden: true },// AM I new edit or amend
    paymentType: { dataDD: PaymentTypeDd },
    nameOfPayee: { dataDD: StringDD, sample: [ 'Bob', 'Phil', 'Andrew' ] },
    amount: { dataDD: amountDD },
    forActionOn: { dataDD: DateDDMMYYY_DD, sample: [ '5/12/2021', '6/12/2022' ] },
    chargeDetails: { dataDD: ChargeDetailsDD },
    chapsDetails: { dataDD: ChapDetailsDD, guard: { paymentType: [ 'c' ] } },
    expressDetails: { dataDD: ExpressDetailsDD, guard: { paymentType: [ 'e' ] } }
  }
}

export const PaymentsLaunchDD: ExampleDataD = {
  description: "",
  name: "PaymentsMain",
  structure: {
    payment: { dataDD: PaymentDD },
    summaryOfPaymentsTable: { dataDD: SummaryOfPaymentsTableDD }
  }
}

export const ValidatedPayeeDetailsDD: ExampleDataD = {
  name: 'ValidatedPayeeDetails',
  description: '',
  structure: {
    payeeStatus: { dataDD: StringDD }

  }
}
