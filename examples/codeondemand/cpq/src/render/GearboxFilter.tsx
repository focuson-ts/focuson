//Copyright (c)2020-2022 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import React from "react";
import {CqpFilter} from "../CpqDomain";
import { LensProps, reasonFor } from "@focuson/state";
import { Context } from "../context";

function makeOptions(selected: string | null, values: string[]) {
    let option = (value: string) => (selected === value) ?
        (<option key={value} selected>{value}</option>) :
        (<option key={value}>{value}</option>)
    return values.map(option)
}

export function GearboxFilter<Main>({state}: LensProps<Main, CqpFilter,Context>) {
    const onChange = (event: any) => state.focusOn('selected').setJson(event.target.value, reasonFor('GearboxFilter', 'onChange'));
    let filterJson = state.json();
    let options = makeOptions(filterJson.selected, state.json().legalValues);
    return (<div key={filterJson.filterName} className="gearboxFilterContainer">
        <p><span className="font-weight-bold">Filter:</span> {filterJson.filterName}</p>
        <select className="gearboxFilter" onChange={event => onChange(event)} key={`select-${filterJson.filterName}`}>{options}</select>
    </div>);
}
