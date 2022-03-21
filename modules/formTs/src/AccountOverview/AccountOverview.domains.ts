export interface HasAccountOverviewPageDomain {   AccountOverview?: AccountOverviewPageDomain}

export interface AccountOverviewPageDomain{
  accountFlags?:AccountAllFlagsDomain;
  arrearsDetailsCurrent?:ArrearsDetailsDomain;
  arrearsDetailsPrevious?:ArrearsDetailsDomain;
  currentSelectedExcessHistory?:AccountOverviewExcessHistoryLineDomain;
  editingAccountFlags?:AccountAllFlagsDomain;
  excessHistory?:AccountOverviewHistoryDomain;
  excessInfo?:AccountOverviewExcessInfoDomain;
  main?:AccountOverviewDomain;
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
  drawDownAmount: number;
  drawDownDate: string;
  excessSixMonths: number;
  mul: number;
  propertyValue: number;
  repaymentDate: string;
  score: number;
  unpaidCardOrMisuseItems: number;
  zFlagSet: string;
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

export interface AccountOverviewHistoryDomain{
  history: AccountOverviewExcessHistoryLineDomain[];
}

export interface AccountOverviewReasonDomain{
  reason: string;
}

export interface ArrearsDetailsDomain{
  history: ArrearsDetailsLineDomain[];
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
