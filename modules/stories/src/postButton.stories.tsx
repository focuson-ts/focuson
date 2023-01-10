import { Story } from "@storybook/react";
import { SBookProvider } from "./sbookProvider";
import { HasPostCommand, PostButton } from "@focuson-nw/poster";
import { identityOptics } from "@focuson-nw/lens";

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