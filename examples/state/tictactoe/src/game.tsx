//Copyright (c)2020-2023 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import { Lens, Lenses } from "@focuson/lens";
import { focus1OnNth, LensProps, LensProps2, LensState2, reasonFor } from "@focuson/state";
import * as React from "react";
import { Context } from "./context";


//These are the interfaces to describe the Game json
export interface GameData {
  next: NoughtOrCross,
  board: BoardData
}

export type NoughtOrCross = "O" | "X" | ""

export interface BoardData {
  squares: SquareData
}

type SquareData = NoughtOrCross[]
export const gameDataL: Lens<GameData, GameData> = Lenses.build<GameData> ( 'game' )
export const gameDataToNextL: Lens<GameData, NoughtOrCross> = gameDataL.focusOn ( 'next' )

/** This is a helper to get rid of the noise of  LensProps<GameDomain, GameData, T> replacing it with GameProps<T> */
export type GameProps<Main, T> = LensProps<Main, T, Context>

//This is the json representation of the state of the game
export let emptyGame: GameData = {
  "next": "X",
  "board": {
    "squares": [ "", "", "", "", "", "", "", "", "" ]
  }
}

export function SimpleGame ( { state }: GameProps<GameData, GameData> ) {
  let newState: LensState2<GameData, BoardData, NoughtOrCross, Context> = state.addSecond<NoughtOrCross> ( gameDataToNextL ).focus1On ( 'board' );
  console.log ( 'simplegame', state.optJson () )
  console.log ( 'simplegame - next', state.focusOn ( 'next' ).optJson () )
  return (
    <div className='game'>
      <NextMove state={state.focusOn ( 'next' )}/>
      <Board state={newState}/>
    </div>)
}


export function NextMove ( { state }: GameProps<GameData, NoughtOrCross> ) {
  return (<div> Next Move{state.json ()}</div>)
}

export function Board ( { state }: LensProps2<GameData, BoardData, NoughtOrCross, Context> ) {
  let squares = state.focus1On ( 'squares' );
  console.log ( 'Board - next', state.optJson1 (), state.optJson2 () )
  console.log ( 'Board - squares', squares.optJson1 (), squares.optJson2 () )
  console.log ( 'Board - squares(n)', focus1OnNth ( squares, 1 ).optJson1 (), focus1OnNth ( squares, 1 ).optJson2 () )

  let sq = ( n: number ) => (<Square state={focus1OnNth ( squares, n )}/>)
  return (<div className='board'>
    <div>{sq ( 0 )}{sq ( 1 )}{sq ( 2 )}</div>
    <div>{sq ( 3 )}{sq ( 4 )}{sq ( 5 )}</div>
    <div>{sq ( 6 )}{sq ( 7 )}{sq ( 8 )}</div>
  </div>)
}

function invert ( s: NoughtOrCross ): NoughtOrCross {
  return (s === 'X' ? 'O' : 'X')
}

const nextValueForSquare = ( sq: NoughtOrCross, next: NoughtOrCross ) => next;
const nextValueForNext = ( sq: NoughtOrCross, next: NoughtOrCross ) => invert ( next );

export function Square ( { state }: LensProps2<GameData, NoughtOrCross, NoughtOrCross, Context> ) {
  let onClick = () => {
    if ( state.json1 () === '' ) state.transformJson2 ( nextValueForSquare, nextValueForNext, reasonFor ( 'Square', 'onClick' ) )
  }
  return (<button className='square' onClick={onClick}>{state.json1 ()}</button>)
}
