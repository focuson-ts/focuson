import { ExampleModalPage } from "../common";
import {
    additionalInfoFirstDD,
    additionalInfoSecondDD, listOccupationsDD,
    oneOccupationIncomeDetailsDD,
    otherIncomeResponseDD
} from "./singleOccupation.dataD";
import { HideButtonsCD } from "../../buttons/hideButtonsCD";


export const additionalInfoFirstModalPD: ExampleModalPage = {
    name: 'AdditionalInfoFirstModal',
    pageType: 'ModalPage',
    modes: [ 'edit' ],
    display: { target: '~/tempForAdditionalInfoFirst', dataDD: additionalInfoFirstDD, importFrom: 'MainOccupationDetailsPageSummary' },
    buttons: {
        cancel: { control: 'ModalCancelButton' },
        commit: { control: 'ModalCommitButton' }
    },
}

export const additionalInfoSecondModalPD: ExampleModalPage = {
    name: 'AdditionalInfoSecondModal',
    pageType: 'ModalPage',
    modes: [ 'edit' ],
    display: { target: '~/tempForAdditionalInfoSecond', dataDD: additionalInfoSecondDD, importFrom: 'MainOccupationDetailsPageSummary' },
    buttons: {
        cancel: { control: 'ModalCancelButton' },
        commit: { control: 'ModalCommitButton' }
    },
}

export const editOtherSourcesOfIncomeModalPD: ExampleModalPage = {
    name: 'OtherSourcesOfIncomeModal',
    pageType: 'ModalPopup',
    modes: [ 'edit' ],
    display: { target: '~/tempForOtherSourcesOfIncome', dataDD: otherIncomeResponseDD, importFrom: 'MainOccupationDetailsPageSummary' },
    buttons: {
        cancel: { control: 'ModalCancelButton' },
        commit: { control: 'ModalCommitButton' }
    },
}

export const listOccupationsModalPD: ExampleModalPage = {
    name: 'ListOccupationsModal',
    pageType: 'ModalPopup',
    modes: [ 'edit' ],
    display: { target: '~/occupation', dataDD: listOccupationsDD, importFrom: 'MainOccupationDetailsPageSummary' },
    buttons: {
        cancel: { control: 'ModalCancelButton' },
        commit: { control: 'ModalCommitButton' }
    },
}

export const editOccupationIncomeSummaryModalPD: ExampleModalPage = {
    name: 'OccupationIncomeModal',
    pageType: 'ModalPage',
    modes: [ 'view', 'edit' ],
    display: { target: '~/tempForOccupationEdit', dataDD: oneOccupationIncomeDetailsDD, importFrom: 'MainOccupationDetailsPageSummary' },
    layout: { component: HideButtonsCD, displayParams: { hide: [ 'additionalInfoFirst', 'additionalInfoSecond', 'otherSourcesOfIncome', 'list' ] } },
    buttons: {
        cancel: { control: 'ModalCancelButton' },
        commit: { control: 'ModalCommitButton' },
        additionalInfoFirst: {
            by: { condition: "equals", path: '~/tempForOccupationEdit/areYou', value: `"E"`},
            guard: {
                control: 'ModalButton', modal: additionalInfoFirstModalPD, mode: 'view', focusOn: '~/tempForAdditionalInfoFirst',
                copy: { from: '~/fromApi/additionalInfoFirst' },
                copyOnClose: { to: '~/fromApi/additionalInfoFirst' } } },
        additionalInfoSecond: {
            by: { condition: "equals", path: '/MainOccupationDetailsPageSummary/temp/areYou', value: `"S"` },
            guard: {
                control: 'ModalButton', modal: additionalInfoSecondModalPD, mode: 'edit', focusOn: '~/tempForAdditionalInfoSecond',
                copy: { from: '~/fromApi/additionalInfoSecond' },
                copyOnClose: { to: '~/fromApi/additionalInfoSecond' } } },
        otherSourcesOfIncome: {
            by: { condition: "equals", path: '~/fromApi/occupationAndIncome/customerOccupationIncomeDetails/otherSourceOfIncome', value: `"Y"` },
            guard: {
                control: 'ModalButton', modal: editOtherSourcesOfIncomeModalPD, mode: 'edit', focusOn: '~/tempForOtherSourcesOfIncome',
                copy: { from: '~/fromApi/otherSourcesOfIncome' },
                copyOnClose: { to: '~/fromApi/otherSourcesOfIncome' } } },
        list: {
            control: 'ModalButton', modal: listOccupationsModalPD, mode: 'edit',
            focusOn: '~/fromApi/occupation',
            copy: [
                { from: '~/fromApi/occupationAndIncome/customerOccupationIncomeDetails/occupation', to: '~/fromApi/occupation/search' },
                { from: '~/fromApi/occupationAndIncome/customerOccupationIncomeDetails/occupation', to: '~/fromApi/occupation/selectedOccupationName' },
                { from: '~/fromApi/occupationsList', to: '~/fromApi/occupation/searchResults' },
            ],
            copyOnClose: [
                { from: '~/fromApi/occupation/selectedOccupationName', to: '~/fromApi/occupationAndIncome/customerOccupationIncomeDetails/occupation' },
            ] }
    }
}
