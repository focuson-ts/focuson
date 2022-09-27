import { identityOptics, Lenses, NameAndLens } from "@focuson/lens";
import { createSimpleMessage, testDateFn } from "@focuson/utils";
import { PageSpecState, SecondPageDomain } from "./page.fixture";
import { commonTagFetchProps, pageAndTagFetcher, simpleTagFetcher } from "@focuson/focuson";
import { Fetcher } from "@focuson/fetcher";

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
  true,
  'firstPage',
  Lenses.identity<PageSpecState> ().focusQuery ( 'firstPage' ),
  commonLens,
  {},
  [ 'tag1Id', 'tag2Id' ], [] ,[],'/someUrl/{tag1Id}/{tag2Id}/?{query}'
)

export const stateAndFromApiFetcher: Fetcher<PageSpecState, string> =
               pageAndTagFetcher (
                 withMessages (),
                 true,
                 'secondPage',
                 'tag1',
                 Lenses.identity<PageSpecState> ().focusQuery ( 'secondPage' ),
                 commonLens, {}, [ 'tag1Id', 'tag2Id' ], [], [],
                 Lenses.identity<SecondPageDomain> ().focusQuery ( 'fromApi' ),
                 '/someUrl?{query}'
               )