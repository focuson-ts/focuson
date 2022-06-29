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
