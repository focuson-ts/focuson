import { LensState, reasonFor, SetJsonReasonEvent } from "@focuson/state";
import { PageSelectionContext } from "@focuson/pages";
import { DatePickerProps, RawDatePicker } from "./datePicker";
import { Transform } from "@focuson/lens";


export interface MonthYearDatePickerWithLengthProps<S, C> extends DatePickerProps<S, C> {
  pathToOtherDate: LensState<S, string, C>
  lengthPath: LensState<S, number, C>
  subtract: boolean
}


function addDate ( debug: boolean, thisDate: string | undefined, length: number | undefined, subtract: boolean ) {
  if ( !thisDate || !thisDate.match ( /^(1[0-2]|0[1-9]|\d)-(20\d{2}|19\d{2}|0(?!0)\d|[1-9]\d)$/ ) )
    return thisDate
  const [ month, year ] = thisDate.split ( /-/ )
  const offset = length ? length : 0
  const withSign = subtract ? -offset : offset
  const date = new Date ( Number.parseInt ( year ), Number.parseInt ( month ) - 1 )
  if ( debug ) console.log ( 'addDate', 'month', month, 'year', year, 'date initial', date )
  date.setMonth ( date.getMonth () + withSign )
  if ( debug ) console.log ( 'addDate', 'month', month, 'year', year, 'offset', offset, 'withSign', withSign, 'result', date )
  return (date.getMonth () + 1) + "/" + date.getFullYear ()
}
export function MonthYearDatePickerWithLength<S, C extends PageSelectionContext<S>> ( props: MonthYearDatePickerWithLengthProps<S, C> ) {
  const { pathToOtherDate, lengthPath, subtract, state, dateFormat, id, showMonthYearPicker } = props
  if ( dateFormat !== 'MM-yyyy' ) throw new Error ( `The date picker with id ${id} has a dateformat '${dateFormat}'. It must be MM-yyyy` )
  if ( !showMonthYearPicker ) throw new Error ( `The date picker with id ${id} doesn't have 'showMonthYearPicker' set to true` )

  function onCheck<S, C extends PageSelectionContext<S>> ( id: string, debug: boolean, state: LensState<S, any, any> ) {
    return ( eventName: SetJsonReasonEvent, date: string ) => {
      const length = lengthPath.optJsonOr ( 0 )
      if ( debug ) console.log ( 'MonthYearDatePickerWithLength', id, date, 'length', length, )
      const otherDate = addDate ( debug, date, length, subtract )
      if ( debug ) console.log ( 'MonthYearDatePickerWithLength', id, date, 'length', length, 'otherDate', otherDate )
      const txs: Transform<any, any>[] = [//There are two S's here. So by anying the first we dodge that compilation problem
        [ state.optional, () => date ],
        [ pathToOtherDate.optional, () => otherDate ] ]
      state.massTransform ( reasonFor ( 'DatePicker', eventName, id ) ) ( ...txs )
    };
  }
  return RawDatePicker<S,C> ( onCheck ) ( props );
}