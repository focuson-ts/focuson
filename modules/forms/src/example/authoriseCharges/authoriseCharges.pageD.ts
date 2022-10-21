import { ExampleMainPage, ExampleModalPage } from "../common";
import { NatNumDd } from "../../common/dataD";
import { AuthoriseChargesSummaryDD, OneBrandDD, OneChargeDataDD, operatorEligableDD, RememberedData, SelectOneBrandDD, SummaryData, summaryOfChargesDateDD, summaryOfChargesSearchDD } from "./authoriseCharges.dataD";
import { AuthorisedChargesRD, operatorEligabilityRD, SelectOneBrandPageRD, SummaryOfChargeDatesRD } from "./authoriseCharges.restD";
import { HideButtonsCD } from "../../buttons/hideButtonsCD";
import { StringParam } from "../../common/restD";
import { AuthoriseCustomisation } from "./authoriseCharges.customise";
import { memoise } from "@focuson/utils";
import { fromCommonIds } from "../commonIds";

export function SummaryOfChargesPage ( c: AuthoriseCustomisation ): ExampleModalPage {
  return memoise ( 'pageD', 'SummaryOfChargesPage' ) ( () => ({
    name: 'SummaryOfCharges',
    pageType: 'ModalPopup',
    modes: [ 'view' ],
    display: { dataDD: SummaryData ( c ), target: '~/summaryOfCharges' },
    buttons: {
      close: { control: "ModalCancelButton" },
    }
  }) )
}

