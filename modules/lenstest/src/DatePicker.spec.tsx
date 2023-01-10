import { acceptDateForTest, DateErrorMessage, DateInfo, DatePicker, DateRange, defaultDateErrorMessage, errorsAnd, firstAllowedDate, MyCombined, parseDate, validateDateInfo } from "@focuson-nw/form_components";
import { lensState } from "@focuson-nw/state";
import { mount } from "enzyme";
import { HasPageSelection, HasPathToLens, ModalContext, pageSelectionlens } from "@focuson-nw/pages";
import { HasTagHolder } from "@focuson-nw/template";
import { HasSimpleMessages } from "@focuson-nw/utils";
import { enzymeSetup } from "./enzymeAdapterSetup";
import { HasEnvironment } from "@focuson-nw/focuson";
import { Lenses, Optional } from "@focuson-nw/lens";

enzymeSetup ()
const dateFormat = 'dd/MM/yyyy'

const otherDateErrorMessage: DateErrorMessage = {
  isInPast: 'pastMsg',
  isWeekend: 'weekendMsg',
  isHoliday: 'holidayMsg',
  beforeFirstValid: 'beforeFirstMsg'
}
const okDateInfo: DateInfo = {
  dateFormat,
  holidays: [
    { date: '12/11/2022', jurisdiction: 'GB' },
    { date: '12/11/2022', jurisdiction: 'I' },
    { date: '15/11/2022', jurisdiction: 'GB' },
    { date: '17/11/2022', jurisdiction: 'I' },
  ],
  "serverNow": "2022-07-01T05:25:32.077Z",
  today: '7/11/2022',
}
const badDateInfo: DateInfo = {
  dateFormat,
  holidays: [
    { date: 'bad1', jurisdiction: 'GB' },
    { date: 'bad2', jurisdiction: 'I' },
  ],
  "serverNow": "2022-07-01T05:25:32.077Z",
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
    expect ( parseDate ( 'somePrefix', 'yyyy/MM/dd' ) ( 'someJunk' ) ).toEqual ( [ 'somePrefixPlease use date format yyyy/mm/dd' ] )
    expect ( parseDate ( 'somePrefix', 'dd/MM/yyyy' ) ( 'someJunk' ) ).toEqual ( [ 'somePrefixPlease use date format dd/mm/yyyy' ] )
  } )
} )

describe ( "validateDateInfo", () => {
  it ( "should turn strings into dates", () => {
    const [ errors, [ dateInfo ] ] = errorsAnd ( [ validateDateInfo ( okDateInfo, undefined, {}, undefined, defaultDateErrorMessage ) ] )
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
      const [ errors, [ dateInfo ] ] = errorsAnd ( [ validateDateInfo ( { ...okDateInfo, today: 'junk' }, undefined, {}, undefined, defaultDateErrorMessage ) ] )
      expect ( errors ).toEqual ( [ "Please use date format dd/mm/yyyy" ] )
    } )
    it ( "should report issues with holidayDates", () => {
      const [ errors, [ dateInfo ] ] = errorsAnd ( [ validateDateInfo ( badDateInfo, undefined, {}, undefined, defaultDateErrorMessage ) ] )
      expect ( errors ).toEqual ( [
        "holidays[0]: Please use date format dd/mm/yyyy",
        "holidays[1]: Please use date format dd/mm/yyyy"
      ] )
    } )
  } )
} )

