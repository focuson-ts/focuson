import { AllDataDD, DataD, foldDataDD, HasEnum, HasSample, isDataDd, isRepeatingDd, OneDataDD, PrimitiveDD } from "../common/dataD";
import { safeArray, sortedEntries } from "@focuson/utils";
import { Lenses } from "@focuson/lens";
import { domainName, sampleName } from "./names";
import { dataDsIn, PageD } from "../common/pageD";
import { TSParams } from "./config";


const addData = ( start: boolean, path: string[], acc: any, d: DataD ) => start ? Lenses.fromPath ( path ).set ( acc, {} ) : acc;
function safePick ( s: string[] | undefined, i: number ) {
  const sa = safeArray ( s )
  return sa.length == 0 ? '' : sa[ i % sa.length ]
}

export function selectSample ( i: number, ...ds: (HasSample | undefined | HasEnum)[] ) {
  const enums: string[] = safeArray<any> ( ds ).flatMap ( d => sortedEntries ( d?.enum ).map ( x => x[ 0 ] ) )
  const samples: string[] = safeArray<any> ( ds ).flatMap ( d => d ? safeArray ( d.sample ) : [] )
  return safePick ( [ ...enums, ...samples ], i )
}

const addPrimitive = ( acc: any, path: string[], one: OneDataDD | undefined, d: PrimitiveDD, i: number ) =>
  Lenses.fromPath ( path ).set ( acc, selectSample ( i, one, d ) );

export function makeTsSample ( d: DataD, i: number ): any {
  return foldDataDD<any> ( d, [], [], {}, {
    stopAtDisplay: false,
    foldData: ( acc, path, parents, oneDataDD, dataDD, start ) => addData ( start, path, acc, dataDD ),
    foldRep: ( acc, path, parents, oneDataDD, dataDD, start ) =>
      start ? acc : Lenses.fromPath ( path ).transform ( child => [ child ] ) ( acc ),
    foldPrim: ( acc, path, parents, oneDataDD, dataDD ) => addPrimitive ( acc, path, oneDataDD, dataDD, i )
  } )
}


export function makeSampleVariable (params: TSParams,  d: DataD, i: number ): string[] {
  return [ `export const ${sampleName ( d )}${i}: ${params.domainsFile}.${domainName ( d )} = `,
    ...JSON.stringify ( makeTsSample ( d, i ), null, 2 ).split ( '\n' )
  ]
}
export function makeAllSampleVariables (params: TSParams, ps: PageD[], i: number ): string[] {
  return sortedEntries ( dataDsIn ( ps ) ).flatMap ( ( [ name, dataD ] ) => makeSampleVariable (params, dataD, i ) )
}


export function makeJavaPrimitiveSample ( p: PrimitiveDD, i: number ): string {
  return `"${selectSample ( i, p )}"`
}

export function makeJavaDataSample ( d: DataD, i: number ): string[] {
  const contents: string = sortedEntries ( d.structure ).map ( ( [ name, value ] ) => [ `"${name}"`, ...makeJavaSample ( value.dataDD, i ) ] ).join ( "," )
  return [ `Map.of(${contents})` ]
}
export function makeJavaSample ( d: AllDataDD, i: number ): string[] {
  if ( isDataDd ( d ) ) return makeJavaDataSample ( d, i )
  if ( isRepeatingDd ( d ) ) return [ `Arrays.asList ( ${makeJavaDataSample ( d.dataDD, i ).join ( ',' )})` ]
  return [ makeJavaPrimitiveSample ( d, i ) ]
}

export function sampleType ( d: AllDataDD ): string {
  if ( isDataDd ( d ) ) return 'Map';
  if ( isRepeatingDd ( d ) ) return 'List<Map>';
  return 'String';
}
export function makeJavaVariableName ( d: AllDataDD, i: number ) {
  return [ `public static ${sampleType ( d )} ${sampleName ( d ) + i} = ${makeJavaSample ( d, i )};` ]
}
export function makeAllJavaVariableName ( ps: PageD[], i: number ): string[] {
  return sortedEntries ( dataDsIn ( ps ) ).flatMap ( ( [ name, dataD ] ) => makeJavaVariableName ( dataD, i ) )
}

