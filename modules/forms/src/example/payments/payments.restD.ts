import { ExampleDataD, ExampleRepeatingD, ExampleRestD } from "../common";
import { PaymentDD, SummaryOfPaymentsLineDD, SummaryOfPaymentsTableDD } from "./payments.dataD";
import { onlySchema } from "../database/tableNames";
import { commonIds, fromCommonIds } from "../commonIds";
import { StringDD } from "../../common/dataD";
import { LabelAndDropDownCD, LabelAndDropDownFromDataCD } from "../../common/componentsD";

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
  resolvers: {
    getoneLinePayment: {
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
            { type: "output", javaType: 'String', rsName: 'dateCreated', name: 'dateCreated', datePattern: 'dd-MM-yyyy' },
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
    }
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
  displayParams: { data: '~/currency', dataId: 'id', dataField: 'currency'},
  paged: false,

}
export const currencyRD: ExampleRestD = {
  params: {},
  dataDD: currencyListDD,
  namePrefix: 'oneLine',
  url: '/api/currencies/?{query}',
  actions: [ 'get' ]
}
