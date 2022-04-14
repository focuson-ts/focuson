import { identityOptics } from "@focuson/lens";
import { Loading, MultiPageDetails, simpleMessagesPageConfig } from "@focuson/pages";
import {Context,  FState } from "./common";
import { HelloWorldMainPagePage } from './HelloWorldMainPage/HelloWorldMainPage.render';
import { AccountOverviewPage } from './AccountOverview/AccountOverview.render';
import { ExcessInfoSearchPage } from './AccountOverview/ExcessInfoSearch.render';
import { ReasonPage } from './AccountOverview/Reason.render';
import { ExcessHistoryPage } from './AccountOverview/ExcessHistory.render';
import { ArrearsDetailsPage } from './AccountOverview/ArrearsDetails.render';
import { AccountFlagsPage } from './AccountOverview/AccountFlags.render';
import { OptOutPage } from './AccountOverview/OptOut.render';
import { AgreementTypePage } from './AccountOverview/AgreementType.render';
import { JointAccountPage } from './JointAccount/JointAccount.render';
import { JointAccountEditModalPagePage } from './JointAccount/JointAccountEditModalPage.render';
import { OccupationAndIncomeSummaryPage } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.render';
import { OccupationIncomeModalPage } from './OccupationAndIncomeSummary/OccupationIncomeModal.render';
import { AdditionalInformationModalPage } from './OccupationAndIncomeSummary/AdditionalInformationModal.render';
import { BusinessDetailsModalPage } from './OccupationAndIncomeSummary/BusinessDetailsModal.render';
import { OtherSourcesOfIncomeModalPage } from './OccupationAndIncomeSummary/OtherSourcesOfIncomeModal.render';
import { ListOccupationsModalPage } from './OccupationAndIncomeSummary/ListOccupationsModal.render';
import { EAccountsSummaryPage } from './EAccountsSummary/EAccountsSummary.render';
import { CreatePlanPage } from './EAccountsSummary/CreatePlan.render';
import { ETransferPage } from './ETransfer/ETransfer.render';
import { CreateEAccountPage } from './CreateEAccount/CreateEAccount.render';
import { ChequeCreditbooksPage } from './ChequeCreditbooks/ChequeCreditbooks.render';
import { OrderChequeBookOrPayingInModalPage } from './ChequeCreditbooks/OrderChequeBookOrPayingInModal.render';
import { RepeatingPage } from './Repeating/Repeating.render';
import { RepeatingLinePage } from './Repeating/RepeatingLine.render';
import { PostCodeMainPagePage } from './PostCodeMainPage/PostCodeMainPage.render';
import { PostCodeSearchPage } from './PostCodeMainPage/PostCodeSearch.render';
import { HelloWorldMainPageOptionals } from "./HelloWorldMainPage/HelloWorldMainPage.optionals"; 
import { AccountOverviewOptionals } from "./AccountOverview/AccountOverview.optionals"; 
import { JointAccountOptionals } from "./JointAccount/JointAccount.optionals"; 
import { OccupationAndIncomeSummaryOptionals } from "./OccupationAndIncomeSummary/OccupationAndIncomeSummary.optionals"; 
import { EAccountsSummaryOptionals } from "./EAccountsSummary/EAccountsSummary.optionals"; 
import { ETransferOptionals } from "./ETransfer/ETransfer.optionals"; 
import { CreateEAccountOptionals } from "./CreateEAccount/CreateEAccount.optionals"; 
import { ChequeCreditbooksOptionals } from "./ChequeCreditbooks/ChequeCreditbooks.optionals"; 
import { RepeatingOptionals } from "./Repeating/Repeating.optionals"; 
import { PostCodeMainPageOptionals } from "./PostCodeMainPage/PostCodeMainPage.optionals"; 

