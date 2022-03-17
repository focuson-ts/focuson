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
