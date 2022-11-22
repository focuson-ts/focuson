export interface HasDateFn {
  dateFn: DateFn
}
export type DateFn = () => string
export const testDateFn: DateFn = () => "timeForTest";
export const defaultDateFn: DateFn = () => new Date ().toISOString ();

export interface HasName {
  name: string
}
export interface CopyDetails {
  from?: string;
  to?: string
}

export interface RequiredCopyDetails {
  from: string;
  to: string
}

export function checkIsFunction ( functionToCheck: any ) {
  if ( !(typeof functionToCheck === "function") ) throw Error ( 'getter should be a function, instead is ' + JSON.stringify ( functionToCheck ) )
}

export function ints ( n: number ): number[] {
  const numbers = new Array ( n );
  for ( let i = 0; i < n; i++ ) {
    numbers[ i ] = i;
  }
  return numbers
}
export const mapPathPlusInts = ( path: number[], count: number ) => <T> ( fn: ( p: number[] ) => T ): T[] => {
  return ints ( count ).map ( i => fn ( [ ...path, i ] ) )
};


export const apply = <T, T1> ( t: T | undefined, fn: ( t: T ) => T1 ): T1 | undefined => t !== undefined ? fn ( t ) : undefined;

export const applyOrDefault = <T, T1> ( t: T | undefined, fn: ( t: T ) => T1, def: T1 ): T1 => t !== undefined ? fn ( t ) : def;
export const useOrDefault = <T> ( def: T ) => ( t: T | undefined ): T => t ? t : def;


export const or = <T> ( defaultT: () => T ) => ( t: T | undefined ) => t ? t : defaultT ()

export function copyWithFieldSet<T, K extends keyof T> ( t: T, k: K, v: T[K] ) {
  let result = { ...t }
  result[ k ] = v
  return result
}
export function safeObject<T> ( t: NameAnd<T> | undefined ): NameAnd<T> { return t ? t : {}}
export function mapObject<T, T1> ( t: NameAnd<T>, fn: ( t: T ) => T1 ): NameAnd<T1> {
  return Object.fromEntries ( Object.entries ( safeObject ( t ) ).map ( ( [ name, value ] ) => [ name, fn ( value ) ] ) )
}
export function filterMapObject<T, T1> ( t: NameAnd<T>, filter: ( [ name, t ]: [ string, T ] ) => boolean, fn: ( t: T ) => T1 ): NameAnd<T1> {
  return Object.fromEntries ( Object.entries ( safeObject ( t ) ).filter ( filter ).map ( ( [ name, value ] ) => [ name, fn ( value ) ] ) )
}
export function filterObject<T> ( t: NameAnd<T>, filter: ( [ name, t ]: [ string, T ] ) => boolean ): NameAnd<T> {
  return Object.fromEntries ( Object.entries ( safeObject ( t ) ).filter ( filter ) )
}

export function safeArray<T> ( ts: T[] | undefined ) {
  if ( ts && !Array.isArray ( ts ) ) throw new Error ( `Should have an array. Instead have ${JSON.stringify ( ts )}` )
  return ts ? ts : []
}


export function toArray<T> ( ts: T | T[] | undefined ): T[] {
  if ( ts === undefined ) return []
  if ( Array.isArray ( ts ) ) return ts
  return [ ts ]
}
export function toArrayOrUndefined<T> ( ts: T | T[] | undefined ): T[] | undefined {
  if ( ts === undefined ) return undefined
  if ( Array.isArray ( ts ) ) return ts
  return [ ts ]
}
export function safeString ( s: string | undefined | number ): string {
  if (typeof s === 'string') return s
  if (typeof s === 'number') return s.toString()
  return ''
}
export function safeNumber ( s: number | undefined, defaultValue?: number ): number { return typeof s === 'number' ? s : (defaultValue === undefined ? 0 : defaultValue)}
export function numberOrUndefined(s: any): number{
  if (typeof s === 'number') return isNaN(s)?undefined: s
  if (typeof s === 'string') {
    try{
      const result = Number.parseFloat(s);
      return isNaN(result)?undefined: result
    }catch ( e ){}
  }
  return undefined
}
export function safePick ( s: string[] | undefined, i: number ) {
  const sa = safeArray ( s )
  return sa.length == 0 ? '' : sa[ i % sa.length ]
}


export function asMultilineJavaString ( ss: string[], indent?: string ): string[] {
  const realIndent = indent ? indent : ''
  const lastPlusIndex = ss.length - 2
  return ss.map ( ( s, i ) => `${realIndent}${JSON.stringify ( s )}${i <= lastPlusIndex ? "+" : ""}` )
}


export function beforeSeparator ( separator: string, string: string ) {
  const index = string.indexOf ( separator )
  return index < 0 ? string : string.substr ( 0, index )
}
export function beforeAfterSeparator ( separator: string, string: string ): [ string, string ] {
  const index = string.indexOf ( separator )
  return index < 0 ? [ string, '' ] : [ string.substr ( 0, index ), string.substr ( index + 1 ) ]
}
export function insertBefore ( separator: string, insert: string, s: string ): string {
  const [ b, a ] = beforeAfterSeparator ( separator, s )
  return `${b}${insert}${separator}${a}`
}
export function arraysEqual<T> ( a: T[] | undefined, b: T[] | undefined ) {
  if ( !(a && b) ) return false;
  if ( a === b ) return true;
  if ( a.length !== b.length ) return false;
  for ( let i = 0; i < a.length; ++i ) {
    if ( a[ i ] !== b[ i ] ) return false;
  }
  return true;
}


export function areAllDefined<T> ( arr: (T | undefined)[] | undefined ): arr is T[] {
  return arr ? arr.reduce<boolean> ( ( acc, t ) => (t !== undefined) && acc, true ) : false
}


