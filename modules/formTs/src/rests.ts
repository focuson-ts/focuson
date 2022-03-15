import { RestDetails, OneRestDetails } from "@focuson/rest"
import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"
import { FState , commonIds} from "./common";

import { OccupationAndIncomeSummary_OccupationAndIncomeDetailsDDRestDetails } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.rests';
import { OccupationAndIncomeSummary_OtherIncomeResponseDDRestDetails } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.rests';
import { EAccountsSummary_CreatePlanDDRestDetails } from './EAccountsSummary/EAccountsSummary.rests';
import { EAccountsSummary_EAccountsSummaryDDRestDetails } from './EAccountsSummary/EAccountsSummary.rests';
import { ETransfer_ETransferDataDRestDetails } from './ETransfer/ETransfer.rests';
import { CreateEAccount_CreateEAccountDataDDRestDetails } from './CreateEAccount/CreateEAccount.rests';
import { ChequeCreditbooks_ChequeCreditbooksDDRestDetails } from './ChequeCreditbooks/ChequeCreditbooks.rests';
import { Repeating_RepeatingWholeDataRestDetails } from './Repeating/Repeating.rests';
import { PostCodeDemo_PostCodeMainPageRestDetails } from './PostCodeDemo/PostCodeDemo.rests';
import { PostCodeDemo_PostCodeDataRestDetails } from './PostCodeDemo/PostCodeDemo.rests';
export const restDetails: RestDetails<FState, SimpleMessage> = {
   OccupationAndIncomeSummary_OccupationAndIncomeDetailsDDRestDetails: OccupationAndIncomeSummary_OccupationAndIncomeDetailsDDRestDetails(commonIds, defaultDateFn),
   OccupationAndIncomeSummary_OtherIncomeResponseDDRestDetails: OccupationAndIncomeSummary_OtherIncomeResponseDDRestDetails(commonIds, defaultDateFn),
   EAccountsSummary_CreatePlanDDRestDetails: EAccountsSummary_CreatePlanDDRestDetails(commonIds, defaultDateFn),
   EAccountsSummary_EAccountsSummaryDDRestDetails: EAccountsSummary_EAccountsSummaryDDRestDetails(commonIds, defaultDateFn),
   ETransfer_ETransferDataDRestDetails: ETransfer_ETransferDataDRestDetails(commonIds, defaultDateFn),
   CreateEAccount_CreateEAccountDataDDRestDetails: CreateEAccount_CreateEAccountDataDDRestDetails(commonIds, defaultDateFn),
   ChequeCreditbooks_ChequeCreditbooksDDRestDetails: ChequeCreditbooks_ChequeCreditbooksDDRestDetails(commonIds, defaultDateFn),
   Repeating_RepeatingWholeDataRestDetails: Repeating_RepeatingWholeDataRestDetails(commonIds, defaultDateFn),
   PostCodeDemo_PostCodeMainPageRestDetails: PostCodeDemo_PostCodeMainPageRestDetails(commonIds, defaultDateFn),
   PostCodeDemo_PostCodeDataRestDetails: PostCodeDemo_PostCodeDataRestDetails(commonIds, defaultDateFn)

}
