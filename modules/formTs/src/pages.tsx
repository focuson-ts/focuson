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
import { PostCodeDemoPage } from './PostCodeDemo/PostCodeDemo.render';
import { PostCodeSearchPage } from './PostCodeSearch/PostCodeSearch.render';

function MyLoading () {
      return <p>Loading</p>
}
const simpleMessagesConfig = simpleMessagesPageConfig<FState, string, Context> (  MyLoading )
const identity = identityOptics<FState> ();
export const pages: MultiPageDetails<FState, Context> = {
    OccupationAndIncomeSummary: {pageType: 'MainPage',  config: simpleMessagesConfig, lens: identity.focusQuery ( 'OccupationAndIncomeSummary' ), pageFunction: OccupationAndIncomeSummaryPage(), initialValue: {"selectedItem":0} },
    EAccountsSummary: {pageType: 'MainPage',  config: simpleMessagesConfig, lens: identity.focusQuery ( 'EAccountsSummary' ), pageFunction: EAccountsSummaryPage(), initialValue: {} },
    ETransfer: {pageType: 'MainPage',  config: simpleMessagesConfig, lens: identity.focusQuery ( 'ETransfer' ), pageFunction: ETransferPage(), initialValue: {"fromApi":{}} },
    CreateEAccount: {pageType: 'MainPage',  config: simpleMessagesConfig, lens: identity.focusQuery ( 'CreateEAccount' ), pageFunction: CreateEAccountPage(), initialValue: {"editing":{"name":"","type":"savings","savingsStyle":"adhoc","initialAmount":0}} },
    ChequeCreditbooks: {pageType: 'MainPage',  config: simpleMessagesConfig, lens: identity.focusQuery ( 'ChequeCreditbooks' ), pageFunction: ChequeCreditbooksPage(), initialValue: {} },
    Repeating: {pageType: 'MainPage',  config: simpleMessagesConfig, lens: identity.focusQuery ( 'Repeating' ), pageFunction: RepeatingPage(), initialValue: {} },
    PostCodeDemo: {pageType: 'MainPage',  config: simpleMessagesConfig, lens: identity.focusQuery ( 'PostCodeDemo' ), pageFunction: PostCodeDemoPage(), initialValue: {"main":{},"postcode":{"search":"","searchResults":[],"addressResults":{"line1":"","line2":"","line3":"","line4":""}}} },
    OccupationIncomeModalPD: {pageType: 'ModalPage',  config: simpleMessagesConfig,  pageFunction: OccupationIncomeModalPDPage()},
    ListOccupationsModal: {pageType: 'ModalPage',  config: simpleMessagesConfig,  pageFunction: ListOccupationsModalPage()},
    CreatePlan: {pageType: 'ModalPage',  config: simpleMessagesConfig,  pageFunction: CreatePlanPage()},
    OrderChequeBookOrPayingInModal: {pageType: 'ModalPage',  config: simpleMessagesConfig,  pageFunction: OrderChequeBookOrPayingInModalPage()},
    RepeatingLine: {pageType: 'ModalPage',  config: simpleMessagesConfig,  pageFunction: RepeatingLinePage()},
    PostCodeSearch: {pageType: 'ModalPage',  config: simpleMessagesConfig,  pageFunction: PostCodeSearchPage()}
  }