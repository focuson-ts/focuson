import { AllDataDD, DataD, foldDataDD, OneDataDD, PrimitiveDD } from "../common/dataD";
import { safeArray, sortedEntries } from "@focuson/utils";
import { Lenses } from "@focuson/lens";
import { domainName, sampleName } from "./names";
import { dataDsIn, PageD } from "../common/pageD";


const addData = ( start: boolean, path: string[], acc: any, d: DataD ) => start ? Lenses.fromPath ( path ).set ( acc, {} ) : acc;
function safePick ( s: string[] | undefined, i: number ) {
  const sa = safeArray ( s )
  return sa.length == 0 ? '' : sa[ i % sa.length ]
}
const addPrimitive = ( acc: any, path: string[], one: OneDataDD | undefined, d: PrimitiveDD, i: number ) =>
  Lenses.fromPath ( path ).set ( acc, safePick ( [ ...safeArray ( one?.sample ), ...safeArray ( d.samples ), ...sortedEntries(d.enum).map(x=>x[0]) ], i ) );

export function makeSample ( d: DataD, i: number ): any {
  return foldDataDD<any> ( d, [], [], {}, {
    stopAtDisplay: false,
    foldData: ( acc, path, parents, oneDataDD, dataDD, start ) => addData ( start, path, acc, dataDD ),
    foldRep: ( acc, path, parents, oneDataDD, dataDD, start ) =>
      start ? acc : Lenses.fromPath ( path ).transform ( child => [ child ] ) ( acc ),
    foldPrim: ( acc, path, parents, oneDataDD, dataDD ) => addPrimitive ( acc, path, oneDataDD, dataDD, i )
  } )
}


export function makeSampleVariable ( d: DataD, i: number ): string[] {
  return [ `const ${sampleName ( d )}${i}: ${domainName ( d )} = `,
    ...JSON.stringify ( makeSample ( d, i ), null, 2 ).split ( '\n' )
  ]
}
export function makeAllSampleVariables ( ps: PageD[], i: number ): string[] {
  return sortedEntries ( dataDsIn ( ps ) ).flatMap ( ( [ name, dataD ] ) => makeSampleVariable ( dataD, i ) )
}