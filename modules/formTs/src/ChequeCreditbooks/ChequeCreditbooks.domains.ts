export interface HasChequeCreditbooksPageDomain {   ChequeCreditbooks?: ChequeCreditbooksPageDomain}

export interface ChequeCreditbooksPageDomain{
  chequeBookOrPayingIn?:number;
  fromApi?:ChequeCreditbooksDDDomain;
  temp?:ChequeCreditbooksHistoryLineDDDomain[];
  tempCreatePlan?:ChequeCreditbooksHistoryLineDDDomain;
}

export interface ChequeCreditbooksDDDomain{
  history: ChequeCreditbooksHistoryLineDDDomain[];
}

export type ChequeCreditbooksHistoryDDDomain = ChequeCreditbooksHistoryLineDDDomain[]

export interface ChequeCreditbooksHistoryLineDDDomain{
  dateOrder: string;
  howOrdered: string;
  serialNumber: number;
}
