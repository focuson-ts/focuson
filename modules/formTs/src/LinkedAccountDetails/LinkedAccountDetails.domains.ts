export interface HasLinkedAccountDetailsPageDomain {   LinkedAccountDetails?: LinkedAccountDetailsPageDomain}

export interface LinkedAccountDetailsPageDomain{
  createPayment?:CreatePaymentDomain;
  display?:LinkedAccountDetailsDisplayDomain;
  selectedCollectionIndex?:number;
  selectedCollectionItem?:CollectionItemDomain;
  selectIndex?:number;
  selectMandateSearch?:MandateSearchDomain;
  tempMandate?:MandateDomain;
}

export interface CollectionItemDomain{
  amount: number;
  collectionDate: string;
  paymentId: number;
  status: string;
}

export type CollectionsListDomain = CollectionItemDomain[]

export interface CollectionSummaryDomain{
  allowance: number;
  lastCollectionAmount: number;
  lastCollectionDate: string;
  nextCollectionAmount: number;
  nextCollectionDate: string;
  period: string;
}

export interface CreatePaymentDomain{
  allowance: number;
  amount: number;
  collectionDate: string;
  period: string;
  reason: string;
}

export interface LinkedAccountDetailsDisplayDomain{
  collectionHistory: CollectionItemDomain[];
  collectionSummary: CollectionSummaryDomain;
  mandate: MandateDomain;
}

export interface MandateDomain{
  accountId: number;
  accountName: string;
  bankName: string;
  mandateRef: string;
  mandateStatus: string;
  sortCode: string;
}

export type MandateListDomain = MandateDomain[]

export interface MandateSearchDomain{
  searchResults: MandateDomain[];
  sortCode: string;
}
