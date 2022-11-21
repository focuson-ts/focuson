import { DatePickerProps, DatePickerSelectFn, defaultDatePickerWithExtraTxs, parseDate, RawDatePicker } from "./datePicker";
import { after, DateInfo, isBefore, isSameDay, isSameDayUsingServer, timeOnServerinGMT } from "@focuson/utils";
import { LensState } from "@focuson/state";
import { ConfirmProps, ModalContext, openConfirmWindowTxs } from "@focuson/pages";

interface EventDetails extends ConfirmProps {
  time: string,
}

interface DatePickerForPaymentProps<S, C> extends DatePickerProps<S, C> {
  pathToDateInfo: LensState<S, any, C>
  warning: EventDetails,
  error: EventDetails,
}

function isDatePickerForPaymentProps<S, C> ( d: DatePickerProps<S, C> ): d is DatePickerForPaymentProps<S, C> {
  const a: any = d
  return a.pathToDateInfo
}
const selectFnForPayments: DatePickerSelectFn = defaultDatePickerWithExtraTxs ( ( props, dateAsString ) => {
  if ( dateAsString && isDatePickerForPaymentProps ( props ) ) {
    const { id, pathToDateInfo, state, warning, error, dateFormat } = props
    const { dateFn } = state.context
    // @ts-ignore
    const dateDebug = state.main?.debug?.dateDebug
    const dateInfo = pathToDateInfo.optJson ()
    const browserNow = dateFn ()
    const valueAsDate = parseDate ( ``, dateFormat ) ( dateAsString )
    const todayAsDate = parseDate ( ``, dateInfo.dates.dateFormat ) ( dateInfo.dates.today )
    if ( dateDebug ) console.log ( 'Datapicker for payments', id, 'valueAsDate', valueAsDate, 'todayAsDate', todayAsDate )
    if ( dateInfo && !Array.isArray ( valueAsDate ) && !Array.isArray ( todayAsDate ) && isSameDay ( valueAsDate, todayAsDate ) ) {
      const serverNow = timeOnServerinGMT ( browserNow, dateInfo )
      if ( dateDebug ) console.log ( 'Datapicker for payments', id, 'browserNow', browserNow )
      if ( dateDebug ) console.log ( 'Datapicker for payments', id, 'serverNow', serverNow )
      if ( dateDebug ) console.log ( 'Datapicker for payments', id, 'after error', error.time, after ( browserNow, error.time, dateInfo ) )
      if ( after ( browserNow, error.time, dateInfo ) )
        return openConfirmWindowTxs ( error, 'justclose', [], state, 'DatePickerForPayments', props.id, 'onChange' )
      if ( dateDebug ) console.log ( 'Datapicker for payments', id, 'after warning', warning.time, after ( browserNow, warning.time, dateInfo ) )
      if ( after ( browserNow, warning.time, dateInfo ) )
        return openConfirmWindowTxs ( warning, 'justclose', [], state, 'DatePickerForPayments', props.id, 'onChange' )
      // }
    }
  }
  return []
} )

export function DatePickerForPayments<S, C extends ModalContext<S>> ( props: DatePickerForPaymentProps<S, C> ) {
  return RawDatePicker ( selectFnForPayments ) ( props )
}