const simpleMessagesConfig = simpleMessagesPageConfig<FState, string, Context> (  Loading )
const identity = identityOptics<FState> ();
export const pages: MultiPageDetails<FState, Context> = {
    HelloWorldMainPage: {pageType: 'MainPage',  config: simpleMessagesConfig, lens: identity.focusQuery ( 'HelloWorldMainPage' ), pageFunction: HelloWorldMainPagePage(), initialValue: {"fromApi":{"message":""}}, pageMode: 'view',namedOptionals: HelloWorldMainPageOptionals },
    AccountOverview: {pageType: 'MainPage',  config: simpleMessagesConfig, lens: identity.focusQuery ( 'AccountOverview' ), pageFunction: AccountOverviewPage(), initialValue: {}, pageMode: 'view',namedOptionals: AccountOverviewOptionals },
    JointAccount: {pageType: 'MainPage',  config: simpleMessagesConfig, lens: identity.focusQuery ( 'JointAccount' ), pageFunction: JointAccountPage(), initialValue: {"joint":false}, pageMode: 'view',namedOptionals: JointAccountOptionals },
    OccupationAndIncomeSummary: {pageType: 'MainPage',  config: simpleMessagesConfig, lens: identity.focusQuery ( 'OccupationAndIncomeSummary' ), pageFunction: OccupationAndIncomeSummaryPage(), initialValue: {"selectedItem":0,"occupation":{"search":"","selectedOccupationName":"","searchResults":[]},"mainOrJoint":false}, pageMode: 'view',namedOptionals: OccupationAndIncomeSummaryOptionals },
    EAccountsSummary: {pageType: 'MainPage',  config: simpleMessagesConfig, lens: identity.focusQuery ( 'EAccountsSummary' ), pageFunction: EAccountsSummaryPage(), initialValue: {}, pageMode: 'view',namedOptionals: EAccountsSummaryOptionals },
    ETransfer: {pageType: 'MainPage',  config: simpleMessagesConfig, lens: identity.focusQuery ( 'ETransfer' ), pageFunction: ETransferPage(), initialValue: {"fromApi":{}}, pageMode: 'create',namedOptionals: ETransferOptionals },
    CreateEAccount: {pageType: 'MainPage',  config: simpleMessagesConfig, lens: identity.focusQuery ( 'CreateEAccount' ), pageFunction: CreateEAccountPage(), initialValue: {"editing":{"name":"","type":"savings","savingsStyle":"adhoc","initialAmount":0}}, pageMode: 'create',namedOptionals: CreateEAccountOptionals },
    ChequeCreditbooks: {pageType: 'MainPage',  config: simpleMessagesConfig, lens: identity.focusQuery ( 'ChequeCreditbooks' ), pageFunction: ChequeCreditbooksPage(), initialValue: {}, pageMode: 'view',namedOptionals: ChequeCreditbooksOptionals },
    Repeating: {pageType: 'MainPage',  config: simpleMessagesConfig, lens: identity.focusQuery ( 'Repeating' ), pageFunction: RepeatingPage(), initialValue: {"selectedItem":0}, pageMode: 'view',namedOptionals: RepeatingOptionals },
    PostCodeMainPage: {pageType: 'MainPage',  config: simpleMessagesConfig, lens: identity.focusQuery ( 'PostCodeMainPage' ), pageFunction: PostCodeMainPagePage(), initialValue: {"main":{},"postcode":{"search":"","searchResults":[],"addressResults":{"line1":"","line2":"","line3":"","line4":""}}}, pageMode: 'edit',namedOptionals: PostCodeMainPageOptionals },
    ExcessInfoSearch: {pageType: 'ModalPage',  config: simpleMessagesConfig,  pageFunction: ExcessInfoSearchPage()},
    Reason: {pageType: 'ModalPage',  config: simpleMessagesConfig,  pageFunction: ReasonPage()},
    ExcessHistory: {pageType: 'ModalPage',  config: simpleMessagesConfig,  pageFunction: ExcessHistoryPage()},
    ArrearsDetails: {pageType: 'ModalPage',  config: simpleMessagesConfig,  pageFunction: ArrearsDetailsPage()},
    AccountFlags: {pageType: 'ModalPage',  config: simpleMessagesConfig,  pageFunction: AccountFlagsPage()},
    OptOut: {pageType: 'ModalPage',  config: simpleMessagesConfig,  pageFunction: OptOutPage()},
    AgreementType: {pageType: 'ModalPage',  config: simpleMessagesConfig,  pageFunction: AgreementTypePage()},
    JointAccountEditModalPage: {pageType: 'ModalPage',  config: simpleMessagesConfig,  pageFunction: JointAccountEditModalPagePage()},
    OccupationIncomeModal: {pageType: 'ModalPage',  config: simpleMessagesConfig,  pageFunction: OccupationIncomeModalPage()},
    AdditionalInformationModal: {pageType: 'ModalPage',  config: simpleMessagesConfig,  pageFunction: AdditionalInformationModalPage()},
    BusinessDetailsModal: {pageType: 'ModalPage',  config: simpleMessagesConfig,  pageFunction: BusinessDetailsModalPage()},
    OtherSourcesOfIncomeModal: {pageType: 'ModalPopup',  config: simpleMessagesConfig,  pageFunction: OtherSourcesOfIncomeModalPage()},
    ListOccupationsModal: {pageType: 'ModalPopup',  config: simpleMessagesConfig,  pageFunction: ListOccupationsModalPage()},
    CreatePlan: {pageType: 'ModalPage',  config: simpleMessagesConfig,  pageFunction: CreatePlanPage()},
    OrderChequeBookOrPayingInModal: {pageType: 'ModalPage',  config: simpleMessagesConfig,  pageFunction: OrderChequeBookOrPayingInModalPage()},
    RepeatingLine: {pageType: 'ModalPage',  config: simpleMessagesConfig,  pageFunction: RepeatingLinePage()},
    PostCodeSearch: {pageType: 'ModalPage',  config: simpleMessagesConfig,  pageFunction: PostCodeSearchPage()}
  }