const state = {

  firstDate: '9/11/2022'
}
type State = typeof state
const contextForState: HasPathToLens<State> = {
  pathToLens: ( s, currentLens ) => ( path ) => Lenses.identity<State> ().focusQuery ( 'firstDate' )
}
const lenstate = lensState ( state, s => {}, '', contextForState )
describe ( "acceptDate", () => {
  describe ( "futureOk", () => {
    it ( "should return empty errors if the date is in the future", () => {
      const accept = acceptDateForTest ( lenstate, 'GB', okDateInfo, { type: 'future' }, dateFormat, defaultDateErrorMessage );
      expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
      expect ( accept ( new Date ( "2022/12/1" ) ) ).toEqual ( [] )
      expect ( accept ( new Date ( "2022/10/3" ) ) ).toEqual ( [ "before first valid date" ] )
    } )
    it ( "should return empty errors if the date is in the future, custom message", () => {
      const accept = acceptDateForTest ( lenstate, 'GB', okDateInfo, { type: 'future' }, dateFormat, otherDateErrorMessage );
      expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
      expect ( accept ( new Date ( "2022/12/1" ) ) ).toEqual ( [] )
      expect ( accept ( new Date ( "2022/10/3" ) ) ).toEqual ( [ "beforeFirstMsg" ] )
    } )
  } )
  describe ( "pastOk", () => {
    it ( "should return empty errors if the date is in the past", () => {
      const accept = acceptDateForTest ( lenstate, 'GB', okDateInfo, { type: 'past' }, dateFormat, defaultDateErrorMessage );
      expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
      expect ( accept ( new Date ( "2022/12/1" ) ) ).toEqual ( [ 'is in the future' ] )
      expect ( accept ( new Date ( "2022/10/3" ) ) ).toEqual ( [] )
      // @ts-ignore
      expect ( accept ( undefined ) ).toEqual ( [] )
      // @ts-ignore
      expect ( accept ( null ) ).toEqual ( [] )
    } )
    it ( "should return empty errors if the date is in the past, custom message", () => {
      const accept = acceptDateForTest ( lenstate, 'GB', okDateInfo, { type: 'past' }, dateFormat, otherDateErrorMessage );
      expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
      expect ( accept ( new Date ( "2022/12/1" ) ) ).toEqual ( [ 'pastMsg' ] )
      expect ( accept ( new Date ( "2022/10/3" ) ) ).toEqual ( [] )
      // @ts-ignore
      expect ( accept ( undefined ) ).toEqual ( [] )
      // @ts-ignore
      expect ( accept ( null ) ).toEqual ( [] )
    } )
  } )
  describe ( "weekendsOK", () => {
    it ( "should return empty errors  no matter the date if 'allowWeekends' is true", () => {
      const accept = acceptDateForTest ( lenstate, 'GB', okDateInfo, { type: 'future', allowWeekends: true }, dateFormat, defaultDateErrorMessage );
      expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
      expect ( accept ( new Date ( "2022/11/12" ) ) ).toEqual ( [] )
      expect ( accept ( new Date ( "2022/11/8" ) ) ).toEqual ( [] )
    } )
    it ( "should return  errors  if a weekend if 'allowWeekends' is false ", () => {
      const accept = acceptDateForTest ( lenstate, 'GB', okDateInfo, { type: 'future', allowWeekends: false }, dateFormat, defaultDateErrorMessage );
      expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
      expect ( accept ( new Date ( "2022/11/12" ) ) ).toEqual ( [ "is a weekend" ] )
      expect ( accept ( new Date ( "2022/11/8" ) ) ).toEqual ( [] )
    } )
    it ( "should return  errors  if a weekend if 'allowWeekends' is false, custom message", () => {
      const accept = acceptDateForTest ( lenstate, 'GB', okDateInfo, { type: 'future', allowWeekends: false }, dateFormat, otherDateErrorMessage );
      expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
      expect ( accept ( new Date ( "2022/11/12" ) ) ).toEqual ( [ "weekendMsg" ] )
      expect ( accept ( new Date ( "2022/11/8" ) ) ).toEqual ( [] )
    } )
    it ( "should default to allowWeekends true", () => {
      const accept = acceptDateForTest ( lenstate, 'GB', okDateInfo, { type: 'future', allowWeekends: undefined }, dateFormat, defaultDateErrorMessage );
      expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
      expect ( accept ( new Date ( "2022/11/12" ) ) ).toEqual ( [] )
      expect ( accept ( new Date ( "2022/11/8" ) ) ).toEqual ( [] )
    } )
    it ( "should default to allowWeekends true, custom message", () => {
      const accept = acceptDateForTest ( lenstate, 'GB', okDateInfo, { type: 'future', allowWeekends: undefined }, dateFormat, otherDateErrorMessage );
      expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
      expect ( accept ( new Date ( "2022/11/12" ) ) ).toEqual ( [] )
      expect ( accept ( new Date ( "2022/11/8" ) ) ).toEqual ( [] )
    } )
    it ( "should handle non dates", () => {
      const accept = acceptDateForTest ( lenstate, 'GB', okDateInfo, { type: 'future', allowWeekends: undefined }, dateFormat, defaultDateErrorMessage );
      expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
      // @ts-ignore
      expect ( accept ( undefined ) ).toEqual ( [] )
      // @ts-ignore
      expect ( accept ( null ) ).toEqual ( [] )

    } )
  } )
} )

