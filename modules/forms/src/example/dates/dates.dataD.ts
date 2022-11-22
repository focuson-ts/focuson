import { ExampleDataD } from "../common";
import { DateWithDatePickerDD, EndMonthYearFromRangeFromWithDatePickerDD, LabelAndMonthYearLengthDD, MonthYearWithDatePickerDD, StartMonthYearFromRangeFromWithDatePickerDD } from "../../common/dataD";
import { DatePickerForPaymentsCD, EndMonthYearDatePickerWithLengthCD, LayoutCd, StartMonthYearDatePickerWithLengthCD } from "../../common/componentsD";

export const datesDataD: ExampleDataD = {
  name: 'Dates',
  description: "",
  layout: { component: LayoutCd, displayParams: { details: '[[8,8]]', title: 'Some Title {empty}', rightHandTitle: 'Some Right Hand Title {empty}' } },
  // layout: { component: LayoutCd, displayParams: { details: '[[1]]', title: 'Some Title {empty}', rightHandTitle: 'Some Right Hand Title {empty}' } },
  structure: {
    empty: { dataDD: DateWithDatePickerDD, displayParams: { label: 'Nothing specified', onChange: { command: 'message', msg: 'empty' } } },
    emptyAndReadonly: { dataDD: DateWithDatePickerDD, displayParams: { label: 'Nothing specified - readonly', readonly: true } },
    emptyAndNotRequired: { dataDD: DateWithDatePickerDD, displayParams: { label: 'Nothing specified - required false', required: false } },
    value: { dataDD: { ...DateWithDatePickerDD, emptyValue: '6/7/2022' }, displayParams: { label: 'Specified 6/7/2022' } },
    valueDateFormat: { dataDD: { ...DateWithDatePickerDD, emptyValue: '2022/7/5' }, displayParams: { label: 'Specified 2022/7/5 (different date format) ', dateFormat: 'yyyy/MM/dd' } },
    future: { dataDD: DateWithDatePickerDD, displayParams: { label: 'Future', dateRange: { type: 'future' } } },
    futureNoHolidaysOrWeekends: { dataDD: DateWithDatePickerDD, displayParams: { dateRange: { type: 'future', allowWeekends: false, allowHolidays: false, } } },
    futureNoHolidaysOrWeekendsCustomMessages: {
      dataDD: DateWithDatePickerDD,
      displayParams: {
        dateRange: { type: 'future', allowWeekends: false, allowHolidays: false },
        dateErrorMessage: { isWeekend: 'forget them weekends... no work allowed!' }
      }
    },
    past: { dataDD: DateWithDatePickerDD, displayParams: { label: 'Past', dateRange: { type: 'past' } } },
    monthYear: { dataDD: { ...MonthYearWithDatePickerDD, emptyValue: '8/2022' } },
    // monthYearPast: { dataDD: { ...MonthYearWithDatePickerDD, emptyValue: '8/2022', dateRange: { type: 'past' } } },
    // monthYearFuture: { dataDD: { ...MonthYearWithDatePickerDD, emptyValue: '8/2022', dateRange: { type: 'future' } } },
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
    },
    length: { dataDD: LabelAndMonthYearLengthDD, displayParams: { fromDate: 'startDate', toDate: 'endDate', onChange: { command: 'message', msg: 'length' } } },
    startDate: { dataDD: StartMonthYearFromRangeFromWithDatePickerDD, displayParams: { endDatePath: 'endDate', lengthPath: 'length', onChange: { command: 'message', msg: 'startDate' } } },
    endDate: { dataDD: EndMonthYearFromRangeFromWithDatePickerDD, displayParams: { startDatePath: 'startDate', lengthPath: 'length', onChange: { command: 'message', msg: 'endDate' } } },
    forPayment: {
      dataDD: {
        ...DateWithDatePickerDD, display: DatePickerForPaymentsCD,
        displayParams: {
          dateFormat: 'dd/MM/yyyy',
          dateRange: { type: 'future', allowWeekends: false, allowHolidays: false },
          pathToDateInfo: '/CommonData',
          warning: { time: '11:20', messageText: "Warning msg", showCancelButton: false },
          error: { time: '11:26', messageText: "Error msg", showCancelButton: false }
        }
      }
    }
  }
}