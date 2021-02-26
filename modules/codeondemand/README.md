# Warning: this is still R&D

The ideas here are still under development.

# The problem that is being solved

You can read [here](PROBLEM.md) more details about the problem being solved, and how this compares to 
traditional solutions. The 'tl;dr' version is that modern guis and apis often break. They are typically 
tightly coupled to each other and a change anywhere in that distributed monolith has unpleasant consequences 
varying from 'outages' to 'loss of features'. The symptoms that you have a distributed monolith instead of 
a system designed to last for decades is having schemas (i.e. out of band communication) between the apis and
between the api and gui.

This approach allows the apis to change, allows multiple versions of the api and backends to exist with radically different
data representations and features (for example to support localisation or experiments) and the front end keeps on working
with the need for complicated code changes, feature flags, redeployments and other complexity

The solution is simple, easy to use and works

# The solution

You can read [here](SOLUTION.md) how the solution actually solves the problems of geographic diversity, breaks the 
distributed monolith, and delivers a decoupled system that is designed to last for decades.  The 'tl;dr' version is
that
* Each server version knows the data that it is delivering
* The server maintains small sub components for the volatile and varying parts of the code
* When the server delivers the data includes information for the client to know how to render it

This means that we don't need to worry about schemas, we don't need to worry about versioning schemas and testing that
the new code works with old versions. For both the client and the server there is only 'now'. The code and the data that
is being served by the server

# What does this mean for testing

The author of this toolkit has spent years working with contract testing. One of the most exciting things about this 
approach is that it removed the need for most integration tests, and even most contract tests. The same tests exist but 
they have been pushed further down the testing pyramid. The tests run faster, are easier to manage, and because they
only have to test 'now' and not 'all the previous versions'  they are much simpler to write and maintain

# Using the code

## Toolchain

Currently the toolchain is extremely primitive. I use two command terminals: One to compile the code on demand, and one 
to run the react code. It would be nice to incorporate the code on demand code into the tool chain and that is 'on the 
backlog'.


## Writing React 'Code on Demand' Components

Components must be totally isolated: This is of course good practice when using react. The only interaction with external
components must be through the context, or the properties. Apart from this requirement, there is almost no difference 
between a standard react component and a 'code on demand' component.

## Using the components

The essential difference between a normal gui and using code on demand is that the data comes from the server, and so 
does the component for serving the data. In the data the server 'tells' the client which component to use and that is loaded.

Here we see a typical 'main method'
```tsx
function loadJson(url: string) {
    const domain: GameDomain = {loadJson, onClickSquare}
    return loadJsonFromUrl<GameData>('game', cache, (cache, s) =>
        ReactDOM.render(
            <ComponentCacheContext.Provider value={cache}>
                <GameContext.Provider value={domain}>
                    <ComponentFromServer state={s}/>
                </GameContext.Provider></ComponentCacheContext.Provider>, element))(url)
}

loadJson('https://example.com/game')
```
This shows most of the salient features. The external work is injected through the GameDomain. There is a 'cache' which 
looks after loading the components and then we load the component from the server.

Behind the scenes the json is loaded, in it the '_render' field is found and triggers a load of that component (the cache
ensures that this is only loaded once) That component is rendered

## But how do I do state management and side effects and things???

The example projects show some simple examples. [In the 'Configure Price Quoting' example](https://github.com/focuson-ts/focuson/tree/master/examples/codeondemand/cpq) 
The use of the @focuson/state allows state management to be composed and majority of it is baked into the component. When
it is better to have a side effect such as 'you win' or 'pay', then contexts can be used to inject functions that can be called.

The resulting code is typically beautifully decoupled (constraints empower, and being forced to only use Context or Props)
makes a big difference.

## Rendering child components

Clearly we want to split components up. Typically large components are made of smaller components that each render and 
manage state for part of the main state tree. These are typically loaded from the server using the `<ComponentFromServer>` or
`<ChildFromServer>` (a similar tag: see below). The only communication is through the lens state or a context.

# How does this relate to Rest

In order to be restful we must follow the key guidelines. The primary one is 'no coupling between client and server'. The
recommended approach is to use a media type. There is an excellant summary here https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven.

Here we are effectively a media type. We imagine the json is just like a pdf or other media type. The data itself details 
enough information to know how to render it. We slightly violate the rules of rest if we use contexts, but pragmatically 
speaking they can make things easier, and as long as we design them careful they effectively become part of our media type.

# Extended Language of our media type 
Our media type is json with the following extra.

* `_render` should have a `_self` containing the code for rendering a class. Can have other properites for dependent components
    * `<ComponentFromServer>` uses the _render/self property 
* `_render`  can over other properties 
    * `<ChildFromServer>` uses these (see [The tictactoe example](https://github.com/focuson-ts/focuson/blob/master/examples/codeondemand/tictactoe/src/render/Board.tsx))

## Example json
```json
{
  "_links"   : {
    "game1": {"href": "created/gameJson1.json"},
    "game2": {"href": "created/gameJson2.json"}
  },
  "_render"  : {"_self": "created/Game/d56195b3feeea272a3811e91a3c9cb195f263702ba6f631690afd5049bc2b38f"},
  "state"    : "X",
  "_embedded": {
    "board": {
      "_render": {
        "_self" : "created/Board/e4217d198b2b8cfd87588a89b113a557a0271f757167fa0453926fe79974e7ff",
        "square": "created/Square/73d34b45dc191f01cf003e8e91a869d2d4fc17038fd259baf6458c94c629b044"
      },
      "squares": ["", "", "", "", "", "", "", "", ""]
    }
  }
}
```
  
* The main `_render` is for the 'Game' component which can be [found here](https://github.com/focuson-ts/focuson/blob/master/examples/codeondemand/tictactoe/src/render/Game.tsx)
* The `_render` inside the `_embedded.board` render the board and can be [found here](https://github.com/focuson-ts/focuson/blob/master/examples/codeondemand/tictactoe/src/render/Board.tsx)
* The `square` inside the `_embedded.board._render` can be used by any `<ChildFromServer>` component, and in this case is used to render the squares

The long string of hex digits in the `_render` are the sha of the text of the component, and if it doesn't match the component will fail to load. This
prevents man in the middle attacks injecting arbitary code into the component.

# How do I create the urls like created/Game/d561...
There is a tool `cod` (stands for 'code on demand') which can be installed with
```shell
npm install -g @focus/code
```
The main command (which is normally executed in the same folder as `public`) is `cod build`. To see the options type `cod build --help`.

This tool will
* take typescript code from  a `src/render` subdirectory, transpile it and find the sha putting it into `public/created/ComponentName`
* take json from a `src/json` subdirectory and modify it to use the generate shas putting it into `public/created/json`
There are configuration options to override the defaults.
  
# Creating json for tests

In src/json we can put json. The example above looks like this
```json
{
  "_links"   : {
    "game1": {"href": "created/gameJson1.json"},
    "game2": {"href": "created/gameJson2.json"}
  },
  "_render"  : {"_self": "#Game/render#"},
  "state"    : "X",
  "_embedded": {
    "board": {
      "_render": {
        "_self" : "#Board/render#",
        "square": "#Square2/render#"
      },
      "squares": ["", "", "", "", "", "", "", "", ""]
    }
  }
}
```
After running `cod build` we can use the json in tests, or display it directly in the gui

# Creating json using the server

At the moment there aren't any tools that do this automatically. The code in `cod` is exactly the code that needs to be used, but it hasn't been
extracted into a suitable library yet. All we need is json code that represents a function, and it to have the correct filename which includes the
filename. These tools are on the backlog and will be added soon
