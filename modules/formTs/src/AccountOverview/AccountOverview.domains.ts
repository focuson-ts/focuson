export interface HasAccountOverviewPageDomain {   AccountOverview?: AccountOverviewPageDomain}

export interface AccountOverviewPageDomain{
  accountFlags?:AccountAllFlagsDomain;
  agreementType?:AccountOverviewAgreementTypeDomain;
  arrearsDetails?:ArrearsDetailsDomain;
  currentSelectedExcessHistory?:AccountOverviewExcessHistoryLineDomain;
  editingAccountFlags?:AccountAllFlagsDomain;
  excessHistory?:AccountOverviewHistoryDomain;
  excessInfo?:AccountOverviewExcessInfoDomain;
  main?:AccountOverviewDomain;
  optOut?:AccountOverviewOptOutDomain;
  reason?:AccountOverviewReasonDomain;
}

export interface AccountAllFlagsDomain{
  flags: AccountOneFlagDomain[];
}

export type AccountAllFlagsListDomain = AccountOneFlagDomain[]

export interface AccountOneFlagDomain{
  flagName: string;
  flagValue: boolean;
}

export interface AccountOverviewDomain{
  accountType: string;
  bouncedDDs12Months: number;
  criteria: AccountOverviewCriteriaLineDomain[];
  currentBalance: number;
  currentInterestRate: number;
  drawDownAmount: number;
  drawDownDate: string;
  eightyFivePctFacility: number;
  eightyPctFacility: number;
  excessSixMonths: number;
  facilities: AccountOverviewFacilitiesDomain;
  highBalance: number;
  lowBalance: number;
  mul: number;
  pctOfFacility: number;
  propertyValue: number;
  repaymentDate: string;
  score: number;
  unpaidCardOrMisuseItems: number;
  zFlagSet: string;
}

export interface AccountOverviewAgreementTypeDomain{
  agreementType: string;
  transactionHeading: string;
}

export type AccountOverviewCriteriaDomain = AccountOverviewCriteriaLineDomain[]

export interface AccountOverviewCriteriaLineDomain{
  criteria: string;
}

export interface AccountOverviewExcessHistoryLineDomain{
  consecutiveDays: number;
  end: string;
  start: string;
}

export interface AccountOverviewExcessInfoDomain{
  currentExcessOnAccount: number;
  currentPctExcess: number;
  dateOfLastCapitalization: string;
  dateOfLastExcessFulfillment: string;
  dayOfCurrentExcess: number;
}

export type AccountOverviewExcessLinesDomain = AccountOverviewExcessHistoryLineDomain[]

export interface AccountOverviewFacilitiesDomain{
  facilities: AccountOverviewFacilitiesLineDomain[];
}

export interface AccountOverviewFacilitiesLineDomain{
  amount: number;
  changeDate: string;
  facility: number;
  reason: string;
  unApproved: boolean;
}

export type AccountOverviewFacilitiesLinesDomain = AccountOverviewFacilitiesLineDomain[]

export interface AccountOverviewHistoryDomain{
  history: AccountOverviewExcessHistoryLineDomain[];
}

export interface AccountOverviewOptOutDomain{
  optOut: AccountOverviewOptOutLineDomain[];
}

export interface AccountOverviewOptOutLineDomain{
  addrLine5: string;
  changedBy: string;
  changedDate: string;
  optedOut: boolean;
}

export type AccountOverviewOptOutLinesDomain = AccountOverviewOptOutLineDomain[]

export interface AccountOverviewReasonDomain{
  reason: string;
}

export interface ArrearsDetailsDomain{
  details: ArrearsDetailsLineDomain[];
}

export interface ArrearsDetailsLineDomain{
  arrearsTotal: number;
  collectionsDate: string;
  contractualAmount: number;
  creditedDate: string;
  minPayment: number;
  missedPayments: number;
  paymentReceived: number;
  paymentType: string;
  shortfall: number;
}

export type ArrearsDetailsLinesDomain = ArrearsDetailsLineDomain[]
