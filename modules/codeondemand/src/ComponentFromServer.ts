//Copyright (c)2020-2022 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import { LoadAndCompileCache } from "./LoadAndCompileCache";
import React, { useContext } from "react";
import { Lens } from "@focuson-nw/lens";
import { LensProps, LensState, setJsonForFlux } from "@focuson-nw/state";
import { ComponentCacheContext } from "./ComponentCacheContext";


export function loadJsonFromUrl<Main, Context> ( description: string,
                                                 context: Context,
                                                 cache: LoadAndCompileCache<MakeComponentFromServer<React.ReactElement>>,
                                                 processContext: ( cache: LoadAndCompileCache<MakeComponentFromServer<React.ReactElement>>, c: LensState<Main, Main, Context> ) => void ): ( url: string ) => Promise<void> {
  return url => {
    cache.debug ( `loadJsonFromUrl: ${url}` )
    return fetch ( url ).then ( r => r.text () ).then ( jsonString => {
      cache.debug ( `loadJsonFromUrl. ${url} => ${jsonString}` )
      let json = JSON.parse ( jsonString )
      cache.loadFromBlob ( json ).then ( () => setJsonForFlux<Main, void, Context> ( description, context, c => processContext ( cache, c ) ) ( json ) )
    } )
  }
}

interface LensPropsWithRender<Main, T, Child, Context> extends LensProps<Main, T, Context> {
  render: string
  lens: Lens<T, Child>
}

export interface MakeComponentFromServer<ReactElement> {<Main, T, Context> ( props: LensState<Main, T, Context> ): ReactElement}

function findRenderUrl ( name: string, child: any ): string {
  if ( child._render && name in child._render ) return child._render[ name ]
  console.log ( "cannot find renderurl", name, child )
  throw Error ( `Cannot find renderUrl for  [${name}] in [${JSON.stringify ( child, null, 2 )}]` )
}

export function ComponentFromServer<Main, T, Context> ( { state }: LensProps<Main, T, Context> ) {
  const cache = useContext ( ComponentCacheContext );
  let renderUrl = findRenderUrl ( "_self", state.json () )
  let makeComponent = cache.getFromCache ( renderUrl )
  try {
    console.log ( "Calling ", makeComponent )
    console.log ( "with ", state )
    let props: any = { state }
    let result = makeComponent ( props );
    console.log ( "madecomponent", result )
    return result
  } catch ( e ) {
    console.error ( "Had exception making a component" )
    console.log ( "    error renderUrl", renderUrl )
    console.log ( "    error state", state )
    console.log ( "    error json", state.json () )
    console.log ( "    error makecomponent", makeComponent )
    throw e

  }
}

export function ChildFromServer<Main, T, Child, Context> ( { state, render, lens }: LensPropsWithRender<Main, T, Child, Context> ) {
  const cache = useContext ( ComponentCacheContext );
  let parentJson = state.json ()
  let renderUrl = findRenderUrl ( render, parentJson )
  let makeComponent = cache.getFromCache ( renderUrl )
  let props: any = { state: state.chainLens ( lens ) }
  return makeComponent ( props )
}
