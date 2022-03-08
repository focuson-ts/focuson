import { PageD } from "../../common/pageD";
import { ChequeCreditbooksDD, ChequeCreditbooksHistoryLineDD } from "./chequeCreditBooks.dataD";
import { chequeCreditBooksRestD } from "./chequeCreditBooks.restD";
import { CreatePlanPD } from "../eAccounts/createPlanPD";
import { IntegerDD, PrimitiveDD } from "../../common/dataD";
import { AllButtonsInPage } from "../../buttons/allButtons";


export const OrderChequeBookOrPayingInModalPD: PageD<AllButtonsInPage> = {
  name: 'OrderChequeBookOrPayingInModal',
  pageType: 'ModalPage',
  /** This page can only view data */
  modes: [ 'create' ],
  /** How we display the page.*/
  display: { layout: { name: 'Layout', details: '[3]' }, target: [], dataDD: ChequeCreditbooksHistoryLineDD, importFrom: '../ChequeCreditbooks' },
  /** As well as displaying/editing the data we have these buttons. These are passed to layout */
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  },
  //Not sure what to do about these
  domain: {},
  initialValue: {},
  rest: {}
}

export const CheckBookOrPayingInDD: PrimitiveDD = {
  ...IntegerDD,
  description: "The primitive representing an amount of the local currency",
  name: 'CheckBookOrPayingInDD',
  enum: { payingInBook: 'Paying In Book', chequeBook: 'Cheque Book' }
}

/** This is the 'bringing it all together */
export const ChequeCreditbooksPD: PageD<AllButtonsInPage> = {
  name: 'ChequeCreditbooks',
  pageType: 'MainPage',
  /** This page can only view data */
  modes: [ 'view' ],
  /** How we display the page.*/
  display: { layout: { name: 'Layout', details: '[1][2][2]' }, target: [ 'fromApi' ], dataDD: ChequeCreditbooksDD },
  /** When the page is selected for the first time this is the initial state */
  initialValue: {},
  /** This defines the domain data structures in react*/
  domain: {
    fromApi: { dataDD: ChequeCreditbooksDD },
    tempCreatePlan: { dataDD: ChequeCreditbooksHistoryLineDD },
    chequeBookOrPayingIn: {dataDD: CheckBookOrPayingInDD}
    // tempData: ChequeCreditbooksHistoryLineDD
  },
  modals: [ { modal: OrderChequeBookOrPayingInModalPD, path: [ 'tempCreatePlan' ] } ],
  /** Binds the rest to 'where it takes place'. So we have these rest actions, and the gui data is at the location defined by 'targetFromPath'. Fetcher 'true' means set up a fetcher to go get the data when the page is selected */
  rest: {
    chequeCreditBooks: { rest: chequeCreditBooksRestD, targetFromPath: [ 'fromApi' ], fetcher: 'get' }
  },
  /** As well as displaying/editing the data we have these buttons. These are passed to layout */
  buttons: {                                                                      //interestingly these will be type checked in the target system...
    chequeBook: { control: 'ResetStateButton' },//, target: ['checkBookOrPayingInBook'], value : 'cheque'},
    payingInBook: { control: 'ResetStateButton' },//, target: ['checkBookOrPayingInBook'], value : 'payingIn'},
    orderNewBook: {
      control: 'ModalButton', modal: OrderChequeBookOrPayingInModalPD, mode: 'create',
      focusOn: [ 'tempCreatePlan' ],//not type checked here... should be type checked in target
      createEmpty: ChequeCreditbooksHistoryLineDD,
      restOnCommit: { rest: chequeCreditBooksRestD, action: 'create', result: 'refresh', target: [ 'tempCreatePlan' ] }
    }
  }
}

