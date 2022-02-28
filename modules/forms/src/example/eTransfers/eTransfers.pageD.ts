import { PageD } from "../../common/pageD";
import { ETransferDataD } from "./eTransfers.dataD";
import { eTransferRestD } from "./eTransfers.restD";


/** This is the 'bringing it all together */
export const ETransferPageD: PageD = {
  name: 'ETransfer',
  pageType: 'MainPage',  // this really feels like a modal button

  /** This page can only view data */
  modes: [ 'create' ],
  /** How we display the page.*/
  display: { layout: { name: 'Layout', details: '[3][1,1,1][1,1][1][3]' }, target: [ 'fromApi' ], dataDD: ETransferDataD },
  /** When the page is selected for the first time this is the initial state */
  initialValue: 'empty',
  /** This defines the domain data structures in react*/
  domain: {
    fromApi: { dataDD: ETransferDataD }
  },

  /** Binds the rest to 'where it takes place'. So we have these rest actions, and the gui data is at the location defined by 'targetFromPath'. Fetcher 'true' means set up a fetcher to go get the data when the page is selected */
  rest: {
    eTransfer: { rest: eTransferRestD, targetFromPath: [ 'fromApi' ], fetcher: undefined }
  },
  /** As well as displaying/editing the data we have these buttons. These are passed to layout */
  buttons: {
    eTransfers: { control: 'RestButton', rest: eTransferRestD, action: 'create', confirm: true, result: 'refresh' },
    //questions: how do we know which is the existing plan... is there a list? are we an entry in the list? do we need to navigate to it?
    resetAll: { control: 'ResetStateButton' },
    cancel: { control: 'ResetStateButton' }
  }
}
