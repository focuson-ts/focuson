export interface HasJointAccountPageDomain {   JointAccount?: JointAccountPageDomain}

export interface JointAccountPageDomain{
  fromApi?:JointAccountDomain;
  joint?:boolean;
  temp?:JointAccountCustomerDomain;
}

export interface JointAccountDomain{
  balance: number;
  joint: JointAccountCustomerDomain;
  main: JointAccountCustomerDomain;
}

export interface JointAccountAddressDomain{
  line1: string;
  line2: string;
}

export type JointAccountAddressesDomain = JointAccountAddressDomain[]

export interface JointAccountCustomerDomain{
  addresses: JointAccountAddressDomain[];
  name: string;
}
