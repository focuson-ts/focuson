import { LensState } from "@focuson/state";
import { HasDateFn } from "@focuson/utils";
//@ts-ignore - because the generator project doesn't have form_components as a dependency
import { parseDate } from '@focuson/form_components'

export function balanceZero<S, C> ( s: LensState<S, any, C> ): boolean {
  return true
}

export function isSameDay ( d1: Date, d2: Date ): boolean {
  return d1.getFullYear () === d2.getFullYear () && d1.getMonth () === d2.getMonth () && d1.getDay () === d2.getDay ()
}
export function isBefore ( d: Date, hours: number, mins: number ): boolean {
  const hour = d.getHours ()
  const minutes = d.getMinutes ()
  if ( hour < hours ) return true
  if ( hour === hours ) return minutes <= mins
  return false
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
