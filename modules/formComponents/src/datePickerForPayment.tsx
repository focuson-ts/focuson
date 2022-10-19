import { DatePickerProps, DatePickerSelectFn, defaultDatePickerWithExtraTxs, parseDate, RawDatePicker } from "./datePicker";
import { isBefore, isSameDay } from "@focuson/utils";
import { LensState } from "@focuson/state";
import { ModalContext } from "@focuson/pages";

interface DatePickerForPaymentProps<S, C> extends DatePickerProps<S, C> {
  pathToToday: LensState<S, string, C>
  hour: number;
  minute: number
}

function isDatePickerForPaymentProps<S, C> ( d: DatePickerProps<S, C> ): d is DatePickerForPaymentProps<S, C> {
  const a: any = d
  return a.pathToToday
}
const selectFnForPayments: DatePickerSelectFn = defaultDatePickerWithExtraTxs ( ( props, dateAsString ) => {
  if ( dateAsString && isDatePickerForPaymentProps ( props ) ) {
    const { pathToToday, state, hour, minute, dateFormat } = props
    const { dateFn } = state.context
    const today = pathToToday.optJson ()
    if ( today ) {
      const now = new Date ( dateFn () )
      const date = parseDate ( '', dateFormat ) ( dateAsString )
      if ( !Array.isArray ( date ) ) {
        const isSameDayOrBefore = isSameDay ( date, now ) || !isBefore ( now, hour, minute )
        if ( isSameDayOrBefore ) {
          console.log ( "it's the same day or before" )
        }
      }
    }
  }
  return []
} )

export function DatePickerForPayments<S, C extends ModalContext<S>> ( props: DatePickerForPaymentProps<S, C> ) {
  return RawDatePicker ( selectFnForPayments ) ( props )
}