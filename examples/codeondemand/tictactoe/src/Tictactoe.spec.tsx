//Copyright (c)2020-2023 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import React from 'react';

import {enzymeSetup} from './enzymeAdapterSetup';
import {shallow, ShallowWrapper} from "enzyme";

import {Lens, Lenses} from "@focuson/lens";
import {focusOnNth, LensState, lensState} from "@focuson/state";
import {BoardData, GameData, NoughtOrCross} from "./GameDomain";
import {Board} from "./render/Board";
import {Game} from "./render/Game";
import {Square} from "./render/Square";
import { context, Context } from "./context";

enzymeSetup()

let boardJson: BoardData = {
    "_render": {
        "_self": "#Board/render#",
        "square": "#Square/render#"
    },
    "squares": ["X", "", "", "", "", "", "", "", ""]
}

let gameJson: GameData = {
    "_links": {
        "game1": {"href": "created/gameJson1.json"},
        "game2": {"href": "created/gameJson2.json"}
    },
    "_render": {"_self": "#Game/render#"},
    "state": "X",
    "_embedded": {
        "board": boardJson
    }
}

function setJson(json: GameData): void {throw new Error('should not be called')}

let cache: any = ''//this isn't used and it's ok if it throws errors as that will indicate test failure
let state = lensState<GameData, Context>(gameJson, setJson, 'game', context)

function squareContext(state: LensState<GameData, GameData, Context>, n: number): LensState<GameData, NoughtOrCross, Context> {
    return focusOnNth(state.focusOn('_embedded').focusOn('board').focusOn('squares'), n)
}

function compare<Domain, Main, Data>(wrapper: ShallowWrapper<any, React.Component["state"], React.Component>, state: LensState<Main, Data, Context>, expectedLensDescription: string) {
    let props: any = wrapper.props()
    let childState: LensState<Main, Data, Context> = props.state
    expect(childState.optional.description).toBe(expectedLensDescription)
    expect(childState.main).toBe(state.main)
    expect(childState.dangerouslySetMain).toBe(state.dangerouslySetMain)

}

describe("Tictactoe", () => {
    describe("game", () => {
        it("should render", () => {
            const game = shallow(<Game state={state}/>)
            expect(game.find('LoadGame')).toHaveLength(2)
            let componentServers = game.find('ComponentFromServer');
            expect(componentServers).toHaveLength(1)
            compare(componentServers.at(0), state, 'game.focus?(_embedded).focus?(board)')
        })
    })
    describe("board", () => {
        it("should render", () => {
            const board = shallow(<Board state={state.focusOn('_embedded').focusOn('board')}/>)
            let componentServers = board.find('ChildFromServer');
            expect(componentServers).toHaveLength(9)
            componentServers.forEach((square, i) => compare(square, state, 'game.focus?(_embedded).focus?(board)'))
            componentServers.forEach((square, i) => {
                let props: any = square.props()
                console.log('props', props)
                console.log('props.lens', props.lens)
                expect(props.lens.description).toBe(`board.focusOn(squares).chain([${i}])`)
                expect(props.render).toEqual('square')
            })
        })
    })
    describe("square", () => {
        it("should render", () => {
            const square = shallow(<Square state={squareContext(state, 0)}/>)
            expect(square.text()).toEqual('X')
        })

            //
        //     jest.spyOn(Square, 'useContext')
        //
        //     const square = render(<Square state={squareContext(state, 1)}/>)
        //     square.simulate('click')
        //
        //     expect(loadJson.mock.calls.length).toBe(1)
        //     let data: GameData = loadJson.mock.calls[0][0]
        //     expect(data.state).toBe('O') // inverted
        //     expect(data._embedded.board.squares[1]).toBe('X')
        // })
    })
})
