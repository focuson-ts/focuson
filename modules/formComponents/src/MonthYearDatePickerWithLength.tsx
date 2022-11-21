import { LensState, reasonFor, SetJsonReasonEvent } from "@focuson/state";
import { ModalContext } from "@focuson/pages";
import { DatePickerProps, RawDatePicker } from "./datePicker";
import { displayTransformsInState, Transform } from "@focuson/lens";
import { FocusOnContext } from "@focuson/focuson";
import { LabelAndInputProps, LabelAndTInput, makeInputChangeTxs } from "./labelAndInput";
import { InputSelectFn, NumberTransformer, StringTransformer } from "./transformers";
import { addDate, numberOrUndefined, NumberValidations, setEndDate, setLength, setStartDate, StartEndDateAndLength, StringValidations } from "@focuson/utils";
import { InputChangeCommands } from "@focuson/rest";


export interface StartMonthYearDatePickerWithLengthProps<S, C> extends DatePickerProps<S, C> {
  endDatePath: LensState<S, string, C>
  lengthPath: LensState<S, string, C>
}

export function StartMonthYearDatePickerWithLength<S, C extends ModalContext<S>> ( props: StartMonthYearDatePickerWithLengthProps<S, C> ) {
  const { endDatePath, lengthPath, dateFormat, id, showMonthYearPicker } = props
  if ( dateFormat !== 'MM-yyyy' ) throw new Error ( `The date picker with id ${id} has a dateformat '${dateFormat}'. It must be MM-yyyy` )
  if ( !showMonthYearPicker ) throw new Error ( `The date picker with id ${id} doesn't have 'showMonthYearPicker' set to true` )

  function onCheck<S, C extends ModalContext<S>> ( debug: boolean, props: DatePickerProps<S, C> ) {
    return ( eventName: SetJsonReasonEvent, date: string | undefined ) => {
      const { id, state, regexForChange, parentState, onChange } = props
      const length = numberOrUndefined(lengthPath.optJson ())
      const endDate = endDatePath.optJson ()
      const s: StartEndDateAndLength = { length, endDate }
      const newS = setStartDate ( s, date, debug )
      const changeTxs = regexForChange === undefined || (date && date.match ( regexForChange ) !== null) ? makeInputChangeTxs ( id, parentState, onChange ) : []
      const txs: Transform<any, any>[] = [//There are two S's here. So by anying the first we dodge that compilation problem
        [ state.optional, () => date ],
        [ endDatePath.optional, () => newS.endDate ],
        [ lengthPath.optional, () => newS.length ],
        ...changeTxs ]
      if ( debug ) console.log ( 'StartMonthYearDatePickerWithLength', id, date, 'length', length, newS, newS, 'txs', displayTransformsInState ( state, txs ) )
      state.massTransform ( reasonFor ( 'DatePicker', eventName, id ) ) ( ...txs )
    };
  }
  return RawDatePicker<S, C> ( onCheck ) ( props );
}

export interface EndMonthYearDatePickerWithLengthProps<S, C> extends DatePickerProps<S, C> {
  startDatePath: LensState<S, string, C>
  lengthPath: LensState<S, string, C>
}

export function EndMonthYearDatePickerWithLength<S, C extends ModalContext<S>> ( props: EndMonthYearDatePickerWithLengthProps<S, C> ) {
  const { startDatePath, lengthPath, dateFormat, id, showMonthYearPicker } = props
  if ( dateFormat !== 'MM-yyyy' ) throw new Error ( `The date picker with id ${id} has a dateformat '${dateFormat}'. It must be MM-yyyy` )
  if ( !showMonthYearPicker ) throw new Error ( `The date picker with id ${id} doesn't have 'showMonthYearPicker' set to true` )

  function onCheck<S, C extends ModalContext<S>> ( debug: boolean, props: DatePickerProps<S, C> ) {
    return ( eventName: SetJsonReasonEvent, date: string | undefined ) => {
      const { id, state, regexForChange, parentState, onChange } = props
      const length = numberOrUndefined(lengthPath.optJson ())
      const startDate = startDatePath.optJson ()
      const s: StartEndDateAndLength = { length, startDate }
      const newS = setEndDate( s, date, debug )
      const changeTxs = regexForChange === undefined || (date && date.match ( regexForChange ) !== null) ? makeInputChangeTxs ( id, parentState, onChange ) : []
      const txs: Transform<any, any>[] = [//There are two S's here. So by anying the first we dodge that compilation problem
        [ state.optional, () => date ],
        [ startDatePath.optional, () => newS.startDate ],
        [ lengthPath.optional, () => newS.length ],
        ...changeTxs ]
      if ( debug ) console.log ( 'EndMonthYearDatePickerWithLength', id, date, 'length', length, newS, newS, 'txs', displayTransformsInState ( state, txs ) )
      state.massTransform ( reasonFor ( 'DatePicker', eventName, id ) ) ( ...txs )
    };
  }
  return RawDatePicker<S, C> ( onCheck ) ( props );
}

export interface LabelAndMonthYearLengthProps<S, Context extends FocusOnContext<S>> extends LabelAndInputProps<S, string, Context>, StringValidations {
  fromDate: LensState<S, string, Context>
  toDate: LensState<S, string, Context>
}

export const LabelAndMonthYearLength: <S, Context extends FocusOnContext<S>> ( props: LabelAndMonthYearLengthProps<S, Context> ) => JSX.Element =
               props => {
                 const selectFn: InputSelectFn = <S extends any, T extends any, Context extends FocusOnContext<S>> (
                   state: LensState<S, T, Context>, id: string, value: T, parentState: LensState<S, any, Context> | undefined, onChange: undefined | InputChangeCommands | InputChangeCommands[] ) => {
                   const main: any = state.main
                   const debug = main?.debug?.dateDebug
                   const { fromDate, toDate } = props
                   const length = numberOrUndefined(value)
                   const startS: StartEndDateAndLength = { startDate: fromDate.optJson (), endDate: toDate.optJson () }
                   const newS = setLength ( startS, length, debug )
                   const txs: Transform<any, any>[] = [ //need the any because I don't know how to make the S in Input SelectFn the same the S in LabelAndMonthYearLength
                     [ state.optional, () => value ],
                     [ fromDate.optional, () => newS.startDate ],
                     [ toDate.optional, () => newS.endDate ],
                     ...makeInputChangeTxs ( id, parentState, onChange ) ]
                   if ( debug ) console.log ( 'LabelAndMonthYearLength', id, 'from', fromDate.optJson (), 'value', value, 'newS', newS, 'tx', displayTransformsInState ( state, txs ) )
                   state.massTransform ( reasonFor ( 'Input', 'onChange', id ) ) ( ...txs );
                 }
                 const labelAndNumber = LabelAndTInput<string, StringValidations> ( { ...StringTransformer, selectFn } )
                 const propsForLabel: any = { ...props }
                 delete propsForLabel.subtract
                 delete propsForLabel.toDate
                 delete propsForLabel.fromDate
                 return labelAndNumber ( propsForLabel )
               }




