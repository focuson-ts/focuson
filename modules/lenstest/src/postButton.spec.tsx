import { lensState } from "@focuson-nw/state";
import { mount } from "enzyme";
import { HasPostCommand, PostButton, postCommandsL } from "@focuson-nw/poster";
import { enzymeSetup } from "./enzymeAdapterSetup";


enzymeSetup ()
interface StateForPostButtonTest extends HasPostCommand<StateForPostButtonTest, any> {
}

export type Context = 'context'
export const context = 'context'

describe ( "post button", () => {
  it ( "should render with an id and title", () => {
    const state = lensState<StateForPostButtonTest,Context> ( { postCommands: [] }, ( s: StateForPostButtonTest ) => {}, 'postbutton',context )
    const comp = mount ( <PostButton state={state} text='someTitle' id='someId' poster='somePoster' args='someArgs' postCommandL={postCommandsL<StateForPostButtonTest> ()}/> )
    const button = comp.find ( "button" )
    expect ( button.text () ).toEqual ( 'someTitle' )
  } )

  it ( "should change the state to have a model when clicked", () => {
    var remembered: StateForPostButtonTest = { postCommands: [] }
    const state = lensState<StateForPostButtonTest,Context> ( { postCommands: [] }, ( s: StateForPostButtonTest ) => {remembered = s}, 'PostButton',context )
    const comp = mount ( <PostButton state={state} text='someTitle' id='someId' poster='somePoster' args='someArgs' postCommandL={postCommandsL<StateForPostButtonTest> ()}/> )
    const button = comp.find ( "button" )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( { "postCommands": [ { poster: "somePoster", args: "someArgs" } ] } )
  } )
} )