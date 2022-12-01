
import {NameAnd} from "@focuson/utils";
import { PrimaryMutations } from "./resolverD";
import { RefD } from "./pageD";
import { DataD, DateDDMMYYY_DD, IntegerDD, NatNumDd, RepeatingDataD, StringDD } from "./dataD";
import {RestD, RestParams, StringParam} from "./restD";
import { TableCD } from "./componentsD";

// This file is a replacement for the dateInfoRefD
// - but isn't going to work in this project as we are using natwest stuff (sqlList+resolvers)

export interface RefConfiguration {
    teamName: string
    urlPrefix: string;
    params: RestParams;
    resolver?: NameAnd<PrimaryMutations>;
    sql?: Map<string, string>
}

export function accountTypeRefD<G> (d: RefConfiguration): RefD<G> {
    const accountTypeDD: DataD<G> = {
        description: 'contains account type',
        name: `${d.teamName}VbAccountTypeForRefD`,
        structure: {
            vbAccountType: { dataDD: IntegerDD, sample: [ 10, 18 ] }
        }
    }
    const accountTypeRestD: RestD<G> = {
        actions: [ 'get' ],
        dataDD: accountTypeDD,
        params: {...d.params},
        url: `${d.urlPrefix}/vbAccountType?{query}`,
        resolvers: { ...d.resolver }
    }
    return {
        name: `${d.teamName}AccountData`,
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
            serverNow: {dataDD: StringDD, sample: ['2022-07-01T11:25:32.077Z']},
            serverOffsetHoursFromGMT: { dataDD: NatNumDd, sample: [ 0, 1 ] },
            // I am currently causing a bug - MockFF_Fetcher value -> Generated a mock version of this returning a "" instead of a mock version of this.
            holidays: {dataDD: {...holidayListD, resolver: 'getHolidays'}},
            dateFormat: {dataDD: StringDD, sample: ['dd-MM-yyyy']}
        }
    }
    const timeDataRestD: RestD<G> = {
        actions: ['get'],
        dataDD: timeDataD,
        params: {...d.params},
        url: `${d.urlPrefix}/dateInfo?{query}`,
        resolvers: {...d.resolver}
    }
    return {
        name: `${d.teamName}CommonData`,
        refGroups: 'once',
        commonParams: {
            jurisdiction: { ...StringParam, commonLens: 'jurisdiction', testValue: 'GB' },
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
                    {command: 'timestamp', path: `/${d.teamName}CommonData/now`}
                ]
            }
        },
    }
}
