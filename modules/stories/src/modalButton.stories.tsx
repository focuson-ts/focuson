import React from 'react';
import { Story } from "@storybook/react";
import { HasPageSelection, HasSimpleMessageL, ModalButton, PageMode, PageSelectionContext, simpleMessagesL } from "@focuson/pages";
import { SBookProvider } from "./sbookProvider";
import { defaultPageSelectionAndRestCommandsContext, defaultPageSelectionContext, FocusOnContext } from "@focuson/focuson";
import { HasSimpleMessages, testDateFn } from "@focuson/utils";
import { HasRestCommands } from "@focuson/rest";
import { HasTagHolder } from "@focuson/template";

export default {
  component: ModalButton,
  title: 'Data/Buttons/ModalButton'
}

interface ForModalPage {
  initialModal?: string,
  id?: string,
  text: string,
  modal: string;
  pageMode: PageMode
}


interface StateForModalButton extends HasPageSelection, HasSimpleMessages, HasRestCommands, HasTagHolder {

}


const Template: Story<ForModalPage> = ( args: ForModalPage ) =>
  SBookProvider<StateForModalButton, FocusOnContext<StateForModalButton>> ( { pageSelection: [], messages: [], restCommands: [], tags: {} },
    defaultPageSelectionAndRestCommandsContext<StateForModalButton> ( {}, {}, {}, {}, testDateFn ),
    s => (
      <ModalButton state={s} focusOn={'some/base'}{...args} dateFn={testDateFn}/>
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