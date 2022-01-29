//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import { Lenses } from "@focuson/lens";
import { LensState, lensState } from "@focuson/state";
import { Chest, Dragon, dragon } from "./LensFixture";


let initialMain = { ...dragon }
let setMain = jest.fn ();
let dragonLS = lensState ( dragon, setMain, "dragon" )
let chestLS = dragonLS.focusOn ( 'body' ).focusOn ( 'chest' )
let stomachLS = chestLS.focusOn ( 'stomach' )

function setupForSetMain<Main, T> ( context: LensState<Main, T>, fn: ( context: LensState<Main, T>, setMain: jest.Mock ) => void ) {
  const setMain = jest.fn ()
  let newContext: LensState<Main, T> = new LensState ( context.main, setMain, context.optional )
  fn ( newContext, setMain )
}

function checkSetMainWas<Main> ( setMain: jest.Mock, expected: Main ) {
  expect ( setMain.mock.calls.length ).toEqual ( 1 )
  expect ( setMain.mock.calls[ 0 ][ 0 ] ).toEqual ( expected )
  expect ( dragon ).toEqual ( initialMain ) //just checking no sideeffects
}

function checkLensState<T> ( ls: LensState<Dragon, T>, lensDescription: string ) {
  expect ( ls.main ).toEqual ( dragon )
  expect ( ls.optional.description ).toEqual ( lensDescription )
  expect ( ls.dangerouslySetMain ).toEqual ( setMain )
}
describe ( "LensState", () => {
  it ( "create", () => {
    checkLensState ( dragonLS, 'dragon' )
    checkLensState ( chestLS, 'dragon.focus?(body).focus?(chest)' )
  } )
  it ( "should have json equal to the focus of the  lens", () => {
    expect ( dragonLS.json () ).toEqual ( dragon )
    expect ( chestLS.json () ).toEqual ( dragon.body.chest )
  } )

  it ( "with Lens should ignore the parent lens", () => {
    let replace = chestLS.copyWithLens ( chestLS.optional.withDescription ( 'theNewLens' ) )
    checkLensState ( replace, 'theNewLens' )
  } )
  it ( "with withChildLens should concatenate with the parent lens", () => {
    let child = chestLS.chainLens ( Lenses.identity<Chest> ().withDescription ( 'childName' ) )
    checkLensState ( child, 'dragon.focus?(body).focus?(chest).chain(childName)' )
  } )
  it ( "setJson should call danagerouslySetMain with the result of passing main and the new json to the lens", () => {
    let json = { contents: [ 1, 2, 3 ] };
    setupForSetMain ( stomachLS, ( context, setMain ) => {
      context.setJson ( json )
      checkSetMainWas ( setMain, stomachLS.optional.set ( dragon, json ) )
    } )
  } )

  // it("setFrom should call dangerousSetMain using the lens concatenated to the current state", () => {
  //     let json = {stomach: {contents: [1, 2, 3]}};
  //     setupForSetMain(stomachLS, (context, setMain) => {
  //         let newLens = Lens.build<Dragon>('passedLens')
  //         context.setFrom(newLens, json)
  //         checkSetMainWas(setMain, context.optional.andThen(square3L).set(SimpleGameDomain.emptyGame, 'X'))
  //     })
  // })

} )

describe ( "lenState2", () => {
  it ( "should update two lens simultaneously", () => {
    setupForSetMain ( dragonLS, ( ls, setMain ) => {
      const ls2 = ls.focusOn ( 'body' ).focusOn ( 'chest' ).doubleUp ().focus1On ( 'stomach' ).focus2On ( 'heart' )
      ls2.setJson ( { contents: [ 'some' ] }, 'thing' )

      checkSetMainWas ( setMain, {
        "body": {
          "chest": {
            "heart": "thing",
            "stomach": { "contents": [ "some" ] }
          }
        }
      } )
    } )
  } )

  it ( "should allow 'chainWithLens1 chainWithLens2", () => {
    setupForSetMain ( dragonLS, ( ls, setMain ) => {
      const identity = Lenses.identity<Chest>('id')
      const ls2 = ls.focusOn ( 'body' ).focusOn ( 'chest' ).doubleUp ()
        ls2.chain1(identity.focusOn('stomach') ).chain2(identity.focusOn('heart')).setJson ( { contents: [ 'some' ] }, 'thing' )

      checkSetMainWas ( setMain, {
        "body": {
          "chest": {
            "heart": "thing",
            "stomach": { "contents": [ "some" ] }
          }
        }
      } )
    } )
  } )

} )