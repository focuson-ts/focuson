import { Lenses } from '@focuson/lens';


import { applyFetcher, LoadInfo, MutateFn, tagFetcher } from '@focuson/fetcher';
import { emptyTestStateWithFullStatePage, emptyTestStateWithTargetPage, HasTagFetcherFullState, simpleFetcherWithMessages } from "./tagFetcher.fixture";
import { defaultFetchFn, fetchWithPrefix } from "@focuson/utils";


const tagFetcherTestStateL = Lenses.identity<HasTagFetcherFullState> ( 'state' )


describe ( 'tagFetcher', () => {
  it ( 'should not load if the tags are not all present', () => {
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...emptyTestStateWithTargetPage, tags: {} } ) ).toEqual ( false )
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...emptyTestStateWithTargetPage, tag1: 't1', tags: {} } ) ).toEqual ( false )
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...emptyTestStateWithTargetPage, tag2: 't2', tags: {} } ) ).toEqual ( false )
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...emptyTestStateWithTargetPage, tags: { target: [] } } ) ).toEqual ( false )
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...emptyTestStateWithTargetPage, tags: { target: [] } } ) ).toEqual ( false )

    //and now some funny states... unlikely to get these, but just checking anyway
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...emptyTestStateWithTargetPage, tag1: 't1', tags: { target: [ 't1', undefined ] } } ) ).toEqual ( false )
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...emptyTestStateWithTargetPage, tag2: 't2', tags: { target: [ undefined, 't2' ] } } ) ).toEqual ( false )
  } )

  it ( 'should load if the actual tags match the desired tags, but the target is undefined', () => {
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...emptyTestStateWithTargetPage, tag1: 't1', tag2: 't2', tags: { target: [ 't1', 't2' ] } } ) ).toEqual ( true )
  } )
  it ( 'should not load if the actual tags match the desired tags and the target is defined', () => {
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...emptyTestStateWithTargetPage, tag1: 't1', tag2: 't2', target: 'somevalue', tags: { target: [ 't1', 't2' ] } } ) ).toEqual ( false )
  } )

  it ( 'should  load if the actual tags are defined but the current are not', () => {
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...emptyTestStateWithTargetPage, tag1: 't1', tag2: 't2', tags: {} } ) ).toEqual ( true )
  } )

  it ( 'should  load if the actual tags are defined and the current are different', () => {
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...emptyTestStateWithTargetPage, tag1: 't1', tag2: 't2', tags: { target: [ 'x1', 't2' ] } } ) ).toEqual ( true )
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...emptyTestStateWithTargetPage, tag1: 't1', tag2: 't2', tags: { target: [ 't1', 'x2' ] } } ) ).toEqual ( true )
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...emptyTestStateWithTargetPage, tag1: 't1', tag2: 't2', tags: { target: [ 'x1', 'x2' ] } } ) ).toEqual ( true )

    //and now some funny states... unlikely to get these, but just checking anyway
    expect ( simpleFetcherWithMessages.shouldLoad ( { ...emptyTestStateWithTargetPage, tag1: 't1', tag2: 't2', tags: { target: [] } } ) ).toEqual ( true )
  } )

  it ( 'should load using the reqFn', () => {
    const loadInfo: LoadInfo<HasTagFetcherFullState, string> = simpleFetcherWithMessages.load ( { ...emptyTestStateWithFullStatePage, tag1: 't1', tag2: 't2', tags: {} } )
    expect ( loadInfo.requestInfo ).toEqual ( '/someUrl' )
    expect ( loadInfo.requestInit ).toEqual ( { method: 'Options' } )
    expect ( loadInfo.useThisInsteadOfLoad ).toEqual ( undefined )
  } )

  it ( 'should mutate the state after loading, when everything is good, putting the tags in place to make sure not called again', () => {
    let start = { ...emptyTestStateWithFullStatePage, tag1: 't1', tag2: 't2', tags: {} };
    const loadInfo: LoadInfo<HasTagFetcherFullState, string> = simpleFetcherWithMessages.load ( start )
    const mutate: MutateFn<HasTagFetcherFullState, string> = loadInfo.mutate
    expect ( mutate ( start ) ( 200, 'someString' ) ).toEqual ( {
      ...emptyTestStateWithFullStatePage, 'tag1': 't1', 'tag2': 't2', 'tags': { 'target': [ 't1', 't2' ] }, 'target': 'someString',
      "messages": [ { "level": "info", "msg": "someString", "time": "timeForTest" } ]
    } )
    expect ( mutate ( start ) ( 300, 'someString' ) ).toEqual ( {
      ...emptyTestStateWithFullStatePage,
      'messages': [ { "level": "error", "msg": "Failed to fetch data from [/someUrl,{\"method\":\"Options\"}] status 300\nResponse \"someString\"}", "time": "timeForTest" } ],
      'tag1': 't1', 'tag2': 't2',
      'tags': { 'target': [ 't1', 't2' ] }
    } )

  } )

  it ( "should report a 'fail to connect'", async () => {
    let start = { ...emptyTestStateWithTargetPage, tag1: 't1', tag2: 't2', tags: {}, debug: { fetcherDebug: true } };
    const ns = await applyFetcher ( simpleFetcherWithMessages, start, fetchWithPrefix ( "http://localhost:9999", defaultFetchFn ) )
    expect ( ns.messages ).toEqual ( [ {
      "level": "error",
      "msg": "Failed to fetch data from [/someUrl,{\"method\":\"Options\"}] status 600\nResponse {\"message\":\"request to http://localhost:9999/someUrl failed, reason: connect ECONNREFUSED 127.0.0.1:9999\",\"type\":\"system\",\"errno\":\"ECONNREFUSED\",\"code\":\"ECONNREFUSED\"}}",
      "time": "timeForTest"
    } ] )
  } )


} )