describe ( 'firstAllowedDate', () => {
  function firstAllowed ( dateRange: DateRange<any, any>, firstDefined?: Date ) {
    const udi = validateDateInfo ( okDateInfo, 'GB', dateRange, firstDefined, defaultDateErrorMessage )
    if ( Array.isArray ( udi ) ) throw Error ( 'okDateInfo is actually not ok' )
    return firstAllowedDate ( udi.today, udi.holidays, dateRange, firstDefined, defaultDateErrorMessage )
  }
  it ( "should use the first defined date is specified", () => {
    expect ( firstAllowed ( { type: 'future' },new Date( Date.parse('9 Nov 2022')) )).toEqual ( toDate ( '9/11/2022' ) )

  } )
  it ( "should ignore weekends and holidays when those are ignored", () => {
    expect ( firstAllowed ( { type: 'future' } )?.toString () ).toEqual ( toDate ( '7/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', minWorkingDaysBefore: 1 } )?.toString () ).toEqual ( toDate ( '8/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', minWorkingDaysBefore: 2 } )?.toString () ).toEqual ( toDate ( '9/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', minWorkingDaysBefore: 10 } )?.toString () ).toEqual ( toDate ( '17/11/2022' ).toString () )
  } )
  it ( "should take account of  weekends  when those are not allowed", () => {
    expect ( firstAllowed ( { type: 'future', allowWeekends: false } )?.toString () ).toEqual ( toDate ( '7/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowWeekends: false, minWorkingDaysBefore: 1 } )?.toString () ).toEqual ( toDate ( '8/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowWeekends: false, minWorkingDaysBefore: 2 } )?.toString () ).toEqual ( toDate ( '9/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowWeekends: false, minWorkingDaysBefore: 3 } )?.toString () ).toEqual ( toDate ( '10/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowWeekends: false, minWorkingDaysBefore: 4 } )?.toString () ).toEqual ( toDate ( '11/11/2022' ).toString () )
    //weekend
    expect ( firstAllowed ( { type: 'future', allowWeekends: false, minWorkingDaysBefore: 5 } )?.toString () ).toEqual ( toDate ( '14/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowWeekends: false, minWorkingDaysBefore: 6 } )?.toString () ).toEqual ( toDate ( '15/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowWeekends: false, minWorkingDaysBefore: 7 } )?.toString () ).toEqual ( toDate ( '16/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowWeekends: false, minWorkingDaysBefore: 8 } )?.toString () ).toEqual ( toDate ( '17/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowWeekends: false, minWorkingDaysBefore: 9 } )?.toString () ).toEqual ( toDate ( '18/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowWeekends: false, minWorkingDaysBefore: 10 } )?.toString () ).toEqual ( toDate ( '21/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowWeekends: false, minWorkingDaysBefore: 20 } )?.toString () ).toEqual ( toDate ( '5/12/2022' ).toString () )
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
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowWeekends: false } )?.toString () ).toEqual ( toDate ( '7/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowWeekends: false, minWorkingDaysBefore: 1 } )?.toString () ).toEqual ( toDate ( '8/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowWeekends: false, minWorkingDaysBefore: 2 } )?.toString () ).toEqual ( toDate ( '9/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowWeekends: false, minWorkingDaysBefore: 3 } )?.toString () ).toEqual ( toDate ( '10/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowWeekends: false, minWorkingDaysBefore: 4 } )?.toString () ).toEqual ( toDate ( '11/11/2022' ).toString () )
    //holiday & weekend
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowWeekends: false, minWorkingDaysBefore: 5 } )?.toString () ).toEqual ( toDate ( '14/11/2022' ).toString () )
    //holiday
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowWeekends: false, minWorkingDaysBefore: 6 } )?.toString () ).toEqual ( toDate ( '16/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowWeekends: false, minWorkingDaysBefore: 7 } )?.toString () ).toEqual ( toDate ( '17/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowWeekends: false, minWorkingDaysBefore: 8 } )?.toString () ).toEqual ( toDate ( '18/11/2022' ).toString () )
    //weekend
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowWeekends: false, minWorkingDaysBefore: 9 } )?.toString () ).toEqual ( toDate ( '21/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowWeekends: false, minWorkingDaysBefore: 10 } )?.toString () ).toEqual ( toDate ( '22/11/2022' ).toString () )
    expect ( firstAllowed ( { type: 'future', allowHolidays: false, allowWeekends: false, minWorkingDaysBefore: 20 } )?.toString () ).toEqual ( toDate ( '6/12/2022' ).toString () )
  } )
} )

