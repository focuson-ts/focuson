import { GetNameFn } from "@focuson/lens";
import { NameAnd, sortedEntries } from "@focuson/utils";


export function addValue<Main, T> ( nL: GetNameFn<Main, T>, name: string, value: T ): GetNameFn<Main, T> {
  return n => {
    if ( n === name ) return { getOption: ( a: Main ) => value }
    return nL ( n )
  }
}

// export const expandFor = <Main, Details extends NameAnd<any>> ( lens: Lens<Main, Details> ) => ( template: string, ...names: (keyof Details)[] ): ( s: Main ) => string =>
//   expand ( nameLensFn ( lens ) ) ( template  );
//
export const expand = <Main> ( nameLensFn: GetNameFn<Main, string>, failSilently?: boolean ) => ( template: string ): ( s: Main ) => string => {
  return s => template.replace ( /({[^}]*})/g, nameAndBrackets => {
    const name = nameAndBrackets.substr ( 1, nameAndBrackets.length - 2 )
    let lens = nameLensFn ( name );
    if ( lens === undefined ) {
      if ( failSilently ) return nameAndBrackets;
      console.log ( "Failed template", 'name', name, 'nameLensFn', nameLensFn, 'template', template )
      throw new Error ( `Cannot find name ${name} to substitute into ${template}` )
    }
    const raw = lens.getOption ( s );
    if ( raw === undefined && !failSilently ) {
      console.log ( 'state for expand in error', s )
      throw new Error ( `Could not find ${name} for ${template} ` )
    }
    return stringOrStringify ( raw )
  } )
};
export function stringOrStringify ( raw: any ): any {
  return (typeof raw === 'object') ? JSON.stringify ( raw ) : (raw === undefined ? '' : raw)
}
export function applyToTemplate ( template: string, params: NameAnd<any> ): string [] {
  let sorted: [ string, string ][] = sortedEntries ( params );
  return sorted.reduce ( ( acc: string, [ name, value ]: [ string, string ] ) => {
    const regex = new RegExp ( "{" + name + "}", 'g' )
    return acc.replace ( regex, stringOrStringify ( value ) )
  }, template.replace ( /\r/g, '\n' ) ).split ( '\n' ).filter ( s => s.length > 0 )
}

