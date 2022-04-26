export interface HasChequeCreditbooksPageDomain {   ChequeCreditbooks?: ChequeCreditbooksPageDomain}

export interface ChequeCreditbooksPageDomain{
  chequeBookOrPayingIn?:number;
  fromApi?:ChequeCreditbooksDomain;
  temp?:ChequeCreditbooksHistoryLineDomain[];
  tempCreatePlan?:ChequeCreditbooksHistoryLineDomain;
}

export interface ChequeCreditbooksDomain{
  history: ChequeCreditbooksHistoryLineDomain[];
}

export type ChequeCreditbooksHistoryDomain = ChequeCreditbooksHistoryLineDomain[]

export interface ChequeCreditbooksHistoryLineDomain{
  dateOrder: string;
  howOrdered: string;
  serialNumber: number;
}
