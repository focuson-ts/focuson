import { identityOptics } from "@focuson/lens";
import { ModalPagesDetails, MultiPageDetails, simpleMessagesPageConfig } from "@focuson/pages";
import { FState } from "./common";
import { OccupationAndIncomeDetailsPage,EAccountsSummaryPage,ETransferPage,CreateEAccountPage } from "./render";
function MyLoading () {
      return <p>Loading</p>
}
export const modals: ModalPagesDetails<FState> = {}
export type Modals = typeof modals
const simpleMessagesConfig = simpleMessagesPageConfig<FState, string, Modals> ( modals, MyLoading )
export const pages: MultiPageDetails<FState, any> = {
    OccupationAndIncomeDetails: { config: simpleMessagesConfig, lens: identityOptics<FState> ().focusQuery ( 'OccupationAndIncomeDetails' ), pageFunction: OccupationAndIncomeDetailsPage(), initialValue: {} },
    EAccountsSummary: { config: simpleMessagesConfig, lens: identityOptics<FState> ().focusQuery ( 'EAccountsSummary' ), pageFunction: EAccountsSummaryPage(), initialValue: {} },
    ETransfer: { config: simpleMessagesConfig, lens: identityOptics<FState> ().focusQuery ( 'ETransfer' ), pageFunction: ETransferPage(), initialValue: {"fromApi":{"amount":"","dateOfETransfer":"","description":"","fromAccount":"","toAccount":"","type":"","balance":"","notes":""}} },
    CreateEAccount: { config: simpleMessagesConfig, lens: identityOptics<FState> ().focusQuery ( 'CreateEAccount' ), pageFunction: CreateEAccountPage(), initialValue: {"editing":{"name":"","type":"","savingsStyle":"","initialAmount":""}} }
  }