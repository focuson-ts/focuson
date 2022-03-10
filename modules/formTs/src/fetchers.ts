import * as common from './common';
import { OccupationAndIncomeDetailsDDFetcher } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.fetchers';
import { EAccountsSummaryDDFetcher } from './EAccountsSummary/EAccountsSummary.fetchers';
import { ChequeCreditbooksHistoryDDFetcher } from './ChequeCreditbooks/ChequeCreditbooks.fetchers';
import { FetcherTree,  } from "@focuson/fetcher";
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { commonIds, identityL } from './common';
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
export const fetchers: FetcherTree<common.FState> = {
fetchers: [
    OccupationAndIncomeDetailsDDFetcher<common.FState> ( identityL.focusQuery ( 'OccupationAndIncomeSummary' ), commonIds ),
    EAccountsSummaryDDFetcher<common.FState> ( identityL.focusQuery ( 'EAccountsSummary' ), commonIds ),
    ChequeCreditbooksHistoryDDFetcher<common.FState> ( identityL.focusQuery ( 'ChequeCreditbooks' ), commonIds )
],
children: []}