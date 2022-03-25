export type GenerateLogLevel = 'minimal' | 'overview' | 'detailed'


export function log ( depth: number, s: string ) {if ( depth >= 0 ) console.log ( ' '.repeat ( depth * 2 ) + s ) }
export function detailsLog ( level: GenerateLogLevel, depth: number, s: string, ) {
  if ( level === 'detailed' || level === 'overview' || level == 'minimal' ) log ( depth, s )
}
export function overviewLog ( level: GenerateLogLevel, depth: number, s: string, ) {
  if ( level === 'overview' || level == 'minimal' ) log ( depth, s )
}
export function minimalLog ( level: GenerateLogLevel, depth: number, s: string, ) {
  if ( level === 'minimal' ) log ( depth, s )
}
