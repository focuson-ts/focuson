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
  initialValue: { main: {}, postcode: { search: '', searchResults: [], addressResults: { line1: 'a', line2: 'b', line3: 'c', line4: 'd' } } },
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
      copy: { from: [ 'main', 'postcode' ], to: [ 'postcode', 'search' ] },
      copyOnClose: [
        { from: [ 'postcode', 'addressResults', 'line1' ], to: [ 'main', 'line1' ] },
        { from: [ 'postcode', 'addressResults', 'line2' ], to: [ 'main', 'line2' ] },
        { from: [ 'postcode', 'addressResults', 'line3' ], to: [ 'main', 'line3' ] },
        { from: [ 'postcode', 'addressResults', 'line4' ], to: [ 'main', 'line4' ] },
        { from: [ 'postcode', 'search' ], to: [ 'main', 'postcode' ] },
      ]
    },
  },
}