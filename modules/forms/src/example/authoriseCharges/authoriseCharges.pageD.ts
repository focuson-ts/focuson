import { ExampleDataD, ExampleMainPage, ExampleModalPage, ExampleRepeatingD } from "../common";
import { NatNumDd } from "../../common/dataD";
import { TableCD } from "../../common/componentsD";
import { AuthoriseChargesSummaryDD, chargesSummaryDetailDD, OneBrandDD, OneChargeDataDD, SelectOneBrandDD, summaryOfChargesDateDD, summaryOfChargesDateTableDD, summaryOfChargesSearchDD } from "./authoriseCharges.dataD";
import { AuthorisedChargesRD, SelectOneBrandPageRD, SummaryOfChargeDatesRD, SummaryOfChargesRD } from "./authoriseCharges.restD";
import { HideButtonsCD } from "../../buttons/hideButtonsCD";

export const SummaryOfChargesPage: ExampleModalPage = {
  name: 'SummaryOfCharges',
  pageType: 'ModalPopup',
  modes: [ 'view' ],
  display: { dataDD: chargesSummaryDetailDD, target: '~/summaryOfCharges' },
  buttons: {
    close: { control: "ModalCancelButton" },
  }
}

export const SelectChargesDatePage: ExampleModalPage = {
  name: 'SelectChargesDate',
  pageType: 'ModalPage',
  modes: [ 'view', 'edit' ],
  display: { dataDD: summaryOfChargesSearchDD, target: '~/summaryOfChargesDates' },
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  }
}
export const ViewChargesPage: ExampleModalPage = {
  name: 'ViewCharges',
  pageType: 'ModalPage',
  modes: [ 'view', 'edit' ],
  layout: { component: HideButtonsCD, displayParams: { hide: [ 'selectDate' ] } },
  display: { dataDD: AuthoriseChargesSummaryDD, target: '~/authorisedCharges' },
  buttons: {
    selectDate: {
      control: 'ModalButton', text: 'list', modal: SelectChargesDatePage, mode: 'view', focusOn: '~/summaryOfChargesDates',
      copy: { from: '~/authorisedCharges/date', to: '~/summaryOfChargesDates/date' },
      copyOnClose: { from: '~/selectedDateItem/dateCreated', to: '~/authorisedCharges/date' },
    },
    approvePendingFees: { control: "ActionButton", path: '~/authorisedCharges/fromApi/editingData', text: 'Approve Pending Fees', action: 'approvePendingFees' },
    authoriseApprovedFees: { control: "ActionButton", path: '~/authorisedCharges/fromApi/editingData', text: 'Authorise Approved Fees', action: 'authoriseApprovedFees' },
    summary: { control: 'ModalButton', modal: SummaryOfChargesPage, mode: 'view', focusOn: '~/summaryOfCharges' },
    save: { control: 'RestButton', restName: 'authorisedCharges', action: 'update', deleteOnSuccess: '~/authorisedCharges/fromApi' },
  }
}
export const AuthoriseChargesPD: ExampleMainPage = {
  name: 'AuthoriseCharges',
  pageType: "MainPage",
  modals: [ { modal: ViewChargesPage }, { modal: SummaryOfChargesPage }, { modal: SelectChargesDatePage } ],
  display: { target: '~/brand', dataDD: SelectOneBrandDD },
  domain: {
    brand: { dataDD: SelectOneBrandDD },
    selectedIndex: { dataDD: NatNumDd },
    selectedItem: { dataDD: OneBrandDD },
    authorisedCharges: { dataDD: AuthoriseChargesSummaryDD },
    selectedCharge: {dataDD: OneChargeDataDD},
    selectedChargeIndex: {dataDD: NatNumDd},
    summaryOfCharges: { dataDD: chargesSummaryDetailDD },

    summaryOfChargesDates: { dataDD: summaryOfChargesSearchDD },
    selectedDateIndex: { dataDD: NatNumDd },
    selectedDateItem: { dataDD: summaryOfChargesDateDD },
  },
  guards: {
    brandSelected: { condition: 'isDefined', path: '~/selectedIndex' }
  },
  rest: {
    loadBrand: { rest: SelectOneBrandPageRD, targetFromPath: '~/brand', fetcher: true },
    authorisedCharges: { rest: AuthorisedChargesRD, targetFromPath: '~/authorisedCharges/fromApi', fetcher: true },
    summaryOfChargeDates: { rest: SummaryOfChargeDatesRD, targetFromPath: '~/summaryOfChargesDates/searchResults', fetcher: true },
    summaryOfCharges: { rest: SummaryOfChargesRD, targetFromPath: '~/summaryOfCharges', fetcher: true }
  },
  initialValue: {
    authorisedCharges: { date: '2020/01/01' }
  },
  modes: [ 'view' ],
  buttons: {
    select: { control: 'ModalButton', modal: ViewChargesPage, mode: 'edit', focusOn: '~/authorisedCharges', enabledBy: 'brandSelected' }
  }
}

