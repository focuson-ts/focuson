import { ModalPageD } from "../../common/pageD";
import { ExampleMainPage, ExampleModalPage } from "../common";
import { nothingDD } from "../../common/commonDataDs";

const wizard4: ExampleModalPage = {
  pageType: 'ModalPopup',
  display: { dataDD: nothingDD, target: '~/nothing' },
  modes: [ 'view' ],
  name: "Wizard4",
  title: '<i>Wizard</i> Four',
  buttons: {
    finished: { control: "ModalCommitButton", text: 'Finished' },
    cancel: { control: 'ModalCancelButton' }
  },

}
const wizard3: ExampleModalPage = {
  pageType: 'ModalPopup',
  display: { dataDD: nothingDD, target: '~/nothing' },
  modes: [ 'view' ],
  name: "Wizard3",
  buttons: {
    next: { control: 'ModalButton', modal: wizard4, mode: 'view', focusOn: '~/nothing' , pageOp: 'replace',


    },
    cancel: { control: 'ModalCancelButton' }
  },

}
const wizard2: ExampleModalPage = {
  pageType: 'ModalPopup',
  display: { dataDD: nothingDD, target: '~/nothing' },
  modes: [ 'view' ],
  name: "Wizard2",
  buttons: {
    next: { control: 'ModalButton', modal: wizard3, mode: 'view', focusOn: '~/nothing', pageOp: 'replace' },
    cancel: { control: 'ModalCancelButton' }
  },

}
const wizard1: ExampleModalPage = {
  pageType: 'ModalPopup',
  display: { dataDD: nothingDD, target: '~/nothing' },
  modes: [ 'view' ],
  name: "Wizard1",
  buttons: {
    next: { control: 'ModalButton', modal: wizard2, mode: 'view', focusOn: '~/nothing', pageOp: 'replace' },
    cancel: { control: 'ModalCancelButton' }
  },
}

export const wizardPD: ExampleMainPage = {
  name: "WizardPage",
  pageType: 'MainPage',
  initialValue: 'empty',
  display: { dataDD: nothingDD, target: '~/nothing' },
  modes: [ 'view' ],
  modals: [ { modal: wizard1 }, { modal: wizard2 }, { modal: wizard3 }, { modal: wizard4 } ],
  domain: {
    nothing: { dataDD: nothingDD }
  },
  rest: {},
  buttons: {
    start: { control: 'ModalButton', modal: wizard1, mode: 'view', focusOn: '~/nothing' },
  },
}