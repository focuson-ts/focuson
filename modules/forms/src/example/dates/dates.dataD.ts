import { ExampleDataD } from "../common";
import { DateWithDatePickerDD } from "../../common/dataD";
import { LayoutCd } from "../../common/componentsD";

export const datesDataD: ExampleDataD = {
  name: 'Dates',
  description: "",
  layout: { component: LayoutCd, displayParams: { details: '[[5,5]]', title: 'Some Title {empty}', rightHandTitle: 'Some Right Hand Title {empty}' } },
  structure: {
    empty: { dataDD: DateWithDatePickerDD, displayParams: { label: 'Nothing specified' } },
    emptyAndReadonly: { dataDD: DateWithDatePickerDD, displayParams: { label: 'Nothing specified - readonly', readonly: true } },
    emptyAndNotRequired: { dataDD: DateWithDatePickerDD, displayParams: { label: 'Nothing specified - required false', required: false } },
    value: { dataDD: { ...DateWithDatePickerDD, emptyValue: '6/7/2022' }, displayParams: { label: 'Specified 6/7/2022' } },
    valueDateFormat: { dataDD: { ...DateWithDatePickerDD, emptyValue: '2022/7/5' }, displayParams: { label: 'Specified 2022/7/5 (different date format) ', dateFormat: 'yyyy/MM/dd' } },
    future: { dataDD: DateWithDatePickerDD, displayParams: { label: 'Future', dateRange: { type: 'future' } } },
    past: { dataDD: DateWithDatePickerDD, displayParams: { label: 'Past', dateRange: { type: 'past' } } },
    fiveWorkingDaysHolidaysNotSpecified: {
      dataDD: DateWithDatePickerDD, displayParams: {
        dateRange: { type: 'future', allowWeekends: false, allowHolidays: false, minWorkingDaysBefore: 5 }
      }
    },
    fiveWorkingDaysWeekendsAllowed: {
      dataDD: { ...DateWithDatePickerDD, emptyValue: undefined, allowUndefined: true }, displayParams: {
        dateRange: { type: 'future', allowWeekends: true, allowHolidays: false, minWorkingDaysBefore: 5 }
      }
    },
    fiveWorkingDaysHolidaysAllowed: {
      dataDD: { ...DateWithDatePickerDD, emptyValue: undefined, allowUndefined: true }, displayParams: {
        dateRange: { type: 'future', allowWeekends: false, allowHolidays: true, minWorkingDaysBefore: 5 }
      }
    }
  }
}