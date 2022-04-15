import { beforeAfterSeparator, NameAnd } from "@focuson/utils";

export type NextId = NameAnd<number>

export function nextId ( nextId: NextId, id: string ) {
  let [ theId, type ] = beforeAfterSeparator ( ':', id )
  if ( type === '' ) type = 'string'
  const value = nextId[ theId ] === undefined ? nextId[ theId ] : 0
  nextId[ theId ] = value + 1
  return value
}