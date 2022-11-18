
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

export function after ( now: Date, time: string ): boolean {
  const matches = time.match ( /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/ )
  if ( !matches ) throw Error ( `Time [${time}] is not of format hh:mm` )
  const tHours = Number.parseInt ( matches[ 1 ] )
  const tMins = Number.parseInt ( matches[ 2 ] )
  const nHours = now.getHours () ;
  const nMins = now.getMinutes ()
  if ( nHours > tHours ) return true
  if ( nHours < tHours ) return false
  return nMins >= tMins
}
