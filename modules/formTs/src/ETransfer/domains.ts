export interface HasETransferPageDomain {   ETransfer?: ETransferPageDomain}

export interface ETransferPageDomain{
 fromApi?:ETransferDataDDomain;
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
