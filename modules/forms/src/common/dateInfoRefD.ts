import { ExampleDataD, ExampleRefD, ExampleRepeatingD, ExampleRestD } from "../common";
import { DateDDMMYYY_DD, StringDD } from "../../common/dataD";
import { TableCD } from "../../common/componentsD";
import { StringParam } from "../../common/restD";


export const holidayDataD: ExampleDataD = {
  description: "A single holiday in one jurisdiction",
  name: "Holiday",
  structure: {
    date: { dataDD: DateDDMMYYY_DD, sample: [ '02-07-2022', '04-07-2022', '06-07-2022' ] },
    jurisdiction: { dataDD: StringDD, sample: [ 'GB', "I" ] },
  }
}
export const holidayListD: ExampleRepeatingD = {
  name: 'HolidayList',
  description: 'The list of holidays from the server used by the date picker',
  dataDD: holidayDataD,
  display: TableCD,
  displayParams: { order: [ 'date', 'jurisdiction' ], tableTitle: 'Holidays' },
  paged: false
}
export const timeDataD: ExampleDataD = {
  description: "Today and holidays",
  name: "TimeData",
  structure: {
    today: { dataDD: DateDDMMYYY_DD, sample: [ '01-07-2022' ] },
    holidays: { dataDD: holidayListD },
    dateFormat: { dataDD: StringDD, sample: [ 'dd-MM-yyyy' ] }
  }
}
export const dateinfoRestD: ExampleRestD = {
  actions: [ 'get' ],
  dataDD: timeDataD,
  params: {},
  url: "/api/dateInfo"
}
export const commonDataRefD: ExampleRefD = {
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

