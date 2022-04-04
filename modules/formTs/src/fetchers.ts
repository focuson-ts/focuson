import * as common from './common';
import { _AccountAllFlagsFetcher } from './AccountOverview/AccountOverview.fetchers';
import { _ArrearsDetailsFetcher } from './AccountOverview/AccountOverview.fetchers';
import { previous_ArrearsDetailsFetcher } from './AccountOverview/AccountOverview.fetchers';
import { _AccountOverviewHistoryFetcher } from './AccountOverview/AccountOverview.fetchers';
import { _AccountOverviewExcessInfoFetcher } from './AccountOverview/AccountOverview.fetchers';
import { _AccountOverviewFetcher } from './AccountOverview/AccountOverview.fetchers';
import { _AccountOverviewReasonFetcher } from './AccountOverview/AccountOverview.fetchers';
import { _JointAccountFetcher } from './JointAccount/JointAccount.fetchers';
import { _AdditionalInformationFetcher } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.fetchers';
import { _BusinessDetailsMainFetcher } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.fetchers';
import { _DropdownsFetcher } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.fetchers';
import { _OccupationAndIncomeFullDomainFetcher } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.fetchers';
import { _OtherIncomeResponseFetcher } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.fetchers';
import { _EAccountsSummaryFetcher } from './EAccountsSummary/EAccountsSummary.fetchers';
import { _ChequeCreditbooksFetcher } from './ChequeCreditbooks/ChequeCreditbooks.fetchers';
import { _RepeatingWholeDataFetcher } from './Repeating/Repeating.fetchers';
import { _PostCodeDataFetcher } from './PostCodeDemo/PostCodeDemo.fetchers';
import { FetcherTree,  } from "@focuson/fetcher";
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { commonIds, identityL } from './common';
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
export const fetchers: FetcherTree<common.FState> = {
fetchers: [
    _AccountAllFlagsFetcher( identityL.focusQuery ( 'AccountOverview' ), commonIds ),
    _ArrearsDetailsFetcher( identityL.focusQuery ( 'AccountOverview' ), commonIds ),
    previous_ArrearsDetailsFetcher( identityL.focusQuery ( 'AccountOverview' ), commonIds ),
    _AccountOverviewHistoryFetcher( identityL.focusQuery ( 'AccountOverview' ), commonIds ),
    _AccountOverviewExcessInfoFetcher( identityL.focusQuery ( 'AccountOverview' ), commonIds ),
    _AccountOverviewFetcher( identityL.focusQuery ( 'AccountOverview' ), commonIds ),
    _AccountOverviewReasonFetcher( identityL.focusQuery ( 'AccountOverview' ), commonIds ),
    _JointAccountFetcher( identityL.focusQuery ( 'JointAccount' ), commonIds ),
    _AdditionalInformationFetcher( identityL.focusQuery ( 'OccupationAndIncomeSummary' ), commonIds ),
    _BusinessDetailsMainFetcher( identityL.focusQuery ( 'OccupationAndIncomeSummary' ), commonIds ),
    _DropdownsFetcher( identityL.focusQuery ( 'OccupationAndIncomeSummary' ), commonIds ),
    _OccupationAndIncomeFullDomainFetcher( identityL.focusQuery ( 'OccupationAndIncomeSummary' ), commonIds ),
    _OtherIncomeResponseFetcher( identityL.focusQuery ( 'OccupationAndIncomeSummary' ), commonIds ),
    _EAccountsSummaryFetcher( identityL.focusQuery ( 'EAccountsSummary' ), commonIds ),
    _ChequeCreditbooksFetcher( identityL.focusQuery ( 'ChequeCreditbooks' ), commonIds ),
    _RepeatingWholeDataFetcher( identityL.focusQuery ( 'Repeating' ), commonIds ),
    _PostCodeDataFetcher( identityL.focusQuery ( 'PostCodeDemo' ), commonIds )
],
children: []}