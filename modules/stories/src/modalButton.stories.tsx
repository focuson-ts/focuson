import React from 'react';
import { Story } from "@storybook/react";
import { HasSelectedModalPage, ModalButton, selectionModalPageL } from "@focuson/pages";
import { SBookProvider } from "./sbookProvider";
import { identityOptics } from "@focuson/lens";
import { Store } from "@sambego/storybook-state";

export default {
  component: ModalButton,
  title: 'Data/Buttons/ModalButton'
}

interface ForModalPage {
  initialModal?: string,
  id?: string,
  text: string,
  modal: string
}


const Template: Story<ForModalPage> = ( args: ForModalPage ) =>
  SBookProvider<HasSelectedModalPage> ( { currentSelectedModalPage: args.initialModal }, ( s ) => (
    <ModalButton state={s} {...args} modalL={identityOptics<Store<HasSelectedModalPage>> ().focusQuery ( 'state' ).focusOn ( 'currentSelectedModalPage' )}/>
  ) );


export const Blank = Template.bind ( {} );
Blank.args = {
  id: '1',
  text: 'someTitle',
  modal: 'someModal',
};

export const AlreadySet = Template.bind ( {} );
AlreadySet.args = {
  id: '1',
  text: 'someTitle',
  modal: 'someModal',
};