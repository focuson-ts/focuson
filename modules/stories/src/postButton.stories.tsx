import React from 'react';
import { Story } from "@storybook/react";

import Store from "@sambego/storybook-state/Store";
import { SBookProvider } from "./sbookProvider";
import { HasPostCommand, PostButton } from "@focuson/poster";
import { identityOptics } from "@focuson/lens";
import { HasPageSelection, PageSelectionContext } from "@focuson/pages";
import { defaultPageSelectionContext } from "@focuson/focuson";

export default {
  component: PostButton,
  title: 'Data/Buttons/PostButton'
}

interface ForPostButton {
  id?: string,
  text: string,
  poster: string,
  args?: any
}

interface StateForPostButton extends HasPostCommand<StateForPostButton, any> {}

const Template: Story<ForPostButton> = ( args: ForPostButton ) =>
  SBookProvider<StateForPostButton, {}> ( { postCommands: [] }, {},
    s => <PostButton state={s} {...args} postCommandL={identityOptics<StateForPostButton> ().focusOn ( 'postCommands' )}/> )


export const Poster1 = Template.bind ( {} );
Poster1.args = {
  id: '1',
  text: 'someTitle',
  poster: 'poster1',
  args: 'someArgs'
};

export const Poster2 = Template.bind ( {} );
Poster2.args = {
  text: 'someOtherTitle',
  poster: 'poster2',
  args: 'someOtherArgs'
};