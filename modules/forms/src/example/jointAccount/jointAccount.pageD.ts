import { ExampleMainPage } from "../common";
import { JointAccountDd } from "./jointAccount.dataD";
import { jointAccountRestD } from "./jointAccount.restD";
import { BooleanDD } from "../../common/dataD";

export const JointAccountPageD: ExampleMainPage = {
  name: 'JointAccount',
  pageType: 'MainPage',  // this really feels like a modal button

  /** This page can only view data */
  modes: [ 'view' ],
  /** How we display the page.*/
  display: { target: '~/fromApi', dataDD: JointAccountDd },
  /** When the page is selected for the first time this is the initial state */
  initialValue: { joint: false },
  /** This defines the domain data structures in react*/
  domain: {
    fromApi: { dataDD: JointAccountDd },
    joint: { dataDD: BooleanDD }
  },
  modals: [],

  /** Binds the rest to 'where it takes place'. So we have these rest actions, and the gui data is at the location defined by 'targetFromPath'. Fetcher 'true' means set up a fetcher to go get the data when the page is selected */
  rest: {
    jointAccount: { rest: jointAccountRestD, targetFromPath: '~/fromApi', fetcher: true }
  },
  buttons: {
    toggle: { control: 'ToggleButton', value: '~/joint', buttonText: 'Toggle [{~/joint}]' }
  }
}
