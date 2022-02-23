//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS

import {LensProps} from "@focuson/state";
import {CounterData, TwoCounterData} from "./domain";
import { Context } from "./context";

export function Counter<Main, Context>({state}: LensProps<Main, CounterData, Context>) {
    let value = state.json().value
    let increment = () => state.setJson({value: value + 1})
    let decrement = () => state.setJson({value: value - 1})
    return (<p>
            Clicked: {value} times
            {' '}
            <button id='increment' onClick={increment}>+</button>
            {' '}
            <button  id='decrement' onClick={decrement}>-</button>
        </p>
    )
}

export function TwoCounter<Main, Context>({state}: LensProps<Main, TwoCounterData, Context>) {
    return (<div>
        <Counter state={state.focusOn('counterOne')}/>
        <Counter state={state.focusOn('counterTwo')}/>
    </div>)
}
