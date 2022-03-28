import { LoadInfo, MutateFn } from '@focuson/fetcher';
import { stateAndFromApiFetcher } from "./tagFetcher.fixture";
import { PageSpecState, secondPageSelectedState } from "./page.fixture";

describe ( 'tagFetcher', () => {
  it ( 'should not load if the tags are not all present', () => {
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...secondPageSelectedState, tags: {}, secondPage: {} } ) ).toEqual ( ["Not all tags defined"] )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...secondPageSelectedState, tag1: 't1', tags: {}, secondPage: {} } ) ).toEqual ( ["Not all tags defined"] )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...secondPageSelectedState, tag2: 't2', tags: {}, secondPage: {} } ) ).toEqual ( ["Not all tags defined"] )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...secondPageSelectedState, tags: { fromApi: [] }, secondPage: {} } ) ).toEqual ( ["Not all tags defined"] )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...secondPageSelectedState, tags: { fromApi: [] }, secondPage: {} } ) ).toEqual ( ["Not all tags defined"] )

    //and now some funny states... unlikely to get these, but just checking anyway
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...secondPageSelectedState, tag1: 't1', tags: { secondPage: [ 't1', undefined ] }, secondPage: {} } ) ).toEqual ( ["Not all tags defined"] )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...secondPageSelectedState, tag2: 't2', tags: { secondPage: [ undefined, 't2' ] }, secondPage: {} } ) ).toEqual ( ["Not all tags defined"] )
  } )

  it ( 'should load if the actual tags match the desired tags, but the target is undefined', () => {
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...secondPageSelectedState, tag1: 't1', tag2: 't2', tags: { target: [ 't1', 't2' ] }, secondPage: {} } ) ).toEqual ( [] )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...secondPageSelectedState, tag1: 't1', tag2: 't2', tags: { target: [ 't1', 't2' ] }, secondPage: {} } ) ).toEqual ( [] )
  } )
  it ( 'should not load if the actual tags match the desired tags and the target is defined', () => {
    let state: PageSpecState = { ...secondPageSelectedState, tag1: 't1', tag2: 't2', secondPage: { fromApi: 'somevalue' }, tags: { secondPage_tag1: [ 't1', 't2' ] } };
    expect ( stateAndFromApiFetcher.shouldLoad ( state ) ).toEqual (  ["Tags all the same"] )
  } )

  it ( 'should  load if the actual tags are defined but the current are not', () => {
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...secondPageSelectedState, tag1: 't1', tag2: 't2', tags: {}, secondPage: {} } ) ).toEqual ( [] )
  } )

  it ( 'should  load if the actual tags are defined and the current are different', () => {
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...secondPageSelectedState, tag1: 't1', tag2: 't2', tags: { secondPage: [ 'x1', 't2' ] }, secondPage: {} } ) ).toEqual ( [] )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...secondPageSelectedState, tag1: 't1', tag2: 't2', tags: { secondPage: [ 't1', 'x2' ] }, secondPage: {} } ) ).toEqual ( [] )
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...secondPageSelectedState, tag1: 't1', tag2: 't2', tags: { secondPage: [ 'x1', 'x2' ] }, secondPage: {} } ) ).toEqual ( [] )

    //and now some funny states... unlikely to get these, but just checking anyway
    expect ( stateAndFromApiFetcher.shouldLoad ( { ...secondPageSelectedState, tag1: 't1', tag2: 't2', tags: { secondPage: [] }, secondPage: {} } ) ).toEqual ( [] )
  } )

  it ( 'should load using the reqFn', () => {
    const loadInfo: LoadInfo<PageSpecState, string> = stateAndFromApiFetcher.load ( { ...secondPageSelectedState, tag1: 't1', tag2: 't2', tags: {}, secondPage: {} } )
    expect ( loadInfo.requestInfo ).toEqual ( '/someUrl?tag1Id=t1&tag2Id=t2' )
    expect ( loadInfo.requestInit ).toEqual ( undefined )
    expect ( loadInfo.useThisInsteadOfLoad ).toEqual ( undefined )
  } )

  it ( 'should mutate the state after loading, when everything is good, putting the tags in place to make sure not called again', () => {
    let start: PageSpecState = { ...secondPageSelectedState, tag1: 't1', tag2: 't2', tags: {}, secondPage: { fromApi: 'someLocal' } };
    const loadInfo: LoadInfo<PageSpecState, string> = stateAndFromApiFetcher.load ( start )
    const mutate: MutateFn<PageSpecState, string> = loadInfo.mutate
    expect ( mutate ( start ) ( 200, 'someString' ) ).toEqual ( {
      "messages": [ { "level": "info", "msg": "someString", "time": "timeForTest" } ],
      "pageSelection": [ { "pageMode": "view", "pageName": "secondPage" } ],
      "restCommands": [],
      "secondPage": { "fromApi": "someString" },
      "tag1": "t1", "tag2": "t2",
      "tags": { "secondPage_tag1": [ "t1", "t2" ] },
      "tempData": "x"
    } )
    expect ( mutate ( start ) ( 300, 'someString' ) ).toEqual ( {
      ...secondPageSelectedState,
      "messages": [ {
        "level": "error",
        "msg": "Failed to fetch data from [/someUrl?tag1Id=t1&tag2Id=t2,undefined] status 300\nResponse \"someString\"}",
        "time": "timeForTest"
      } ],
      "secondPage": { "fromApi": "someLocal" },
      "restCommands": [],
      "tag1": "t1",
      "tag2": "t2",
      "tags": { "secondPage_tag1": [ "t1", "t2" ] }
    } )

  } )

} )

