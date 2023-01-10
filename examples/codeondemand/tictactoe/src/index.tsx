//Copyright (c)2020-2022 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import ReactDOM from 'react-dom';
import './index.css';
import {SHA256} from 'crypto-js'
import {GameContext, GameData, GameDomain, onClickSquare} from "./GameDomain";
import {getElement} from "@focuson-nw/state";
import {ComponentCacheContext, ComponentFromServer, LoadAndCompileCache, loadJsonFromUrl, MakeComponentFromServer} from "@focuson-nw/codeondemand";
import React, {useContext} from "react";
import { context, Context } from "./context";

let cache = LoadAndCompileCache.create<MakeComponentFromServer<React.ReactElement>>((s: string) => SHA256(s).toString())


let element = getElement('root')

// @ts-ignore
window.useContext = useContext
// @ts-ignore
window.GameContext = GameContext

function loadJson(url: string) {
    const domain: GameDomain = {loadJson, onClickSquare}
    return loadJsonFromUrl<GameData, Context>('game', context,cache, (cache, s) =>
        ReactDOM.render(
            <ComponentCacheContext.Provider value={cache}>
                <GameContext.Provider value={domain}>
                    <ComponentFromServer state={s}/>
                </GameContext.Provider>
            </ComponentCacheContext.Provider>, element))(url)
}

loadJson('created/gameJson1.json')


