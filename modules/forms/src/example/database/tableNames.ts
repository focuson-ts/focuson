import { DBTable, Schema } from "../../common/resolverD";


export const onlySchema: Schema = {
  name: "TheSchema"
}
export const accountT: DBTable = {
  schema: onlySchema,
  name: 'ACC_TBL',
  description: '',
  notes: '',
}
export const customerT: DBTable = {
  schema: onlySchema,
  name: 'CUST_TBL',
  description: '',
  notes: '',
}
export const nameT: DBTable = {
  schema: onlySchema,
  name: 'NAME_TBL',
  description: '',
  notes: '',
}
export const addT: DBTable = {
  schema: onlySchema,
  name: 'ADD_TBL',
  description: '',
  notes: '',
}

export const postCodeSearchTable: DBTable = {
  schema: onlySchema,
  prefix: 'search',
  name: 'POSTCODE',
  description: '',
  notes: '',
}
export const fourOhFourTable: DBTable = {
  name: "FourOhFour",
  description: "For checking 404 issues",
  notes: "",
  schema: onlySchema
}
export const loanAppTable: DBTable = {
  name: 'loan_applicants', schema: onlySchema, description: '', notes: ''
}
export const clientNames_C10T: DBTable = {
  name: 'C10', schema: onlySchema, description: '', notes: ''
}
export const clientAddress_C60T: DBTable = {
  name: 'C60', schema: onlySchema, description: '', notes: ''
}