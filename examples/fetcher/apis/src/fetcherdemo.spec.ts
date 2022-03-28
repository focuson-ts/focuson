import { dirtyPrism, DirtyPrism, identityOptics, Iso, Lenses, Optional, orUndefined } from "@focuson/lens";
import { child, descriptionOf, fetchAndMutate, Fetcher, fetcherTree, FetcherTree, fetcherWhenUndefined, fromTaggedFetcher, Holder, holderIso, ifEEqualsFetcher, lensAndChild, loadSelectedFetcher, loadTree, radioButtonFetcher, ReqFn, wouldLoad } from "@focuson/fetcher";
import { Tags } from "@focuson/template";


export interface SiteMap {
  [ entity: string ]: Entity
}

export interface Entity {
  things: { [ thingname: string ]: Thing, },
  api: { [ apiname: string ]: Api, }
}

export interface Api {
  name: string,
  _links: {
    self: string,
    status: string,
    description: string,
    source: string
  }

}

export interface Thing {
  name: string,
  href: string
}

function links ( s: string ) {
  return ({
    self: `/${s}/api`,
    status: `/${s}/status`,
    description: `/${s}/description`,
    source: `/${s}/source`
  })
}


function entity ( e: string ): Entity {
  return ({
    things: {
      t1: { name: `${e}1`, href: `/t1/thing` },
      t2: { name: `${e}2`, href: `/t2/thing` }
    },
    api: {
      a1: { name: `${e}1`, _links: links ( `${e}/a1` ) },
      a2: { name: `${e}2`, _links: links ( `${e}/a2` ) }
    }
  })
}

const exampleSiteMap = {
  "be": entity ( "be" ),
  "uk": entity ( "uk" )
};

function exampleThing ( name: string ): Thing {
  return ({ name, href: `someHrefFor${name}` })
}

function exampleApi ( name: string ): Api {
  return ({
    name, _links: {
      self: `self for ${name}`, status: `status for ${name}`, description: `description for ${name}`,
      source: `source for ${name}`
    }
  })
}

function siteMapLoader ( bookmark: string ): Promise<SiteMap> {
  return Promise.resolve ( exampleSiteMap )
}

export interface ApiData {
  api: Api,
  tags: string[]
  source?: string[],
  status?: string,
  desc?: string
}

function apiDataHolder ( description: string ): DirtyPrism<ApiData, [ string[], Api ]> {
  return dirtyPrism ( ad => [ ad.tags, ad.api ], ( [ tags, api ] ) => ({ tags: tags, api: api }) )
}

export interface SelectionState {
  selectedRadioButton?: string,
  selectedEntity?: string,
  selectedThing?: string,
  selectedApi?: string,
  // apiView?: 'desc' | 'src' | 'status'
}


export interface State {
  sitemap?: SiteMap,
  entity?: Entity,
  apiData?: ApiData,
  thing?: Holder<Tags, Thing>,
  selState: SelectionState,
  radioButton?: string,
  globalErrorMsg?: any
}


export const stateL: Iso<State, State> = Lenses.identity<State> ()
export const stateToSiteMapO = stateL.focusQuery ( 'sitemap' )


function loadFromSiteMap ( fn: ( siteMap: SiteMap, s: SelectionState ) => string | undefined ): ReqFn<State> {
  return state => {
    if ( state && state.sitemap && state.selState ) {
      const url = fn ( state.sitemap, state.selState )
      return url ? [ url, {} ] : undefined
    }
    return undefined
  }
}

function defaultSelectState ( s: SiteMap | undefined ): SelectionState {
  if ( !s ) return {}
  const selectedEntity = Object.keys ( s )[ 0 ]
  const selectedThing = Object.keys ( s[ selectedEntity ].things )[ 0 ]
  const selectedApi = Object.keys ( s[ selectedEntity ].api )[ 0 ]
  const selectedRadioButton = 'erd'
  return ({ selectedEntity, selectedThing, selectedApi, selectedRadioButton })
}

const loadSiteMapF = fetchAndMutate<State | undefined, SiteMap> ( fetcherWhenUndefined<State | undefined, SiteMap> (
    orUndefined<State> ().focusQuery ( 'sitemap' ),
    ( s ) => [ "someSitemapUrl", { method: "get" } ], "loadSiteMapF" ),
  s => ({ ...s, selState: defaultSelectState ( s?.sitemap ) })
);

