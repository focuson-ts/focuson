import { acceptDateForTest, DateInfo, DatePicker, DateRange, errorsAnd, firstAllowedDate, MyCombined, parseDate, validateDateInfo } from "@focuson/form_components";
import { lensState } from "@focuson/state";
import { mount } from "enzyme";
import { HasPageSelection, PageSelectionContext, pageSelectionlens } from "@focuson/pages";
import { HasTagHolder } from "@focuson/template";
import { HasSimpleMessages } from "@focuson/utils";
import { enzymeSetup } from "./enzymeAdapterSetup";

enzymeSetup ()
const dateFormat = 'dd/MM/yyyy'

const okDateInfo: DateInfo = {
  dateFormat,
  holidays: [
    { date: '12/11/2022', jurisdiction: 'GB' },
    { date: '12/11/2022', jurisdiction: 'I' },
    { date: '15/11/2022', jurisdiction: 'GB' },
    { date: '17/11/2022', jurisdiction: 'I' },
  ],
  today: '7/11/2022',
}
const badDateInfo: DateInfo = {
  dateFormat,
  holidays: [
    { date: 'bad1', jurisdiction: 'GB' },
    { date: 'bad2', jurisdiction: 'I' },
  ],
  today: '7/11/2022',
}
const nov7 = new Date ( '2022/11/7' ).toISOString () // need this so that the tests can run in different places
const nov12 = new Date ( '2022/11/12' ).toISOString ()
const nov15 = new Date ( '2022/11/15' ).toISOString ()
const nov17 = new Date ( '2022/11/17' ).toISOString ()

function date ( d: Date | string[] ) {
  if ( Array.isArray ( d ) ) throw Error ()
  return d
}
const toDate = parseDate ( '', dateFormat )

describe ( "parseDate", () => {
  it ( "should parse dates", () => {
    expect ( date ( parseDate ( 'somePrefix', 'dd/MM/yyyy' ) ( '7/11/2022' ) ).toISOString () ).toEqual ( nov7 )
    expect ( date ( parseDate ( 'somePrefix', 'yyyy/MM/dd' ) ( '2022/11/7' ) ).toISOString () ).toEqual ( nov7 )
  } )
  it ( "should handle non dates", () => {
    expect ( parseDate ( 'somePrefix', 'yyyy/MM/dd' ) ( 'someJunk' ) ).toEqual ( [ 'somePrefix Invalid date [someJunk]. Use yyyy/MM/dd' ] )
    expect ( parseDate ( 'somePrefix', 'dd/MM/yyyy' ) ( 'someJunk' ) ).toEqual ( [ 'somePrefix Invalid date [someJunk]. Use dd/MM/yyyy' ] )
  } )
} )

describe ( "validateDateInfo", () => {
  it ( "should turn strings into dates", () => {
    const [ errors, [ dateInfo ] ] = errorsAnd ( [ validateDateInfo ( okDateInfo, undefined, {} ) ] )
    expect ( errors ).toHaveLength ( 0 )
    const { holidays, today } = dateInfo
    expect ( today.toISOString () ).toEqual ( nov7 )
    expect ( holidays.map ( d => d.toISOString () ) ).toEqual ( [
      `${nov12}`,
      `${nov12}`,
      `${nov15}`,
      `${nov17}`
    ] )
  } )
  describe ( "should return issues", () => {
    it ( "should report issues with today", () => {
      const [ errors, [ dateInfo ] ] = errorsAnd ( [ validateDateInfo ( { ...okDateInfo, today: 'junk' }, undefined, {} ) ] )
      expect ( errors ).toEqual ( [ "today Invalid date [junk]. Use dd/MM/yyyy" ] )
    } )
    it ( "should report issues with holidayDates", () => {
      const [ errors, [ dateInfo ] ] = errorsAnd ( [ validateDateInfo ( badDateInfo, undefined, {} ) ] )
      expect ( errors ).toEqual ( [
        "holidays[0] Invalid date [bad1]. Use dd/MM/yyyy",
        "holidays[1] Invalid date [bad2]. Use dd/MM/yyyy"
      ] )
    } )
  } )
} )

