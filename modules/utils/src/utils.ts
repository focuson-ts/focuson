export type DateFn = () => string
export const testDateFn: DateFn = () => "timeForTest";
export const defaultDateFn: DateFn = () => new Date ().toISOString ();

export function checkIsFunction ( functionToCheck: any ) {
  if ( !(typeof functionToCheck === "function") ) throw Error ( 'getter should be a function, instead is ' + JSON.stringify ( functionToCheck ) )
}

export function ints ( n: number ): number[] {
  const numbers = new Array ( n );
  for ( var i = 0; i < n; i++ ) {
    numbers[ i ] = i;
  }
  return numbers
}
export const mapPathPlusInts = ( path: number[], count: number ) => <T> ( fn: ( p: number[] ) => T ): T[] => {
  return ints ( count ).map ( i => fn ( [ ...path, i ] ) )
};


export const apply = <T, T1> ( t: T | undefined, fn: ( t: T ) => T1 ): T1 | undefined => t ? fn ( t ) : undefined;

export const applyOrDefault = <T, T1> ( t: T | undefined, fn: ( t: T ) => T1, def: T1 ): T1 => t ? fn ( t ) : def;
export const useOrDefault = <T> ( def: T ) => ( t: T | undefined ): T => t ? t : def;

export const or = <T> ( defaultT: () => T ) => ( t: T | undefined ) => t ? t : defaultT ()

export function copyWithFieldSet<T, K extends keyof T> ( t: T, k: K, v: T[K] ) {
  let result = { ...t }
  result[ k ] = v
  return result
}
export function safeObject<T> ( t: T | undefined ) { return t ? t: { }}
export function safeArray<T> ( ts: T[] | undefined ) { return ts ? ts : []}
export function safeString ( s: string | undefined ) { return s ? s : ''}
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
  for ( var i = 0; i < a.length; ++i ) {
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
