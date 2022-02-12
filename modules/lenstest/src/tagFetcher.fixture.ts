import { createSimpleMessage, HasPageSelection, HasSimpleMessages, SimpleMessage } from "@focuson/pages";
import { commonTagFetchProps, HasTagHolder, pageAndTagFetcher, simpleTagFetcher } from "@focuson/fetcher/dist/src/tagFetcher";
import { Lenses } from "@focuson/lens";
import { Fetcher } from "@focuson/fetcher/dist/src/fetchers";
import { defaultDateFn } from "@focuson/utils";

export interface HasTagFetcherFullState extends HasSimpleMessages, HasTagHolder, HasPageSelection {
  fullState?: TagFetcherTestFullState
  tag1?: string,
  tag2?: string,
  target?: string
}

export const emptyTestState: HasTagFetcherFullState = {
  messages: [],
  pageSelection: { pageName: 'target' },
  tags: {}
}

export interface TagFetcherTestFullState {
  fromApi?: string,
  local?: string
}

const withMessages = commonTagFetchProps<HasTagFetcherFullState, string> ( ( s, date ) => [ createSimpleMessage ( 'info', s, date ) ], defaultDateFn )

export const tagFetcherTestStateL = Lenses.identity<HasTagFetcherFullState> ( 'state' )
export const simpleFetcherWithMessages = simpleTagFetcher<HasTagFetcherFullState, string> (
  withMessages (),
  'target',
  s => [ s.tag1, s.tag2 ],
  ( state: HasTagFetcherFullState ) => [ '/someUrl', { method: 'Options' } ]
)

export const stateAndFromApiFetcher: Fetcher<HasTagFetcherFullState, string> =
               pageAndTagFetcher<HasTagFetcherFullState, string, SimpleMessage> (
                 withMessages (),
                 'target',
                 'tag1',
                 Lenses.identity<HasTagFetcherFullState> ().focusQuery ( 'fullState' ).focusQuery ( 'fromApi' ),
                 s => [ s.tag1, s.tag2 ],
                 state => [ '/someUrl', { method: 'Options' } ]
               )