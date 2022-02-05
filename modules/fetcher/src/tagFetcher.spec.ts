import { Lenses } from '@focuson/lens';




import { commonFetch, simpleTagFetcher, SpecificTagFetcher, tagFetcher, TagHolder } from './tagFetcher';
import { HasPageSelection, HasSimpleMessages } from "@focuson/pages";
import { LoadInfo, MutateFn } from "./fetchers";
import { emptyTestState, HasTagFetcherFullState, simpleFetcher } from "./tagFetcher.fixture";



const tagFetcherTestStateL = Lenses.identity<HasTagFetcherFullState> ( 'state' )



describe ( 'tagFetcher', () => {
  it ( 'should not load if the tags are not all present', () => {
    expect ( simpleFetcher.shouldLoad ( { ...emptyTestState, tags: {} } ) ).toEqual ( false )
    expect ( simpleFetcher.shouldLoad ( { ...emptyTestState, tag1: 't1', tags: {} } ) ).toEqual ( false )
    expect ( simpleFetcher.shouldLoad ( { ...emptyTestState, tag2: 't2', tags: {} } ) ).toEqual ( false )
    expect ( simpleFetcher.shouldLoad ( { ...emptyTestState, tags: { target: [] } } ) ).toEqual ( false )
    expect ( simpleFetcher.shouldLoad ( { ...emptyTestState, tags: { target: [] } } ) ).toEqual ( false )

    //and now some funny states... unlikely to get these, but just checking anyway
    expect ( simpleFetcher.shouldLoad ( { ...emptyTestState, tag1: 't1', tags: { target: [ 't1', undefined ] } } ) ).toEqual ( false )
    expect ( simpleFetcher.shouldLoad ( { ...emptyTestState, tag2: 't2', tags: { target: [ undefined, 't2' ] } } ) ).toEqual ( false )
  } )

  it ( 'should load if the actual tags match the desired tags, but the target is undefined', () => {
    expect ( simpleFetcher.shouldLoad ( { ...emptyTestState, tag1: 't1', tag2: 't2', tags: { target: [ 't1', 't2' ] } } ) ).toEqual ( true )
  } )
  it ( 'should not load if the actual tags match the desired tags and the target is defined', () => {
    expect ( simpleFetcher.shouldLoad ( { ...emptyTestState, tag1: 't1', tag2: 't2', target: 'somevalue', tags: { target: [ 't1', 't2' ] } } ) ).toEqual ( false )
  } )

  it ( 'should  load if the actual tags are defined but the current are not', () => {
    expect ( simpleFetcher.shouldLoad ( { ...emptyTestState, tag1: 't1', tag2: 't2', tags: {} } ) ).toEqual ( true )
  } )

  it ( 'should  load if the actual tags are defined and the current are different', () => {
    expect ( simpleFetcher.shouldLoad ( { ...emptyTestState, tag1: 't1', tag2: 't2', tags: { target: [ 'x1', 't2' ] } } ) ).toEqual ( true )
    expect ( simpleFetcher.shouldLoad ( { ...emptyTestState, tag1: 't1', tag2: 't2', tags: { target: [ 't1', 'x2' ] } } ) ).toEqual ( true )
    expect ( simpleFetcher.shouldLoad ( { ...emptyTestState, tag1: 't1', tag2: 't2', tags: { target: [ 'x1', 'x2' ] } } ) ).toEqual ( true )

    //and now some funny states... unlikely to get these, but just checking anyway
    expect ( simpleFetcher.shouldLoad ( { ...emptyTestState, tag1: 't1', tag2: 't2', tags: { target: [] } } ) ).toEqual ( true )
  } )

  it ( 'should load using the reqFn', () => {
    const loadInfo: LoadInfo<HasTagFetcherFullState, string> = simpleFetcher.load ( { ...emptyTestState, tag1: 't1', tag2: 't2', tags: {} } )
    expect ( loadInfo.requestInfo ).toEqual ( '/someUrl' )
    expect ( loadInfo.requestInit ).toEqual ( { method: 'Options' } )
    expect ( loadInfo.useThisInsteadOfLoad ).toEqual ( undefined )
  } )

  it ( 'should mutate the state after loading, when everything is good, putting the tags in place to make sure not called again', () => {
    let start = { ...emptyTestState, tag1: 't1', tag2: 't2', tags: {} };
    const loadInfo: LoadInfo<HasTagFetcherFullState, string> = simpleFetcher.load ( start )
    const mutate: MutateFn<HasTagFetcherFullState, string> = loadInfo.mutate
    expect ( mutate ( start ) ( 200, 'someString' ) ).toEqual ( { ...emptyTestState, 'tag1': 't1', 'tag2': 't2', 'tags': { 'target': [ 't1', 't2' ] }, 'target': 'someString' } )
    expect ( mutate ( start ) ( 300, 'someString' ) ).toEqual ( {
      ...emptyTestState,
      'errorMessage': 'Req: ["/someUrl",{"method":"Options"}], Resp: "someString", 300, undefined, t1,t2',
      'tag1': 't1',
      'tag2': 't2',
      'tags': { 'target': [ 't1', 't2' ] }
    } )

  } )

} )

