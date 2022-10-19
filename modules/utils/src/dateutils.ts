
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