describe ( "acceptDate", () => {
  describe ( "futureOk", () => {
    it ( "should return empty errors if the date is in the future", () => {
      const accept = acceptDateForTest ( 'GB', okDateInfo, { type: 'future' } );
      expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
      expect ( accept ( new Date ( "2022/12/1" ) ) ).toEqual ( [] )
      expect ( accept ( new Date ( "2022/10/3" ) ) ).toEqual ( [ "is before first valid date" ] )
    } )
  } )
  describe ( "pastOk", () => {
    it ( "should return empty errors if the date is in the past", () => {
      const accept = acceptDateForTest ( 'GB', okDateInfo, { type: 'past' } );
      expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
      expect ( accept ( new Date ( "2022/12/1" ) ) ).toEqual ( [ 'is in the future' ] )
      expect ( accept ( new Date ( "2022/10/3" ) ) ).toEqual ( [] )
    } )
  } )
  describe ( "weekendsOK", () => {
    it ( "should return empty errors  no matter the date if 'allowsWeekends' is true", () => {
      const accept = acceptDateForTest ( 'GB', okDateInfo, { type: 'future', allowsWeekends: true } );
      expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
      expect ( accept ( new Date ( "2022/11/12" ) ) ).toEqual ( [] )
      expect ( accept ( new Date ( "2022/11/8" ) ) ).toEqual ( [] )
    } )
    it ( "should return  errors  if a weekend if 'allowsWeekends' is false ", () => {
      const accept = acceptDateForTest ( 'GB', okDateInfo, { type: 'future', allowsWeekends: false } );
      expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
      expect ( accept ( new Date ( "2022/11/12" ) ) ).toEqual ( [ "is a weekend" ] )
      expect ( accept ( new Date ( "2022/11/8" ) ) ).toEqual ( [] )
    } )
    it ( "should default to allowsWeekends true", () => {
      const accept = acceptDateForTest ( 'GB', okDateInfo, { type: 'future', allowsWeekends: undefined } );
      expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
      expect ( accept ( new Date ( "2022/11/12" ) ) ).toEqual ( [] )
      expect ( accept ( new Date ( "2022/11/8" ) ) ).toEqual ( [] )
    } )
  } )
} )

