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

export function after ( browserNow: string, time: string, dateInfo: DateInfo ): boolean {
  const matches = time.match ( /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/ )
  if ( !matches ) throw Error ( `Time [${time}] is not of format hh:mm` )
  const tHours = Number.parseInt ( matches[ 1 ] )
  const tMins = Number.parseInt ( matches[ 2 ] )
  const serverTime = timeOnServerinGMT ( browserNow, dateInfo )
  const [ sHours, sMins ] = getHoursAndMinutes ( serverTime )
  const serversHoursOffsetFromGMT = dateInfo.dates.serversHoursOffsetFromGMT;
  const serverHoursInItsTimezone = sHours + (serversHoursOffsetFromGMT ? serversHoursOffsetFromGMT : 0)
  if ( serverHoursInItsTimezone > tHours ) return true
  if ( serverHoursInItsTimezone < tHours ) return false
  return sMins >= tMins
}
export function getHoursAndMinutes ( utcString: string ): [ number, number ] {
  const matches = utcString.match ( / ([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):/ )
  const hours = Number.parseInt ( matches[ 1 ] )
  const mins = Number.parseInt ( matches[ 2 ] )
  return [ hours, mins ]
}

export interface DateInfo {
  now: string;
  dates: { serverNow: string, serversHoursOffsetFromGMT?: number, today: string }
}

export function millisecondsBetweenServerAndBrowser ( d: DateInfo ): number {
  const serverTime = Date.parse ( d.dates.serverNow )
  const browserTime = Date.parse ( d.now )
  return browserTime - serverTime
}

export function timeOnServerinGMT ( browserTime: string, dateInfo: DateInfo ): string {
  const date = new Date ( Date.parse ( browserTime ) - millisecondsBetweenServerAndBrowser ( dateInfo ) )
  return date.toUTCString ()
}
