import { nameToLens, reqFor, tags, url, UrlConfig } from "./tags";
import { identityOptics, Lenses } from "@focuson/lens";

interface ChildTagTestState {
  c?: string
  d?: number,
  data: string
}
interface TagTestState {
  a?: string,
  b?: any,
  child: ChildTagTestState
}
const child: ChildTagTestState = {
  c: '3',
  d: 4,
  data: 'someData'
}
const state: TagTestState = {
  a: '1',
  b: { x: 1 },
  child
}

let identityState = Lenses.identity<TagTestState> ();
let identityChild = Lenses.identity<ChildTagTestState> ();
const urlConfig: UrlConfig<TagTestState, ChildTagTestState, string> = {
  cd: { aId: identityState.focusQuery ( 'a' ), bId: identityState.focusQuery ( 'b' ) },
  fdd: { cId: identityChild.focusQuery ( 'c' ), dId: identityChild.focusQuery ( 'd' ) },
  fdLens: identityState.focusQuery ( 'child' ),
  dLens: identityOptics<ChildTagTestState> ().focusQuery ( 'data' ),
  ids: [ "aId", "bId", "cId" ],
  resourceId: [ "dId" ]

}

describe ( "tags", () => {
  describe ( "for restAction get", () => {
    it ( "should return the tags found in the state from the definition in the urlConfig ", () => {
      expect ( tags ( urlConfig, 'get' ) ( state ).map ( ( [ name, s ] ) => [ name, s.replace ( /"/g, "'" ) ] ) ).toEqual ( [ "4", "1", "{'x':1}", "3" ] )
    } )
  } )
  describe ( "for restAction list", () => {
    it ( "should return the tags found in the state from the definition in the urlConfig ", () => {
      expect ( tags ( urlConfig, 'list' ) ( state ).map ( ( [ name, s ] ) => [ name, s.replace ( /"/g, "'" ) ] ) ).toEqual ( [ "1", "{'x':1}", "3" ] )
    } )

  } )
} )


describe ( 'nameToLens', () => {
  it ( 'should turn known names to their value', () => {
    expect ( nameToLens ( urlConfig, 'get' ) ( 'aId' ).getOption ( state ) ).toEqual ( '1' )
    expect ( nameToLens ( urlConfig, 'get' ) ( 'bId' ).getOption ( state ) ).toEqual ( { "x": 1 } )
    expect ( nameToLens ( urlConfig, 'get' ) ( 'cId' ).getOption ( state ) ).toEqual ( '3' )
    expect ( nameToLens ( urlConfig, 'get' ) ( 'dId' ).getOption ( state ) ).toEqual ( 4 )
    expect ( nameToLens ( urlConfig, 'get' ) ( 'unknown' ).getOption ( state ) ).toEqual ( 'unknown' )
  } )

  it ( "should turn 'query' into the aId=a style query string. Including resource ids for 'get'", () => {
    expect ( nameToLens ( urlConfig, 'get' ) ( 'query' ).getOption ( state ).replace ( /"/g, "'" ) ).toEqual ( "aId=1&bId={'x':1}&cId=3&dId=4" )

  } )
  it ( "should turn 'query' into the aId=a style query string. Not including  resource ids for 'list'", () => {
    expect ( nameToLens ( urlConfig, 'list' ) ( 'query' ).getOption ( state ).replace ( /"/g, "'" ) ).toEqual ( "aId=1&bId={'x':1}&cId=3" )

  } )
} );

describe ( "url", () => {
  describe ( "for restAction get", () => {
    it ( "should replace named ids ", () => {
      expect ( url ( urlConfig, 'get' ) ( state ) ( '/{aId}/{bId}/{cId}/{dId}' ).replace ( /"/g, "'" ) ).toEqual ( "/1/{'x':1}/3/4" )
    } )
    it ( "should return the tags found in the state from the definition in the urlConfig - including ids", () => {
      expect ( url ( urlConfig, 'get' ) ( state ) ( '/{dId}?{query}' ).replace ( /"/g, "'" ) ).toEqual ( "/4?aId=1&bId={'x':1}&cId=3&dId=4" )
    } )

  } )
  describe ( "for restAction list", () => {
    it ( "should replace named ids ", () => {
      expect ( url ( urlConfig, 'list' ) ( state ) ( '/{aId}/{bId}/{cId}/{dId}' ).replace ( /"/g, "'" ) ).toEqual ( "/1/{'x':1}/3/4" )
    } )
    it ( "should return the tags found in the state from the definition in the urlConfig not including the ids ", () => {
      expect ( url ( urlConfig, 'list' ) ( state ) ( '/something?{query}' ).replace ( /"/g, "'" ).replace ( /"/g, "'" ) ).toEqual ( "/something?aId=1&bId={'x':1}&cId=3" )
    } )
  } )
} )


describe ( "reqFn", () => {
  let simplerState: TagTestState = { ...state, b: 2 }
  describe ( "for restAction create", () => {
    it ( "should replace named ids,  body", () => {
      expect ( reqFor ( urlConfig, 'create' ) ( simplerState ) ( '/{aId}/{bId}/{cId}/{dId}?{query}' ) ).toEqual (
        [ "/1/2/3/4?aId=1&bId=2&cId=3", { "body": "someData", "method": "post" } ] )
    } )
  } )
  describe ( "for restAction delete", () => {
    it ( "should replace named ids, no body", () => {
      expect ( reqFor ( urlConfig, 'delete' ) ( simplerState ) ( '/{aId}/{bId}/{cId}/{dId}?{query}' ) ).toEqual (
        [ "/1/2/3/4?aId=1&bId=2&cId=3&dId=4", { method: 'delete' } ] )
    } )
  } )
  describe ( "for restAction get", () => {
    it ( "should replace named ids, no body", () => {
      expect ( reqFor ( urlConfig, 'get' ) ( simplerState ) ( '/{aId}/{bId}/{cId}/{dId}?{query}' ) ).toEqual (
        [ "/1/2/3/4?aId=1&bId=2&cId=3&dId=4", undefined ] )
    } )
  } )
  describe ( "for restAction getOption", () => {
    it ( "should replace named ids, no body", () => {
      expect ( reqFor ( urlConfig, 'getOption' ) ( simplerState ) ( '/{aId}/{bId}/{cId}/{dId}?{query}' ) ).toEqual (
        [ "/1/2/3/4?aId=1&bId=2&cId=3&dId=4", undefined ] )
    } )
  } )
  describe ( "for restAction list", () => {
    it ( "should replace named ids, no body", () => {
      expect ( reqFor ( urlConfig, 'list' ) ( simplerState ) ( '/{aId}/{bId}/{cId}/{dId}?{query}' ) ).toEqual (
        [ "/1/2/3/4?aId=1&bId=2&cId=3", undefined ] )
    } )
  } )
  describe ( "for restAction update", () => {
    it ( "should replace named ids,  body", () => {
      expect ( reqFor ( urlConfig, 'update' ) ( simplerState ) ( '/{aId}/{bId}/{cId}/{dId}?{query}' ) ).toEqual (
        [ "/1/2/3/4?aId=1&bId=2&cId=3&dId=4", { "body": "someData", "method": "put" } ] )
    } )
  } )

} )