import { DBTable } from "../../common/resolverD";
import { authorisedChargesTableDD } from "../database/tableNames";

export interface AuthoriseCustomisation{
  pageName : string
  authoriseTable: DBTable
  urlPrefix: string
  namePrefix: string
}

export const DirectDebitAC: AuthoriseCustomisation ={
  pageName: 'AuthoriseCharges',
  authoriseTable: authorisedChargesTableDD,
  namePrefix: 'ac',
  urlPrefix: '/api/dd'
}
export const CreditAC: AuthoriseCustomisation ={
  pageName: 'Credit',
  authoriseTable:authorisedChargesTableDD,
  namePrefix: 'cc',
  urlPrefix: '/api/cc'
}