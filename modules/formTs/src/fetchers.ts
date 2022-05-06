import * as common from './common';
import { HelloWorldDomainDataFetcher } from './HelloWorldMainPage/HelloWorldMainPage.fetchers';
import { CollectionsListFetcher } from './LinkedAccountDetails/LinkedAccountDetails.fetchers';
import { CollectionSummaryFetcher } from './LinkedAccountDetails/LinkedAccountDetails.fetchers';
import { MandateListFetcher } from './LinkedAccountDetails/LinkedAccountDetails.fetchers';
import { AccountAllFlagsFetcher } from './AccountOverview/AccountOverview.fetchers';
import { AccountOverviewAgreementTypeFetcher } from './AccountOverview/AccountOverview.fetchers';
import { ArrearsDetailsFetcher } from './AccountOverview/AccountOverview.fetchers';
import { AccountOverviewHistoryFetcher } from './AccountOverview/AccountOverview.fetchers';
import { AccountOverviewExcessInfoFetcher } from './AccountOverview/AccountOverview.fetchers';
import { AccountOverviewFetcher } from './AccountOverview/AccountOverview.fetchers';
import { AccountOverviewOptOutFetcher } from './AccountOverview/AccountOverview.fetchers';
import { AccountOverviewReasonFetcher } from './AccountOverview/AccountOverview.fetchers';
import { pre_JointAccountFetcher } from './JointAccount/JointAccount.fetchers';
import { AdditionalInformationFetcher } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.fetchers';
import { BusinessDetailsMainFetcher } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.fetchers';
import { DropdownsFetcher } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.fetchers';
import { OccupationAndIncomeFullDomainFetcher } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.fetchers';
import { OtherIncomeResponseFetcher } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.fetchers';
import { EAccountsSummaryFetcher } from './EAccountsSummary/EAccountsSummary.fetchers';
import { ChequeCreditbooksFetcher } from './ChequeCreditbooks/ChequeCreditbooks.fetchers';
import { RepeatingWholeDataFetcher } from './Repeating/Repeating.fetchers';
import { PostCodeDataFetcher } from './PostCodeMainPage/PostCodeMainPage.fetchers';
import { FetcherTree,  } from "@focuson/fetcher";
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { commonIds, identityL } from './common';
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
export const fetchers: FetcherTree<common.FState> = {
fetchers: [
    HelloWorldDomainDataFetcher( identityL.focusQuery ( 'HelloWorldMainPage' ), commonIds ),
    CollectionsListFetcher( identityL.focusQuery ( 'LinkedAccountDetails' ), commonIds ),
    CollectionSummaryFetcher( identityL.focusQuery ( 'LinkedAccountDetails' ), commonIds ),
    MandateListFetcher( identityL.focusQuery ( 'LinkedAccountDetails' ), commonIds ),
    AccountAllFlagsFetcher( identityL.focusQuery ( 'AccountOverview' ), commonIds ),
    AccountOverviewAgreementTypeFetcher( identityL.focusQuery ( 'AccountOverview' ), commonIds ),
    ArrearsDetailsFetcher( identityL.focusQuery ( 'AccountOverview' ), commonIds ),
    AccountOverviewHistoryFetcher( identityL.focusQuery ( 'AccountOverview' ), commonIds ),
    AccountOverviewExcessInfoFetcher( identityL.focusQuery ( 'AccountOverview' ), commonIds ),
    AccountOverviewFetcher( identityL.focusQuery ( 'AccountOverview' ), commonIds ),
    AccountOverviewOptOutFetcher( identityL.focusQuery ( 'AccountOverview' ), commonIds ),
    AccountOverviewReasonFetcher( identityL.focusQuery ( 'AccountOverview' ), commonIds ),
    pre_JointAccountFetcher( identityL.focusQuery ( 'JointAccount' ), commonIds ),
    AdditionalInformationFetcher( identityL.focusQuery ( 'OccupationAndIncomeSummary' ), commonIds ),
    BusinessDetailsMainFetcher( identityL.focusQuery ( 'OccupationAndIncomeSummary' ), commonIds ),
    DropdownsFetcher( identityL.focusQuery ( 'OccupationAndIncomeSummary' ), commonIds ),
    OccupationAndIncomeFullDomainFetcher( identityL.focusQuery ( 'OccupationAndIncomeSummary' ), commonIds ),
    OtherIncomeResponseFetcher( identityL.focusQuery ( 'OccupationAndIncomeSummary' ), commonIds ),
    EAccountsSummaryFetcher( identityL.focusQuery ( 'EAccountsSummary' ), commonIds ),
    ChequeCreditbooksFetcher( identityL.focusQuery ( 'ChequeCreditbooks' ), commonIds ),
    RepeatingWholeDataFetcher( identityL.focusQuery ( 'Repeating' ), commonIds ),
    PostCodeDataFetcher( identityL.focusQuery ( 'PostCodeMainPage' ), commonIds )
],
children: []}