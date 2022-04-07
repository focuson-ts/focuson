import { ExampleMainPage, ExampleModalPage } from "../common";
import { nameAndAddressDataD, postCodeSearchDataD } from "./addressSearch.dataD";
import { addressRestD, postcodeRestD } from "./addressSearch.restD";
import { IntegerDD } from "../../common/dataD";
import { HideButtonsCD } from "../../buttons/hideButtonsCD";
import { LayoutCd } from "../../common/componentsD";
import { addT } from "../database/tableNames";

export const PostCodeModalPage: ExampleModalPage = {
  name: "PostCodeSearch",
  pageType: "ModalPage",
  display: { dataDD: postCodeSearchDataD, target: '~/', importFrom: 'PostCodeMainPage' },
  modes: [ 'edit' ],
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  },

}
export const PostCodeMainPage: ExampleMainPage = {
  name: "PostCodeMainPage",
  pageType: "MainPage",
  display: { dataDD: nameAndAddressDataD, target: '~/main' },

  domain: {
    main: { dataDD: nameAndAddressDataD },
    postcode: { dataDD: postCodeSearchDataD },
    selectedPostcodeIndex: { dataDD: IntegerDD },
  },
  initialValue: { main: {}, postcode: { search: '', searchResults: [], addressResults: { line1: '', line2: '', line3: '', line4: '' } } },
  modals: [ { modal: PostCodeModalPage } ],
  modes: [ 'edit' ],
  rest: {
    postcode: { rest: postcodeRestD, targetFromPath: '~/postcode/searchResults', fetcher: true },
    address: { rest: addressRestD, targetFromPath: '~/main' }
  },
  buttonOrder: [ 'save' ],//hide the search button
  layout: { component: HideButtonsCD, displayParams: { hide: [ 'search' ] } },
  buttons: {
    search: {
      control: 'ModalButton', modal: PostCodeModalPage, mode: 'edit',
      focusOn: '~/postcode',
      copy: { from: '~/main/postcode', to: '~/postcode/search' },
      copyOnClose: [
        { from: '~/postcode/addressResults/line1', to: '~/main/line1' },
        { from: '~/postcode/addressResults/line2', to: '~/main/line2' },
        { from: '~/postcode/addressResults/line3', to: '~/main/line3' },
        { from: '~/postcode/addressResults/line4', to: '~/main/line4' },
        { from: '~/postcode/addressResults/line4', to: '~/main/line4' },
        { from: '~/postcode/search', to: '~/main/postcode' }
      ]
    },
    save: {
      control: 'RestButton', restName: 'address', action: 'create', validate: false
    }
  }
}