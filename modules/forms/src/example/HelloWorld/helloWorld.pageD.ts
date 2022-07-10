import { ExampleMainPage } from "../common";
import { helloWorldDD } from "./helloWorld.dataD";
import { helloWorldRD } from "./helloWorld.restD";


export const HelloWorldPage: ExampleMainPage = {
  display: { target: '~/fromApi', dataDD: helloWorldDD },
  domain: {
    fromApi: { dataDD: helloWorldDD },
    temp: { dataDD: helloWorldDD },
  },
  initialValue: undefined,
  modals: [  ],
  modes: [ 'edit' ],
  name: "HelloWorldMainPage",
  pageType: "MainPage",
  rest: { restDataRD: { rest: helloWorldRD, targetFromPath: '~/fromApi', fetcher: true } },
  buttons: {
  },
}