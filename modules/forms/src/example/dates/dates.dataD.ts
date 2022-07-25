import { ExampleDataD, ExampleRepeatingD } from "../common";
import { DateWithDatePickerDD, StringDD } from "../../common/dataD";
import {} from "../eTransfers/eTransfers.dataD";
import { TableCD } from "../../common/componentsD";

export const HolidayDataD: ExampleDataD = {
  name: 'HolidayLine',
  description: 'A single holiday in a jurisdiction',
  structure: {
    jurisdiction: { dataDD: StringDD, sample: [ 'GB', 'E' ] },
    date: {
      dataDD: StringDD, sample: [
        '5/7/2022', '6/7/2022', '7/7/2022', '8/7/2022', '9/7/2022', '10/7/2022',
        '11/7/2022', '12/7/2022', '13/7/2022', '14/7/2022', '15/7/2022', '16/7/2022' ]
    },
  }
}
export const HolidaysDataD: ExampleRepeatingD = {
  name: 'Holidays',
  dataDD: HolidayDataD,
  description: 'The list of holidays',
  display: TableCD,
  sampleCount: 10,
  displayParams: { order: [ 'date', 'jurisdiction' ] },
  paged: false
}

export const DateInfoDataD: ExampleDataD = {
  name: "DateInfo",
  description: "All the date info needed by the date picker",
  structure: {
    today: { dataDD: StringDD, sample: [ '1/7/2022' ] },
    dateFormat: { dataDD: StringDD, sample: [ 'dd/MM/yyyy' ] },
    holidays: { dataDD: HolidaysDataD }
  }
}
export const datesDataD: ExampleDataD = {
  name: 'Dates',
  description: "",
  structure: {
    empty: { dataDD: DateWithDatePickerDD, displayParams: { label: 'Nothing specified' } },
    emptyAndRequired: { dataDD: DateWithDatePickerDD, displayParams: { label: 'Nothing specified - readonly', readonly: true } },
    value: { dataDD: { ...DateWithDatePickerDD, emptyValue: '1/7/2022' }, displayParams: { label: 'Specified 1/7/2022' } },
    valueDateFormat: { dataDD: { ...DateWithDatePickerDD, emptyValue: '2022/7/1' }, displayParams: { label: 'Specified 1/7/2022 ', dateFormat: 'yyyy/MM/dd' } },
    future: { dataDD: DateWithDatePickerDD, displayParams: { label: 'Future', dateRange: { type: 'future' } } },
    past: { dataDD: DateWithDatePickerDD, displayParams: { label: 'Past', dateRange: { type: 'past' } } },
    fiveWorkingDaysHolidaysNotSpecified: {
      dataDD: DateWithDatePickerDD, displayParams: {
        dateRange: { type: 'future', allowWeekends: false, allowHolidays: false, minWorkingDaysBefore: 5 }
      }
    },
    holidays: {
      dataDD: {...DateWithDatePickerDD, emptyValue: undefined, allowUndefined: true}, displayParams: {
        dateInfo: '~/dateInfo',
        jurisdiction: '/CommonIds/jurisdiction',
        dateRange: { type: 'future', allowWeekends: false, allowHolidays: false, minWorkingDaysBefore: 5        }
      }
    }

  }
}