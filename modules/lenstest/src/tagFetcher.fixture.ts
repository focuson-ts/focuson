
import { Lenses } from "@focuson/lens";
import { createSimpleMessage, defaultDateFn, SimpleMessage } from "@focuson/utils";
import { PageSpecState, SecondPageDomain } from "./page.fixture";
import { commonTagFetchProps, pageAndTagFetcher, simpleTagFetcher } from "@focuson/focuson/dist/src/tagFetcher";
import { Fetcher } from "@focuson/fetcher";

function withMessages<T> () {
  return commonTagFetchProps<PageSpecState, T> ( ( s: T, date ) => [ createSimpleMessage ( 'info', `${s}`, date ) ], defaultDateFn ) ()
}

export const tagFetcherTestStateL = Lenses.identity<PageSpecState> ( 'state' )
export const simpleFetcherWithMessages = simpleTagFetcher<PageSpecState, 'firstPage'> (
  withMessages (),
  'firstPage',
  s => [ s.tag1, s.tag2 ],
  ( state: PageSpecState ) => [ '/someUrl', { method: 'Options' } ]
)

export const stateAndFromApiFetcher: Fetcher<PageSpecState, string> =
               pageAndTagFetcher<PageSpecState, SecondPageDomain, string, SimpleMessage> (
                 withMessages (),
                 'secondPage',
                 'tag1',
                 s => s.focusQuery ( 'fromApi' ),
                 s => [ s.tag1, s.tag2 ],
                 state => [ '/someUrl', { method: 'Options' } ]
               )