describe ( 'firstAllowedDate', () => {
  function firstAllowed ( dateRange: DateRange<any, any> ) {
    const udi = validateDateInfo ( okDateInfo, 'GB', dateRange )
    if ( Array.isArray ( udi ) ) throw Error ( 'okDateInfo is actually not ok' )
    return firstAllowedDate ( udi.today, udi.holidays, dateRange )
  }
  it ( "should ignore weekends and holidays when those are ignored", () => {
    expect ( firstAllowed ( { type: 'future' } )?.toString () ).toEqual ( toDate ( '7/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', minWorkingDaysBefore: 1 } )?.toString () ).toEqual ( toDate ( '8/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', minWorkingDaysBefore: 2 } )?.toString () ).toEqual ( toDate ( '9/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', minWorkingDaysBefore: 10 } )?.toString () ).toEqual ( toDate ( '17/11/2022' ).toString () )
  } )
  it ( "should take account of  weekends  when those are not allowed", () => {
    expect ( firstAllowed ( { type: 'future', allowsWeekends: false } )?.toString () ).toEqual ( toDate ( '7/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowsWeekends: false, minWorkingDaysBefore: 1 } )?.toString () ).toEqual ( toDate ( '8/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowsWeekends: false, minWorkingDaysBefore: 2 } )?.toString () ).toEqual ( toDate ( '9/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowsWeekends: false, minWorkingDaysBefore: 3 } )?.toString () ).toEqual ( toDate ( '10/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowsWeekends: false, minWorkingDaysBefore: 4 } )?.toString () ).toEqual ( toDate ( '11/11/2022' ).toString () )
    //weekend
    expect ( firstAllowed ( { type: 'future', allowsWeekends: false, minWorkingDaysBefore: 5 } )?.toString () ).toEqual ( toDate ( '14/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowsWeekends: false, minWorkingDaysBefore: 6 } )?.toString () ).toEqual ( toDate ( '15/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowsWeekends: false, minWorkingDaysBefore: 7 } )?.toString () ).toEqual ( toDate ( '16/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowsWeekends: false, minWorkingDaysBefore: 8 } )?.toString () ).toEqual ( toDate ( '17/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowsWeekends: false, minWorkingDaysBefore: 9 } )?.toString () ).toEqual ( toDate ( '18/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowsWeekends: false, minWorkingDaysBefore: 10 } )?.toString () ).toEqual ( toDate ( '21/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowsWeekends: false, minWorkingDaysBefore: 20 } )?.toString () ).toEqual ( toDate ( '5/12/2022' ).toString () )
  } )
  it ( "should take account of  holidays  when those are not allowed", () => {
    expect ( firstAllowed ( { type: 'future', allowHolidays: false } )?.toString () ).toEqual ( toDate ( '7/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, minWorkingDaysBefore: 1 } )?.toString () ).toEqual ( toDate ( '8/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, minWorkingDaysBefore: 2 } )?.toString () ).toEqual ( toDate ( '9/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, minWorkingDaysBefore: 3 } )?.toString () ).toEqual ( toDate ( '10/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, minWorkingDaysBefore: 4 } )?.toString () ).toEqual ( toDate ( '11/11/2022' ).toString () )
    //holiday
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, minWorkingDaysBefore: 5 } )?.toString () ).toEqual ( toDate ( '13/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, minWorkingDaysBefore: 6 } )?.toString () ).toEqual ( toDate ( '14/11/2022' ).toString () )
    //holiday
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, minWorkingDaysBefore: 7 } )?.toString () ).toEqual ( toDate ( '16/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, minWorkingDaysBefore: 8 } )?.toString () ).toEqual ( toDate ( '17/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, minWorkingDaysBefore: 9 } )?.toString () ).toEqual ( toDate ( '18/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, minWorkingDaysBefore: 10 } )?.toString () ).toEqual ( toDate ( '19/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, minWorkingDaysBefore: 20 } )?.toString () ).toEqual ( toDate ( '29/11/2022' ).toString () )
  } )
  it ( "should take account of  weekends holidays  when those are not allowed", () => {
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowsWeekends: false } )?.toString () ).toEqual ( toDate ( '7/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowsWeekends: false, minWorkingDaysBefore: 1 } )?.toString () ).toEqual ( toDate ( '8/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowsWeekends: false, minWorkingDaysBefore: 2 } )?.toString () ).toEqual ( toDate ( '9/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowsWeekends: false, minWorkingDaysBefore: 3 } )?.toString () ).toEqual ( toDate ( '10/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowsWeekends: false, minWorkingDaysBefore: 4 } )?.toString () ).toEqual ( toDate ( '11/11/2022' ).toString () )
    //holiday & weekend
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowsWeekends: false, minWorkingDaysBefore: 5 } )?.toString () ).toEqual ( toDate ( '14/11/2022' ).toString () )
    //holiday
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowsWeekends: false, minWorkingDaysBefore: 6 } )?.toString () ).toEqual ( toDate ( '16/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowsWeekends: false, minWorkingDaysBefore: 7 } )?.toString () ).toEqual ( toDate ( '17/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowsWeekends: false, minWorkingDaysBefore: 8 } )?.toString () ).toEqual ( toDate ( '18/11/2022' ).toString () )
    //weekend
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowsWeekends: false, minWorkingDaysBefore: 9 } )?.toString () ).toEqual ( toDate ( '21/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowsWeekends: false, minWorkingDaysBefore: 10 } )?.toString () ).toEqual ( toDate ( '22/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowsWeekends: false, minWorkingDaysBefore: 20 } )?.toString () ).toEqual ( toDate ( '6/12/2022' ).toString () )
  } )
} )

