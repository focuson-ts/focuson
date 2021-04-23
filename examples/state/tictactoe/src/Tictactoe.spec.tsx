//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import React from 'react';

import {enzymeSetup} from './enzymeAdapterSetup';
import {shallow, ShallowWrapper} from "enzyme";
import {focus1OnNth, focusOnNth, LensState, lensState, LensState2} from "@focuson/state";
import {Board, BoardData, GameData, gameDataToNextL, NoughtOrCross, SimpleGame, Square} from "./game";


enzymeSetup()

let boardJson: BoardData = {"squares": ["X", "", "", "", "", "", "", "", ""]}

let gameJson: GameData = {"board": boardJson, next: 'X'}

function setJson(json: GameData): void {throw new Error('should not be called')}

let state = lensState<GameData>(gameJson, setJson, 'game')
function squareState(state: LensState<GameData, GameData>, n: number): LensState2<GameData, NoughtOrCross, NoughtOrCross> {
    let squaresContext = state.addSecond<NoughtOrCross>(gameDataToNextL).focus1On('board').focus1On('squares');
    return focus1OnNth(squaresContext, n)
}

function compare<Domain, Main, Data>(wrapper: ShallowWrapper<any, React.Component["state"], React.Component>, state: LensState<Main, Data>, expectedLensDescription: string) {
    let props: any = wrapper.props()
    let childState: LensState<Main, Data> = props.state
    expect(childState.lens.description).toBe(expectedLensDescription)
    expect(childState.main).toBe(state.main)
    expect(childState.dangerouslySetMain).toBe(state.dangerouslySetMain)

}
function compare2<Domain, Main, Data>(wrapper: ShallowWrapper<any, React.Component["state"], React.Component>, state: LensState<Main, Data>, expectedLens1Description: string,expectedLens2Description: string) {
    let props: any = wrapper.props()
    let childState: LensState2<Main, Data,NoughtOrCross> = props.state
    expect(childState.state1().lens.description).toBe(expectedLens1Description)
    expect(childState.state2().lens.description).toBe(expectedLens2Description)
    expect(childState.main).toBe(state.main)
    expect(childState.dangerouslySetMain).toBe(state.dangerouslySetMain)

}

describe("Tictactoe", () => {
    describe("SimpleGame", () => {
        it("should render", () => {
            const game = shallow(<SimpleGame state={state}/>)
            console.log("game", game.text())

            expect(game.find('NextMove')).toHaveLength(1)
            compare(game.find('NextMove').at(0), state, 'game/next')

            expect(game.find('Board')).toHaveLength(1)
            compare2(game.find('Board').at(0), state, 'game/board', 'game/next')
        })
    })
    describe("board", () => {
        it("should render", () => {
            let state1: LensState2<GameData, BoardData, NoughtOrCross> = state.addSecond<NoughtOrCross>(gameDataToNextL).focus1On('board');
            const board = shallow(<Board state={state1}/>)
            let componentSquares = board.find('Square');
            expect(componentSquares).toHaveLength(9)
            componentSquares.forEach((square, i) =>
                compare2(square, state, `game/board/squares/[${i}]`, 'game/next'))
        })
    })
    describe("square", () => {
        it("should render", () => {
            const square = shallow(<Square state={squareState(state, 0)}/>)
            expect(square.text()).toEqual('X')
        })

        it("should have an onclick that inverts the state, and sets the square with the current state", () => {
            let setJson = jest.fn()
            let context = lensState<GameData>(gameJson, setJson, 'game')
            const square = shallow(<Square state={squareState(context, 1)}/>)
            square.simulate('click')
            expect(setJson.mock.calls.length).toBe(1)
            let data: GameData = setJson.mock.calls[0][0]
            expect(data.next).toBe('O') // inverted
            expect(data.board.squares[1]).toBe('X')
        })
    })
})
