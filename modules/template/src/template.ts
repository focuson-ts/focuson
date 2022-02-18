import { Lens, Optional } from "@focuson/lens";
import { NameAnd, sortedEntries } from "@focuson/utils";


export type NameLensFn<Main, T> = ( name: string ) => Optional<Main, any>


export function nameLensFn<S, T extends NameAnd<any>> ( lens: Optional<S, T> ): NameLensFn<S, any> {
  return ( name: string ) => lens.focusQuery ( name )
}

export const expandFor = <Main, Details extends NameAnd<any>> ( lens: Lens<Main, Details> ) => ( template: string, ...names: (keyof Details)[] ): ( s: Main ) => string =>
  expand ( nameLensFn ( lens ) ) ( template, ...names.map ( x => x.toString () ) );

export const expand = <Main> ( nameLensFn: NameLensFn<Main, string>, failSilently?: boolean ) => ( template: string, ...names: string[] ): ( s: Main ) => string => {
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
export function applyToTemplate ( template: string, params: NameAnd<string> ): string [] {
  let sorted: [ string, string ][] = sortedEntries ( params );
  return sorted.reduce ( ( acc: string, [ name, value ]: [ string, string ] ) => {
    const regex = new RegExp ( "<" + name + ">", 'g' )
    return acc.replace ( regex, value )
  }, template.replace ( /\r/g, '\n' ) ).split ( '\n' ).filter ( s => s.length > 0 )
}

export interface MakeAEqualsBProps {
  failSilently?: boolean,
  separator?: string,
  encoder?: ( s: string | undefined ) => string
}


export const queryParamsFor = <Main, Details extends NameAnd<any>> ( lens: Optional<Main, Details>, props: MakeAEqualsBProps ) => (  ...names: (keyof Details)[] ): ( s: Main ) => string =>
  makeAEqualsB<Main> ( nameLensFn ( lens ), props ) ( ...names.map ( x => x.toString () ) );

export const makeAEqualsB = <Main> ( nameLnFn: NameLensFn<Main, any>, { encoder, separator, failSilently }: MakeAEqualsBProps ) => ( ...names: string[] ): ( main: Main ) => string => {
  const realEncoder = encoder ? encoder : stringOrStringify
  const realSeparator = separator ? separator : '&'
  return main => {
    return names.map ( name => {
        const value = nameLnFn ( name ).getOption ( main )
        if ( value || failSilently ) return name + '=' + realEncoder ( value )
        throw new Error ( `Could not find [${name}] in makeAEqualsB. All names are ${names.join ( "." )}` )
      }
    ).join ( realSeparator )
  }

};