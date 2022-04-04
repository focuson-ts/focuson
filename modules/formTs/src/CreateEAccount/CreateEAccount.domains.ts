export interface HasCreateEAccountPageDomain {   CreateEAccount?: CreateEAccountPageDomain}

export interface CreateEAccountPageDomain{
  editing?:CreateEAccountDataDomain;
}

export interface CreateEAccountDataDomain{
  initialAmount: number;
  name: string;
  savingsStyle: string;
  type: string;
}
