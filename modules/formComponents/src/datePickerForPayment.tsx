import { DatePickerProps, DatePickerSelectFn, defaultDatePickerWithExtraTxs, parseDate, RawDatePicker } from "./datePicker";
import { after, isSameDay, NameAnd, timeOnServerinGMT } from "@focuson-nw/utils";
import { LensState } from "@focuson-nw/state";
import { ConfirmProps, ModalContext, openConfirmWindowTxs } from "@focuson-nw/pages";

interface EventDetails extends ConfirmProps {
  time: string,
}

interface WarningErrorEventDetails {
  warning: EventDetails,
  error: EventDetails,

}
interface DatePickerForPaymentProps<S, C> extends DatePickerProps<S, C> {
  pathToDateInfo: LensState<S, any, C>
  paymentType: LensState<S, any, C>
  messages: NameAnd<WarningErrorEventDetails>
}

function isDatePickerForPaymentProps<S, C> ( d: DatePickerProps<S, C> ): d is DatePickerForPaymentProps<S, C> {
  const a: any = d
  return a.pathToDateInfo
}
const selectFnForPayments: DatePickerSelectFn = defaultDatePickerWithExtraTxs ( ( props, dateAsString ) => {
  if ( dateAsString && isDatePickerForPaymentProps ( props ) ) {
    const { id, pathToDateInfo, state, paymentType, dateFormat, messages } = props
    // @ts-ignore
    const dateDebug = state.main?.debug?.dateDebug
    const { dateFn } = state.context

    const pt = paymentType.optJsonOr ( '' )
    if ( dateDebug ) console.log ( 'payment typeis', pt )
    const msgs = messages?.[ pt ]
    if ( msgs === undefined ) {
      if ( dateDebug ) console.log ( `Can't find messages for [${pt}]` )
      return []
    }
    const { warning, error } = msgs
    if ( dateDebug ) console.log ( 'Messages are', pt, msgs )
    if ( dateDebug ) console.log ( 'warning ', warning, 'error', error )


    const dateInfo = pathToDateInfo.optJson ()
    const browserNow = dateFn ()
    const valueAsDate = parseDate ( ``, dateFormat ) ( dateAsString )
    const todayAsDate = parseDate ( ``, dateInfo.dates.dateFormat ) ( dateInfo.dates.today )
    if ( dateDebug ) console.log ( 'Datapicker for payments', id, 'valueAsDate', valueAsDate, 'todayAsDate', todayAsDate )
    if ( dateInfo && !Array.isArray ( valueAsDate ) && !Array.isArray ( todayAsDate ) && isSameDay ( valueAsDate, todayAsDate ) ) {
      console.log('same day', valueAsDate, todayAsDate, isSameDay(valueAsDate, todayAsDate))
      const serverNow = timeOnServerinGMT ( browserNow, dateInfo )
      if ( dateDebug ) console.log ( 'Datapicker for payments', id, 'browserNow', browserNow )
      if ( dateDebug ) console.log ( 'Datapicker for payments', id, 'serverNow', serverNow )
      if ( dateDebug ) console.log ( 'Datapicker for payments', id, 'error.time', error.time )
      if ( dateDebug ) console.log ( 'Datapicker for payments', id, 'warning.time', warning.time )
      if ( dateDebug ) console.log ( 'Datapicker for payments', id, 'dateInfo',dateInfo )
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
  const dateInfo = props.pathToDateInfo.focusOn ( 'dates' )
  return RawDatePicker ( selectFnForPayments ) ( { ...props, dateInfo } )
}