let radioButtonL = stateL.focusOn ( 'selState' ).focusOn ( 'selectedRadioButton' )

const loadApiF: Fetcher<State, Api> =
        loadSelectedFetcher<State, ApiData, Api> (
          ( s: State ) => [ s.selState.selectedEntity, s.selState?.selectedApi ],
          apiDataHolder ( 'H/ApiData' ),
          stateL.focusQuery ( 'apiData' ),
          loadFromSiteMap ( ( siteMap, sel ) => sel.selectedEntity && sel.selectedApi && siteMap[ sel.selectedEntity ].api[ sel.selectedApi ]._links.self ),
          s => undefined,
          e => s => ({ ...s, globalErrorMsg: e }), "loadApiF" )


const loadThingF: Fetcher<State, Thing> = ifEEqualsFetcher<State> ( s => s.selState.selectedRadioButton == "erd",
  'mismatch', loadSelectedFetcher<State, Holder<Tags, Thing>, Thing> (
    s => [ s.selState.selectedEntity, s.selState.selectedThing ],
    holderIso<Tags, Thing> ( 'H/Thing' ),
    stateL.focusQuery ( 'thing' ),
    loadFromSiteMap ( ( siteMap, sel ) =>
      sel.selectedEntity && sel.selectedThing && siteMap[ sel.selectedEntity ].things[ sel.selectedThing ].href ),
    s => undefined
  ),
  'LoadThingF' )

let apiDataL: Optional<State, ApiData> = stateL.focusQuery ( 'apiData' )

const loadApiDescF: Fetcher<State, string> = ifEEqualsFetcher<State> ( s => s.selState.selectedRadioButton == "desc", 'wrongRadioButton', fetcherWhenUndefined<State, string> (
    apiDataL.focusQuery ( 'desc' ),
    loadFromSiteMap ( ( siteMap, sel ) =>
      sel.selectedEntity && sel.selectedApi && siteMap[ sel.selectedEntity ].api[ sel.selectedApi ]._links.description ) ),
  "loadApiDescF" )

const loadApiStatus: Fetcher<State, string> = ifEEqualsFetcher<State> ( s => s.selState.selectedRadioButton == 'status', 'wrongRadioButton',
  fetcherWhenUndefined ( apiDataL.focusQuery ( 'status' ),
    loadFromSiteMap ( ( siteMap, sel ) => sel.selectedEntity && sel.selectedApi && siteMap[ sel.selectedEntity ].api[ sel.selectedApi ]._links.status ) ),
  "loadApiStatus" )

const loadApiSrc: Fetcher<State, string[]> = fetcherWhenUndefined<State, string[]> (
  apiDataL.focusQuery ( "source" ),
  loadFromSiteMap ( ( siteMap, sel ) =>
    sel.selectedEntity && sel.selectedApi && siteMap[ sel.selectedEntity ].api[ sel.selectedApi ]._links.source ),
  "loadApiSrc" )


const loadApiChild = radioButtonFetcher<State> (
  s => s.selState?.selectedRadioButton,
  identityOptics<State> ().focusQuery ( 'radioButton' ),
  fromTaggedFetcher ( { 'desc': loadApiDescF, 'src': loadApiSrc, 'status': loadApiStatus } ),
  "loadApiChild" )


const demoTree: FetcherTree<State | undefined> = fetcherTree (
  loadSiteMapF,
  lensAndChild ( orUndefined<State> (), loadThingF ),
  lensAndChild ( orUndefined<State> (), loadApiF, child ( loadApiChild ) ) )


