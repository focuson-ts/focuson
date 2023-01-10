import { LensState } from "@focuson-nw/state";
import { HasDateFn, isBefore, isSameDay } from "@focuson-nw/utils";
//@ts-ignore - because the generator project doesn't have form_components as a dependency
import { parseDate } from '@focuson-nw/form_components'

export function balanceZero<S, C> ( s: LensState<S, any, C> ): boolean {
  return true
}


/** The s should point to 'the date'
 * Needs modifying to allow for difference between server and browser */
export const isDifferentDayOrIsBeforeFull = ( dateParser: ( s: string ) => Date | string[], timeParser: ( s: string ) => Date ) => ( hours: number, mins: number ) => <S, C extends HasDateFn> ( s: LensState<S, any, any> ) => {
  const { dateFn } = s.context
  const dateString = s.optJson ()
  if ( !dateString ) return false
  const date = dateParser ( dateString )
  const now = timeParser ( dateFn () )

  if ( Array.isArray ( date ) ) throw new Error ( 'dateFn for date returned\n' + date )
  return (!isSameDay ( now, date ) || isBefore ( now, hours, mins ))
};

export const isDifferentDayOrIsBefore = isDifferentDayOrIsBeforeFull ( parseDate ( '', 'dd-MM-yyyy' ), s => new Date ( Date.parse ( s ) ) )
