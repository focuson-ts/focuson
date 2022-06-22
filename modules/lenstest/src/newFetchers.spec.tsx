import { OneRestDetails, RestCommand, RestDetails, restL, restToTransforms } from "@focuson/rest";
import { createSimpleMessage, RestAction, SimpleMessage, stringToSimpleMsg, testDateFn } from "@focuson/utils";
import { AllFetcherUsingRestConfig, defaultPageSelectionAndRestCommandsContext, FocusOnConfig, FocusOnContext, FocusOnDebug, HasRestCount, processRestsAndFetchers, restCommandsFromFetchers, restCountL, traceL } from "@focuson/focuson";
import { TagHolder } from "@focuson/template";
import { Lenses, NameAndLens, Optional } from "@focuson/lens";
import { MultiPageDetails, PageSelection, simpleMessagesL, simpleMessagesPageConfig } from "@focuson/pages";
import React from "react";


interface NewFetcherDomain {
  a?: number
}
interface StateForNewFetcherTests extends HasRestCount {
  pageSelection: PageSelection[];
  restCommands: RestCommand[];
  messages: SimpleMessage[];
  ids?: { id1?: number, id2?: number },
  data?: NewFetcherDomain;
  tags?: TagHolder;
  debug?: FocusOnDebug;
}

const empty: StateForNewFetcherTests = {
  pageSelection: [ { pageName: 'pageName', pageMode: 'view', time: 'now' } ],
  restCommands: [],
  messages: [],
  debug: { restDebug: false, tagFetcherDebug: false }
}

const pageIdL = Lenses.identity<StateForNewFetcherTests> ()
const dataidL = Lenses.identity<NewFetcherDomain> ()

const fdd: NameAndLens<NewFetcherDomain> = {}
const cd: NameAndLens<StateForNewFetcherTests> = {
  id1: pageIdL.focusQuery ( 'ids' ).focusQuery ( 'id1' ),
  id2: pageIdL.focusQuery ( 'ids' ).focusQuery ( 'id2' ),

}

const newFetchers: AllFetcherUsingRestConfig = {
  pageName: [ { tagName: 'someTag', restName: 'someRestName' } ]
}
function MyLoading () {
  return <p>Loading</p>
}


const pages: MultiPageDetails<StateForNewFetcherTests, FocusOnContext<StateForNewFetcherTests>> = {
// @ts-ignore
  pageName: { pageType: "MainPage", pageMode: 'view', lens: pageIdL.focusQuery ( 'data' ), namedOptionals: {}, config: simpleMessagesPageConfig ( MyLoading ) }
}


const oneRestDetails: OneRestDetails<StateForNewFetcherTests, NewFetcherDomain, number, SimpleMessage> = {
  extractData ( status: number|undefined, body: any ): number {return body;},
  fdLens: pageIdL.focusQuery ( 'data' ),
//From PostCodeMainPage.rest[address].targetFromPath (~/main). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?
  dLens: dataidL.focusQuery ( 'a' ),
  cd,
  fdd,
  ids: [ 'id1', 'id2' ],
  resourceId: [],
  messages: ( status: number | undefined, body: any ): SimpleMessage[] => status == undefined ?
    [ createSimpleMessage ( 'error', `Cannot connect. ${JSON.stringify ( body )}`, testDateFn () ) ] :
    [ createSimpleMessage ( 'info', `${status}/${JSON.stringify ( body )}`, testDateFn () ) ],
  url: "/api/address?{query}",
  states: {}
}
const restDetails: RestDetails<StateForNewFetcherTests, SimpleMessage> = {
  someRestName: oneRestDetails
}


