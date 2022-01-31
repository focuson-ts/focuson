import { StateForModalAndCopyButtonTest } from "@focuson/lenstest/dist/src/modalAndCopyButton.spec";
import { Story } from "@storybook/react";
import { SBookProvider } from "./sbookProvider";
import { ModalAndCopyButton } from "@focuson/pages";
import { identityOptics } from "@focuson/lens";
import { Store } from "@sambego/storybook-state";


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

function makeInitialState ( { initialModal, someData, tempSomeData }: ForModalPage ): StateForModalAndCopyButtonTest {
  return someData ? ({ currentSelectedModalPage: initialModal, full: { tempSomeData, fromApi: { someData } } }) : { currentSelectedModalPage: initialModal, full: { tempSomeData } }


}

const Template: Story<ForModalPage> = ( args: ForModalPage ) =>
  SBookProvider<StateForModalAndCopyButtonTest> ( makeInitialState ( args ), ( s ) => (
    <ModalAndCopyButton from={s.focusOn ( 'full' ).focusOn ( 'fromApi' ).focusOn ( 'someData' )}
                        to={s.focusOn ( 'full' ).focusOn ( 'tempSomeData' )}
                        modalL={identityOptics<Store<StateForModalAndCopyButtonTest>> ().focusOn ( 'state' ).focusOn ( 'currentSelectedModalPage' )}
                        {...args} />
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