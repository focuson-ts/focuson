import { createSimpleMessage, FetchFn, HasSimpleMessages, insertBefore, RestAction, SimpleMessage, testDateFn } from "@focuson/utils";
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
    fdLens: identityOptics<S> ().focusQuery ( 'fullDomain' ),
    dLens: identityOptics<FullDomainForTest> ().focusQuery ( 'fromApi' ),
    cd,
    fdd,
    ids: [ 'token' ],
    resourceId: [ 'id' ],
    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status}/${JSON.stringify ( body )}`, testDateFn () ) ],
    url: "/some/url/{token}?{query}",
  }
}
const restDetails: RestDetails<RestStateForTest, SimpleMessage> = {
  one: oneRestDetails ( cd, fdd )
}
function withRestCommand ( r: RestStateForTest, ...restCommands: RestCommand[] ): RestStateForTest {
  return { ...r, restCommands }
}

function restMutatator ( r: RestAction, url: string ) { return insertBefore ( "?", "/" + r, url )}
describe ( "restReq", () => {
  it ( "it should turn post commands in the state into fetch requests - empty", () => {
    expect ( restReq ( restDetails, restL (), restMutatator, emptyRestState ) ).toEqual ( [] )
  } )
  it ( "it should turn post commands in the state into fetch requests - one", () => {
    const results = restReq ( restDetails, restL (), restMutatator, withRestCommand ( emptyRestState, { restAction: 'list', name: 'one' } ) );
    expect ( results.map ( a => [ a[ 0 ].url, a[ 1 ], a[ 2 ] ] ) ).toEqual ( [
      [ "/some/url/{token}?{query}", "/some/url/someToken/list?token=someToken", undefined ]
    ] )
  } )
  it ( "it should turn post commands in the state into fetch requests - three", () => {
    let results = restReq ( restDetails, restL (), restMutatator, withRestCommand ( { ...emptyRestState, fullDomain: { idFromFullDomain: 'someId', fromApi: "someData" } },
      { restAction: 'get', name: 'one' },
      { restAction: 'create', name: 'one' },
      { restAction: 'getOption', name: 'one' },
      { restAction: 'delete', name: 'one' },
      { restAction: 'update', name: 'one' },
      { restAction: 'list', name: 'one' },
    ) );
    expect ( results.map ( a => [ a[ 1 ], a[ 2 ] ] ) ).toEqual ( [
      [ "/some/url/someToken/get?token=someToken&id=someId", undefined ],
      [ "/some/url/someToken/create?token=someToken", { "body": "\"someData\"", "method": "post" } ],
      [ "/some/url/someToken/getOption?token=someToken&id=someId", undefined ],
      [ "/some/url/someToken/delete?token=someToken&id=someId", { "method": "delete" } ],
      [ "/some/url/someToken/update?token=someToken&id=someId", { "body": "\"someData\"", "method": "put" } ],
      [ "/some/url/someToken/list?token=someToken", undefined ] ] )
  } )
} )

const mockFetch: FetchFn = ( url, info ) => info?.method === 'delete' ? Promise.reject ( 'deleteWentWrong' ) : Promise.resolve ( [ 200, `from${url}` ] )
describe ( "massFetch", () => {
  it ( "should get the results from the fetch ", async () => {
    expect ( await massFetch ( mockFetch, [] ) ).toEqual ( [] )
    expect ( await massFetch ( mockFetch, [ [ 'cargo1', '/one', undefined ], [ 'cargo2', '/one', { method: 'delete' } ], [ 'cargo3', '/one', undefined ] ] ) ).toEqual ( [
      { "one": "cargo1", "result": "from/one", "status": 200 },
      { "one": "cargo2", "result": "deleteWentWrong" },
      { "one": "cargo3", "result": "from/one", "status": 200 }
    ] )
  } )
} )

describe ( "rest", () => {
  it ( "should fetch the results and put them into the state, removing the rest commands", async () => {
    const result = await rest<RestStateForTest, SimpleMessage> ( mockFetch, restDetails, restMutatator, simpleMessageL, restL (), withRestCommand ( { ...emptyRestState, fullDomain: { idFromFullDomain: 'someId', fromApi: "someData" } },
      { restAction: 'get', name: 'one' },
      { restAction: 'create', name: 'one' },
      { restAction: 'getOption', name: 'one' },
      { restAction: 'delete', name: 'one' },
      { restAction: 'update', name: 'one' },
      { restAction: 'list', name: 'one' },
    ) );
    expect ( result ).toEqual ( {
      "fullDomain": {
        "fromApi": "from/some/url/someToken/list?token=someToken",
        "idFromFullDomain": "someId"
      },
      "messages": [
        { "level": "info", "msg": "200/\"from/some/url/someToken/list?token=someToken\"", "time": "timeForTest" },
        { "level": "info", "msg": "200/\"from/some/url/someToken/update?token=someToken&id=someId\"", "time": "timeForTest" },
        { "level": "info", "msg": "undefined/\"deleteWentWrong\"", "time": "timeForTest" },
        { "level": "info", "msg": "200/\"from/some/url/someToken/getOption?token=someToken&id=someId\"", "time": "timeForTest" },
        { "level": "info", "msg": "200/\"from/some/url/someToken/create?token=someToken\"", "time": "timeForTest" },
        { "level": "info", "msg": "200/\"from/some/url/someToken/get?token=someToken&id=someId\"", "time": "timeForTest" }
      ],
      "restCommands": [],
      "token": "someToken"
    } )
  } )

} )
