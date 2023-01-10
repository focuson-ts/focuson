import React from 'react';
import { Story } from "@storybook/react";
import { HasPageSelection, HasSimpleMessageL, ModalButton,  PageSelectionContext, simpleMessagesL } from "@focuson-nw/pages";
import { SBookProvider } from "./sbookProvider";
import { defaultPageSelectionAndRestCommandsContext, defaultPageSelectionContext, FocusOnContext } from "@focuson-nw/focuson";
import { HasSimpleMessages, testDateFn ,PageMode} from "@focuson-nw/utils";
import { HasRestCommands } from "@focuson-nw/rest";
import { HasTagHolder } from "@focuson-nw/template";

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
    defaultPageSelectionAndRestCommandsContext<StateForModalButton> ( {}, {}, {}, {}, testDateFn, true ),
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