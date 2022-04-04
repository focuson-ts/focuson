import { ExampleMainPage, ExampleModalPage } from "../common";
import { JointAccountCustomerDD, JointAccountDd } from "./jointAccount.dataD";
import { jointAccountRestD } from "./jointAccount.restD";
import { BooleanDD } from "../../common/dataD";

export const JointAccountEditModalPageD: ExampleModalPage = {
  name: "JointAccountEditModalPage",
  pageType: 'ModalPage',
  display: { target: 'temp', dataDD: JointAccountCustomerDD, importFrom: 'JointAccount' },
  modes: [ 'edit' ],
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  }
}

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
    joint: { dataDD: BooleanDD },
    temp: { dataDD: JointAccountCustomerDD }
  },
  variables: {
    selectedAccount: {
      constructedBy: 'code',
      code: ` id => {
    return Lenses.chainNthFromOptionalFn ( id, state => {
      if ( state.JointAccount?.joint )
        return id.focusQuery ( 'JointAccount' ).focusQuery ( 'fromApi' ).focusQuery ( 'joint' )
      else
        return id.focusQuery ( 'JointAccount' ).focusQuery ( 'fromApi' ).focusQuery ( 'main' )
    }, '#currentOccupation' )
  }`
    },
  },
  modals: [ { modal: JointAccountEditModalPageD } ],

  /** Binds the rest to 'where it takes place'. So we have these rest actions, and the gui data is at the location defined by 'targetFromPath'. Fetcher 'true' means set up a fetcher to go get the data when the page is selected */
  rest: {
    jointAccount: { rest: jointAccountRestD, targetFromPath: '~/fromApi', fetcher: true },
    // breakMe: { rest: jointAccountRestD, targetFromPath: '#selectedAccount', fetcher: true } //uncomment for demo
  },
  buttons: {
    toggle: { control: 'ToggleButton', value: '~/joint', buttonText: 'Toggle [{~/joint}]' },
    edit: { control: 'ModalButton', modal: JointAccountEditModalPageD, focusOn: '#selectedAccount', mode: 'edit' } // needs more stuff
  }
}
