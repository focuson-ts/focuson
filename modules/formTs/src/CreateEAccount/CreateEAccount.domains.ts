export interface HasCreateEAccountPageDomain {   CreateEAccount?: CreateEAccountPageDomain}

export interface CreateEAccountPageDomain{
  editing?:CreateEAccountDataDDDomain;
}

export interface CreateEAccountDataDDDomain{
  initialAmount: number;
  name: string;
  savingsStyle: string;
  type: string;
}
