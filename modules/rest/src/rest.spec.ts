import { createSimpleMessage, FetchFn, HasSimpleMessages, SimpleMessage, testDateFn } from "@focuson/utils";
import { HasRestCommands, massFetch, OneRestDetails, rest, RestCommand, RestDetails, restL, restReq } from "./rest";
import { identityOptics, NameAndLens } from "@focuson/lens";

interface HasFullDomainForTest {
  fullDomain?: FullDomainForTest
}
interface FullDomainForTest {
  fromApi?: string;
  idFromFullDomain?: string;
}
interface RestStateForTest extends HasSimpleMessages, HasRestCommands, HasFullDomainForTest {
  token?: string;

}

const simpleMessageL = identityOptics<RestStateForTest> ().focusQuery ( 'messages' )

const emptyRestState: RestStateForTest = {
  messages: [], restCommands: [],
  token: 'someToken',
  fullDomain: {}
}
const cd = {
  token: identityOptics<RestStateForTest> ().focusQuery ( 'token' )
}
const fdd = {
  id: identityOptics<FullDomainForTest> ().focusQuery ( 'idFromFullDomain' )
}
function oneRestDetails<S extends HasFullDomainForTest> ( cd: NameAndLens<S>, fdd: NameAndLens<FullDomainForTest> ): OneRestDetails<S, FullDomainForTest, string, SimpleMessage> {
  return {
    // fdLens: identityOptics<S> ().focusQuery ( 'fullDomain' ),
    dLens: identityOptics<FullDomainForTest> ().focusQuery ( 'fromApi' ),
    cd,
    fdd,
    ids: [ 'token' ],
    resourceId: [ 'id' ],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status}/${JSON.stringify ( body )}`, testDateFn () ) ],
    url: "/some/url/{token}?{query}"

  }
}
const restDetails: RestDetails<RestStateForTest, SimpleMessage> = {
  one: oneRestDetails ( cd, fdd )
}
function withRestCommand ( r: RestStateForTest, ...restCommands: RestCommand[] ): RestStateForTest {
  return { ...r, restCommands }
}

describe ( "restReq", () => {
  it ( "it should turn post commands in the state into fetch requests - empty", () => {
    expect ( restReq ( restDetails, restL (), emptyRestState ) ).toEqual ( [] )
  } )
  it ( "it should turn post commands in the state into fetch requests - one", () => {
    const results = restReq ( restDetails, restL (), withRestCommand ( emptyRestState, { restAction: 'list', name: 'one', path: [] } ) );
    expect ( results.map ( a => [ a[ 0 ].url, a[ 1 ], a[ 2 ] ] ) ).toEqual ( [
      [ "/some/url/{token}?{query}", "/some/url/someToken?token=someToken", undefined ]
    ] )
  } )
  it ( "it should turn post commands in the state into fetch requests - three", () => {
    let results = restReq ( restDetails, restL (), withRestCommand ( { ...emptyRestState, fullDomain: { idFromFullDomain: 'someId', fromApi: "someData" } },
      { restAction: 'get', name: 'one', path: [ 'fullDomain' ] },
      { restAction: 'create', name: 'one', path: [ 'fullDomain' ] },
      { restAction: 'getOption', name: 'one', path: [ 'fullDomain' ] },
      { restAction: 'delete', name: 'one', path: [ 'fullDomain' ] },
      { restAction: 'update', name: 'one', path: [ 'fullDomain' ] },
      { restAction: 'list', name: 'one', path: [ 'fullDomain' ] },
    ) );
    expect ( results.map ( a => [ a[ 1 ], a[ 2 ] ] ) ).toEqual ( [
      [ "/some/url/someToken?token=someToken&id=someId", undefined ],
      [ "/some/url/someToken?token=someToken", { "body": "someData", "method": "post" } ],
      [ "/some/url/someToken?token=someToken&id=someId", undefined ],
      [ "/some/url/someToken?token=someToken&id=someId", { "method": "delete" } ],
      [ "/some/url/someToken?token=someToken&id=someId", { "body": "someData", "method": "put" } ],
      [ "/some/url/someToken?token=someToken", undefined ] ] )
  } )
} )

const mockFetch: FetchFn = ( url, info ) => info?.method === 'delete' ? Promise.reject ( 'deleteWentWrong' ) : Promise.resolve ( [ 200, `from${url}` ] )
describe ( "massFetch", () => {
  it ( "should get the results from the fetch ", async () => {
    expect ( await massFetch ( mockFetch, [] ) ).toEqual ( [] )
    expect ( await massFetch ( mockFetch, [ [ 'cargo1', '/one', undefined, [ 'fullDomain' ] ], [ 'cargo2', '/one', { method: 'delete' }, [ 'fullDomain' ] ], [ 'cargo3', '/one', undefined, [ 'fullDomain' ] ] ] ) ).toEqual ( [
      { "one": "cargo1", "result": "from/one", "status": 200, "path": [ "fullDomain" ] },
      { "one": "cargo2", "result": "deleteWentWrong", "path": [ "fullDomain" ] },
      { "one": "cargo3", "result": "from/one", "status": 200, "path": [ "fullDomain" ] }
    ] )
  } )
} )

describe ( "rest", () => {
  it ( "should fetch the results and put them into the state, removing the rest commands", async () => {
    const result = await rest<RestStateForTest, SimpleMessage> ( mockFetch, restDetails, simpleMessageL, restL (), withRestCommand ( { ...emptyRestState, fullDomain: { idFromFullDomain: 'someId', fromApi: "someData" } },
      { restAction: 'get', name: 'one', path: [ 'fullDomain' ] },
      { restAction: 'create', name: 'one', path: [ 'fullDomain' ] },
      { restAction: 'getOption', name: 'one', path: [ 'fullDomain' ] },
      { restAction: 'delete', name: 'one', path: [ 'fullDomain' ] },
      { restAction: 'update', name: 'one', path: [ 'fullDomain' ] },
      { restAction: 'list', name: 'one', path: [ 'fullDomain' ] },
    ) );
    expect ( result ).toEqual ( {
      "fullDomain": {
        "fromApi": "from/some/url/someToken?token=someToken",
        "idFromFullDomain": "someId"
      },
      "messages": [
        { "level": "info", "msg": "200/\"from/some/url/someToken?token=someToken\"", "time": "timeForTest" },
        { "level": "info", "msg": "200/\"from/some/url/someToken?token=someToken&id=someId\"", "time": "timeForTest" },
        { "level": "info", "msg": "undefined/\"deleteWentWrong\"", "time": "timeForTest" },
        { "level": "info", "msg": "200/\"from/some/url/someToken?token=someToken&id=someId\"", "time": "timeForTest" },
        { "level": "info", "msg": "200/\"from/some/url/someToken?token=someToken\"", "time": "timeForTest" },
        { "level": "info", "msg": "200/\"from/some/url/someToken?token=someToken&id=someId\"", "time": "timeForTest" }
      ],
      "restCommands": [],
      "token": "someToken"
    } )
  } )

} )
