import { identityOptics } from "@focuson/lens";
import { MultiPageDetails, simpleMessagesPageConfig } from "@focuson/pages";
import {Context,  FState } from "./common";
import * as render from"./render";
import { OccupationAndIncomeSummaryPage,EAccountsSummaryPage,ETransferPage,CreateEAccountPage,ChequeCreditbooksPage } from "./render";

function MyLoading () {
      return <p>Loading</p>
}
const simpleMessagesConfig = simpleMessagesPageConfig<FState, string, Context> (  MyLoading )
const identity = identityOptics<FState> ();
export const pages: MultiPageDetails<FState, Context> = {
    OccupationAndIncomeSummary: { config: simpleMessagesConfig, lens: identity.focusQuery ( 'OccupationAndIncomeSummary' ), pageFunction: OccupationAndIncomeSummaryPage(), initialValue: {"selectedItem":0} },
    EAccountsSummary: { config: simpleMessagesConfig, lens: identity.focusQuery ( 'EAccountsSummary' ), pageFunction: EAccountsSummaryPage(), initialValue: {} },
    ETransfer: { config: simpleMessagesConfig, lens: identity.focusQuery ( 'ETransfer' ), pageFunction: ETransferPage(), initialValue: {"fromApi":{"amount":"","dateOfETransfer":"2022-1-1","description":"","fromAccount":"","toAccount":"","monitoringAccount":"","type":"savings","balance":0,"notes":""}} },
    CreateEAccount: { config: simpleMessagesConfig, lens: identity.focusQuery ( 'CreateEAccount' ), pageFunction: CreateEAccountPage(), initialValue: {"editing":{"name":"","type":"savings","savingsStyle":"adhoc","initialAmount":0}} },
    ChequeCreditbooks: { config: simpleMessagesConfig, lens: identity.focusQuery ( 'ChequeCreditbooks' ), pageFunction: ChequeCreditbooksPage(), initialValue: {} },
    OccupationIncomeModalPD: { config: simpleMessagesConfig,  pageFunction: render.OccupationIncomeModalPDPage(), modal: true},
    CreatePlan: { config: simpleMessagesConfig,  pageFunction: render.CreatePlanPage(), modal: true},
    OrderChequeBookOrPayingInModal: { config: simpleMessagesConfig,  pageFunction: render.OrderChequeBookOrPayingInModalPage(), modal: true}
  }