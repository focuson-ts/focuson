import { RefD } from "./pageD";
import { DataD, DateDDMMYYY_DD, RepeatingDataD, StringDD } from "./dataD";
import { TableCD } from "./componentsD";
import { RestD, StringParam } from "./restD";

export interface DateRefConfiguration {
  urlPrefix: string;
}
export const dateRefconfig: DateRefConfiguration = {
  urlPrefix: '/api'
}

export function dateInfoRefD<G> ( d: DateRefConfiguration ): RefD<G> {
  const holidayDataD: DataD<G> = {
    description: "A single holiday in one jurisdiction",
    name: "Holiday",
    structure: {
      date: { dataDD: DateDDMMYYY_DD, sample: [ '02-07-2022', '04-07-2022', '06-07-2022' ] },
      jurisdiction: { dataDD: StringDD, sample: [ 'GB', "I" ] },
    }
  }
  const holidayListD: RepeatingDataD<G> = {
    name: 'HolidayList',
    description: 'The list of holidays from the server used by the date picker',
    dataDD: holidayDataD,
    display: TableCD,
    displayParams: { order: [ 'date', 'jurisdiction' ], tableTitle: 'Holidays' },
    paged: false
  }
  const timeDataD: DataD<G> = {
    description: "Today and holidays",
    name: "TimeData",
    structure: {
      today: { dataDD: DateDDMMYYY_DD, sample: [ '01-07-2022' ] },
      holidays: { dataDD: holidayListD },
      dateFormat: { dataDD: StringDD, sample: [ 'dd-MM-yyyy' ] }
    }
  }
  const dateinfoRestD: RestD<G> = {
    actions: [ 'get' ],
    dataDD: timeDataD,
    params: {},
    url: `${d.urlPrefix}/dateInfo`
  }
  const commonDataRefD: RefD<G> = {
    name: "CommonData",
    refGroups: 'once',
    commonParams: { jurisdiction: { ...StringParam, commonLens: 'jurisdiction', testValue: 'GB' } },
    domain: {
      dates: { dataDD: timeDataD }
    },
    rest: {
      dates: { rest: dateinfoRestD, targetFromPath: '~/dates', fetcher: true }
    },
  }
  return commonDataRefD
}

