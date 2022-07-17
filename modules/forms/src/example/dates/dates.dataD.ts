import { ExampleDataD } from "../common";
import { yesNoDD } from "../SingleOccupation/singleOccupation.dataD";
import { DateDD, DateWithDatePickerDD, ManyLineStringDD, NatNumDd, StringDD } from "../../common/dataD";
import { actionEnums, nextActionDD, reasonDD } from "../onChange/onChange.dataD";


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
  }
}