export function SelectChargesDatePage ( c: AuthoriseCustomisation ): ExampleModalPage {
  return {
    name: 'SelectChargesDate',
    pageType: 'ModalPage',
    modes: [ 'view', 'edit' ],
    display: { dataDD: summaryOfChargesSearchDD ( c ), target: '~/summaryOfChargesDates' },
    buttons: {
      cancel: { control: 'ModalCancelButton' },
      commit: { control: 'ModalCommitButton' }
    }
  }
}
export function ViewChargesPage ( c: AuthoriseCustomisation ): ExampleModalPage {
  return {
    name: 'ViewCharges',
    pageType: 'ModalPage',
    modes: [ 'view', 'edit' ],
    layout: { component: HideButtonsCD, displayParams: { hide: [ 'selectDate' ] } },
    display: { dataDD: AuthoriseChargesSummaryDD ( c ), target: '~/authorisedCharges' },
    guards: {
      somethingSelected: { condition: 'isDefined', path: '~/selectedCharge', message: 'You need to select something' },
      hasSomeData: { condition: 'arrayLength>0', path: '~/authorisedCharges/fromApi/editingData', message: 'There is no data loaded' }
    },
    buttons: {
      selectDate: {
        control: 'ModalButton', text: 'list', modal: SelectChargesDatePage ( c ), mode: 'view', focusOn: '~/summaryOfChargesDates',
        copy: { from: '#authorisedDate', to: '~/summaryOfChargesDates/date' },
        copyOnClose: { from: '~/selectedDateItem/dateCreated', to: '#authorisedDate' },
      },
      approvePendingFees: {
        control: "ActionButton", path: '#editingData',
        preCommands: [ { command: 'delete', path: '~/selectedChargeIndex' } ], // no need for pre / post here, it's just to check both are generated
        postCommands: [ { command: 'delete', path: '~/selectedDateItem' } ],
        // paths: { pathRepeated: '#editingData', otherData: '~/selectedDateItem/dateCreated' },
        text: 'Approve Pending Fees', action: 'approvePendingFees',
        buttonType: 'primary'
      },
      authoriseApprovedFees: { control: "ActionButton", path: '#editingData', text: 'Authorise Approved Fees', action: 'authoriseApprovedFees', buttonType: 'secondary', needsHistory: true },
      summary: {
        enabledBy: 'hasSomeData',
        control: 'ModalButton', modal: SummaryOfChargesPage ( c ),
        copy: { from: '~/authorisedCharges/fromApi/editingData' },
        mode: 'view', focusOn: '~/summaryOfCharges'
      },
      save: { control: 'RestButton', restName: 'authorisedCharges', action: 'update', deleteOnSuccess: '#fromApi', confirm: { type: 'window', confirmText: 'Sure?' } },
    }
  }
}
export function AuthoriseChargesPD ( c: AuthoriseCustomisation ): ExampleMainPage {
  return {
    name: c.pageName,
    pageType: "MainPage",
    commonParams: { ...fromCommonIds ( 'today', 'operatorName' ) },
    initialValue: [ { command: 'copy', from: '/CommonIds/today', to: '~/authorisedCharges/date' } ],
    modals: [ { modal: ViewChargesPage ( c ) }, { modal: SummaryOfChargesPage ( c ) }, { modal: SelectChargesDatePage ( c ) } ],
    display: { target: '~/brand', dataDD: SelectOneBrandDD ( c ) },
    domain: {
      brand: { dataDD: SelectOneBrandDD ( c ) },
      selectedIndex: { dataDD: NatNumDd },
      selectedItem: { dataDD: OneBrandDD ( c ) },
      authorisedCharges: { dataDD: AuthoriseChargesSummaryDD ( c ) },
      selectedCharge: { dataDD: OneChargeDataDD ( c ) },
      selectedChargeIndex: { dataDD: NatNumDd },
      summaryOfCharges: { dataDD: SummaryData ( c ) },
      selectedChargeItem: { dataDD: RememberedData ( c ) },

      summaryOfChargesDates: { dataDD: summaryOfChargesSearchDD ( c ) },
      selectedDateIndex: { dataDD: NatNumDd },
      selectedDateItem: { dataDD: summaryOfChargesDateDD ( c ) },
      operatorEligable: { dataDD: operatorEligableDD ( c ) }
    },
    guards: {
      brandSelected: { condition: 'isDefined', path: '~/selectedIndex', message: 'you need to select a brand' },
      balanceZero: { condition: 'fn', name: 'balanceZero', path: '~' }
    },
    variables: {
      fromApi: { constructedBy: 'path', path: '~/authorisedCharges/fromApi' },
      searchResults: { constructedBy: 'path', path: '~/summaryOfChargesDates/searchResults' },
      authorisedDate: { constructedBy: 'path', path: '~/authorisedCharges/date' },
      authorisedCharges: { constructedBy: 'path', path: '~/authorisedCharges' },
      editingData: { constructedBy: 'path', path: '~/authorisedCharges/fromApi/editingData' },
      originalData: { constructedBy: 'path', path: '~/authorisedCharges/fromApi/originalData' },
    },
    rest: {
      loadBrand: { rest: SelectOneBrandPageRD ( c ), targetFromPath: '~/brand', fetcher: true },
      authorisedCharges: {
        rest: AuthorisedChargesRD ( c ), targetFromPath: '~/authorisedCharges/fromApi/editingData', fetcher: true,
        postFetchCommands: [
          { command: 'message', msg: 'loading the authorised charges', level: 'success' },
          { command: 'copyResult', from: '', to: '~/authorisedCharges/fromApi/originalData' }
        ],
        on404: [ { command: 'message', msg: '404 finding the authorised charges' } ]
      },
      summaryOfChargeDates: { rest: SummaryOfChargeDatesRD ( c ), targetFromPath: '~/summaryOfChargesDates/searchResults', fetcher: true },
      operatorEligable: { rest: operatorEligabilityRD ( c ), targetFromPath: '~/operatorEligable', fetcher: true },
      // summaryOfCharges: { rest: SummaryOfChargesRD, targetFromPath: '~/summaryOfCharges', fetcher: true }
    },
    modes: [ 'view' ],
    buttons: {
      select: { control: 'ModalButton', modal: ViewChargesPage ( c ), mode: 'edit', focusOn: '#authorisedCharges', enabledBy: 'brandSelected' }
    }
  }
}

