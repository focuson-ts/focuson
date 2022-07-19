import { ExampleDataD, ExampleRepeatingD } from "../common";
import { Holidays } from "@focuson/form_components";
import { DateDDMMYYY_DD, StringDD } from "../../common/dataD";
import { TableCD } from "../../common/componentsD";


export const holidayDataD: ExampleDataD = {
  description: "A single holiday in one jurisdiction",
  name: "Holiday",
  structure: {
    date: { dataDD: DateDDMMYYY_DD, sample: ['02/07/2022','04/07/2022','06/07/2022'] },
    jurisdiction: { dataDD: StringDD , sample: ['GB', "I"]},
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
    today: { dataDD: DateDDMMYYY_DD , sample: ['01/07/2022']},
    holidays: { dataDD: holidayListD },
    dateFormat: { dataDD: StringDD, sample: [ 'dd/MM/yyyy' ] }
  }
}

export const initialDataD: ExampleDataD = {
  description: "All the initial data",
  name: "InitialData",
  structure: {
    time: { dataDD: timeDataD }
  }
}