function fetchFn ( a: any, b: any ): Promise<[ number, number ]> {
  return Promise.resolve ( [ 200, 123 ] )
}
function config (): FocusOnConfig<StateForNewFetcherTests, FocusOnContext<StateForNewFetcherTests>, SimpleMessage> {
  return {
    fetchFn: fetchFn,
    fetchers: { fetchers: [], children: [] },
    messageL: simpleMessagesL (),
    newFetchers: newFetchers,
    onError ( s: StateForNewFetcherTests, e: any ): StateForNewFetcherTests {throw Error ( `on error. ${e}\n${JSON.stringify ( s )}` )},
    pageL: pageIdL.focusOn ( 'pageSelection' ),
    pages,
    postMutate ( s: StateForNewFetcherTests ): Promise<StateForNewFetcherTests> {return Promise.resolve ( s );},
    preMutate ( s: StateForNewFetcherTests ): StateForNewFetcherTests {return s;},
    restDetails,
    restL: restL (),
    restUrlMutator ( r: RestAction, url: string ): string {return url;},
    stringToMsg: stringToSimpleMsg ( testDateFn, 'info' ),
    tagHolderL: pageIdL.focusQuery ( 'tags' ),
    maxRestCount: 5,
    restCountL: restCountL ()
  }
}
const someConfig = config ()


const pathToLens = ( s: StateForNewFetcherTests ) => ( path: string ): Optional<StateForNewFetcherTests, any> => {
  throw new Error ( `called path to lens with ${path}` )
}
describe ( "test setup for new fetcher", () => {
  it ( "just check the rest works ", async () => {
    const [ actual ] = await restToTransforms<StateForNewFetcherTests, SimpleMessage> ( fetchFn, restDetails, someConfig.restUrlMutator, pathToLens, someConfig.messageL, traceL (), someConfig.stringToMsg, empty,
      [ { name: 'someRestName', restAction: 'get' } ] )
    expect ( actual.restCommand ).toEqual ( { name: 'someRestName', restAction: 'get' } )
    expect ( actual.status ).toEqual ( 200 )
    const txs = actual.txs.map ( ( [ l, tx ] ) => [ l.description, tx ( l.getOption ( empty ) ) ] )
    expect ( txs ).toEqual ( [
      [
        "I.focus?(messages)",
        [
          {
            "level": "info",
            "msg": "200/123",
            "time": "timeForTest"
          }
        ]
      ],
      [
        "I.focus?(data).chain(I.focus?(a))",
        123
      ]
    ] )
  } )

} )

describe ( "restCommandsFromFetchers should create a rest command when needed", () => {
  it ( "empty - no tags - should not load", () => {
    expect ( restCommandsFromFetchers ( someConfig.tagHolderL, someConfig.newFetchers, someConfig.restDetails, 'pageName', empty ) ).toEqual ( [] )
  } )
  it ( "populated but the tags undefined - should not load", () => {
    expect ( restCommandsFromFetchers ( someConfig.tagHolderL, someConfig.newFetchers, someConfig.restDetails, 'pageName',
      { ...empty, data: { a: 123 } } ) ).toEqual ( [] )
  } )
  it ( "current tags defined and same - should not load", () => {
    expect ( restCommandsFromFetchers ( someConfig.tagHolderL, someConfig.newFetchers, someConfig.restDetails, 'pageName',
      { ...empty, tags: { pageName_someTag: [ '111', '222' ] }, ids: { id1: 111, id2: 222 }, data: { a: 123 } } ) ).toEqual ( [] )
  } )
  it ( "current tags defined -tags different - should load", () => {
    expect ( restCommandsFromFetchers ( someConfig.tagHolderL, someConfig.newFetchers, someConfig.restDetails, 'pageName',
      { ...empty, tags: { pageName_someTag: [ '111', '222' ] }, ids: { id1: 111, id2: 333 }, data: { a: 123 } } ) ).toEqual ( [
      {
        "comment": "Fetcher",
        "name": "someRestName",
        "restAction": "get",
        "tagNameAndTags": { "tagName": "pageName_someTag", "tags": [ "111", "333" ] }
      }
    ] )
  } )
  it ( "not populated tags defined and same - should load", () => {
    expect ( restCommandsFromFetchers ( someConfig.tagHolderL, someConfig.newFetchers, someConfig.restDetails, 'pageName',
      { ...empty, tags: { pageName_someTag: [ '111', '222' ] }, ids: { id1: 111, id2: 222 } } ) ).toEqual ( [
      { "comment": "Fetcher", "name": "someRestName", "restAction": "get", "tagNameAndTags": { "tagName": "pageName_someTag", "tags": [ "111", "222" ] } }
    ] )
  } )
  it ( " populated tags not defined  - should load", () => {
    expect ( restCommandsFromFetchers ( someConfig.tagHolderL, someConfig.newFetchers, someConfig.restDetails, 'pageName',
      { ...empty, ids: { id1: 111, id2: 222 }, data: { a: 123 } } ) ).toEqual ( [
      { "comment": "Fetcher", "name": "someRestName", "restAction": "get", "tagNameAndTags": { "tagName": "pageName_someTag", "tags": [ "111", "222" ] } }
    ] )
  } )
} )

