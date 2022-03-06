//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import { LensState, LensProps, SetJsonReasonForComponent, reasonFor } from "@focuson/state";
import { Context } from "./context";


export interface CpqData {
    make: MakeSelection,
    model: ModelSelection,
    upholstery: UpholsterySelection,
    externalPaint: PaintSelection,
    leasePeriod: LeasePeriod
}
type MakeSelection = SimpleFilterData
type ModelSelection = SimpleFilterData
type UpholsterySelection = SimpleFilterData
type PaintSelection = SimpleFilterData
type LeasePeriod = SimpleFilterData


export interface RootFilterData<T> {
    filterName: string,
    selected?: string,
    options: T []

}
export interface SimpleFilterData extends RootFilterData<string> {
}
export interface ImageFilterData extends RootFilterData<ImageFilterOption> {
}

export interface ImageFilterOption {
    name: string,
    img: string
}
type CpqProps<T> = LensProps<CpqData, T, Context>

export function Cpq({state}: CpqProps<CpqData>) {
    return (
        <div className='cpq'>
            <div className='two'>
                <SimpleFilter state={state.focusOn('make')}/>
                <SimpleFilter state={state.focusOn('model')}/>
                <SimpleFilter state={state.focusOn('upholstery')}/>
                <SimpleFilter state={state.focusOn('externalPaint')}/>
                <SimpleFilter state={state.focusOn('leasePeriod')}/>
            </div>
        </div>
    )
}

function displayIfPresent<T, Result>(state: LensState<CpqData, T, Context>, fn: () => Result): Result | null {
    return state.json() ? fn() : null;
}


function RootFilter<T>({state}: CpqProps<RootFilterData<T>>, findDisplayTextFn: (option: any) => string, reasonFor: SetJsonReasonForComponent) {
    let filterJson = state.json();
    const onChange = (event: any) => {state.focusOn('selected').setJson(event.target.value,reasonFor) };
    let options = state.json().options.map(o => (<option key={findDisplayTextFn(o)}>{findDisplayTextFn(o)}</option>))
    return displayIfPresent(state, () =>
        <select className='simpleFilter'
                value={filterJson.selected ? filterJson.selected : ''}
                key={state.json().filterName}
                id={state.json().filterName}
                onChange={onChange}>{options}</select>)
}

function ImagedDropDownFilter({state}: CpqProps<ImageFilterData>) {
    return RootFilter<ImageFilterOption>({state}, o => o.name, reasonFor('ImagedDropDownFilter', 'onClick'))
}
function SimpleFilter({state}: CpqProps<SimpleFilterData>) {
    return RootFilter<string>({state}, s => s, reasonFor('SimpleFilter', 'onClick'))
}
