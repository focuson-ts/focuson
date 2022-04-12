import { applyFetcher } from '@focuson/fetcher';
import { simpleFetcherWithMessages } from "./tagFetcher.fixture";
import { defaultFetchFn, fetchWithPrefix } from "@focuson/utils";
import { firstPageSelectedState } from "./page.fixture";


// const tagFetcherTestStateL = Lenses.identity<PageSpecState> ( 'state' )


describe ( 'tagFetcher', () => {
  it ( 'should not load if the tags are not all present', () => {
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...firstPageSelectedState, tags: {} } ) ).toEqual ( [ "Undefined tags. tag1Id:undefined,tag2Id:undefined" ] )
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...firstPageSelectedState, tag1: 't1', tags: {} } ) ).toEqual ( [  "Undefined tags. tag1Id:t1,tag2Id:undefined" ] )
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...firstPageSelectedState, tag2: 't2', tags: {} } ) ).toEqual ( [   "Undefined tags. tag1Id:undefined,tag2Id:t2" ] )
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...firstPageSelectedState, tags: { target: [] } } ) ).toEqual ( [  "Undefined tags. tag1Id:undefined,tag2Id:undefined" ] )
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...firstPageSelectedState, tags: { target: [] } } ) ).toEqual ( [  "Undefined tags. tag1Id:undefined,tag2Id:undefined" ] )

    //and now some funny states... unlikely to get these, but just checking anyway
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...firstPageSelectedState, tag1: 't1', tags: { target: [ 't1', undefined ] } } ) ).toEqual ( [   "Undefined tags. tag1Id:t1,tag2Id:undefined" ] )
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...firstPageSelectedState, tag2: 't2', tags: { target: [ undefined, 't2' ] } } ) ).toEqual ( [   "Undefined tags. tag1Id:undefined,tag2Id:t2" ] )
  } )

  it ( 'should load if the actual tags match the desired tags, but the target is undefined', () => {
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...firstPageSelectedState, firstPage: undefined, tag1: 't1', tag2: 't2', tags: { firstPage: [ 't1', 't2' ] } } ) ).toEqual ( [] )
  } )
  it ( 'should not load if the actual tags match the desired tags and the target is defined', () => {
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...firstPageSelectedState, tag1: 't1', tag2: 't2', firstPage: 'somevalue', tags: { firstPage: [ 't1', 't2' ] } } ) ).toEqual ( [ "Tags all the same, and target defined" ] )
  } )

  it ( 'should  load if the actual tags are defined but the current are not', () => {
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...firstPageSelectedState, tag1: 't1', tag2: 't2', tags: {} } ) ).toEqual ( [] )
  } )

  it ( 'should  load if the actual tags are defined and the current are different', () => {
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...firstPageSelectedState, tag1: 't1', tag2: 't2', tags: { firstPage: [ 'x1', 't2' ] } } ) ).toEqual ( [] )
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...firstPageSelectedState, tag1: 't1', tag2: 't2', tags: { firstPage: [ 't1', 'x2' ] } } ) ).toEqual ( [] )
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...firstPageSelectedState, tag1: 't1', tag2: 't2', tags: { firstPage: [ 'x1', 'x2' ] } } ) ).toEqual ( [] )

    //and now some funny states... unlikely to get these, but just checking anyway
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...firstPageSelectedState, tag1: 't1', tag2: 't2', tags: { firstPage: [] } } ) ).toEqual ( [] )
  } )

  it ( 'should load using the reqFn', () => {
    const loadInfo = simpleFetcherWithMessages.load ( { ...firstPageSelectedState, tag1: 't1', tag2: 't2', tags: {} } )
    expect ( loadInfo.requestInfo ).toEqual ( '/someUrl/t1/t2/?tag1Id=t1&tag2Id=t2' )
    expect ( loadInfo.requestInit ).toEqual ( undefined )
    expect ( loadInfo.useThisInsteadOfLoad ).toEqual ( undefined )
  } )

  it ( 'should mutate the state after loading, when everything is good, putting the tags in place to make sure not called again', () => {
    let start = { ...firstPageSelectedState, tag1: 't1', tag2: 't2', tags: {} };
    const loadInfo = simpleFetcherWithMessages.load ( start )
    const mutate = loadInfo.mutate
    expect ( mutate ( start ) ( 200, 'someString' ) ).toEqual ( {
      ...firstPageSelectedState, 'tag1': 't1', 'tag2': 't2', 'tags': { 'firstPage': [ 't1', 't2' ] }, 'firstPage': 'someString',
      "messages": [ { "level": "info", "msg": "someString", "time": "timeForTest" } ]
    } )
    expect ( mutate ( start ) ( 300, 'someString' ) ).toEqual ( {
      ...firstPageSelectedState,
      'messages': [ { "level": "error", "msg": "Failed to fetch data from [/someUrl/t1/t2/?tag1Id=t1&tag2Id=t2,undefined] status 300\nResponse \"someString\"}", "time": "timeForTest" } ],
      'tag1': 't1', 'tag2': 't2',
      'tags': { 'firstPage': [ 't1', 't2' ] }
    } )

  } )

  it ( "should report a 'fail to connect'", async () => {
    let start = { ...firstPageSelectedState, tag1: 't1', tag2: 't2', tags: {}, debug: { fetcherDebug: true } };
    const ns = await applyFetcher ( simpleFetcherWithMessages, start, fetchWithPrefix ( "http://localhost:9999", defaultFetchFn ) )
    expect ( ns.messages ).toEqual ( [ {
      "level": "error",
      "msg": "Failed to fetch data from [/someUrl/t1/t2/?tag1Id=t1&tag2Id=t2,undefined] status 600\nResponse {\"message\":\"request to http://localhost:9999/someUrl/t1/t2/?tag1Id=t1&tag2Id=t2 failed, reason: connect ECONNREFUSED 127.0.0.1:9999\",\"type\":\"system\",\"errno\":\"ECONNREFUSED\",\"code\":\"ECONNREFUSED\"}}",
      "time": "timeForTest"
    } ] )
  } )


} )

