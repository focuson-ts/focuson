export interface HasListOfPaymentsPagePageDomain {   ListOfPaymentsPage?: ListOfPaymentsPagePageDomain}

export interface ListOfPaymentsPagePageDomain{
  display?:PrintRecordItemDomain[];
  selected?:number;
  tempListOfPayments?:PrintRecordItemDomain;
}

export interface ListOfPaymentsDomain{
  billPayments: SinglePrintDomain;
  directDebits: SinglePrintDomain;
  openBanking: SinglePrintDomain;
  openBankingStandingOrders: SinglePrintDomain;
  standingOrders: SinglePrintDomain;
}

export type PrintRecordHistoryDomain = PrintRecordItemDomain[]

export interface PrintRecordItemDomain{
  authorisedByCustomer: string;
  includeSingleAndInitialDirectDebits: boolean;
  listOfPayments: ListOfPaymentsDomain;
  requestedBy: string;
  requesterDetails: RequesterDetailsDomain;
}

export interface RequesterDetailsDomain{
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  fax: string;
  forename: string;
  phone: string;
  postcode: string;
  surname: string;
  title: string;
}

export interface SinglePrintDomain{
  numberOfItems: number;
  shouldPrint: boolean;
}
