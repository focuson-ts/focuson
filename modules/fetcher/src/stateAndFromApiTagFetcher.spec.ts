import { tagFetcher } from './tagFetcher';
import {  LoadInfo, MutateFn } from "./fetchers";
import { stateAndFromApiFetcher, HasTagFetcherFullState, emptyTestState } from "./tagFetcher.fixture";

describe ( 'tagFetcher', () => {
  it ( 'should not load if the tags are not all present', () => {
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestState, tags: {}, fullState: {} } ) ).toEqual ( false )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestState, tag1: 't1', tags: {}, fullState: {} } ) ).toEqual ( false )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestState, tag2: 't2', tags: {}, fullState: {} } ) ).toEqual ( false )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestState, tags: { fromApi: [] }, fullState: {} } ) ).toEqual ( false )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestState, tags: { fromApi: [] }, fullState: {} } ) ).toEqual ( false )

    //and now some funny states... unlikely to get these, but just checking anyway
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestState, tag1: 't1', tags: { fullState: [ 't1', undefined ] }, fullState: {} } ) ).toEqual ( false )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestState, tag2: 't2', tags: { fullState: [ undefined, 't2' ] }, fullState: {} } ) ).toEqual ( false )
  } )

  it ( 'should load if the actual tags match the desired tags, but the target is undefined', () => {
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestState, tag1: 't1', tag2: 't2', tags: { fullState: [ 't1', 't2' ] }, fullState: {} } ) ).toEqual ( true )
  } )
  it ( 'should not load if the actual tags match the desired tags and the target is defined', () => {
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestState, tag1: 't1', tag2: 't2', fullState: { fromApi: 'somevalue' }, tags: { fullState_fullState: [ 't1', 't2' ] } } ) ).toEqual ( false )
  } )

  it ( 'should  load if the actual tags are defined but the current are not', () => {
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestState, tag1: 't1', tag2: 't2', tags: {}, fullState: {} } ) ).toEqual ( true )
  } )

  it ( 'should  load if the actual tags are defined and the current are different', () => {
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestState, tag1: 't1', tag2: 't2', tags: { fullState: [ 'x1', 't2' ] }, fullState: {} } ) ).toEqual ( true )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestState, tag1: 't1', tag2: 't2', tags: { fullState: [ 't1', 'x2' ] }, fullState: {} } ) ).toEqual ( true )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestState, tag1: 't1', tag2: 't2', tags: { fullState: [ 'x1', 'x2' ] }, fullState: {} } ) ).toEqual ( true )

    //and now some funny states... unlikely to get these, but just checking anyway
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...emptyTestState, tag1: 't1', tag2: 't2', tags: { fullState: [] }, fullState: {} } ) ).toEqual ( true )
  } )

  it ( 'should load using the reqFn', () => {
    const loadInfo: LoadInfo<HasTagFetcherFullState, string> = stateAndFromApiFetcher.load ( { ...emptyTestState, tag1: 't1', tag2: 't2', tags: {}, fullState: {} } )
    expect ( loadInfo.requestInfo ).toEqual ( '/someUrl' )
    expect ( loadInfo.requestInit ).toEqual ( { method: 'Options' } )
    expect ( loadInfo.useThisInsteadOfLoad ).toEqual ( undefined )
  } )

  it ( 'should mutate the state after loading, when everything is good, putting the tags in place to make sure not called again', () => {
    let start = { ...emptyTestState, tag1: 't1', tag2: 't2', tags: { }, fullState: { local: 'someLocal' } };
    const loadInfo: LoadInfo<HasTagFetcherFullState, string> = stateAndFromApiFetcher.load ( start )
    const mutate: MutateFn<HasTagFetcherFullState, string> = loadInfo.mutate
    expect ( mutate ( start ) ( 200, 'someString' ) ).toEqual ( {
      ...emptyTestState,
      "fullState": { "fromApi": "someString", "local": "someLocal" },
      "tag1": "t1",
      "tag2": "t2",
      "tags": { "fullState_fullState": [ "t1", "t2" ] }
    } )
    expect ( mutate ( start ) ( 300, 'someString' ) ).toEqual ( {
      ...emptyTestState,
      "errorMessage": "Req: [\"/someUrl\",{\"method\":\"Options\"}], Resp: \"someString\", 300, undefined, t1,t2",
      "fullState": { "local": "someLocal" },
      "tag1": "t1",
      "tag2": "t2",
      "tags": { "fullState_fullState": [ "t1", "t2" ] }
    } )

  } )

} )

