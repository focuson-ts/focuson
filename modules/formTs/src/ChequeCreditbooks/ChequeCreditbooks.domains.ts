export interface HasChequeCreditbooksPageDomain {   ChequeCreditbooks?: ChequeCreditbooksPageDomain}

export interface ChequeCreditbooksPageDomain{
  chequeBookOrPayingIn?:number;
  fromApi?:ChequeCreditbooksDDDomain;
  tempCreatePlan?:ChequeCreditbooksHistoryLineDDDomain;
}

export interface ChequeCreditbooksDDDomain{
  history: ChequeCreditbooksHistoryLineDDDomain[];
}

export interface ChequeCreditbooksHistoryLineDDDomain{
  dateOrder: string;
  howOrdered: string;
  serialNumber: number;
}
