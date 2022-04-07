import * as common from './common';
import { HelloWorldDomainDataFetcher } from './HelloWorldMainPage/HelloWorldMainPage.fetchers';
import { AccountAllFlagsFetcher } from './AccountOverview/AccountOverview.fetchers';
import { ArrearsDetailsFetcher } from './AccountOverview/AccountOverview.fetchers';
import { previous_ArrearsDetailsFetcher } from './AccountOverview/AccountOverview.fetchers';
import { AccountOverviewHistoryFetcher } from './AccountOverview/AccountOverview.fetchers';
import { AccountOverviewExcessInfoFetcher } from './AccountOverview/AccountOverview.fetchers';
import { AccountOverviewFetcher } from './AccountOverview/AccountOverview.fetchers';
import { AccountOverviewReasonFetcher } from './AccountOverview/AccountOverview.fetchers';
import { JointAccountFetcher } from './JointAccount/JointAccount.fetchers';
import { AdditionalInfoFirstFetcher } from './MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.fetchers';
import { AdditionalInfoSecondFetcher } from './MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.fetchers';
import { OccupationAndIncomeFullDomainFetcher } from './MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.fetchers';
import { ListOccupationsFetcher } from './MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.fetchers';
import { OtherIncomeResponseFetcher } from './MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.fetchers';
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
    AccountAllFlagsFetcher( identityL.focusQuery ( 'AccountOverview' ), commonIds ),
    ArrearsDetailsFetcher( identityL.focusQuery ( 'AccountOverview' ), commonIds ),
    previous_ArrearsDetailsFetcher( identityL.focusQuery ( 'AccountOverview' ), commonIds ),
    AccountOverviewHistoryFetcher( identityL.focusQuery ( 'AccountOverview' ), commonIds ),
    AccountOverviewExcessInfoFetcher( identityL.focusQuery ( 'AccountOverview' ), commonIds ),
    AccountOverviewFetcher( identityL.focusQuery ( 'AccountOverview' ), commonIds ),
    AccountOverviewReasonFetcher( identityL.focusQuery ( 'AccountOverview' ), commonIds ),
    JointAccountFetcher( identityL.focusQuery ( 'JointAccount' ), commonIds ),
    AdditionalInfoFirstFetcher( identityL.focusQuery ( 'MainOccupationDetailsPageSummary' ), commonIds ),
    AdditionalInfoSecondFetcher( identityL.focusQuery ( 'MainOccupationDetailsPageSummary' ), commonIds ),
    OccupationAndIncomeFullDomainFetcher( identityL.focusQuery ( 'MainOccupationDetailsPageSummary' ), commonIds ),
    ListOccupationsFetcher( identityL.focusQuery ( 'MainOccupationDetailsPageSummary' ), commonIds ),
    OtherIncomeResponseFetcher( identityL.focusQuery ( 'MainOccupationDetailsPageSummary' ), commonIds ),
    EAccountsSummaryFetcher( identityL.focusQuery ( 'EAccountsSummary' ), commonIds ),
    ChequeCreditbooksFetcher( identityL.focusQuery ( 'ChequeCreditbooks' ), commonIds ),
    RepeatingWholeDataFetcher( identityL.focusQuery ( 'Repeating' ), commonIds ),
    PostCodeDataFetcher( identityL.focusQuery ( 'PostCodeMainPage' ), commonIds )
],
children: []}