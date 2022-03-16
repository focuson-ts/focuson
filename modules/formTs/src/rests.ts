import { RestDetails, OneRestDetails } from "@focuson/rest"
import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"
import { FState , commonIds} from "./common";

import { OccupationAndIncomeSummary_AdditionalInformationRestDetails } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.rests';
import { OccupationAndIncomeSummary_BusinessDetailsMainRestDetails } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.rests';
import { OccupationAndIncomeSummary_DropdownsRestDetails } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.rests';
import { OccupationAndIncomeSummary_OccupationAndIncomeFullDomainRestDetails } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.rests';
import { OccupationAndIncomeSummary_OtherIncomeResponseRestDetails } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.rests';
import { EAccountsSummary_CreatePlanRestDetails } from './EAccountsSummary/EAccountsSummary.rests';
import { EAccountsSummary_EAccountsSummaryRestDetails } from './EAccountsSummary/EAccountsSummary.rests';
import { ETransfer_ETransferDataDRestDetails } from './ETransfer/ETransfer.rests';
import { CreateEAccount_CreateEAccountDataRestDetails } from './CreateEAccount/CreateEAccount.rests';
import { ChequeCreditbooks_ChequeCreditbooksRestDetails } from './ChequeCreditbooks/ChequeCreditbooks.rests';
import { Repeating_RepeatingWholeDataRestDetails } from './Repeating/Repeating.rests';
import { PostCodeDemo_PostCodeMainPageRestDetails } from './PostCodeDemo/PostCodeDemo.rests';
import { PostCodeDemo_PostCodeDataRestDetails } from './PostCodeDemo/PostCodeDemo.rests';
export const restDetails: RestDetails<FState, SimpleMessage> = {
   OccupationAndIncomeSummary_AdditionalInformationRestDetails: OccupationAndIncomeSummary_AdditionalInformationRestDetails(commonIds, defaultDateFn),
   OccupationAndIncomeSummary_BusinessDetailsMainRestDetails: OccupationAndIncomeSummary_BusinessDetailsMainRestDetails(commonIds, defaultDateFn),
   OccupationAndIncomeSummary_DropdownsRestDetails: OccupationAndIncomeSummary_DropdownsRestDetails(commonIds, defaultDateFn),
   OccupationAndIncomeSummary_OccupationAndIncomeFullDomainRestDetails: OccupationAndIncomeSummary_OccupationAndIncomeFullDomainRestDetails(commonIds, defaultDateFn),
   OccupationAndIncomeSummary_OtherIncomeResponseRestDetails: OccupationAndIncomeSummary_OtherIncomeResponseRestDetails(commonIds, defaultDateFn),
   EAccountsSummary_CreatePlanRestDetails: EAccountsSummary_CreatePlanRestDetails(commonIds, defaultDateFn),
   EAccountsSummary_EAccountsSummaryRestDetails: EAccountsSummary_EAccountsSummaryRestDetails(commonIds, defaultDateFn),
   ETransfer_ETransferDataDRestDetails: ETransfer_ETransferDataDRestDetails(commonIds, defaultDateFn),
   CreateEAccount_CreateEAccountDataRestDetails: CreateEAccount_CreateEAccountDataRestDetails(commonIds, defaultDateFn),
   ChequeCreditbooks_ChequeCreditbooksRestDetails: ChequeCreditbooks_ChequeCreditbooksRestDetails(commonIds, defaultDateFn),
   Repeating_RepeatingWholeDataRestDetails: Repeating_RepeatingWholeDataRestDetails(commonIds, defaultDateFn),
   PostCodeDemo_PostCodeMainPageRestDetails: PostCodeDemo_PostCodeMainPageRestDetails(commonIds, defaultDateFn),
   PostCodeDemo_PostCodeDataRestDetails: PostCodeDemo_PostCodeDataRestDetails(commonIds, defaultDateFn)

}
