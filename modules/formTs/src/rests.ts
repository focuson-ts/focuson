import { RestDetails, OneRestDetails } from "@focuson/rest"
import { createSimpleMessage, DateFn, defaultDateFn, RestAction, insertBefore, SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"
import { FState , commonIds} from "./common";

import { AccountOverview__AccountAllFlagsRestDetails } from './AccountOverview/AccountOverview.rests';
import { AccountOverview__ArrearsDetailsRestDetails } from './AccountOverview/AccountOverview.rests';
import { AccountOverview_previous_ArrearsDetailsRestDetails } from './AccountOverview/AccountOverview.rests';
import { AccountOverview__AccountOverviewHistoryRestDetails } from './AccountOverview/AccountOverview.rests';
import { AccountOverview__AccountOverviewExcessInfoRestDetails } from './AccountOverview/AccountOverview.rests';
import { AccountOverview__AccountOverviewRestDetails } from './AccountOverview/AccountOverview.rests';
import { AccountOverview__AccountOverviewReasonRestDetails } from './AccountOverview/AccountOverview.rests';
import { JointAccount__JointAccountRestDetails } from './JointAccount/JointAccount.rests';
import { OccupationAndIncomeSummary__AdditionalInformationRestDetails } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.rests';
import { OccupationAndIncomeSummary__BusinessDetailsMainRestDetails } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.rests';
import { OccupationAndIncomeSummary__DropdownsRestDetails } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.rests';
import { OccupationAndIncomeSummary__OccupationAndIncomeFullDomainRestDetails } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.rests';
import { OccupationAndIncomeSummary__OtherIncomeResponseRestDetails } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.rests';
import { EAccountsSummary__CreatePlanRestDetails } from './EAccountsSummary/EAccountsSummary.rests';
import { EAccountsSummary__EAccountsSummaryRestDetails } from './EAccountsSummary/EAccountsSummary.rests';
import { ETransfer__ETransferDataDRestDetails } from './ETransfer/ETransfer.rests';
import { CreateEAccount__CreateEAccountDataRestDetails } from './CreateEAccount/CreateEAccount.rests';
import { ChequeCreditbooks__ChequeCreditbooksRestDetails } from './ChequeCreditbooks/ChequeCreditbooks.rests';
import { Repeating__RepeatingWholeDataRestDetails } from './Repeating/Repeating.rests';
import { PostCodeDemo__PostCodeNameAndAddressRestDetails } from './PostCodeDemo/PostCodeDemo.rests';
import { PostCodeDemo__PostCodeDataRestDetails } from './PostCodeDemo/PostCodeDemo.rests';

export function restUrlMutator ( r: RestAction, url: string ): string { return insertBefore ( '?', r === 'list' ? '/list' : '', url )}

export const restDetails: RestDetails<FState, SimpleMessage> = {
   AccountOverview__AccountAllFlagsRestDetails: AccountOverview__AccountAllFlagsRestDetails(commonIds, defaultDateFn),
   AccountOverview__ArrearsDetailsRestDetails: AccountOverview__ArrearsDetailsRestDetails(commonIds, defaultDateFn),
   AccountOverview_previous_ArrearsDetailsRestDetails: AccountOverview_previous_ArrearsDetailsRestDetails(commonIds, defaultDateFn),
   AccountOverview__AccountOverviewHistoryRestDetails: AccountOverview__AccountOverviewHistoryRestDetails(commonIds, defaultDateFn),
   AccountOverview__AccountOverviewExcessInfoRestDetails: AccountOverview__AccountOverviewExcessInfoRestDetails(commonIds, defaultDateFn),
   AccountOverview__AccountOverviewRestDetails: AccountOverview__AccountOverviewRestDetails(commonIds, defaultDateFn),
   AccountOverview__AccountOverviewReasonRestDetails: AccountOverview__AccountOverviewReasonRestDetails(commonIds, defaultDateFn),
   JointAccount__JointAccountRestDetails: JointAccount__JointAccountRestDetails(commonIds, defaultDateFn),
   OccupationAndIncomeSummary__AdditionalInformationRestDetails: OccupationAndIncomeSummary__AdditionalInformationRestDetails(commonIds, defaultDateFn),
   OccupationAndIncomeSummary__BusinessDetailsMainRestDetails: OccupationAndIncomeSummary__BusinessDetailsMainRestDetails(commonIds, defaultDateFn),
   OccupationAndIncomeSummary__DropdownsRestDetails: OccupationAndIncomeSummary__DropdownsRestDetails(commonIds, defaultDateFn),
   OccupationAndIncomeSummary__OccupationAndIncomeFullDomainRestDetails: OccupationAndIncomeSummary__OccupationAndIncomeFullDomainRestDetails(commonIds, defaultDateFn),
   OccupationAndIncomeSummary__OtherIncomeResponseRestDetails: OccupationAndIncomeSummary__OtherIncomeResponseRestDetails(commonIds, defaultDateFn),
   EAccountsSummary__CreatePlanRestDetails: EAccountsSummary__CreatePlanRestDetails(commonIds, defaultDateFn),
   EAccountsSummary__EAccountsSummaryRestDetails: EAccountsSummary__EAccountsSummaryRestDetails(commonIds, defaultDateFn),
   ETransfer__ETransferDataDRestDetails: ETransfer__ETransferDataDRestDetails(commonIds, defaultDateFn),
   CreateEAccount__CreateEAccountDataRestDetails: CreateEAccount__CreateEAccountDataRestDetails(commonIds, defaultDateFn),
   ChequeCreditbooks__ChequeCreditbooksRestDetails: ChequeCreditbooks__ChequeCreditbooksRestDetails(commonIds, defaultDateFn),
   Repeating__RepeatingWholeDataRestDetails: Repeating__RepeatingWholeDataRestDetails(commonIds, defaultDateFn),
   PostCodeDemo__PostCodeNameAndAddressRestDetails: PostCodeDemo__PostCodeNameAndAddressRestDetails(commonIds, defaultDateFn),
   PostCodeDemo__PostCodeDataRestDetails: PostCodeDemo__PostCodeDataRestDetails(commonIds, defaultDateFn)

}
