import * as common from './common';
import { OccupationAndIncomeDetailsDDFetcher } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.fetchers';
import { EAccountsSummaryDDFetcher } from './EAccountsSummary/EAccountsSummary.fetchers';
import { ChequeCreditbooksDDFetcher } from './ChequeCreditbooks/ChequeCreditbooks.fetchers';
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
    OccupationAndIncomeDetailsDDFetcher( identityL.focusQuery ( 'OccupationAndIncomeSummary' ), commonIds ),
    EAccountsSummaryDDFetcher( identityL.focusQuery ( 'EAccountsSummary' ), commonIds ),
    ChequeCreditbooksDDFetcher( identityL.focusQuery ( 'ChequeCreditbooks' ), commonIds ),
    RepeatingWholeDataFetcher( identityL.focusQuery ( 'Repeating' ), commonIds ),
    PostCodeDataFetcher( identityL.focusQuery ( 'PostCodeDemo' ), commonIds )
],
children: []}