describe ( "fetchTree", () => {
  it ( "should have a description", () => {
    expect ( descriptionOf ( demoTree ) ).toEqual ( [
      "FetcherTree(",
      "  loadSiteMapF.withMutate",
      "   Optional()",
      "      FetcherTree(",
      "        LoadThingF",
      "   Optional()",
      "      FetcherTree(",
      "        loadApiF",
      "         Iso(I)",
      "            FetcherTree(",
      "              loadApiChild"
    ] )
  } )
} )
describe ( "wouldLoad should provide test friendly means of showing what a fetchTree will do for the current state. Doesn't take into account any intermedite loads", () => {
  // it("for undefined", () => {
  //     expect(wouldLoad(demoTree, undefined)).toEqual([
  //         {fetcher: loadSiteMapF, load: true, reqData: ["someSitemapUrl", {method: "get"}]},
  //         {fetcher: loadThingF, load: false},
  //         {fetcher: loadApiF, load: false},
  //         {fetcher: loadApiChild, load: false}])
  // })
  it ( "for empty", () => {
    expect ( wouldLoad ( demoTree, { selState: {} } ) ).toEqual ( [
        { fetcher: loadSiteMapF, load: true, reqData: [ "someSitemapUrl", { method: "get" }, false ] },
        { fetcher: loadThingF, load: [ "mismatch" ] },
        { fetcher: loadApiF, load: [ "not all tags defined" ] },
        { fetcher: loadApiChild, load: [ "Cannot find f" ] }
      ]
    )
  } )
  it ( "when sitemap not loaded and thing desired but no actual", () => {
    expect ( wouldLoad ( demoTree, {
      selState: { selectedEntity: "be", selectedThing: "t1" }
    } ) ).toEqual ( [
        { fetcher: loadSiteMapF, load: true, reqData: [ "someSitemapUrl", { method: "get" }, false ] },
        { fetcher: loadThingF, load: [ "mismatch" ] },
        { fetcher: loadApiF, load: [ "not all tags defined" ] },
        { fetcher: loadApiChild, load: [ "Cannot find f" ] }
      ]
    )
  } )
  it ( "when sitemap loaded and no thing desired or actual", () => {
    expect ( wouldLoad ( demoTree, { sitemap: exampleSiteMap, selState: {} } ) ).toEqual ( [
        { fetcher: loadSiteMapF, load: [ "defined", ] },
        { fetcher: loadThingF, load: [ "mismatch" ] },
        { fetcher: loadApiF, load: [ "not all tags defined" ] },
        { fetcher: loadApiChild, load: [ "Cannot find f" ] }
      ]
    )
  } )
  it ( "when sitemap loaded and thing desired but no actual, and not radiobutton", () => {
    expect ( wouldLoad ( demoTree, {
      sitemap: exampleSiteMap,
      selState: { selectedEntity: "be", selectedThing: "t1" }
    } ) ).toEqual ( [
        { fetcher: loadSiteMapF, load: [ "defined", ] },
        { fetcher: loadThingF, load: [ "mismatch" ] },
        { fetcher: loadApiF, load: [ "not all tags defined" ] },
        { fetcher: loadApiChild, load: [ "Cannot find f" ] }
      ]
    )
  } )

  it ( "when sitemap loaded and thing desired but no actual and radio button", () => {
    expect ( wouldLoad ( demoTree, {
      sitemap: exampleSiteMap,
      selState: { selectedEntity: "be", selectedThing: "t1", selectedRadioButton: "erd" }
    } ) ).toEqual ( [
        { fetcher: loadSiteMapF, load: [ "defined", ] },
        { fetcher: loadThingF, load: true, reqData: [ "/t1/thing", {}, false ] },
        { fetcher: loadApiF, load: [ "not all tags defined" ] },
        { fetcher: loadApiChild, load: [ "Cannot find f" ] }
      ]
    )
  } )


  it ( "when sitemap loaded and api not loaded but radio selected", () => {
    expect ( wouldLoad ( demoTree, {
      sitemap: exampleSiteMap,
      selState: { selectedEntity: "be", selectedApi: "a1", selectedRadioButton: "src" }
    } ) ).toEqual ( [
        { fetcher: loadSiteMapF, load: [ "defined", ] },
        { fetcher: loadThingF, load: [ 'mismatch' ] },
        { fetcher: loadApiF, load: true, reqData: [ "/be/a1/api", {}, false ] },
        { fetcher: loadApiChild, load: true, reqData: [ "/be/a1/source", {}, false ] }
      ]
    )
  } )

  it ( "when sitemap loaded and api loaded and radio selected", () => {
    expect ( wouldLoad ( demoTree, {
      sitemap: exampleSiteMap,
      apiData: { api: exampleApi ( "a1" ), tags: [ "be", "a1" ] },
      selState: { selectedEntity: "be", selectedApi: "a1", selectedRadioButton: "src" }
    } ) ).toEqual ( [
        { fetcher: loadSiteMapF, load: [ "defined" ] },
        { fetcher: loadThingF, load: [ 'mismatch' ] },
        { fetcher: loadApiF, load: [ "tags match" ] },
        { fetcher: loadApiChild, load: true, reqData: [ "/be/a1/source", {}, false ] }
      ]
    )
  } )
  it ( "when sitemap loaded and api loaded and radio selected , the tag matches the selected, but the data isn't loaded", () => {
    let state = {
      sitemap: exampleSiteMap,
      radioButton: "src",
      apiData: { api: exampleApi ( "a1" ), tags: [ "be", "a1" ] },
      selState: { selectedEntity: "be", selectedApi: "a1", selectedRadioButton: "src" }
    };
    expect ( wouldLoad ( demoTree, state ) ).toEqual ( [
        { fetcher: loadSiteMapF, load: [ "defined", ] },
        { fetcher: loadThingF, load: [ 'mismatch' ] },
        { fetcher: loadApiF, load: [ "tags match" ] },
        { fetcher: loadApiChild, load: true, reqData: [ "/be/a1/source", {}, false ] }
      ]
    )
  } )
  it ( "should load nothing when sitemap loaded and api loaded and target of radio button loaded", () => {
    let state: State = {
      sitemap: exampleSiteMap,
      radioButton: "src",
      apiData: { api: exampleApi ( "a1" ), tags: [ "be", "a1" ], source: [ "somelines", "of source" ] },
      selState: { selectedEntity: "be", selectedApi: "a1", selectedRadioButton: "src" }
    };
    expect ( loadApiSrc.shouldLoad ( state ) ).toEqual ( [ "defined" ] )
    expect ( loadApiChild.shouldLoad ( state ) ).toEqual ( [ "defined" ] )
    expect ( wouldLoad ( demoTree, state ) ).toEqual ( [
        { fetcher: loadSiteMapF, load: [ "defined", ] },
        { fetcher: loadThingF, load: [ 'mismatch' ] },
        { fetcher: loadApiF, load: [ 'tags match' ] },
        { fetcher: loadApiChild, load: [ 'defined' ] }
      ]
    )
  } )
  it ( "should load when sitemap loaded and api loaded and selected radio button isn't the current, even if the target is there ", () => {
    let state: State = {
      sitemap: exampleSiteMap,
      radioButton: "notsrc",
      apiData: { api: exampleApi ( "a1" ), tags: [ "be", "a1" ], source: [ "somelines", "of source" ] },
      selState: { selectedEntity: "be", selectedApi: "a1", selectedRadioButton: "src" }
    };
    expect ( loadApiSrc.shouldLoad ( state ) ).toEqual ( [ "defined" ] )
    expect ( loadApiChild.shouldLoad ( state ) ).toEqual ( [] )
    expect ( wouldLoad ( demoTree, state ) ).toEqual ( [
        { fetcher: loadSiteMapF, load: [ "defined", ] },
        { fetcher: loadThingF, load: [ 'mismatch' ] },
        { fetcher: loadApiF, load: [ 'tags match' ] },
        { fetcher: loadApiChild, load: true, reqData: [ "/be/a1/source", {}, false ] }
      ]
    )
  } )
} )

