

import { occupationAndIncomeDetailsDD, occupationIncomeDetailsDD } from "./occupationAndIncome.dataD";

import { occupationAndIncomeRD } from "./occupationAndIncome.restD";
import { PageD } from "../../common/pageD";
import { AllButtonsInPage } from "../../buttons/allButtons";
import { IntegerDD } from "../../common/dataD";

export const occupationIncomeModalPD: PageD<AllButtonsInPage> = {
    name: 'OccupationIncomeModalPD',
    pageType: 'ModalPage',
    /** This page can only view data */
    modes: [ 'view', 'create', 'edit' ],
    /** How we display the page.*/
    display: { layout: { name: 'Layout', details: '[3]' }, target: [], dataDD: occupationIncomeDetailsDD },
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

/** This is the 'bringing it all together */
export const OccupationAndIncomeSummaryPD: PageD<AllButtonsInPage> = {
    name: 'OccupationAndIncomeSummary',
    pageType: 'MainPage',
    /** This page can only view data */
    modes: [ 'view', 'edit', 'create' ],
    /** How we display the page.*/
    modals: [ { modal: occupationIncomeModalPD, path: [] } ], // TODO square brackets
    display: { layout: { name: 'Layout', details: '[1][3,3][5]' }, target: [ 'fromApi' ], dataDD: occupationAndIncomeDetailsDD },
    /** When the page is selected for the first time this is the initial state */
    initialValue: {
        selectedItem: 0
    },
    /** This defines the domain data structures in react*/
    domain: {
        selectedItem: {dataDD: IntegerDD},
        fromApi: { dataDD: occupationAndIncomeDetailsDD },
        temp: { dataDD: occupationIncomeDetailsDD },
    },
    /** Binds the rest to 'where it takes place'. So we have these rest actions, and the gui data is at the location defined by 'targetFromPath'. Fetcher 'true' means set up a fetcher to go get the data when the page is selected */
    rest: {
        occupationAndIncomeRD: { rest: occupationAndIncomeRD, targetFromPath: [ 'fromApi' ], fetcher: 'get' },
    },
    /** As well as displaying/editing the data we have these buttons. These are passed to layout */
    buttons: {                                                                      //interestingly these will be type checked in the target system...
        nextOccupation: {
            control: 'ListMarkerNextButton',
        },
        //questions: how do we know which is the existing plan... is there a list? are we an entry in the list? do we need to navigate to it?
        previousOccupation: {
            control: 'ListMarkerPrevButton',
        },
        addEntry: {
            control: 'ModalButton', modal: occupationIncomeModalPD, mode: 'create',
            createEmpty: occupationIncomeDetailsDD,
            to: [ 'temp' ]
            // restOnCommit: { rest: occupationAndIncomeRD, action: 'update', result: 'refresh', target: [ '' ] }
        },
        //questions: how do we know which is the existing plan... is there a list? are we an entry in the list? do we need to navigate to it?
        // amendEntry: {
        //     control: 'ModalAndCopyButton', modal: CreatePlanPD, mode: 'edit',
        //     from: [ 'fromApi', 'createPlan' ], to: [ 'tempCreatePlan' ],
        //     restOnCommit: { rest: createPlanRestD, action: 'update', result: 'refresh', target: [ 'EAccountsSummary' ] }
        // },
    }
}