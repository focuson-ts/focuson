import { AllDataDD, CompDataD, isDataDd, isPrimDd, isRepeatingDd } from "../common/dataD";
import { unique } from "../common/restD";
import { indentList } from "./codegen";
import { dbMapname } from "./names";

export function findParentChildCompDataLinks<G> ( d: CompDataD<G> ) {
  function makeLinksForChild ( d: CompDataD<G> ) {
    if ( isRepeatingDd ( d ) ) return makeParentChildrenStoppingAtResolvers ( d, d.dataDD )
    if ( isDataDd ( d ) ) return Object.entries ( d.structure ).flatMap ( ( [ name, data ] ) => makeParentChildrenStoppingAtResolvers ( d, data.dataDD ) )
    throw Error ( `Cannot process dataD ${d}` )
  }
  function makeParentChildrenStoppingAtResolvers ( parent: CompDataD<G>, d: AllDataDD<G> ): [ CompDataD<G>, CompDataD<G> ][] {
    if ( isPrimDd ( d ) ) return []
    return [ [ parent, d ], ...makeLinksForChild ( d ) ]
  }
  return makeLinksForChild ( d )
}

export function makeGraphQlResultMaps<G> ( name: string, parentChild: [ CompDataD<G>, CompDataD<G> ][] ) {
  const dataDs = unique ( parentChild.flat (), d => d.name )
  return [ `public static class ${name} {`,
    ...indentList ( dataDs.map ( d => `public final Map ${dbMapname ( d )} = new HashMap();` ) ),
    ...indentList ( parentChild.map ( ( [ p, c ] ) => `${dbMapname ( p )}.put("${dbMapname ( c )}", ${dbMapname ( c )});` ) ),
    '}' ]
}
