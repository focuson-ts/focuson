import { identityOptics, Lenses } from "@focuson/lens";
import { createSimpleMessage, testDateFn } from "@focuson/utils";
import { PageSpecState } from "./page.fixture";
import { commonTagFetchProps, pageAndTagFetcher, simpleTagFetcher } from "@focuson/focuson";
import { Fetcher } from "@focuson/fetcher";
import { NameAndLens } from "@focuson/template";

function withMessages<T> () {
  return commonTagFetchProps<PageSpecState, T> ( ( s: T, date ) => [ createSimpleMessage ( 'info', `${s}`, date ) ], testDateFn ) ()
}

export const tagFetcherTestStateL = Lenses.identity<PageSpecState> ( 'state' )
export const commonLens: NameAndLens<PageSpecState> = {
  tag1Id: identityOptics<PageSpecState> ().focusQuery ( 'tag1' ),
  tag2Id: identityOptics<PageSpecState> ().focusQuery ( 'tag2' )
}
export const simpleFetcherWithMessages: Fetcher<PageSpecState, string> = simpleTagFetcher (
  withMessages (),
  'firstPage',
  Lenses.identity<PageSpecState> ().focusQuery ( 'firstPage' ), commonLens, {},
  [ 'tag1Id', 'tag2Id' ], [], '/someUrl/{tag1Id}/{tag2Id}/?{query}'
)

export const stateAndFromApiFetcher: Fetcher<PageSpecState, string> =
               pageAndTagFetcher (
                 withMessages (),
                 'secondPage',
                 'tag1',
                 Lenses.identity<PageSpecState> ().focusQuery ( 'secondPage' ),
                 commonLens, {}, [ 'tag1Id', 'tag2Id' ], [],
                 s => s.focusQuery ( 'fromApi' ),
                 '/someUrl?{query}'
               )