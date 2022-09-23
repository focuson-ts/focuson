import { LensState, reasonFor, SetJsonReasonEvent } from "@focuson/state";
import { PageSelectionContext } from "@focuson/pages";
import { DatePickerProps, RawDatePicker } from "./datePicker";
import { displayTransformsInState, Transform } from "@focuson/lens";
import { FocusOnContext } from "@focuson/focuson";
import { LabelAndInputProps, LabelAndTInput, makeInputChangeTxs } from "./labelAndInput";
import { InputSelectFn, NumberTransformer, StringTransformer } from "./transformers";
import { BooleanValidations, NumberValidations, StringValidations } from "@focuson/utils";
import { InputProps } from "./input";
import { InputChangeCommands } from "@focuson/rest";


export interface MonthYearDatePickerWithLengthProps<S, C> extends DatePickerProps<S, C> {
  pathToOtherDate: LensState<S, string, C>
  lengthPath: LensState<S, number, C>
  subtract: boolean
}


export function addDate ( debug: boolean, thisDate: string | undefined, length: number | undefined, subtract: boolean ) {
  // if ( !thisDate || !thisDate.match ( /^(1[0-2]|0[1-9]|\d)-(20\d{2}|19\d{2}|0(?!0)\d|[1-9]\d)$/ ) )
  //   return thisDate
  if ( thisDate === undefined ) return thisDate
  const parts = thisDate.split ( /[-|\/]/ )
  if ( parts.length !== 2 ) return thisDate
  const [ month, year ] = parts
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
    return ( eventName: SetJsonReasonEvent, date: string|undefined ) => {
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
  return RawDatePicker<S, C> ( onCheck ) ( props );
}

export interface LabelAndMonthYearLengthProps<S, Context extends FocusOnContext<S>> extends LabelAndInputProps<S, number, Context>, NumberValidations {
  fromDate: LensState<S, string, Context>
  toDate: LensState<S, string, Context>
  subtract: boolean
}

export const LabelAndMonthYearLength: <S, Context extends FocusOnContext<S>> ( props: LabelAndMonthYearLengthProps<S, Context> ) => JSX.Element =
               props => {
                 const selectFn: InputSelectFn = <S extends any, T extends any, Context extends FocusOnContext<S>> (
                   state: LensState<S, T, Context>, id: string, value: T, parentState: LensState<S, any, Context> | undefined, onChange: undefined | InputChangeCommands | InputChangeCommands[] ) => {
                   const main: any = state.main
                   const debug = main?.debug?.dateDebug
                   const { fromDate, toDate, subtract } = props
                   const from = fromDate.optJson ()
                   const actualValue = typeof value === 'number' ? value : 0
                   const toDateTransform: Transform<any, any> = [ toDate.optional, () => addDate ( false, from, actualValue, subtract ) ]
                   if ( debug ) console.log ( 'LabelAndMonthYearLength', id, 'from', from, 'value', value, 'actualValue', actualValue, 'tx', displayTransformsInState ( state, [ toDateTransform ] ) )
                   const txs: Transform<any, any>[] = [ //need the any because I don't know how to make the S in Input SelectFn the same the S in LabelAndMonthYearLength
                     [ state.optional, () => value ],
                     toDateTransform,
                     ...makeInputChangeTxs ( id, parentState, onChange ) ]
                   state.massTransform ( reasonFor ( 'Input', 'onChange', id ) ) ( ...txs );
                 }
                 const labelAndNumber = LabelAndTInput<number, NumberValidations> ( { ...NumberTransformer, selectFn } )
                 const propsForLabel: any = { ...props }
                 delete propsForLabel.subtract
                 delete propsForLabel.toDate
                 delete propsForLabel.fromDate
                 return labelAndNumber ( propsForLabel )
               }




