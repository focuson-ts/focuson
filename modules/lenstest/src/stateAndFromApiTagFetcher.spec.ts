import { tagFetcher } from '@focuson/fetcher';
import { LoadInfo, MutateFn } from "@focuson/fetcher";
import { emptyTestStateWithFullStatePage, HasTagFetcherFullState, stateAndFromApiFetcher } from "./tagFetcher.fixture";

describe ( 'tagFetcher', () => {
  it ( 'should not load if the tags are not all present', () => {
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestStateWithFullStatePage, tags: {}, fullState: {} } ) ).toEqual ( false )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestStateWithFullStatePage, tag1: 't1', tags: {}, fullState: {} } ) ).toEqual ( false )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestStateWithFullStatePage, tag2: 't2', tags: {}, fullState: {} } ) ).toEqual ( false )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestStateWithFullStatePage, tags: { fromApi: [] }, fullState: {} } ) ).toEqual ( false )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestStateWithFullStatePage, tags: { fromApi: [] }, fullState: {} } ) ).toEqual ( false )

    //and now some funny states... unlikely to get these, but just checking anyway
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestStateWithFullStatePage, tag1: 't1', tags: { fullState: [ 't1', undefined ] }, fullState: {} } ) ).toEqual ( false )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestStateWithFullStatePage, tag2: 't2', tags: { fullState: [ undefined, 't2' ] }, fullState: {} } ) ).toEqual ( false )
  } )

  it ( 'should load if the actual tags match the desired tags, but the target is undefined', () => {
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestStateWithFullStatePage, tag1: 't1', tag2: 't2', tags: { target: [ 't1', 't2' ] }, fullState: {} } ) ).toEqual ( true )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestStateWithFullStatePage, tag1: 't1', tag2: 't2', tags: { target: [ 't1', 't2' ] }, fullState: {} } ) ).toEqual ( true )
  } )
  it ( 'should not load if the actual tags match the desired tags and the target is defined', () => {
    let state: HasTagFetcherFullState = { ...emptyTestStateWithFullStatePage, tag1: 't1', tag2: 't2', fullState: { fromApi: 'somevalue' }, tags: { fullState_tag1: [ 't1', 't2' ] } };
    expect ( stateAndFromApiFetcher.shouldLoad ( state ) ).toEqual ( false )
  } )

  it ( 'should  load if the actual tags are defined but the current are not', () => {
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestStateWithFullStatePage, tag1: 't1', tag2: 't2', tags: {}, fullState: {} } ) ).toEqual ( true )
  } )

  it ( 'should  load if the actual tags are defined and the current are different', () => {
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestStateWithFullStatePage, tag1: 't1', tag2: 't2', tags: { fullState: [ 'x1', 't2' ] }, fullState: {} } ) ).toEqual ( true )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestStateWithFullStatePage, tag1: 't1', tag2: 't2', tags: { fullState: [ 't1', 'x2' ] }, fullState: {} } ) ).toEqual ( true )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestStateWithFullStatePage, tag1: 't1', tag2: 't2', tags: { fullState: [ 'x1', 'x2' ] }, fullState: {} } ) ).toEqual ( true )

    //and now some funny states... unlikely to get these, but just checking anyway
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestStateWithFullStatePage, tag1: 't1', tag2: 't2', tags: { fullState: [] }, fullState: {} } ) ).toEqual ( true )
  } )

  it ( 'should load using the reqFn', () => {
    const loadInfo: LoadInfo<HasTagFetcherFullState, string> = stateAndFromApiFetcher.load ( { ...emptyTestStateWithFullStatePage, tag1: 't1', tag2: 't2', tags: {}, fullState: {} } )
    expect ( loadInfo.requestInfo ).toEqual ( '/someUrl' )
    expect ( loadInfo.requestInit ).toEqual ( { method: 'Options' } )
    expect ( loadInfo.useThisInsteadOfLoad ).toEqual ( undefined )
  } )

  it ( 'should mutate the state after loading, when everything is good, putting the tags in place to make sure not called again', () => {
    let start = { ...emptyTestStateWithFullStatePage, tag1: 't1', tag2: 't2', tags: {}, fullState: { local: 'someLocal' } };
    const loadInfo: LoadInfo<HasTagFetcherFullState, string> = stateAndFromApiFetcher.load ( start )
    const mutate: MutateFn<HasTagFetcherFullState, string> = loadInfo.mutate
    expect ( mutate ( start ) ( 200, 'someString' ) ).toEqual ( {
      ...emptyTestStateWithFullStatePage,
      "fullState": {
        "fromApi": "someString",
        "local": "someLocal"
      },
      "tag1": "t1",
      "tag2": "t2",
      "tags": { "fullState_tag1": [ "t1", "t2" ] },
      "messages": [ { "level": "info", "msg": "someString", "time": "timeForTest" } ]
    } )
    expect ( mutate ( start ) ( 300, 'someString' ) ).toEqual ( {
      ...emptyTestStateWithFullStatePage,
      "messages": [ {
        "level": "error",
        "msg": "Failed to fetch data from [/someUrl,{\"method\":\"Options\"}] status 300\nResponse \"someString\"}",
        "time": "timeForTest"
      } ],
      "fullState": { "local": "someLocal" },
      "tag1": "t1",
      "tag2": "t2",
      "tags": { "fullState_tag1": [ "t1", "t2" ] }
    } )

  } )

} )

