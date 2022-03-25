import * as common from '../common';
import * as domains from '../JointAccount/JointAccount.domains'
import { HasTagHolder } from "@focuson/template";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';
import { pageAndTagFetcher } from "@focuson/focuson";
import { FState } from "../common";
import { Optional, Lenses, NameAndLens} from '@focuson/lens';
//fetcher type true
export function JointAccountFetcher(fdLens:Optional<FState, domains.JointAccountPageDomain>,commonIds: NameAndLens<FState>) {
  const localIds = {}
  return pageAndTagFetcher<FState, domains.JointAccountPageDomain, domains.JointAccountDomain, SimpleMessage>(
    common.commonFetch<FState,  domains.JointAccountDomain>(),
     'JointAccount',
     '~/fromApi', fdLens, commonIds, localIds,["customerId"],[],
      lens: pageState - ~/fromApi,
     '/api/jointAccount?{query}')
}