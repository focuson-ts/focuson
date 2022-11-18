import { DatePickerProps, DatePickerSelectFn, defaultDatePickerWithExtraTxs, parseDate, RawDatePicker } from "./datePicker";
import { after, isBefore, isSameDay } from "@focuson/utils";
import { LensState } from "@focuson/state";
import { ConfirmProps, ModalContext, openConfirmWindowTxs } from "@focuson/pages";

interface EventDetails extends ConfirmProps {
  time: string,
}
interface DateInfo{
  now: string;
  dates: {serverNow: string;}
}

interface DatePickerForPaymentProps<S, C> extends DatePickerProps<S, C> {
  pathToToday: LensState<S, string, C>
  warning: EventDetails,
  error: EventDetails,
}

function isDatePickerForPaymentProps<S, C> ( d: DatePickerProps<S, C> ): d is DatePickerForPaymentProps<S, C> {
  const a: any = d
  return a.pathToToday
}
const selectFnForPayments: DatePickerSelectFn = defaultDatePickerWithExtraTxs ( ( props, dateAsString ) => {
  if ( dateAsString && isDatePickerForPaymentProps ( props ) ) {
    const { pathToToday, state, warning, error, dateFormat } = props
    const { dateFn } = state.context
    const today = pathToToday.optJson ()
    if ( today ) {
      const now = new Date ( dateFn () )
      const dateOrErrors = parseDate ( '', dateFormat ) ( dateAsString )
      if ( !Array.isArray ( dateOrErrors ) && isSameDay ( dateOrErrors, now ) ) {
        console.log('Datapicker for payments', 'now', now)
        console.log('Datapicker for payments', 'after error',error.time, after(now, error.time))
        if ( after ( now, error.time ) )
          return openConfirmWindowTxs ( error, 'justclose', [], state, 'DatePickerForPayments', props.id, 'onChange' )
        console.log('Datapicker for payments', 'after error',warning.time, after(now, warning.time))
        if ( after ( now, warning.time ) )
          return openConfirmWindowTxs ( warning, 'justclose', [], state, 'DatePickerForPayments', props.id, 'onChange' )
      }
    }
  }
  return []
} )

export function DatePickerForPayments<S, C extends ModalContext<S>> ( props: DatePickerForPaymentProps<S, C> ) {
  return RawDatePicker ( selectFnForPayments ) ( props )
}

