import { ExampleDataD, ExampleRepeatingD, ExampleRestD } from "../common";
import { PaymentDD, SummaryOfPaymentsTableDD, ValidatedPayeeDetailsDD } from "./payments.dataD";
import { onlySchema } from "../database/tableNames";
import { commonIds } from "../commonIds";
import { StringDD } from "../../common/dataD";
import { LabelAndDropDownFromDataCD } from "../../common/componentsD";

export const summaryOfPreviousPaymentsRD: ExampleRestD = {
  params: {},
  dataDD: SummaryOfPaymentsTableDD,
  url: '/api/payments/summary?{query}',
  actions: [ 'get' ]
}

// const doMutate = ( ...conditions: string[] ) => ( params: MutationParamForStoredProc | MutationParamForStoredProc[] ): MutationDetail =>
//   ({ type: 'storedProc', name: '', guardBy: conditions, params, schema: onlySchema, package: 'bo11' }); // ,

export const newPaymentsRD: ExampleRestD = {
  params: commonIds,
  dataDD: PaymentDD,
  namePrefix: 'oneLine',
  url: '/api/payments/?{query}',
  actions: [ 'create', 'get' ],
  // access:[{restAction: 'create', condition: {type: 'dateNotWeekEndOrHoliday', param: ''}}],
  // access:[{restAction: 'create', condition: {type: 'dateNotWeekEndOrHoliday', param: ''}}],
  resolvers: {
    getoneLinePayment: [
      {type:'storedProc', name: 'checkNotHolidayOrWeekend', params:[{type: 'body', path: 'thePAthToTheDate'}],schema: onlySchema },
      { type: 'message', message: 'getOneLinePayment was called' },
      {
        type: 'case', name: 'sendSomeMessageDependingOnBrand', params: [ 'brandRef' ], select: [
          { guard: [ 'brandRef==1' ], type: 'message', message: 'brand 1' },
          { guard: [ 'brandRef==2' ], type: 'message', message: 'brand 2' },
          { guard: [ 'brandRef==3' ], type: 'message', message: 'brand 3' },
          { guard: [], type: 'manual', code: '//avoid exception on drop through', params: [] }

        ]
      },
      {
        type: 'case', name: 'getOneLinePayment', params: [ 'brandRef', 'accountId',
          { type: 'output', name: 'nameOfPayee', javaType: 'String' },
          { type: 'output', name: 'sterlingAmount', javaType: 'Integer' },
          { type: 'output', name: 'currencyAmount', javaType: 'Integer' },
          { type: 'output', name: 'amtInWords', javaType: 'String' },
          { type: 'output', name: 'forActionOn', javaType: 'String' },
          { type: 'output', name: 'dateCreated', javaType: 'String' },
        ], select: [
          {
            guard: [ 'brandRef==3' ], type: 'sql', name: 'brandref3', schema: onlySchema,
            sql: 'select nameOfPayee,sterlingAmount,currencyAmount,amtInWords,forActionOn,dateCreated,status from tableForBrand3 where acc = accountId', params: [
              'accountId',
              { type: "output", javaType: 'String', rsName: 'nameOfPayee', name: 'nameOfPayee' },
              { type: "output", javaType: 'Integer', rsName: 'sterlingAmount', name: 'sterlingAmount' },
              { type: "output", javaType: 'Integer', rsName: 'currencyAmount', name: 'currencyAmount' },
              { type: "output", javaType: 'String', rsName: 'amtInWords', name: 'amtInWords' },
              { type: "output", javaType: 'String', rsName: 'forActionOn', name: 'forActionOn' },
              { type: "output", javaType: 'String', rsName: 'dateCreated', name: 'dateCreated', format: { type: 'Date', pattern: 'dd-MM-yyyy' } },
            ]
          },
          {
            guard: [], type: 'sql', schema: onlySchema,
            sql: 'select nameOfPayee,sterlingAmount,currencyAmount,amtInWords,forActionOn,dateCreated,status from tableForAllOtherBrands where acc = accountId', params: [
              'accountId',
              { type: "output", javaType: 'String', rsName: 'nameOfPayee', name: 'nameOfPayee' },
              { type: "output", javaType: 'Integer', rsName: 'sterlingAmount', name: 'sterlingAmount' },
              { type: "output", javaType: 'Integer', rsName: 'currencyAmount', name: 'currencyAmount' },
              { type: "output", javaType: 'String', rsName: 'amtInWords', name: 'amtInWords' },
              { type: "output", javaType: 'String', rsName: 'forActionOn', name: 'forActionOn' },
              { type: "output", javaType: 'String', rsName: 'dateCreated', name: 'dateCreated' },
            ]
          }
        ]
      } ]
  },

  mutations: [ {
    restAction: 'create',
    autowired: { class: '{thePackage}.utils.IOGNL', variableName: 'ognl', imports: true },
    mutateBy: [ {
      type: 'case', name: 'create', params: [
        'brandRef', "accountId",
        { type: 'output', name: 'one', javaType: 'String' },
        { type: 'output', name: 'two', javaType: 'Integer' },
      ], select: [
        {
          guard: [ 'brandRef==3' ], type: 'storedProc', name: 'one', params: [
            { type: 'string', value: 'first' },
            "accountId",
            { type: 'output', name: 'one', javaType: 'String', sqlType: 'CHAR' },
            { type: 'output', name: 'two', javaType: 'Integer', sqlType: 'INTEGER' },
            { type: 'output', name: 'three', javaType: 'Integer', sqlType: 'INTEGER' },
            { type: 'output', name: 'four', javaType: 'Integer', sqlType: 'INTEGER' },
            { type: 'output', name: 'five', javaType: 'Integer', sqlType: 'INTEGER' },
            { type: 'output', name: 'six', javaType: 'Integer', sqlType: 'INTEGER' },
            { type: 'output', name: 'seven', javaType: 'Integer', sqlType: 'INTEGER' },
            { type: 'output', name: 'eight', javaType: 'Integer', sqlType: 'INTEGER' },
            { type: 'output', name: 'nine', javaType: 'Integer', sqlType: 'INTEGER' },
            { type: 'output', name: 'ten', javaType: 'Integer', sqlType: 'INTEGER' },
            { type: 'output', name: 'eleven', javaType: 'Integer', sqlType: 'INTEGER' },
            { type: 'output', name: 'twelve', javaType: 'Integer', sqlType: 'INTEGER' },
            { type: 'output', name: 'thirteen', javaType: 'Integer', sqlType: 'INTEGER' },
            { type: 'output', name: 'fourteen', javaType: 'Integer', sqlType: 'INTEGER' },
            { type: 'output', name: 'fiveteen', javaType: 'Integer', sqlType: 'INTEGER' },
          ], schema: onlySchema, package: 'bo11'
        },
        {
          guard: [], type: 'storedProc', name: 'two', params: [
            { type: 'string', value: 'second' },
            { type: 'output', name: 'two', javaType: 'Integer', sqlType: 'INTEGER' },
            { type: 'output', name: 'one', javaType: 'String', sqlType: 'CHAR' },
            "accountId",
          ], schema: onlySchema, package: 'bo11'
        },
      ]
    } ]
  } ]
}
export const currencyDD: ExampleDataD = {
  name: 'Currency',
  description: "id and name of the currency ",
  structure: {
    id: { dataDD: StringDD, sample: [ 'E', 'GBP' ] },
    currency: { dataDD: StringDD, sample: [ 'Euro', 'GBP' ] },
  }
}
export const currencyListDD: ExampleRepeatingD = {
  name: 'CurrencyDropDown',
  dataDD: currencyDD,
  description: "",
  display: LabelAndDropDownFromDataCD,
  displayParams: { data: '~/currency', dataId: 'id', dataField: 'currency' },
  paged: false,

}
export const currencyRD: ExampleRestD = {
  params: {},
  dataDD: currencyListDD,
  namePrefix: 'oneLine',
  url: '/api/currencies/?{query}',
  actions: [ 'get' ]
}
export const ValidatePayeeRD: ExampleRestD = {
  params: {},
  dataDD: ValidatedPayeeDetailsDD,
  url: '/api/payeedetails/validate?{query}',
  actions: [ { state: 'validate' } ],
  states: {
    validate: { params: {}, url: '/api/payeedetails/validate?{query}', bodyFrom: '~/onePayment', returns: [ 'payeeStatus' ] }
  },
  mutations: [
    {
      restAction: { state: 'validate' }, mutateBy: {
        type: 'manual', code: 'String payeeStatus= "SUCCEEDED!!!!!";', makeMock: false, params: [
          { type: 'output', name: 'payeeStatus', javaType: 'String' }
        ]
      }
    }
  ]
}
