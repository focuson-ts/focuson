import { identityOptics } from "@focuson/lens";
import { MultiPageDetails, simpleMessagesPageConfig } from "@focuson/pages";
import {Context,  FState } from "./common";
import * as render from"./render";
import { OccupationAndIncomeDetailsPage,EAccountsSummaryPage,ETransferPage,CreateEAccountPage } from "./render";

function MyLoading () {
      return <p>Loading</p>
}
const simpleMessagesConfig = simpleMessagesPageConfig<FState, string, Context> (  MyLoading )
const identity = identityOptics<FState> ();
export const pages: MultiPageDetails<FState, Context> = {
    OccupationAndIncomeDetails: { config: simpleMessagesConfig, lens: identity.focusQuery ( 'OccupationAndIncomeDetails' ), pageFunction: OccupationAndIncomeDetailsPage(), initialValue: {} },
    EAccountsSummary: { config: simpleMessagesConfig, lens: identity.focusQuery ( 'EAccountsSummary' ), pageFunction: EAccountsSummaryPage(), initialValue: {} },
    ETransfer: { config: simpleMessagesConfig, lens: identity.focusQuery ( 'ETransfer' ), pageFunction: ETransferPage(), initialValue: {"fromApi":{"amount":"","dateOfETransfer":"","description":"","fromAccount":"","toAccount":"","monitoringAccount":"","type":"","balance":"","notes":""}} },
    CreateEAccount: { config: simpleMessagesConfig, lens: identity.focusQuery ( 'CreateEAccount' ), pageFunction: CreateEAccountPage(), initialValue: {"editing":{"name":"","type":"","savingsStyle":"","initialAmount":""}} },
    CreatePlan: { config: simpleMessagesConfig,  pageFunction: render.CreatePlanPage(), modal: true}
  }