export interface NameAnd<T> {
  [ name: string ]: T
}
export function sortedEntries<T> ( a: NameAnd<T> | undefined ): [ string, T ][] {
  return a ? Object.entries ( a ).sort ( ( [ n1, v1 ], [ n2, v2 ] ) => n1.localeCompare ( n2 ) ) : []
}
export function unsortedEntries<T> ( a: NameAnd<T> | undefined ): [ string, T ][] {
  return a ? Object.entries ( a ) : []
}

export function findJoiner ( name: string, joiners: undefined | string | string[] ) {
  if ( joiners === undefined ) return ','
  if ( typeof joiners === 'string' ) return joiners
  const j = joiners.find ( n => n.startsWith ( `${name}:` ) )
  if ( j === undefined ) return ','
  return j.substr ( name.length + 1 )
}

export function anyIntoPrimitive ( raw: any, joiner: string ): string | number | boolean {
  const t = typeof raw
  if ( t === 'string' || t === 'boolean' || t === 'number' ) return raw
  if ( t === 'object' ) return Object.values ( raw ).map ( v => anyIntoPrimitive ( v, joiner ) ).filter ( p => p !== '' ).join ( joiner )
  if ( Array.isArray ( raw ) ) return raw.map ( v => anyIntoPrimitive ( v, joiner ) ).filter ( p => p !== '' ).join ( joiner )
  throw new Error ( `Don't know how to turn ${t} into a string. Details: '${JSON.stringify ( raw )}'}` )
}
export function makeIntoString ( name: string, raw: any, joiners: undefined | string | string[] ): string {
  const t = typeof raw
  if ( raw === undefined || t === 'string' || t === 'boolean' || t === 'number' ) return raw
  if ( raw === null ) return ''
  const joiner = findJoiner ( name, joiners )
  if ( t === 'object' ) return Object.values ( raw ).map ( v => makeIntoString ( name, v, joiners ) ).join ( joiner )
  if ( Array.isArray ( raw ) ) return raw.map ( v => makeIntoString ( name, v, joiners ) ).join ( joiner )
  throw new Error ( `Cannot find value for ${name} in ${JSON.stringify ( raw )}` )
}
export function unique<T> ( ts: T[] | undefined, tagFn: ( t: T ) => string ): T[] {
  const alreadyIn: Set<string> = new Set ()
  var result: T[] = []
  safeArray ( ts ).forEach ( t => {
    const tag = tagFn ( t );
    if ( !alreadyIn.has ( tag ) ) {
      result.push ( t );
      alreadyIn.add ( tag )
    }
  } )
  return result
}

export function resultOrErrorString<T> ( fn: () => T ): T | string {
  try {return fn ()} catch ( e ) { return JSON.stringify ( e )}
}

export const errorMonad = <S extends any> ( s: S, debug: boolean, onError: ( s: S, e: any ) => S, ...fns: [ string, ( s: S ) => S ][] ) => {
  var exit: boolean = false
  return fns.reduce<S> ( ( acc, [ name, fn ] ) => {
    if ( exit ) return acc
    try {
      let result = fn ( acc );
      if ( debug ) console.log ( name, result )
      return result
    } catch ( e ) {
      exit = true
      console.error ( `An unexpected error occured while ${name}`, e )
      return onError ( acc, e )
    }
  }, s )
}

export const errorPromiseMonad = <S extends any> ( onError: ( s: S, e: any ) => S ) => ( s: S, debug: boolean, ...fns: [ string, ( s: S ) => Promise<S> ][] ): Promise<S> => {
  var exit: boolean = false
  return fns.reduce<Promise<S>> ( async ( acc, [ name, fn ] ) => {
    return acc.then ( x => {
      if ( exit ) return x
      let result = fn ( x );
      if ( debug ) console.log ( name, result )
      return result
    } ).catch ( e => {
      exit = true
      console.error ( `An unexpected error occured while ${name}`, e )
      return acc.then ( lastS => onError ( lastS, e ) )
    } )
  }, Promise.resolve ( s ) )

}

export function safeFlatten ( s: string[][] | undefined ): string[] {
  return safeArray ( s ).flat ()
}
export const disabledFrom = ( s?: string[][] ): boolean => safeFlatten ( s ).length > 0;

export type DateCheck = '>' | '<' | '<=' | '>='

//dd/MM/yyyy or dd-MM-yyyy
export function checkDates ( d1: string | undefined, d2: string | undefined, dateCheck: DateCheck ) {
  function parseDate ( d: string | undefined ): Date | undefined {
    if ( !d ) return undefined;
    const parts = d.replace ( /\//g, '-' ).split ( "-" )
    if ( parts.length !== 3 ) return undefined
    parts.forEach ( p => {if ( !p.match ( /^[0-9]*$/ ) ) return undefined } )
    return new Date ( Number.parseInt ( parts[ 2 ] ), Number.parseInt ( parts[ 1 ] ), Number.parseInt ( parts[ 0 ] ) )
  }
  const date1 = parseDate ( d1 )
  const date2 = parseDate ( d2 )
  // console.log ( 'checkDates', date1, dateCheck, date2 )
  if ( date1 && date2 ) switch ( dateCheck ) {
    case "<=":
      return date1.getTime () <= date2.getTime ()
    case ">=":
      return date1.getTime () >= date2.getTime ()
    case "<":
      return date1.getTime () < date2.getTime ()
    case ">":
      return date1.getTime () > date2.getTime ()
    default:
      break
  }
  return false
}

export function requireBypassingReactCheck ( s: string ): any {
  try { return require ( s )} catch ( e ) {
    console.error(`Tried to require(${s})`, e)
    return undefined}
}