describe ( "holidaysOk", () => {
  //     { date: '12/11/2022', jurisdiction: 'GB' },
  //     { date: '12/11/2022', jurisdiction: 'I' },
  //     { date: '15/11/2022', jurisdiction: 'GB' },
  //     { date: '17/11/2022', jurisdiction: 'I' },
  it ( "should return empty errors no matter the date if 'allowHolidays'is true", () => {
    const accept = acceptDateForTest ( 'GB', okDateInfo, { type: 'future', allowHolidays: true } );
    expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
    expect ( accept ( new Date ( "2022/11/12" ) ) ).toEqual ( [] )
    expect ( accept ( new Date ( "2022/11/15" ) ) ).toEqual ( [] )
    expect ( accept ( new Date ( "2022/11/17" ) ) ).toEqual ( [] )
  } )
  it ( "should return empty errors no matter the date if 'allowHolidays'is undefined", () => {
    const accept = acceptDateForTest ( 'GB', okDateInfo, { type: 'future', allowHolidays: undefined } );
    expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
    expect ( accept ( new Date ( "2022/11/12" ) ) ).toEqual ( [] )
    expect ( accept ( new Date ( "2022/11/15" ) ) ).toEqual ( [] )
    expect ( accept ( new Date ( "2022/11/17" ) ) ).toEqual ( [] )
  } )
  it ( "should return an error if 'allowHolidays'is false, and the date is a holiday in the jurisdiction", () => {
    const accept = acceptDateForTest ( 'GB', okDateInfo, { type: 'future', allowHolidays: false } );
    expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
    expect ( accept ( new Date ( "2022/11/12" ) ) ).toEqual ( [ "is a holiday" ] )
    expect ( accept ( new Date ( "2022/11/15" ) ) ).toEqual ( [ "is a holiday" ] )
    expect ( accept ( new Date ( "2022/11/17" ) ) ).toEqual ( [] )
  } )
  it ( "should return an error if 'allowHolidays'is false, and the date is a holiday in any jurisdiction when the jurisdiction is undefined", () => {
    const accept = acceptDateForTest ( undefined, okDateInfo, { type: 'future', allowHolidays: false } );
    expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
    expect ( accept ( new Date ( "2022/11/12" ) ) ).toEqual ( [ "is a holiday" ] )
    expect ( accept ( new Date ( "2022/11/15" ) ) ).toEqual ( [ "is a holiday" ] )
    expect ( accept ( new Date ( "2022/11/17" ) ) ).toEqual ( [ "is a holiday" ] )
  } )
} )

