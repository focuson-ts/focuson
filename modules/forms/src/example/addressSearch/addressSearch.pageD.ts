import { ExampleMainPage, ExampleModalPage } from "../common";
import { nameAndAddressDataD, postCodeSearchDataD } from "./addressSearch.dataD";
import { Layout } from "@focuson/form_components";
import { postcodeRestD } from "./addressSearch.restD";
import { IntegerDD } from "../../common/dataD";

export const PostCodeModalPage: ExampleModalPage = {
  name: "PostCodeSearch",
  pageType: "ModalPage",
  display: { dataDD: postCodeSearchDataD, target: [], importFrom: 'PostCodeDemo' },
  modes: [ 'edit' ],
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  },

}
export const PostCodeMainPage: ExampleMainPage = {
  name: "PostCodeDemo",
  pageType: "MainPage",
  display: { dataDD: nameAndAddressDataD, target: [ 'main' ] },
  domain: {
    main: { dataDD: nameAndAddressDataD },
    postcode: { dataDD: postCodeSearchDataD },
    selectedPostcodeIndex: { dataDD: IntegerDD },
  },
  initialValue: { main: {}, postcode: { search: '', searchResults: [], addressResults: { line1: '', line2: '', line3: '', line4: '' } } },
  modals: [ { modal: PostCodeModalPage, path: [ 'postcode' ] } ],
  modes: [ 'edit' ],
  rest: {
    postcode: { rest: postcodeRestD, targetFromPath: [ 'postcode', 'searchResults' ], fetcher: true }
  },
  buttonOrder: [],//hide the search button
  buttons: {
    search: {
      control: 'ModalButton', modal: PostCodeModalPage, mode: 'edit',
      focusOn: [ 'postcode' ],
      copy: { from: [ '{basePage}', 'main', 'postcode' ], to: [ '{basePage}', 'postcode', 'search' ] },
      copyOnClose: [
        { from: [ '{basePage}', 'postcode', 'addressResults', 'line1' ], to: [  '{basePage}','main', 'line1' ] },
        { from: [ '{basePage}', 'postcode', 'addressResults', 'line2' ], to: [ '{basePage}', 'main', 'line2' ] },
        { from: [ '{basePage}', 'postcode', 'addressResults', 'line3' ], to: [ '{basePage}', 'main', 'line3' ] },
        { from: [ '{basePage}', 'postcode', 'addressResults', 'line4' ], to: [ '{basePage}', 'main', 'line4' ] },
        { from: [ '{basePage}', 'postcode', 'search' ], to: [ '{basePage}', 'main', 'postcode' ] },
      ]
    },
  },
}