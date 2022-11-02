import { ExampleDataD, ExampleMainPage, ExampleModalPage, ExampleRestD } from "../common";
import { StringDD } from "../../common/dataD";

const loaderDataD: ExampleDataD = {
  name: 'Loader',
  description: 'Just exists so we can check the loader pages',
  structure: {
    someData: { dataDD: StringDD }
  }
}
export const loaderModalPage2: ExampleModalPage = {
  display: { dataDD: loaderDataD, target: '~/data' },
  modes: [ 'view', 'edit' ],
  name: "LoaderModal2",
  pageType: 'ModalPopup',
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' },
    commit2: { control: 'ModalCommitButton',text: 'commit2', closeTwoWindowsNotJustOne: true },
  },
}
export const loaderModalPage: ExampleModalPage = {
  display: { dataDD: loaderDataD, target: '~/data' },
  modes: [ 'view', 'edit' ],
  name: "LoaderModal",
  pageType: 'ModalPopup',
  buttons: {
    modalWithRest: {
      control: 'ModalButton', focusOn: '~/data', modal: loaderModalPage2, mode: 'edit',
      restOnCommit: { restName: 'loader', action: { state: 'demo2' }, result: 'nothing' },
      loader: { msg: 'ModalWithRest2' }
    },
    commit: { control: 'ModalCommitButton' },
    cancel: { control: 'ModalCancelButton' },
  },
}
export const loaderRestD: ExampleRestD = {
  url: '/api/loader?{query}',
  dataDD: loaderDataD,
  actions: [ { state: 'demo' }, { state: 'demo2' } ],
  params: {},
  states:{
    demo:{url: '/api/loader/demo?{query}', params:{}},
    demo2:{url: '/api/loader/demo2?{query}', params:{}}
  }
}
export const loaderPageD: ExampleMainPage = {
  display: { dataDD: loaderDataD, target: '~/data' },
  modes: [ 'view' ],
  name: "Loader",
  modals:[{modal: loaderModalPage},{modal: loaderModalPage2}],
  pageType: 'MainPage',
  domain: { data: { dataDD: loaderDataD } },
  rest: { loader: { rest: loaderRestD, targetFromPath: '~/data' } },
  initialValue: 'empty',
  buttons: {
    rest: { control: 'RestButton', restName: 'loader', action: { state: 'demo' }, loader: { msg: 'Demo' } },
    modalWithRest: {
      control: 'ModalButton', focusOn: '~/data', modal: loaderModalPage, mode: 'edit',
      restOnCommit: { restName: 'loader', action: { state: 'demo' }, result: 'nothing' },
      loader: { msg: 'ModalWithRest' }
    }
  }
}