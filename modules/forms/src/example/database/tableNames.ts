import { DBTable, Schema } from "../../common/resolverD";


export const onlySchema: Schema = {
  name: "TheSchema"
}
export const accountT: DBTable = {
  schema: onlySchema,
  name: 'ACC_TBL',
  description: '',
  notes: '',
  audit: { restActions: [ 'get' ], by: 'how we do the auditing' }
}
export const customerT: DBTable = {
  schema: onlySchema,
  name: 'CUST_TBL',
  description: '',
  notes: '',
  audit: { restActions: [ 'get' ], by: 'how we do the auditing' }
}
export const nameT: DBTable = {
  schema: onlySchema,
  name: 'NAME_TBL',
  description: '',
  notes: '',
  audit: { restActions: [ 'get' ], by: 'how we do the auditing' }
}
export const addT: DBTable = {
  schema: onlySchema,
  name: 'ADD_TBL',
  description: '',
  notes: '',
  audit: { restActions: [ 'get' ], by: 'how we do the auditing' }
}
export const postCodeT: DBTable = {
  schema: onlySchema,
  name: 'POST_CODE_TBL',
  description: '',
  notes: '',
  audit: { restActions: [ 'get' ], by: 'how we do the auditing' }
}
export const cityT: DBTable = {
  schema: onlySchema,
  name: 'CITY_TBL',
  description: '',
  notes: '',
  audit: { restActions: [ 'get' ], by: 'how we do the auditing' }
}

