import {
    DataD,
    DateDDMMYYY_DD,
    IntegerDD, PrimaryMutations,
    RefD,
    RepeatingDataD,
    RestD,
    StringDD,
    StringParam,
    TableCD
} from "@focuson/forms";
import {NameAnd} from "@focuson/utils";
import {commonIds, fromCommonIds} from "../example/commonIds";

// This file is a replacement for the dateInfoRefD
// - but isn't going to work in this project as we are using natwest stuff (sqlList+resolvers)

export interface RefConfiguration {
    urlPrefix: string;
    resolver?: NameAnd<PrimaryMutations>;
    sql?: Map<string, string>
}

export function accountTypeRefD<G> (d: RefConfiguration): RefD<G> {
    const accountTypeDD: DataD<G> = {
        description: 'contains account type',
        name: 'VbAccountTypeForRefD',
        structure: {
            vbAccountType: { dataDD: IntegerDD }
        }
    }
    const accountTypeRestD: RestD<G> = {
        actions: [ 'get' ],
        dataDD: accountTypeDD,
        params: {
            dbName: commonIds.dbName,
            ...fromCommonIds('vbAccountSeq')
        },
        url: `${d.urlPrefix}/vbAccountType?{query}`,
        resolvers: { ...d.resolver }
    }
    return {
        name: "AccountData",
        refGroups: 'once',
        domain: {
            vbAccountType: {dataDD: accountTypeDD},
        },
        rest: {
            accountType: {
                rest: accountTypeRestD,
                targetFromPath: '~/vbAccountType',
                fetcher: true,
                postFetchCommands: { command: 'copyResult', from: 'vbAccountType', to: '/CommonIds/vbAccountType' }
            },
        },
    }
}

export function jurisdictionRefD<G> ( d: RefConfiguration ): RefD<G> {
    const jurisdictionCodeDD: DataD<G> = {
        description: 'contains jurisdiction code',
        name: 'JurisdictionCodeForRefD',
        structure: {
            jurisdictionCode: { dataDD: StringDD }
        }
    }
    const jurisdictionCodeRestD: RestD<G> = {
        actions: [ 'get' ],
        dataDD: jurisdictionCodeDD,
        params: {
            dbName: commonIds.dbName,
            ...fromCommonIds('brandRef')
        },
        url: `${d.urlPrefix}/jurisdictionCode?{query}`,
        resolvers: { ...d.resolver }
    }
    return {
        name: "JurisdictionCode",
        refGroups: 'once',
        domain: {
            jurisdictionCode: { dataDD: jurisdictionCodeDD },
        },
        rest: {
            jurisdictionCode: { rest: jurisdictionCodeRestD, targetFromPath: '~/jurisdictionCode', fetcher: true,
                postFetchCommands: { command: 'copyResult', from: 'jurisdictionCode' , to: '/CommonIds/jurisdiction'}
            },
        },
    }
}

export function timeDataRefD<G> (d: RefConfiguration ): RefD<G> {
    const holidayDataD: DataD<G> = {
        description: "A single holiday in one jurisdiction",
        name: "Holiday",
        structure: {
            date: {dataDD: DateDDMMYYY_DD, sample: ['02-07-2022', '04-07-2022', '06-07-2022']},
            jurisdiction: {dataDD: StringDD, sample: ['GB', "I"]},
        }
    }
    const holidayListD: RepeatingDataD<G> = {
        name: 'HolidayList',
        description: 'The list of holidays from the server used by the date picker',
        dataDD: holidayDataD,
        display: TableCD,
        displayParams: {order: ['date', 'jurisdiction'], tableTitle: 'Holidays'},
        paged: false
    }
    const todayDD: DataD<G> = {
        description: 'contains today',
        name: 'TodayForRefD',
        structure: {
            today: {dataDD: StringDD}
        }
    }
    const timeDataD: DataD<G> = {
        description: "Today and holidays",
        name: "TimeData",
        structure: {
            today: {dataDD: StringDD, sample: ['01-07-2022']},
            serverNow: {dataDD: StringDD, sample: ['2022-07-01T05:25:32.077Z']},
            holidays: {dataDD: {...holidayListD, resolver: 'getHolidays'}},
            dateFormat: {dataDD: StringDD, sample: ['dd-MM-yyyy']}
        }
    }
    const timeDataRestD: RestD<G> = {
        actions: ['get'],
        dataDD: timeDataD,
        params: {
            dbName: commonIds.dbName,
        },
        url: `${d.urlPrefix}/dateInfo?{query}`,
        resolvers: {...d.resolver}
    }
    return {
        name: "CommonData",
        refGroups: 'once',
        commonParams: {
            browserNow: {...StringParam, commonLens: 'browserNowAtStart', testValue: ''}
        },
        domain: {
            dates: {dataDD: timeDataD},
            now: {dataDD: StringDD},
        },
        rest: {
            dateInfo: {
                rest: timeDataRestD,
                targetFromPath: '~/dates',
                fetcher: true,
                postFetchCommands: [
                    {command: 'copyResult', from: 'today', to: '/CommonIds/today'},
                    {command: 'timestamp', path: '/CommonData/now'}
                ]
            }
        },
    }
}
