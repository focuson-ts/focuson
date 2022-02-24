import { Story } from "@storybook/react";
import { SBookProvider } from "./sbookProvider";
import { HasPageSelection, ModalAndCopyButton, PageSelectionContext } from "@focuson/pages";
import { defaultPageSelectionContext } from "@focuson/focuson";


export default {
  component: ModalAndCopyButton,
  title: 'Data/Buttons/ModalAndCopyButton'
}

interface ForModalPage {
  initialModal?: string,
  id?: string,
  text: string,
  modal: string,
  someData?: string,
  tempSomeData?: string

}
interface StateForModalAndCopyButton extends HasPageSelection {

}

const Template: Story<ForModalPage> = ( args: ForModalPage ) =>
  SBookProvider<StateForModalAndCopyButton, PageSelectionContext<StateForModalAndCopyButton>> ( { pageSelection: [] },
    defaultPageSelectionContext<StateForModalAndCopyButton, PageSelectionContext<StateForModalAndCopyButton>> ( {} ),
    s => (
      <ModalAndCopyButton from={s} to={s} pageMode='edit'                     {...args} />
    ) );


export const Blank = Template.bind ( {} );
Blank.args = {
  id: '1',
  text: 'someTitle',
  modal: 'someModal',
};

export const HasDataToCopy = Template.bind ( {} );
HasDataToCopy.args = {
  id: '1',
  text: 'someTitle',
  modal: 'someModal',
  someData: 'data'
};

export const AlreadyHasData = Template.bind ( {} );
AlreadyHasData.args = {
  id: '1',
  text: 'someTitle',
  modal: 'someModal',
  someData: 'data',
  tempSomeData: 'oldtemp'
};