describe ( "holidaysOk", () => {
  //     { date: '12/11/2022', jurisdiction: 'GB' },
  //     { date: '12/11/2022', jurisdiction: 'I' },
  //     { date: '15/11/2022', jurisdiction: 'GB' },
  //     { date: '17/11/2022', jurisdiction: 'I' },
  it ( "should accept a date after the first valid date", () => {
    const accept = acceptDateForTest ( lenstate, 'GB', okDateInfo, { type: 'future', firstSelectableDatePath: 'doesntmatter because lenstopath is hardcoded'}, dateFormat, defaultDateErrorMessage );
    expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( ["before first valid date"] )
    expect ( accept ( new Date ( "2022/11/12" ) ) ).toEqual ( [] )
    expect ( accept ( new Date ( "2022/11/15" ) ) ).toEqual ( [] )
    expect ( accept ( new Date ( "2022/11/17" ) ) ).toEqual ( [] )
  } )
  it ( "should return empty errors no matter the date if 'allowHolidays'is true", () => {
    const accept = acceptDateForTest ( lenstate, 'GB', okDateInfo, { type: 'future', allowHolidays: true }, dateFormat, defaultDateErrorMessage );
    expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
    expect ( accept ( new Date ( "2022/11/12" ) ) ).toEqual ( [] )
    expect ( accept ( new Date ( "2022/11/15" ) ) ).toEqual ( [] )
    expect ( accept ( new Date ( "2022/11/17" ) ) ).toEqual ( [] )
  } )
  it ( "should return empty errors no matter the date if 'allowHolidays'is undefined", () => {
    const accept = acceptDateForTest ( lenstate, 'GB', okDateInfo, { type: 'future', allowHolidays: undefined }, dateFormat, defaultDateErrorMessage );
    expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
    expect ( accept ( new Date ( "2022/11/12" ) ) ).toEqual ( [] )
    expect ( accept ( new Date ( "2022/11/15" ) ) ).toEqual ( [] )
    expect ( accept ( new Date ( "2022/11/17" ) ) ).toEqual ( [] )
  } )
  it ( "should return an error if 'allowHolidays'is false, and the date is a holiday in the jurisdiction", () => {
    const accept = acceptDateForTest ( lenstate, 'GB', okDateInfo, { type: 'future', allowHolidays: false }, dateFormat, defaultDateErrorMessage );
    expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
    expect ( accept ( new Date ( "2022/11/12" ) ) ).toEqual ( [ "is a holiday" ] )
    expect ( accept ( new Date ( "2022/11/15" ) ) ).toEqual ( [ "is a holiday" ] )
    expect ( accept ( new Date ( "2022/11/17" ) ) ).toEqual ( [] )
  } )
  it ( "should return an error if 'allowHolidays'is false, and the date is a holiday in the jurisdiction, custom error message", () => {
    const accept = acceptDateForTest ( lenstate, 'GB', okDateInfo, { type: 'future', allowHolidays: false }, dateFormat, otherDateErrorMessage );
    expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
    expect ( accept ( new Date ( "2022/11/12" ) ) ).toEqual ( [ "holidayMsg" ] )
    expect ( accept ( new Date ( "2022/11/15" ) ) ).toEqual ( [ "holidayMsg" ] )
    expect ( accept ( new Date ( "2022/11/17" ) ) ).toEqual ( [] )
  } )
  it ( "should return an error if 'allowHolidays'is false, and the date is a holiday in any jurisdiction when the jurisdiction is undefined", () => {
    const accept = acceptDateForTest ( lenstate, undefined, okDateInfo, { type: 'future', allowHolidays: false }, dateFormat, defaultDateErrorMessage );
    expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
    expect ( accept ( new Date ( "2022/11/12" ) ) ).toEqual ( [ "is a holiday" ] )
    expect ( accept ( new Date ( "2022/11/15" ) ) ).toEqual ( [ "is a holiday" ] )
    expect ( accept ( new Date ( "2022/11/17" ) ) ).toEqual ( [ "is a holiday" ] )
  } )
  it ( "should return an error if 'allowHolidays'is false, and the date is a holiday in any jurisdiction when the jurisdiction is undefined, custom msg", () => {
    const accept = acceptDateForTest ( lenstate, undefined, okDateInfo, { type: 'future', allowHolidays: false }, dateFormat, otherDateErrorMessage );
    expect ( accept ( new Date ( "2022/11/7" ) ) ).toEqual ( [] ) //today
    expect ( accept ( new Date ( "2022/11/12" ) ) ).toEqual ( [ "holidayMsg" ] )
    expect ( accept ( new Date ( "2022/11/15" ) ) ).toEqual ( [ "holidayMsg" ] )
    expect ( accept ( new Date ( "2022/11/17" ) ) ).toEqual ( [ "holidayMsg" ] )
  } )
} )

