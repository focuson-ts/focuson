import { ExampleMainPage } from "../common";
import { helloWorldD } from "./helloWorld.dataD";


export const HelloWorldMainPage: ExampleMainPage = {
  name: "HelloWorld",
  pageType: "MainPage",
  display: { dataDD: helloWorldD, target: '~/main' },
  domain: {
    main: { dataDD: helloWorldD }
    },
  initialValue: {main: {hello: 'World'}},
  modals: [ ],
  modes: [ 'view' ],
  rest: {
  },
  buttons: {
  }
}