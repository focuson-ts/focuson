import { ExampleDataD, ExampleMainPage, ExampleModalPage } from "../common";
import { StringDD } from "../../common/dataD";
import { modalPageDD } from "./modalPages.dataD";

export const modalPage2: ExampleModalPage = {
  name: 'ModalPage2',
  pageType: 'ModalPopup',
  display: { dataDD: modalPageDD, target: '~/data' },
  modes: [ 'view', 'edit' ],
  buttons: {
    commit: { control: "ModalCommitButton" },
    commit2: { control: 'ModalCommitButton', text: 'commit2', closeTwoWindowsNotJustOne: true },
    cancel: { control: 'ModalCancelButton' },
    cancel2: { control: 'ModalCancelButton', text: 'cancel2', closeTwoWindowsNotJustOne: true }
  }
}
export const modalPage1: ExampleModalPage = {
  name: 'ModalPage1',
  pageType: 'ModalPopup',
  display: { dataDD: modalPageDD, target: '~/data' },
  modes: [ 'view', 'edit' ],
  buttons: {
    page2: { control: "ModalButton", focusOn: '~/data', modal: modalPage2, mode: 'view' },
    commit: { control: "ModalCommitButton", text: 'commit' },
    commit2: { control: "ModalCommitButton", text: 'commit2', closeTwoWindowsNotJustOne: true },
    cancel: { control: 'ModalCancelButton', text: 'cancel1' },
    cancel2: { control: 'ModalCancelButton', text: 'cancel2', closeTwoWindowsNotJustOne: true }
  }
}
export const modalPagePD: ExampleMainPage = {
  name: "ModalPages",
  display: { dataDD: modalPageDD, target: '~/data' },
  domain: { data: { dataDD: modalPageDD } },
  modals: [ { modal: modalPage1 }, { modal: modalPage2 } ],
  initialValue: 'empty',
  modes: [ 'view', 'edit' ],
  pageType: 'MainPage',
  rest: {},
  buttons: {
    page1: { control: "ModalButton", focusOn: '~/data', modal: modalPage1, mode: 'view' },
  }
}