import React from 'react';
import { Story } from "@storybook/react";
import { HasPageSelection, ModalButton, PageMode, PageSelectionContext } from "@focuson/pages";
import { SBookProvider } from "./sbookProvider";
import { defaultPageSelectionContext } from "@focuson/focuson";
import { testDateFn } from "@focuson/utils";

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


interface StateForModalButton extends HasPageSelection {

}


const Template: Story<ForModalPage> = ( args: ForModalPage ) =>
  SBookProvider<StateForModalButton, PageSelectionContext<StateForModalButton>> ( { pageSelection: [] },
    defaultPageSelectionContext<StateForModalButton, PageSelectionContext<StateForModalButton>> ( {} ),
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