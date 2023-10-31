import { lensState } from "@focuson/state";
import { HasPostCommand, PostButton, postCommandsL } from "@focuson/poster";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

interface StateForPostButtonTest extends HasPostCommand<StateForPostButtonTest, any> {
}

export type Context = 'context'
export const context = 'context'

describe ( "post button", () => {
  it ( 'should render with an id and title', () => {
    const state = lensState<StateForPostButtonTest, Context> ( { postCommands: [] }, ( s: StateForPostButtonTest ) => {}, 'postbutton', context );

    render (
      <PostButton
        state={state}
        text='someTitle'
        id='someId'
        poster='somePoster'
        args='someArgs'
        postCommandL={postCommandsL<StateForPostButtonTest> ()}
      />
    );

    // Query the button using its role and the expected text content.
    const button = screen.getByRole ( 'button', { name: /someTitle/i } );
    expect ( button ).toBeInTheDocument ();
  } );

  it ( 'should change the state to have a model when clicked', () => {
    var remembered: StateForPostButtonTest = { postCommands: [] };
    const state = lensState<StateForPostButtonTest, Context> ( { postCommands: [] }, ( s: StateForPostButtonTest ) => { remembered = s; }, 'PostButton', context );

    render (
      <PostButton
        state={state}
        text='someTitle'
        id='someId'
        poster='somePoster'
        args='someArgs'
        postCommandL={postCommandsL<StateForPostButtonTest> ()}
      />
    );

    // Use `fireEvent` to simulate the button click.
    const button = screen.getByRole ( 'button', { name: /someTitle/i } );
    fireEvent.click ( button );

    // Check the expected state change.
    expect ( remembered ).toEqual ( { "postCommands": [ { poster: "somePoster", args: "someArgs" } ] } );
  } );
} )