type Context = PageSelectionContext<StateForDatePicker>
const context: Context = {
  combine: MyCombined,
  pageSelectionL: pageSelectionlens<StateForDatePicker> (),
  pages: {}
}
interface StateForDatePicker extends HasTagHolder, HasSimpleMessages, HasPageSelection {
  dateInfo?: DateInfo;
  theDate?: string;
  jurisdiction?: string;
  date?: string
}
const emptyState: StateForDatePicker = {
  messages: [], pageSelection: [], tags: {}

}
describe ( "DatePicker", () => {
  interface SomeProps {
    required?: boolean,
    readonly?: boolean
  }
  const datePicker = ( state: StateForDatePicker, props: SomeProps, dateRange: DateRange<StateForDatePicker, Context>, remember: ( s: StateForDatePicker ) => void ) =>
    DatePicker ( { ...props, id: 'someId', label: 'someLabel', state: lensState ( state, remember, '', context ).focusOn ( 'theDate' ), dateFormat: 'dd/MM/yyyy', dateRange: {}, allButtons: {} } );

  it ( "should display the undefined date, required is false, readonly undefined", () => {
    const picker = mount ( datePicker ( { ...emptyState, date: undefined }, { required: false }, {}, () => {} ) )
    expect ( picker.html ().replace ( /"/g, "'" ) ).toEqual (
      "<div class='labelAndDate '><label class='input-label'>someLabel</label>" +
      "<div class=''>" + // this will be an input and buttons if we have buttons
      "<div class='react-datepicker-wrapper'>" +
      "<div class='react-datepicker__input-container'>" +
      "<input type='text' id='someId' placeholder='Select a date' class='' value=''></div></div></div></div>" )
    const input = picker.find ( "input" )
    input.simulate ( 'click' )
    expect ( picker.html ().replace ( /"/g, "'" ) ).toEqual (
      '<div class=\'labelAndDate \'><label class=\'input-label\'>someLabel</label>' +
      '<div class=\'\'><div class=\'react-datepicker-wrapper\'>' +
      '<div class=\'react-datepicker__input-container\'>' +
      '<input type=\'text\' id=\'someId\' placeholder=\'Select a date\' class=\'react-datepicker-ignore-onclickoutside\' value=\'\'></div></div>' +
      '<div class=\'react-datepicker__tab-loop\'>' +
      '<div class=\'react-datepicker__tab-loop__start\' tabindex=\'0\'></div>' +
      '<div style=\'position: absolute; left: 0px; top: 0px;\' class=\'react-datepicker-popper\' data-placement=\'bottom-start\'><div>' +
      '<div class=\'react-datepicker\'><div class=\'react-datepicker__triangle\' style=\'position: absolute;\'></div>' +
      '<button type=\'button\' class=\'react-datepicker__navigation react-datepicker__navigation--previous\' aria-label=\'Previous Month\'>' +
      '<span class=\'react-datepicker__navigation-icon react-datepicker__navigation-icon--previous\'>Previous Month</span></button>' +
      '<button type=\'button\' class=\'react-datepicker__navigation react-datepicker__navigation--next react-datepicker__navigation--next--with-today-button\' aria-label=\'Next Month\'>' +
      '<span class=\'react-datepicker__navigation-icon react-datepicker__navigation-icon--next\'>Next Month</span></button>' +
      '<div class=\'react-datepicker__month-container\'><div class=\'react-datepicker__header \'>' +
      '<div class=\'react-datepicker__current-month\'>July 2022</div>' +
      '<div class=\'react-datepicker__header__dropdown react-datepicker__header__dropdown--scroll\'></div><div class=\'react-datepicker__day-names\'><div class=\'react-datepicker__day-name\'>Su</div><div class=\'react-datepicker__day-name\'>Mo</div><div class=\'react-datepicker__day-name\'>Tu</div><div class=\'react-datepicker__day-name\'>We</div><div class=\'react-datepicker__day-name\'>Th</div><div class=\'react-datepicker__day-name\'>Fr</div><div class=\'react-datepicker__day-name\'>Sa</div></div></div><div class=\'react-datepicker__month\' aria-label=\'month  2022-07\' role=\'listbox\'><div class=\'react-datepicker__week\'><div class=\'react-datepicker__day react-datepicker__day--026 react-datepicker__day--weekend react-datepicker__day--outside-month\' tabindex=\'-1\' aria-label=\'Choose Sunday, June 26th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>26</div><div class=\'react-datepicker__day react-datepicker__day--027 react-datepicker__day--outside-month\' tabindex=\'-1\' aria-label=\'Choose Monday, June 27th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>27</div><div class=\'react-datepicker__day react-datepicker__day--028 react-datepicker__day--outside-month\' tabindex=\'-1\' aria-label=\'Choose Tuesday, June 28th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>28</div><div class=\'react-datepicker__day react-datepicker__day--029 react-datepicker__day--outside-month\' tabindex=\'-1\' aria-label=\'Choose Wednesday, June 29th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>29</div><div class=\'react-datepicker__day react-datepicker__day--030 react-datepicker__day--outside-month\' tabindex=\'-1\' aria-label=\'Choose Thursday, June 30th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>30</div><div class=\'react-datepicker__day react-datepicker__day--001\' tabindex=\'-1\' aria-label=\'Choose Friday, July 1st, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>1</div><div class=\'react-datepicker__day react-datepicker__day--002 react-datepicker__day--weekend\' tabindex=\'-1\' aria-label=\'Choose Saturday, July 2nd, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>2</div></div><div class=\'react-datepicker__week\'><div class=\'react-datepicker__day react-datepicker__day--003 react-datepicker__day--weekend\' tabindex=\'-1\' aria-label=\'Choose Sunday, July 3rd, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>3</div><div class=\'react-datepicker__day react-datepicker__day--004\' tabindex=\'-1\' aria-label=\'Choose Monday, July 4th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>4</div><div class=\'react-datepicker__day react-datepicker__day--005\' tabindex=\'-1\' aria-label=\'Choose Tuesday, July 5th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>5</div><div class=\'react-datepicker__day react-datepicker__day--006\' tabindex=\'-1\' aria-label=\'Choose Wednesday, July 6th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>6</div><div class=\'react-datepicker__day react-datepicker__day--007\' tabindex=\'-1\' aria-label=\'Choose Thursday, July 7th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>7</div><div class=\'react-datepicker__day react-datepicker__day--008\' tabindex=\'-1\' aria-label=\'Choose Friday, July 8th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>8</div><div class=\'react-datepicker__day react-datepicker__day--009 react-datepicker__day--weekend\' tabindex=\'-1\' aria-label=\'Choose Saturday, July 9th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>9</div></div><div class=\'react-datepicker__week\'><div class=\'react-datepicker__day react-datepicker__day--010 react-datepicker__day--weekend\' tabindex=\'-1\' aria-label=\'Choose Sunday, July 10th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>10</div><div class=\'react-datepicker__day react-datepicker__day--011\' tabindex=\'-1\' aria-label=\'Choose Monday, July 11th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>11</div><div class=\'react-datepicker__day react-datepicker__day--012\' tabindex=\'-1\' aria-label=\'Choose Tuesday, July 12th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>12</div><div class=\'react-datepicker__day react-datepicker__day--013\' tabindex=\'-1\' aria-label=\'Choose Wednesday, July 13th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>13</div><div class=\'react-datepicker__day react-datepicker__day--014\' tabindex=\'-1\' aria-label=\'Choose Thursday, July 14th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>14</div><div class=\'react-datepicker__day react-datepicker__day--015\' tabindex=\'-1\' aria-label=\'Choose Friday, July 15th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>15</div><div class=\'react-datepicker__day react-datepicker__day--016 react-datepicker__day--keyboard-selected react-datepicker__day--today react-datepicker__day--weekend\' tabindex=\'0\' aria-label=\'Choose Saturday, July 16th, 2022\' role=\'option\' aria-disabled=\'false\' aria-current=\'date\' aria-selected=\'false\'>16</div></div><div class=\'react-datepicker__week\'><div class=\'react-datepicker__day react-datepicker__day--017 react-datepicker__day--weekend\' tabindex=\'-1\' aria-label=\'Choose Sunday, July 17th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>17</div><div class=\'react-datepicker__day react-datepicker__day--018\' tabindex=\'-1\' aria-label=\'Choose Monday, July 18th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>18</div><div class=\'react-datepicker__day react-datepicker__day--019\' tabindex=\'-1\' aria-label=\'Choose Tuesday, July 19th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>19</div><div class=\'react-datepicker__day react-datepicker__day--020\' tabindex=\'-1\' aria-label=\'Choose Wednesday, July 20th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>20</div><div class=\'react-datepicker__day react-datepicker__day--021\' tabindex=\'-1\' aria-label=\'Choose Thursday, July 21st, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>21</div><div class=\'react-datepicker__day react-datepicker__day--022\' tabindex=\'-1\' aria-label=\'Choose Friday, July 22nd, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>22</div><div class=\'react-datepicker__day react-datepicker__day--023 react-datepicker__day--weekend\' tabindex=\'-1\' aria-label=\'Choose Saturday, July 23rd, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>23</div></div><div class=\'react-datepicker__week\'><div class=\'react-datepicker__day react-datepicker__day--024 react-datepicker__day--weekend\' tabindex=\'-1\' aria-label=\'Choose Sunday, July 24th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>24</div><div class=\'react-datepicker__day react-datepicker__day--025\' tabindex=\'-1\' aria-label=\'Choose Monday, July 25th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>25</div><div class=\'react-datepicker__day react-datepicker__day--026\' tabindex=\'-1\' aria-label=\'Choose Tuesday, July 26th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>26</div><div class=\'react-datepicker__day react-datepicker__day--027\' tabindex=\'-1\' aria-label=\'Choose Wednesday, July 27th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>27</div><div class=\'react-datepicker__day react-datepicker__day--028\' tabindex=\'-1\' aria-label=\'Choose Thursday, July 28th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>28</div><div class=\'react-datepicker__day react-datepicker__day--029\' tabindex=\'-1\' aria-label=\'Choose Friday, July 29th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>29</div><div class=\'react-datepicker__day react-datepicker__day--030 react-datepicker__day--weekend\' tabindex=\'-1\' aria-label=\'Choose Saturday, July 30th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>30</div></div><div class=\'react-datepicker__week\'><div class=\'react-datepicker__day react-datepicker__day--031 react-datepicker__day--weekend\' tabindex=\'-1\' aria-label=\'Choose Sunday, July 31st, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>31</div><div class=\'react-datepicker__day react-datepicker__day--001 react-datepicker__day--outside-month\' tabindex=\'-1\' aria-label=\'Choose Monday, August 1st, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>1</div><div class=\'react-datepicker__day react-datepicker__day--002 react-datepicker__day--outside-month\' tabindex=\'-1\' aria-label=\'Choose Tuesday, August 2nd, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>2</div><div class=\'react-datepicker__day react-datepicker__day--003 react-datepicker__day--outside-month\' tabindex=\'-1\' aria-label=\'Choose Wednesday, August 3rd, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>3</div><div class=\'react-datepicker__day react-datepicker__day--004 react-datepicker__day--outside-month\' tabindex=\'-1\' aria-label=\'Choose Thursday, August 4th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>4</div><div class=\'react-datepicker__day react-datepicker__day--005 react-datepicker__day--outside-month\' tabindex=\'-1\' aria-label=\'Choose Friday, August 5th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>5</div><div class=\'react-datepicker__day react-datepicker__day--006 react-datepicker__day--weekend react-datepicker__day--outside-month\' tabindex=\'-1\' aria-label=\'Choose Saturday, August 6th, 2022\' role=\'option\' aria-disabled=\'false\' aria-selected=\'false\'>6</div></div></div></div>' +
      '<div class=\'react-datepicker__today-button\'>Select Today</div></div></div></div><div class=\'react-datepicker__tab-loop__end\' tabindex=\'0\'></div></div></div></div>' )
  } )
  it ( "should display the undefined date, required is true, readonly undefined - looking for marker that says 'I am needed'", () => {
    const picker = mount ( datePicker ( { ...emptyState, date: undefined }, { required: false }, {}, () => {} ) )
    expect ( picker.html ().replace ( /"/g, "'" ) ).toEqual (
      "<div class='labelAndDate '><label class='input-label'>someLabel</label>" +
      "<div class=''>" + // this will be an input and buttons if we have buttons
      "<div class='react-datepicker-wrapper'>" +
      "<div class='react-datepicker__input-container'>" +
      "<input type='text' id='someId' placeholder='Select a date' class='' value=''></div></div></div></div>" )
  })

} )