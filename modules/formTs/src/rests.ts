import { RestDetails, OneRestDetails } from "@focuson/rest"
import { createSimpleMessage, DateFn, defaultDateFn, RestAction, insertBefore, SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"
import { FState , commonIds} from "./common";

import { HelloWorldMainPage_HelloWorldDomainDataRestDetails } from './HelloWorldMainPage/HelloWorldMainPage.rests';
import { AccountOverview_AccountAllFlagsRestDetails } from './AccountOverview/AccountOverview.rests';
import { AccountOverview_ArrearsDetailsRestDetails } from './AccountOverview/AccountOverview.rests';
import { AccountOverview_previous_ArrearsDetailsRestDetails } from './AccountOverview/AccountOverview.rests';
import { AccountOverview_AccountOverviewHistoryRestDetails } from './AccountOverview/AccountOverview.rests';
import { AccountOverview_AccountOverviewExcessInfoRestDetails } from './AccountOverview/AccountOverview.rests';
import { AccountOverview_AccountOverviewRestDetails } from './AccountOverview/AccountOverview.rests';
import { AccountOverview_AccountOverviewReasonRestDetails } from './AccountOverview/AccountOverview.rests';
import { JointAccount_JointAccountRestDetails } from './JointAccount/JointAccount.rests';
import { MainOccupationDetailsPageSummary_AdditionalInfoFirstRestDetails } from './MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.rests';
import { MainOccupationDetailsPageSummary_AdditionalInfoSecondRestDetails } from './MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.rests';
import { MainOccupationDetailsPageSummary_OccupationAndIncomeFullDomainRestDetails } from './MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.rests';
import { MainOccupationDetailsPageSummary_ListOccupationsRestDetails } from './MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.rests';
import { MainOccupationDetailsPageSummary_OtherIncomeResponseRestDetails } from './MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.rests';
import { EAccountsSummary_CreatePlanRestDetails } from './EAccountsSummary/EAccountsSummary.rests';
import { EAccountsSummary_EAccountsSummaryRestDetails } from './EAccountsSummary/EAccountsSummary.rests';
import { ETransfer_ETransferDataDRestDetails } from './ETransfer/ETransfer.rests';
import { CreateEAccount_CreateEAccountDataRestDetails } from './CreateEAccount/CreateEAccount.rests';
import { ChequeCreditbooks_ChequeCreditbooksRestDetails } from './ChequeCreditbooks/ChequeCreditbooks.rests';
import { Repeating_RepeatingWholeDataRestDetails } from './Repeating/Repeating.rests';
import { PostCodeMainPage_PostCodeNameAndAddressRestDetails } from './PostCodeMainPage/PostCodeMainPage.rests';
import { PostCodeMainPage_PostCodeDataRestDetails } from './PostCodeMainPage/PostCodeMainPage.rests';

export function restUrlMutator ( r: RestAction, url: string ): string { return insertBefore ( '?', r === 'list' ? '/list' : '', url )}

export const restDetails: RestDetails<FState, SimpleMessage> = {
   HelloWorldMainPage_HelloWorldDomainDataRestDetails: HelloWorldMainPage_HelloWorldDomainDataRestDetails(commonIds, defaultDateFn),
   AccountOverview_AccountAllFlagsRestDetails: AccountOverview_AccountAllFlagsRestDetails(commonIds, defaultDateFn),
   AccountOverview_ArrearsDetailsRestDetails: AccountOverview_ArrearsDetailsRestDetails(commonIds, defaultDateFn),
   AccountOverview_previous_ArrearsDetailsRestDetails: AccountOverview_previous_ArrearsDetailsRestDetails(commonIds, defaultDateFn),
   AccountOverview_AccountOverviewHistoryRestDetails: AccountOverview_AccountOverviewHistoryRestDetails(commonIds, defaultDateFn),
   AccountOverview_AccountOverviewExcessInfoRestDetails: AccountOverview_AccountOverviewExcessInfoRestDetails(commonIds, defaultDateFn),
   AccountOverview_AccountOverviewRestDetails: AccountOverview_AccountOverviewRestDetails(commonIds, defaultDateFn),
   AccountOverview_AccountOverviewReasonRestDetails: AccountOverview_AccountOverviewReasonRestDetails(commonIds, defaultDateFn),
   JointAccount_JointAccountRestDetails: JointAccount_JointAccountRestDetails(commonIds, defaultDateFn),
   MainOccupationDetailsPageSummary_AdditionalInfoFirstRestDetails: MainOccupationDetailsPageSummary_AdditionalInfoFirstRestDetails(commonIds, defaultDateFn),
   MainOccupationDetailsPageSummary_AdditionalInfoSecondRestDetails: MainOccupationDetailsPageSummary_AdditionalInfoSecondRestDetails(commonIds, defaultDateFn),
   MainOccupationDetailsPageSummary_OccupationAndIncomeFullDomainRestDetails: MainOccupationDetailsPageSummary_OccupationAndIncomeFullDomainRestDetails(commonIds, defaultDateFn),
   MainOccupationDetailsPageSummary_ListOccupationsRestDetails: MainOccupationDetailsPageSummary_ListOccupationsRestDetails(commonIds, defaultDateFn),
   MainOccupationDetailsPageSummary_OtherIncomeResponseRestDetails: MainOccupationDetailsPageSummary_OtherIncomeResponseRestDetails(commonIds, defaultDateFn),
   EAccountsSummary_CreatePlanRestDetails: EAccountsSummary_CreatePlanRestDetails(commonIds, defaultDateFn),
   EAccountsSummary_EAccountsSummaryRestDetails: EAccountsSummary_EAccountsSummaryRestDetails(commonIds, defaultDateFn),
   ETransfer_ETransferDataDRestDetails: ETransfer_ETransferDataDRestDetails(commonIds, defaultDateFn),
   CreateEAccount_CreateEAccountDataRestDetails: CreateEAccount_CreateEAccountDataRestDetails(commonIds, defaultDateFn),
   ChequeCreditbooks_ChequeCreditbooksRestDetails: ChequeCreditbooks_ChequeCreditbooksRestDetails(commonIds, defaultDateFn),
   Repeating_RepeatingWholeDataRestDetails: Repeating_RepeatingWholeDataRestDetails(commonIds, defaultDateFn),
   PostCodeMainPage_PostCodeNameAndAddressRestDetails: PostCodeMainPage_PostCodeNameAndAddressRestDetails(commonIds, defaultDateFn),
   PostCodeMainPage_PostCodeDataRestDetails: PostCodeMainPage_PostCodeDataRestDetails(commonIds, defaultDateFn)

}