type Context = ModalContext<StateForDatePicker>
// @ts-ignore
const context: Context = {
  combine: MyCombined,
  pageSelectionL: pageSelectionlens<StateForDatePicker> (),
  pages: {}
}
interface StateForDatePicker extends HasTagHolder, HasSimpleMessages, HasPageSelection, HasEnvironment {
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
      "<div class='labelAndDate '><label class='input-label'>someLabel</label><div class=' '><div class='react-datepicker-wrapper'><div class='react-datepicker__input-container'><input type='text' id='someId' placeholder='Select a date' class='' value=''></div></div></div></div>" )
    const input = picker.find ( "input" )
    input.simulate ( 'click' )
    expect ( picker.html ().replace ( /"/g, "'" ) ).toContain ( "<div class='react-datepicker__tab-loop__start' tabindex='0'>" )
  } )
  it ( "should display the undefined date, required is true, readonly undefined - looking for marker that says 'I am needed'", () => {
    const picker = mount ( datePicker ( { ...emptyState, date: undefined }, { required: false }, {}, () => {} ) )
    expect ( picker.html ().replace ( /"/g, "'" ) ).toEqual (
      "<div class='labelAndDate '><label class='input-label'>someLabel</label><div class=' '><div class='react-datepicker-wrapper'><div class='react-datepicker__input-container'><input type='text' id='someId' placeholder='Select a date' class='' value=''></div></div></div></div>" )
  } )


} )