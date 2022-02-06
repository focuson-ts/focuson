import { HasPageSelection, HasSimpleMessages } from "@focuson/pages";
import { commonFetch, HasTagHolder, simpleTagFetcher, stateAndFromApiTagFetcher } from "./tagFetcher";
import { Lenses } from "@focuson/lens";
import { Fetcher } from "./fetchers";

export interface HasTagFetcherFullState extends HasSimpleMessages, HasTagHolder, HasPageSelection {
  fullState?: TagFetcherTestFullState
  tag1?: string,
  tag2?: string,
  target?: string
}

export const emptyTestState: HasTagFetcherFullState = {
  messages: [],
  pageSelection: { pageName: 'fullState' },
  tags: {}
}

export interface TagFetcherTestFullState {
  fromApi?: string,
  local?: string
}

export const tagFetcherTestStateL = Lenses.identity<HasTagFetcherFullState> ( 'state' )
export const simpleFetcher = simpleTagFetcher<HasTagFetcherFullState, string> (
  commonFetch (),
  'target',
  s => [ s.tag1, s.tag2 ],
  ( state: HasTagFetcherFullState ) => [ '/someUrl', { method: 'Options' } ]
)

export const stateAndFromApiFetcher: Fetcher<HasTagFetcherFullState, string> =
               stateAndFromApiTagFetcher<HasTagFetcherFullState, string> (
                 commonFetch (),
                 'fullState',
                 'fullState',
                 l => l.focusQuery ( 'fullState' ).focusQuery ( 'fromApi' ),
                 s => [ s.tag1, s.tag2 ],
                 state => [ '/someUrl', { method: 'Options' } ]
               )