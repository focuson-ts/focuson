import { identityOptics } from "@focuson/lens";
import { MultiPageDetails, simpleMessagesPageConfig } from "@focuson/pages";
import {Context,  FState } from "./common";
import { OccupationAndIncomeSummaryPage } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.render';
import { OccupationIncomeModalPDPage } from './OccupationIncomeModalPD/OccupationIncomeModalPD.render';
import { OtherSourcesOfIncomeModalPDPage } from './OtherSourcesOfIncomeModalPD/OtherSourcesOfIncomeModalPD.render';
import { ListOccupationsModalPage } from './ListOccupationsModal/ListOccupationsModal.render';
import { EAccountsSummaryPage } from './EAccountsSummary/EAccountsSummary.render';
import { CreatePlanPage } from './CreatePlan/CreatePlan.render';
import { ETransferPage } from './ETransfer/ETransfer.render';
import { CreateEAccountPage } from './CreateEAccount/CreateEAccount.render';
import { ChequeCreditbooksPage } from './ChequeCreditbooks/ChequeCreditbooks.render';
import { OrderChequeBookOrPayingInModalPage } from './OrderChequeBookOrPayingInModal/OrderChequeBookOrPayingInModal.render';
import { RepeatingLinePage } from './RepeatingLine/RepeatingLine.render';
import { RepeatingPage } from './Repeating/Repeating.render';

function MyLoading () {
      return <p>Loading</p>
}
const simpleMessagesConfig = simpleMessagesPageConfig<FState, string, Context> (  MyLoading )
const identity = identityOptics<FState> ();
export const pages: MultiPageDetails<FState, Context> = {
    OccupationAndIncomeSummary: { config: simpleMessagesConfig, lens: identity.focusQuery ( 'OccupationAndIncomeSummary' ), pageFunction: OccupationAndIncomeSummaryPage(), initialValue: {"selectedItem":0} },
    EAccountsSummary: { config: simpleMessagesConfig, lens: identity.focusQuery ( 'EAccountsSummary' ), pageFunction: EAccountsSummaryPage(), initialValue: {} },
    ETransfer: { config: simpleMessagesConfig, lens: identity.focusQuery ( 'ETransfer' ), pageFunction: ETransferPage(), initialValue: {"fromApi":{}} },
    CreateEAccount: { config: simpleMessagesConfig, lens: identity.focusQuery ( 'CreateEAccount' ), pageFunction: CreateEAccountPage(), initialValue: {} },
    ChequeCreditbooks: { config: simpleMessagesConfig, lens: identity.focusQuery ( 'ChequeCreditbooks' ), pageFunction: ChequeCreditbooksPage(), initialValue: {} },
    Repeating: { config: simpleMessagesConfig, lens: identity.focusQuery ( 'Repeating' ), pageFunction: RepeatingPage(), initialValue: {} },
    OccupationIncomeModalPD: { config: simpleMessagesConfig,  pageFunction: OccupationIncomeModalPDPage(), modal: true},
    ListOccupationsModal: { config: simpleMessagesConfig,  pageFunction: ListOccupationsModalPage(), modal: true},
    CreatePlan: { config: simpleMessagesConfig,  pageFunction: CreatePlanPage(), modal: true},
    OrderChequeBookOrPayingInModal: { config: simpleMessagesConfig,  pageFunction: OrderChequeBookOrPayingInModalPage(), modal: true},
    RepeatingLine: { config: simpleMessagesConfig,  pageFunction: RepeatingLinePage(), modal: true}
  }