//Copyright (c)2020-2023 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import React from 'react';
import { Cpq, CpqData } from "./Cpq";
import { lensState } from "@focuson/state";
import { context, Context } from "./context";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

let json: CpqData = {
  "make": {
    "filterName": "filtermake",
    "selected": "Tesla",
    "options": [ "Tesla", "BMW", "Audi" ]
  },
  "model": {
    "filterName": "filtermodel",
    "selected": "BMW series 6",
    "options": [ "Audi A10", "BMW series 6", "Tesla Roadster" ]
  },
  "upholstery": {
    "filterName": "filterupholstery",
    "selected": "Boring Cotton",
    "options": [ "Black Techno Leather", "Boring Cotton" ]
  },
  "externalPaint": {
    "filterName": "filterexternalPaint",
    "options": [ "Exciting Red", "Boring Black", "Electric Blue" ]
  },
  "leasePeriod": {
    "filterName": "filterleasePeriod",
    "options": [ "12m", "24m", "36m", "48m" ]
  }
}

let state = lensState<CpqData, Context> ( json, () => {throw Error ( "Shouldn't be called" )}, 'cpq', context )

describe ( "Cpq", () => {

  it ( 'renders the json passed to it', () => {
    render ( <Cpq state={state}/> )
    const selectBoxes = screen.queryAllByRole ( 'combobox' );
    expect ( selectBoxes ).toHaveLength ( 5 );

    expect ( selectBoxes[ 0 ] ).toHaveValue ( json.make.selected );
    expect ( selectBoxes[ 1 ] ).toHaveValue ( json.model.selected );
    expect ( selectBoxes[ 2 ] ).toHaveValue ( json.upholstery.selected );
    expect ( selectBoxes[ 3 ] ).toHaveValue ( "Exciting Red" );
    expect ( selectBoxes[ 4 ] ).toHaveValue ( "12m" );
  } );
} )

