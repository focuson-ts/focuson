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
  if ( !matches ) throw Error ( `Hours and minutes must be hh:mm and where ${utcString}` )
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

export interface StartEndDateAndLength {
  startDate?: string
  endDate?: string
  length?: number
}
export function addDate ( debug: boolean | undefined, thisDate: string | undefined, length: number | undefined, subtract: boolean ) {
  // if ( !thisDate || !thisDate.match ( /^(1[0-2]|0[1-9]|\d)-(20\d{2}|19\d{2}|0(?!0)\d|[1-9]\d)$/ ) )
  //   return thisDate
  if ( thisDate === undefined ) return thisDate
  const parts = thisDate.split ( /[-|\/]/ )
  if ( parts.length !== 2 ) return thisDate
  const [ month, year ] = parts
  const offset = length ? length : 0
  const withSign = subtract ? -offset : offset
  const date = new Date ( Number.parseInt ( year ), Number.parseInt ( month ) - 1 )
  if ( debug ) console.log ( 'addDate', 'month', month, 'year', year, 'date initial', date )
  date.setMonth ( date.getMonth () + withSign )
  if ( debug ) console.log ( 'addDate', 'month', month, 'year', year, 'offset', offset, 'withSign', withSign, 'result', date )
  return (date.getMonth () + 1) + "/" + date.getFullYear ()
}

export function calculateLength ( startDate: string, endDate: string, offset: number ): number | undefined {
  function dateToMonths ( d: string ) {
    const matcher = d.match ( /^([0-9]*)[-/]([0-9]*)$/ )
    if ( !matcher ) return undefined
    return Number.parseInt ( matcher[ 1 ] ) + Number.parseInt ( matcher[ 2 ] ) * 12
  }
  const end = dateToMonths ( endDate );
  const start = dateToMonths ( startDate );
  if ( end && start ) return end - start + offset
  return undefined
}
export function setStartDate ( sedl: StartEndDateAndLength, startDate: string, debug?: boolean ): StartEndDateAndLength {
  if ( sedl.length !== undefined )
    return { ...sedl, startDate, endDate: addDate ( debug, startDate, sedl.length - 1, false ) }
  if ( sedl.endDate !== undefined )
    return { ...sedl, startDate, length: calculateLength ( startDate, sedl.endDate, -1 ) }
  return { ...sedl, startDate }
}

export function setEndDate ( sedl: StartEndDateAndLength, endDate: string, debug?: boolean ): StartEndDateAndLength {
  if ( sedl.length !== undefined )
    return { ...sedl, endDate, startDate: addDate ( debug, endDate, sedl.length - 1, true ) }
  if ( sedl.startDate !== undefined )
    return { ...sedl, endDate, length: calculateLength ( sedl.startDate, endDate, 1 ) }
  return { ...sedl, endDate }

}
export function setLength ( sedl: StartEndDateAndLength, length: number|undefined, debug?: boolean ): StartEndDateAndLength {
  if (!length) //note that 0 is false as well as undefined
    return {startDate: sedl.startDate}
  if ( sedl.startDate !== undefined )
    return { ...sedl, length, endDate: addDate ( debug, sedl.startDate, length - 1, false ) }
  if ( sedl.endDate !== undefined )
    return { ...sedl, length, startDate: addDate ( debug, sedl.endDate, length - 1, true ) }
  return { ...sedl, length }
}

