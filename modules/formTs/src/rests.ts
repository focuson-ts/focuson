import { RestDetails, OneRestDetails } from "@focuson/rest"
import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils"
import { Lenses, NameAndLens} from "@focuson/lens"
import { FState , commonIds} from "./common";

import { OccupationAndIncomeSummary_OccupationAndIncomeDetailsDDRestDetails } from './OccupationAndIncomeSummary/rests';
import { EAccountsSummary_CreatePlanDDRestDetails } from './EAccountsSummary/rests';
import { EAccountsSummary_EAccountsSummaryDDRestDetails } from './EAccountsSummary/rests';
import { ETransfer_ETransferDataDRestDetails } from './ETransfer/rests';
import { CreateEAccount_CreateEAccountDataDDRestDetails } from './CreateEAccount/rests';
import { ChequeCreditbooks_ChequeCreditbooksDDRestDetails } from './ChequeCreditbooks/rests';
export const restDetails: RestDetails<FState, SimpleMessage> = {
   OccupationAndIncomeSummary_OccupationAndIncomeDetailsDDRestDetails: OccupationAndIncomeSummary_OccupationAndIncomeDetailsDDRestDetails(commonIds, defaultDateFn),
   EAccountsSummary_CreatePlanDDRestDetails: EAccountsSummary_CreatePlanDDRestDetails(commonIds, defaultDateFn),
   EAccountsSummary_EAccountsSummaryDDRestDetails: EAccountsSummary_EAccountsSummaryDDRestDetails(commonIds, defaultDateFn),
   ETransfer_ETransferDataDRestDetails: ETransfer_ETransferDataDRestDetails(commonIds, defaultDateFn),
   CreateEAccount_CreateEAccountDataDDRestDetails: CreateEAccount_CreateEAccountDataDDRestDetails(commonIds, defaultDateFn),
   ChequeCreditbooks_ChequeCreditbooksDDRestDetails: ChequeCreditbooks_ChequeCreditbooksDDRestDetails(commonIds, defaultDateFn)

}
