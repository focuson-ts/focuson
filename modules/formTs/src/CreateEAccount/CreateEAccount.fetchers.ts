import * as common from '../common';
import * as domains from '../CreateEAccount/CreateEAccount.domains'
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
//fetcher type true
export function CreateEAccountDataDDFetcher<S extends  HasSimpleMessages & HasTagHolder & HasPageSelection>(fdLens:Optional<S, domains.CreateEAccountPageDomain>,commonIds: NameAndLens<S>) {
  return pageAndTagFetcher<S, domains.CreateEAccountPageDomain, domains.CreateEAccountDataDDDomain, SimpleMessage>(
    common.commonFetch<S,  domains.CreateEAccountDataDDDomain>(),
     'CreateEAccount',
     'editing', fdLens, commonIds, {},["accountId","customerId"],["createPlanId"],
      Lenses.identity< domains.CreateEAccountPageDomain> ().focusQuery ( 'editing' ),
     '/api/createEAccount/{createPlanId}?{query}')
}