import { createSimpleMessage, HasPageSelection, HasSimpleMessages, SimpleMessage } from "@focuson/pages";
import { CommonTagFetcherProps, commonTagFetchProps, HasTagHolder, OnTagFetchErrorFn, pageAndTagFetcher, simpleTagFetcher, TagHolder } from "@focuson/fetcher";
import { Lenses } from "@focuson/lens";
import { Fetcher } from "@focuson/fetcher";
import { defaultDateFn } from "@focuson/utils";

export interface HasTagFetcherFullState extends HasSimpleMessages, HasTagHolder, HasPageSelection {
  fullState?: TagFetcherTestFullState
  tag1?: string,
  tag2?: string,
  target?: string
}

export const emptyTestStateWithFullStatePage: HasTagFetcherFullState = {
  messages: [],
  pageSelection: { pageName: 'fullState', pageMode: 'view' },
  tags: {}
}
export const emptyTestStateWithTargetPage: HasTagFetcherFullState = {
  messages: [],
  pageSelection: { pageName: 'target' , pageMode: 'view'},
  tags: {}
}

export interface TagFetcherTestFullState {
  fromApi?: string,
  local?: string
}

function withMessages<T> () {
  return commonTagFetchProps<HasTagFetcherFullState, T> ( ( s: T, date ) => [ createSimpleMessage ( 'info', `${s}`, date ) ], defaultDateFn ) ()
}

export const tagFetcherTestStateL = Lenses.identity<HasTagFetcherFullState> ( 'state' )
export const simpleFetcherWithMessages = simpleTagFetcher<HasTagFetcherFullState, 'target'> (
  withMessages (),
  'target',
  s => [ s.tag1, s.tag2 ],
  ( state: HasTagFetcherFullState ) => [ '/someUrl', { method: 'Options' } ]
)

export const stateAndFromApiFetcher: Fetcher<HasTagFetcherFullState, string> =
               pageAndTagFetcher<HasTagFetcherFullState, TagFetcherTestFullState, string, SimpleMessage> (
                 withMessages (),
                 'fullState',
                 'tag1',
                 s => s.focusQuery ( 'fromApi' ),
                 s => [ s.tag1, s.tag2 ],
                 state => [ '/someUrl', { method: 'Options' } ]
               )