describe ( "processRestsAndFetchers", () => {
  it ( "should load if fetcher needs it", async () => {
    const [ actual ] = await processRestsAndFetchers ( config (), defaultPageSelectionAndRestCommandsContext<StateForNewFetcherTests> ( pages, {} ) ) ( [] ) (
      { ...empty, ids: { id1: 111, id2: 222 } }
    )

    expect ( actual.restCommand ).toEqual ( {
      name: 'someRestName', restAction: 'get', comment: 'Fetcher',
      "tagNameAndTags": { "tagName": "pageName_someTag", "tags": [ "111", "222" ] }
    } )
    expect ( actual.status ).toEqual ( 200 )
    const txs = actual.txs.map ( ( [ l, tx ] ) => [ l.description, tx ( l.getOption ( empty ) ) ] )
    expect ( txs ).toEqual ( [
      [ "I.focus?(messages)",
        [ { "level": "info", "msg": "200/123", "time": "timeForTest" } ] ],
      [ "I.focus?(data).chain(I.focus?(a))", 123 ],
      [ "I.focus?(tags).focusOn(pageName_someTag)", [ "111", "222" ] ]
    ] )


  } )
  it ( "should load and record trace if fetcher needs it and recordTrace is on", async () => {
    const [ actual ] = await processRestsAndFetchers ( config (), defaultPageSelectionAndRestCommandsContext<StateForNewFetcherTests> ( pages, {} ) ) ( [] ) (
      { ...empty, ids: { id1: 111, id2: 222 }, debug: { recordTrace: true } }
    )

    expect ( actual.restCommand ).toEqual ( {
      name: 'someRestName', restAction: 'get', comment: 'Fetcher',
      "tagNameAndTags": { "tagName": "pageName_someTag", "tags": [ "111", "222" ] }
    } )
    expect ( actual.status ).toEqual ( 200 )
    const txs = actual.txs.map ( ( [ l, tx ] ) => [ l.description, tx ( l.getOption ( empty ) ) ] )
    expect ( txs ).toEqual ( [
      [ "I.focus?(messages)", [ { "level": "info", "msg": "200/123", "time": "timeForTest" } ] ],
      [ "I.focus?(data).chain(I.focus?(a))", 123 ],
      [ "I.focus?(trace)",
        [ {
          "lensTxs": [
            [ "I.focus?(messages)", [ { "level": "info", "msg": "200/123", "time": "timeForTest" } ] ],
            [ "I.focus?(data).chain(I.focus?(a))", 123 ],
          ],
          "restCommand": { "comment": "Fetcher", "name": "someRestName", "restAction": "get", "tagNameAndTags": { "tagName": "pageName_someTag", "tags": [ "111", "222" ] } }
        } ]
      ],
      [ "I.focus?(tags).focusOn(pageName_someTag)", [ "111", "222" ] ]
    ] )
  } )
  it ( "should not load if fetcher doesn't needs it", async () => {
    const actual = await processRestsAndFetchers ( config (), defaultPageSelectionAndRestCommandsContext<StateForNewFetcherTests> ( pages, {} ) ) ( [] ) (
      empty
    )
    expect ( actual ).toEqual ( [] )
  } )

} )