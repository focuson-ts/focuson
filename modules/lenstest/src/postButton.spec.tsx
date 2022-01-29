import { lensState } from "@focuson/state";
import { mount } from "enzyme";
import { HasPostCommand, PostButton, postCommandsL } from "@focuson/poster";
import { enzymeSetup } from "./enzymeAdapterSetup";


enzymeSetup ()
interface StateForPostButtonTest extends HasPostCommand<StateForPostButtonTest, any> {
}


describe ( "post button", () => {
  it ( "should render with an id and title", () => {
    const state = lensState<StateForPostButtonTest> ( { postCommands: [] }, ( s: StateForPostButtonTest ) => {}, 'postbutton' )
    const comp = mount ( <PostButton state={state} text='someTitle' id='someId' poster='somePoster' args='someArgs' postCommandL={postCommandsL<StateForPostButtonTest> ()}/> )
    const button = comp.find ( "button" )
    expect ( button.text () ).toEqual ( 'someTitle' )
  } )

  it ( "should change the state to have a model when clicked", () => {
    var remembered: StateForPostButtonTest = { postCommands: [] }
    const state = lensState<StateForPostButtonTest> ( { postCommands: [] }, ( s: StateForPostButtonTest ) => {remembered = s}, 'PostButton' )
    const comp = mount ( <PostButton state={state} text='someTitle' id='someId' poster='somePoster' args='someArgs' postCommandL={postCommandsL<StateForPostButtonTest> ()}/> )
    const button = comp.find ( "button" )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( { "postCommands": [ { poster: "somePoster", args: "someArgs" } ] } )
  } )
} )