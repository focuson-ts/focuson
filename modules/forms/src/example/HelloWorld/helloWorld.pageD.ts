import { ExampleMainPage, ExampleModalPage } from "../common";
import { helloWorldDD } from "./helloWorld.dataD";
import { helloWorldRD } from "./helloWorld.restD";
import { JointAccountCustomerDD } from "../jointAccount/jointAccount.dataD";


export const EditHelloWorld: ExampleModalPage = {
  name: "EditHelloWorld",
  pageType: 'ModalPopup',
  display: { target: '~/temp', dataDD: helloWorldDD },
  modes: [ 'edit' ],
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  }
}


export const HelloWorldPage: ExampleMainPage = {
  display: { target: '~/fromApi', dataDD: helloWorldDD },
  domain: {
    fromApi: { dataDD: helloWorldDD },
    temp: { dataDD: helloWorldDD },
  },
  initialValue: undefined,
  modals: [ { modal: EditHelloWorld } ],
  modes: [ 'view' ],
  name: "HelloWorldMainPage",
  pageType: "MainPage",
  rest: { restDataRD: { rest: helloWorldRD, targetFromPath: '~/fromApi', fetcher: true } },
  buttons: {
    edit: {
      control: 'ModalButton', mode: 'edit', focusOn: '~/temp', modal: EditHelloWorld,
      copy: { from: '~/fromApi' },
      copyOnClose: { to: '~/fromApi' },
      restOnCommit: {restName: 'restDataRD', result: 'nothing', action: 'update'}
    },

  },
}