describe ( "integration test for fetcherDemo", () => {

  const fetchFn = ( count: [ number ] ) => <T> ( re: RequestInfo, init?: RequestInit ): Promise<[ number, T ]> => {
    count[ 0 ] = count[ 0 ] + 1
    // @ts-ignore
    if ( re == "someSitemapUrl" ) return Promise.resolve ( [ 200, exampleSiteMap ] )
    // @ts-ignore
    if ( re == "/t1/thing" ) return Promise.resolve ( [ 200, exampleThing ( "t1" ) ] )
    // @ts-ignore
    if ( re == "/be/a1/api" ) return Promise.resolve ( [ 200, exampleApi ( "a1" ) ] )
    // @ts-ignore
    if ( re == "/be/a1/source" ) return Promise.resolve ( [ 200, [ "some", "lines" ] ] )
    // @ts-ignore
    if ( re == "/be/a1/description" ) return Promise.resolve ( [ 200, "someDesc" ] )
    throw Error ( `unknown request ${re}` )

  };

  it ( "should load the sitemap when the state is empty", async () => {
    const count: [ number ] = [ 0 ]
    expect ( await loadTree ( demoTree, { selState: {} }, fetchFn ( count ) ) ).toEqual ( {
      sitemap: exampleSiteMap, "selState": {
        "selectedApi": "a1",
        "selectedEntity": "be",
        "selectedThing": "t1",
        "selectedRadioButton": "erd"
      },
      apiData: { api: exampleApi ( "a1" ), tags: [ "be", "a1" ] },
      thing: { "t": exampleThing ( "t1" ), "tags": [ "be", "t1" ] }
    } )
    expect ( count[ 0 ] ).toEqual ( 3 )
  } )
  it ( "should load nothing when the raw data is good", async () => {
    const count: [ number ] = [ 0 ]
    let state: State = {
      sitemap: exampleSiteMap, "selState": {
        "selectedApi": "a1",
        "selectedEntity": "be",
        "selectedThing": "t1"
      },
      apiData: { api: exampleApi ( "a1" ), tags: [ "be", "a1" ] },
      thing: { "t": exampleThing ( "t1" ), "tags": [ "be", "t1" ] }
    };
    expect ( await loadTree ( demoTree, state, fetchFn ( count ) ) ).toEqual ( state )
    expect ( count[ 0 ] ).toEqual ( 0 )
  } )
  it ( "should load radio buttons when they are selected", async () => {
    const count: [ number ] = [ 0 ]
    let state: State = {
      sitemap: exampleSiteMap, "selState": {
        "selectedApi": "a1",
        "selectedEntity": "be",
        "selectedThing": "t1",
        selectedRadioButton: "src"
      },
      apiData: { api: exampleApi ( "a1" ), tags: [ "be", "a1" ] },
      thing: { "t": exampleThing ( "t1" ), "tags": [ "be", "t1" ] }
    };
    expect ( await loadTree ( demoTree, state, fetchFn ( count ) ) ).toEqual (
      {
        sitemap: exampleSiteMap, "selState": {
          "selectedApi": "a1",
          "selectedEntity": "be",
          "selectedThing": "t1",
          selectedRadioButton: "src"
        },
        radioButton: "src",
        apiData: { api: exampleApi ( "a1" ), tags: [ "be", "a1" ], source: [ "some", "lines" ] },
        thing: { "t": exampleThing ( "t1" ), "tags": [ "be", "t1" ] }
      } )
    expect ( count[ 0 ] ).toEqual ( 1 )
  } )
  it ( "should not do anything when radio buttons are correctly loaded", async () => {
    const count: [ number ] = [ 0 ]
    let state: State = {
      sitemap: exampleSiteMap, "selState": {
        "selectedApi": "a1",
        "selectedEntity": "be",
        "selectedThing": "t1",
        selectedRadioButton: "src"
      },
      radioButton: "src",
      apiData: { api: exampleApi ( "a1" ), tags: [ "be", "a1" ], source: [ "some", "lines" ] },
      thing: { "t": exampleThing ( "t1" ), "tags": [ "be", "t1" ] }
    };
    expect ( await loadTree ( demoTree, state, fetchFn ( count ) ) ).toEqual ( state )
    expect ( count[ 0 ] ).toEqual ( 0 )
  } )
  it ( "should load when radio button changed", async () => {
    const count: [ number ] = [ 0 ]
    let state: State = {
      sitemap: exampleSiteMap, "selState": {
        "selectedApi": "a1",
        "selectedEntity": "be",
        "selectedThing": "t1",
        selectedRadioButton: "desc"
      },
      radioButton: "src",
      apiData: { api: exampleApi ( "a1" ), tags: [ "be", "a1" ], source: [ "some", "lines" ] },
      thing: { "t": exampleThing ( "t1" ), "tags": [ "be", "t1" ] }
    };
    expect ( await loadTree ( demoTree, state, fetchFn ( count ) ) ).toEqual ( {
      sitemap: exampleSiteMap, "selState": {
        "selectedApi": "a1",
        "selectedEntity": "be",
        "selectedThing": "t1",
        selectedRadioButton: "desc"
      },
      radioButton: "desc",
      apiData: { api: exampleApi ( "a1" ), tags: [ "be", "a1" ], source: [ "some", "lines" ], desc: "someDesc" },
      thing: { "t": exampleThing ( "t1" ), "tags": [ "be", "t1" ] }
    } )
    expect ( count[ 0 ] ).toEqual ( 1 )
  } )
} )