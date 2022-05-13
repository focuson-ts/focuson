export interface HasETransferPageDomain {   ETransfer?: ETransferPageDomain}

export interface ETransferPageDomain{
  fromApi?:ETransferDataDDomain;
  holidays?:SingleHolidayDomain[];
}

export interface ETransferDataDDomain{
  account: number;
  balance: number;
  dateOfETransfer: string;
  description: string;
  fromAccount: number;
  monitoringAccount: number;
  notes: string;
  toAccount: number;
  type: string;
}

export type HolidayDataDomain = SingleHolidayDomain[]

export interface SingleHolidayDomain{
  holiday: string;
}
