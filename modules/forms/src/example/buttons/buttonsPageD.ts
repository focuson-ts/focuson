import { ExampleDataD, ExampleMainPage, ExampleModalPage } from "../common";
import { StringDD, YesNoDD, YesNoRadioDD } from "../../common/dataD";
import { LabelAndRadioCD } from "../../common/componentsD";

export const ModalButtonDomain: ExampleDataD = {
  name: 'Buttons',
  description: '',
  structure: {
    line1: { dataDD: StringDD },
    line2: { dataDD: StringDD },
    choiceBlankAtStart: { dataDD: { ...YesNoRadioDD, emptyValue: undefined, allowUndefined: true } },
    choiceYesAtStart: { dataDD: { ...YesNoRadioDD, emptyValue: 'Y' } },
  }
}

export const ModalButtonsModalPageD: ExampleModalPage = {
  name: 'ButtonsModalPage',
  pageType: 'ModalPopup',
  modes: [ 'edit' ],
  display: { dataDD: ModalButtonDomain, target: '~/display' }, // need to get rid of target!!!
  buttons: {
    ok: { control: "ModalCommitButton" },
    back: { control: "ModalCancelButton" }
  }
}
export const ButtonsPageD: ExampleMainPage = {
  name: 'Buttons',
  pageType: "MainPage",
  display: { dataDD: ModalButtonDomain, target: '~display' },
  modes: [ 'view' ],
  modals: [ { modal: ModalButtonsModalPageD } ],
  initialValue: 'empty',
  domain: {
    display: { dataDD: ModalButtonDomain },
    temp1: { dataDD: ModalButtonDomain },
    temp2: { dataDD: ModalButtonDomain }
  },
  rest: {},
  buttons: {
    nukeTemp: { control: "DeleteStateButton", path: [ '~/temp1', '~/temp2' ] },

    copyLine1ToLine2: { control: "CommandButton", command: [{ command: 'copy', from: '~/display/line1', to: '~/display/line2' }] },

    createEmpty: {
      control: 'ModalButton', focusOn: '~/temp1', modal: ModalButtonsModalPageD, mode: 'create', createEmpty: ModalButtonDomain,
      copyOnClose: { to: '~/display' }
    },
    createEmptyIfUndefined: {
      control: 'ModalButton', focusOn: '~/temp2', modal: ModalButtonsModalPageD, mode: 'create', createEmptyIfUndefined: ModalButtonDomain,
      copyOnClose: { to: '~/display' }
    },
    copy: {
      control: 'ModalButton', focusOn: '~/temp1', modal: ModalButtonsModalPageD, mode: 'edit',
      copy: { from: '~/display' },
      copyOnClose: { to: '~/display' }
    },
  }

}