import { ExampleMainPage, ExampleModalPage } from "../common";
import { nameAndAddressDataD, postCodeSearchDataD } from "./addressSearch.dataD";
import { addressRestD, postcodeForManualRestD, postcodeRestD } from "./addressSearch.restD";
import { IntegerDD } from "../../common/dataD";
import { HideButtonsCD } from "../../buttons/hideButtonsCD";

export const PostCodeModalPage: ExampleModalPage = {
  name: "PostCodeSearch",
  pageType: "ModalPopup",
  display: { dataDD: postCodeSearchDataD, target: '~/' },
  modes: [ 'edit' ],
  buttons: {
    cancel: { control: 'ModalCancelButton' , confirm: { type: 'window', title: 'The title for the cancel'   }},
    commit: { control: 'ModalCommitButton', confirm: { type: 'window' } }
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
  initialValue: 'empty',
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
      copyJustString: { from: '~/main/postcode', to: '~/postcode/search' },
      copyOnClose: [
        { from: '~/postcode/addressResults/line1', to: '~/main/line1' }, //could do simpler, but this is a demo of multiple lines
        { from: '~/postcode/addressResults/line2', to: '~/main/line2' },
        { from: '~/postcode/addressResults/line3', to: '~/main/line3' },
        { from: '~/postcode/addressResults/line4', to: '~/main/line4' },
        { from: '~/postcode/addressResults/postcode', to: '~/main/postcode' }
      ]
    },
    save: {
      control: 'RestButton', restName: 'address', action: 'createWithoutFetch', validate: true, messageOnSuccess: 'Saved'
    }
  }
}