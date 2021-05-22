//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import {LensProps} from "../state"; //changed from @focuson/state;
import {ViewStore} from "../view"; //changed from @focuson/view;

interface MainViewProps<State, Element> extends LensProps<State, State> {
    viewStore: ViewStore<State, Element>
}

export function MainView<State, Element>({state, viewStore}: MainViewProps<State, Element>) {
    let s = state.json()
    let viewName = viewStore.currentView.get(s);
    if (viewName) {
        let view = viewStore.views[viewName]
        let mainItem = view.main.get(s)
        viewStore.log("MainView", view, s, mainItem)
        if (mainItem == undefined) {
            return view.displayWhenNotDefined(s)
        } else {
            let props = view.props(state)
            viewStore.log("MainView - defined", view, mainItem, props)
            return view.display(props)
        }
    }
    return (<p>Loading...</p>)
}