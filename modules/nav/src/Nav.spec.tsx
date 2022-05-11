//Copyright (c)2020-2022 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import React from 'react';
import {Nav} from "./Nav";
import {enzymeSetup} from './enzymeAdapterSetup';
import {shallow} from "enzyme";

enzymeSetup()

const flushPromises = () => new Promise(setImmediate);
let jsonFiles = ['jsonFile1', 'jsonFile2'];

function fetch(url: string) {
    expect(url).toEqual(jsonFiles[0]);
    return Promise.resolve('someResult')
}
describe("Nav", () => {

    it('renders the files assed to it', () => {
        const nav = shallow(<Nav jsonFiles={jsonFiles} setData={jest.fn()} fetch={fetch}/>)
        expect(nav.find('.navitem').map(n => n.text())).toEqual(jsonFiles)
        expect(nav.find('.navitem').map(n => n.getElement().type)).toEqual(['li', 'li'])
        expect(nav.find('.navitem').map(n => n.getElement().key)).toEqual(jsonFiles)
    });

    it('on click should call setJson with the url', async () => {
        let setData = jest.fn()
        const nav = shallow(<Nav jsonFiles={jsonFiles} fetch={fetch} setData={setData}/>)
        let item0 = nav.findWhere(n => n.key() === 'jsonFile1');
        expect(item0.text()).toEqual('jsonFile1')
        item0.simulate('click')

        await flushPromises();
        nav.update();

        expect(setData.mock.calls.length).toBe(1);
        expect(setData.mock.calls[0][0]).toBe('someResult');
        expect(item0.getElement().type).toEqual('li')
    });

})
