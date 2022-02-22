import { identityOptics } from "@focuson/lens";
import { MultiPageDetails, simpleMessagesPageConfig } from "@focuson/pages";
import { modals, Modals } from "./modals";
import { FState } from "./common";
import { OccupationAndIncomeDetailsPage,EAccountsSummaryPage,ETransferPage,CreateEAccountPage } from "./render";

function MyLoading () {
      return <p>Loading</p>
}
const simpleMessagesConfig = simpleMessagesPageConfig<FState, string, Modals> ( modals, MyLoading )
export const pages: MultiPageDetails<FState, any> = {
    OccupationAndIncomeDetails: { config: simpleMessagesConfig, lens: identityOptics<FState> ().focusQuery ( 'OccupationAndIncomeDetails' ), pageFunction: OccupationAndIncomeDetailsPage(), initialValue: {} },
    EAccountsSummary: { config: simpleMessagesConfig, lens: identityOptics<FState> ().focusQuery ( 'EAccountsSummary' ), pageFunction: EAccountsSummaryPage(), initialValue: {} },
    ETransfer: { config: simpleMessagesConfig, lens: identityOptics<FState> ().focusQuery ( 'ETransfer' ), pageFunction: ETransferPage(), initialValue: {"fromApi":{"amount":"","dateOfETransfer":"","description":"","fromAccount":"","toAccount":"","monitoringAccount":"","type":"","balance":"","notes":""}} },
    CreateEAccount: { config: simpleMessagesConfig, lens: identityOptics<FState> ().focusQuery ( 'CreateEAccount' ), pageFunction: CreateEAccountPage(), initialValue: {"editing":{"name":"","type":"","savingsStyle":"","initialAmount":""}} }
  }