import * as common from './common';
import { AdditionalInformationFetcher } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.fetchers';
import { BusinessDetailsMainFetcher } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.fetchers';
import { DropdownsFetcher } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.fetchers';
import { OccupationAndIncomeFullDomainFetcher } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.fetchers';
import { OtherIncomeResponseFetcher } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.fetchers';
import { EAccountsSummaryFetcher } from './EAccountsSummary/EAccountsSummary.fetchers';
import { ChequeCreditbooksFetcher } from './ChequeCreditbooks/ChequeCreditbooks.fetchers';
import { RepeatingWholeDataFetcher } from './Repeating/Repeating.fetchers';
import { PostCodeDataFetcher } from './PostCodeDemo/PostCodeDemo.fetchers';
import { FetcherTree,  } from "@focuson/fetcher";
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { commonIds, identityL } from './common';
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
export const fetchers: FetcherTree<common.FState> = {
fetchers: [
    AdditionalInformationFetcher( identityL.focusQuery ( 'OccupationAndIncomeSummary' ), commonIds ),
    BusinessDetailsMainFetcher( identityL.focusQuery ( 'OccupationAndIncomeSummary' ), commonIds ),
    DropdownsFetcher( identityL.focusQuery ( 'OccupationAndIncomeSummary' ), commonIds ),
    OccupationAndIncomeFullDomainFetcher( identityL.focusQuery ( 'OccupationAndIncomeSummary' ), commonIds ),
    OtherIncomeResponseFetcher( identityL.focusQuery ( 'OccupationAndIncomeSummary' ), commonIds ),
    EAccountsSummaryFetcher( identityL.focusQuery ( 'EAccountsSummary' ), commonIds ),
    ChequeCreditbooksFetcher( identityL.focusQuery ( 'ChequeCreditbooks' ), commonIds ),
    RepeatingWholeDataFetcher( identityL.focusQuery ( 'Repeating' ), commonIds ),
    PostCodeDataFetcher( identityL.focusQuery ( 'PostCodeDemo' ), commonIds )
],
children: []}