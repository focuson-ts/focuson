import { dataDsIn, flatMapToModal, isMainPage, PageD } from "../common/pageD";
import { safeArray } from "@focuson/utils";


function validateName ( prefix: string, name: string, ) {
  let lc = name.toLowerCase ();
  if ( name.length===0 ) throw Error ( `${prefix} ${name} has no name!` )
  if ( name[ 0 ] === lc[ 0 ] ) throw Error ( `${prefix} ${name} starts with a lower case letter` )
  if ( name.indexOf ( ' ' ) !== -1 ) throw Error ( `${prefix} '${name}' has a space in it (${name.indexOf ( ' ' )})` )

  if ( lc.endsWith ( 'dd' ) ) throw Error ( `${prefix} '${name}' ends in DD. Names should not end in PD, DD or RD` )
  if ( lc.endsWith ( 'pd' ) ) throw Error ( `${prefix} '${name}' ends in PD. Names should not end in PD, DD or RD` )
  if ( lc.endsWith ( 'rd' ) ) throw Error ( `${prefix} '${name}' ends in RD. Names should not end in PD, DD or RD` )
}
function validateNameUnique<B, G> ( prefix: string, names: Set<string>, name: string ) {
  if ( names.has ( name ) ) throw Error ( `${prefix} with name ${name} declared more than once` )
  names.add ( name )
  validateName ( prefix, name );
}
export function validate<B, G> ( ps: PageD<B, G>[] ) {
  const pdNames: Set<string> = new Set ()
  ps.forEach ( p => {
    validateNameUnique ( `PageD `, pdNames, p.name );
    if ( isMainPage ( p ) ) {
      Object.entries ( p.rest ).forEach ( ( [ name, rest ] ) => {
        let prefix = `DataD in Page ${p.name}.rest[${name}]`;
        try {
          validateName ( prefix, rest.rest.dataDD.name );
        } catch ( e: any ) {
          console.log ( `${prefix}. 'rest.rest.dataDD is' `, JSON.stringify ( rest.rest.dataDD, null, 2 ) )
          throw e
        }
      } )
      Object.entries ( p.domain ).forEach ( ( [ name, domain ] ) => validateName ( `DataD in Page ${p.name}.domain[${name}]`, domain.dataDD.name ) )
      safeArray ( p.modals ).flatMap ( flatMapToModal ).forEach ( ( modal, i ) => validateName ( `ModalPage in Page ${p.name}.modals[${i}]`, modal.modal.name ) )
    } else throw  Error ( `Modal page ${p.name} has been added to config. Only MainPages should be added` )
  } )
  Object.values ( dataDsIn ( ps ) ).forEach ( d => validateName ( `DataD`, d.name ) )
}