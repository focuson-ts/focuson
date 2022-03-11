import { DataD, OneLineStringDD, RepeatingDataD } from "../../common/dataD";
import { AllGuards } from "../../buttons/guardButton";
import { TableCD } from "../../common/componentsD";
import { ExampleMainPage, ExampleModalPage } from "../common";
import { nameAndAddressDataD, postCodeSearchDataD } from "./addressSearch.dataD";
import { Layout } from "@focuson/form_components";
import { postcodeRestD } from "./addressSearch.restD";
import { occupationIncomeDetailsDD } from "../occupationAndIncomeDetails/occupationAndIncome.dataD";
import { occupationIncomeModalPD } from "../occupationAndIncomeDetails/occupationAndIncome.pageD";

export const PostCodeModalPage: ExampleModalPage = {
  name: "PostCodeSearch",
  pageType: "ModalPage",
  display: { dataDD: postCodeSearchDataD, layout: { name: 'Layout', details: '' }, target: [], importFrom: 'PostCodeDemo' },
  modes: [ 'edit' ],
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  },

}
export const PostCodeMainPage: ExampleMainPage = {
  name: "PostCodeDemo",
  pageType: "MainPage",
  display: { dataDD: nameAndAddressDataD, layout: { name: 'Layout', details: '' }, target: [ 'main' ] },
  domain: {
    main: { dataDD: nameAndAddressDataD },
    postcode: { dataDD: postCodeSearchDataD }
  },
  initialValue: { main: {}, postcode: {} },
  modals: [ { modal: PostCodeModalPage, path: [ 'postcode' ] } ],
  modes: [ 'edit' ],
  rest: {
    postcode: { rest: postcodeRestD, targetFromPath: [ 'postcode', 'search' ], fetcher: true }
  },
  buttons: {
    search: {
      control: 'ModalButton', modal: PostCodeModalPage, mode: 'edit',
      focusOn: [ 'postcode' ],
      createEmpty: postCodeSearchDataD,
    },
  },
}