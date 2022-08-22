import { DBTable } from "../../common/resolverD";
import { authorisedChargesTableDD } from "../database/tableNames";

export interface AuthoriseCustomisation{
  pageName : string
  authoriseTable: DBTable
  urlPrefix: string
}

export const DirectDebitAC: AuthoriseCustomisation ={
  pageName: 'DirectDebits',
  authoriseTable: authorisedChargesTableDD,
  urlPrefix: '/api/dd'
}
export const CreditAC: AuthoriseCustomisation ={
  pageName: 'Credit',
  authoriseTable:authorisedChargesTableDD,
  urlPrefix: '/api/cc'

}