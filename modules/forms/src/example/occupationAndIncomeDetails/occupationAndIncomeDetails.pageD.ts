import { PageD } from "../../common/pageD";
import { OccupationAndIncomeDetailsDataD } from "./occupationAndIncomeDetails.dataD";
import { oneOccupationAndIncomeDetails } from "./occupationAndIncomeDetails.restD";


/** This is the 'bringing it all together */
export const OccupationAndIncomeDetailsPageD: PageD = {
  name: 'OccupationAndIncomeDetails',
  pageType: 'MainPage',  // this really feels like a modal button

  /** This page can only view data */
  modes: [ 'view', 'edit', 'create' ],
  /** How we display the page.*/
  display: { layout: { name: 'Layout', details: '[1][1][1][1][1][1][1]' }, target: [ 'fromApi' ], dataDD: OccupationAndIncomeDetailsDataD },
  /** When the page is selected for the first time this is the initial state */
  initialValue: {},
  /** This defines the domain data structures in react*/
  domain: {
    fromApi: { dataDD: OccupationAndIncomeDetailsDataD }
  },

  /** Binds the rest to 'where it takes place'. So we have these rest actions, and the gui data is at the location defined by 'targetFromPath'. Fetcher 'true' means set up a fetcher to go get the data when the page is selected */
  rest: {
    occupationList: { rest: oneOccupationAndIncomeDetails, targetFromPath: 'fromApi', fetcher: 'list' }
  },
  /** As well as displaying/editing the data we have these buttons. These are passed to layout */
  buttons: {
    addEntry: { control: 'RestButton', rest: 'eTransferRestD', action: 'create', confirm: true },
    //questions: how do we know which is the existing plan... is there a list? are we an entry in the list? do we need to navigate to it?
    editEntry: { control: 'ResetStateButton' },
    nextEntry: { control: 'ResetStateButton' },
    prevEntry: { control: 'ResetStateButton' }
  }
}
