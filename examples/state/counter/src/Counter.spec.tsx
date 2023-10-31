//Copyright (c)2020-2023 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import React from 'react';


import { LensState, lensState } from "@focuson/state";
import { CounterData } from "./domain";
import { Counter } from "./Counter";
import { context, Context } from "./context";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

let emptyCounter: CounterData = { value: 0 }

function setup<T> ( json: T, block: ( state: LensState<T, T, Context>, remembered: () => T | undefined ) => void ) {
  var remembered: T | undefined = undefined
  let state = lensState<T, Context> ( json, ( json: T ): void => {remembered = json}, 'game', context )
  block ( state, () => remembered )
}
describe ( "Counter", () => {
  it ( "should render", () => {
    setup ( emptyCounter, ( state, remembered ) => {
      render ( <Counter state={state}/> )
      expect ( screen.getByText ( "Clicked: 0 times" ) ).toBeInTheDocument ();
      expect ( screen.getByText ( "+" ) ).toBeInTheDocument ();
      expect ( screen.getByText ( "-" ) ).toBeInTheDocument ();
      expect ( remembered () ).toEqual ( undefined )
    } )
  } )
  it ( "should have an increment button that increases the value in the state", () => {
    setup(emptyCounter, (state, remembered) => {
      render(<Counter state={state}/>);

      const incrementButton = screen.getByText("+");
      fireEvent.click(incrementButton);

      expect(remembered()).toEqual({ value: 1 });
    });
  } )
  it ( "should have an decrement button that increases the value in the state", () => {
    setup(emptyCounter, (state, remembered) => {
      render(<Counter state={state}/>);

      const incrementButton = screen.getByText("-");
      fireEvent.click(incrementButton);

      expect(remembered()).toEqual({ value: -1 });
    });
  } )
} )
