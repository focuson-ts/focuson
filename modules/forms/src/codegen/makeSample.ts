import { AllDataDD, AllDataFolder, DataD, foldDataDD, HasEnum, HasSample, OneDataDD, PrimitiveDD } from "../common/dataD";
import { asMultilineJavaString, safeArray, safePick, sortedEntries } from "@focuson/utils";
import { Lenses } from "@focuson/lens";
import { domainName, emptyName, sampleName } from "./names";
import { dataDsIn, PageD } from "../common/pageD";
import { TSParams } from "./config";
import { indentList } from "./codegen";


const addData = <G>( start: boolean, path: string[], acc: any, d: DataD<G> ) => start ? Lenses.fromPath ( path ).set ( acc, {} ) : acc;

export function selectSample ( i: number, ...ds: (HasSample<any> | undefined | HasEnum)[] ) {
  const enums: string[] = safeArray<any> ( ds ).flatMap ( d => sortedEntries ( d?.enum ).map ( x => x[ 0 ] ) )
  const samples: string[] = safeArray<any> ( ds ).flatMap ( d => d ? safeArray ( d.sample ) : [] )
  return safePick ( [ ...enums, ...samples ], i )
}

const addPrimitive =<G> ( acc: any, path: string[], one: OneDataDD<G> | undefined, d: PrimitiveDD, i: number ) =>
  Lenses.fromPath ( path ).set ( acc, selectSample ( i, one, d ) );

export function makeTsSample <G>( d: DataD<G>, i: number ): any {
  return foldDataDD<any,G> ( d, [], [], {}, {
    stopAtDisplay: false,
    foldData: ( acc, path, parents, oneDataDD, dataDD, start ) => addData ( start, path, acc, dataDD ),
    foldRep: ( acc, path, parents, oneDataDD, dataDD, start ) =>
      start ? acc : Lenses.fromPath ( path ).transform ( child => [ child ] ) ( acc ),
    foldPrim: ( acc, path, parents, oneDataDD, dataDD ) => addPrimitive ( acc, path, oneDataDD, dataDD, i )
  } )
}


export function makeSampleVariable<G> ( params: TSParams, d: DataD<G>, i: number ): string[] {
  return [
    `export const ${sampleName ( d )}${i}: ${params.domainsFile}.${domainName ( d )} = `,
    ...JSON.stringify ( makeTsSample ( d, i ), null, 2 ).split ( '\n' )
  ]
}
export function makeAllSampleVariables <B,G> ( params: TSParams, ps: PageD <B,G>[], i: number ): string[] {
  return sortedEntries ( dataDsIn ( ps ) ).flatMap ( ( [ name, dataD ] ) => makeSampleVariable ( params, dataD, i ) )
}


// export function makeJavaDataSample ( d: DataD, i: number ): string[] {
//   const contents: string = sortedEntries ( d.structure ).map ( ( [ name, value ] ) => [ `"${name}"`, ...makeJavaSample ( value.dataDD, i ) ] ).join ( "," )
//   return [ `Map.of(${contents})` ]
// }
export function makeJavaSample <G>( d: DataD<G>, i: number ): string[] {
  const sample = makeTsSample ( d, i );
  return asMultilineJavaString ( JSON.stringify ( sample, null, 2 ).split ( "\n" ), '       ' )
}

export function makeJavaVariable<G> ( d: DataD<G>, i: number ) {
  return [ `public static Map ${sampleName ( d ) + i} =  parse.parseMap(`, ...makeJavaSample ( d, i ), ");" ]
}
export function makeAllJavaVariableName <B,G> ( ps: PageD <B,G>[], i: number ): string[] {
  return sortedEntries ( dataDsIn ( ps ) ).flatMap ( ( [ name, dataD ] ) => makeJavaVariable ( dataD, i ) )
}

export function makeAllEmptyData  <B,G>( params: TSParams, ps: PageD <B,G>[] ): string[] {
  return sortedEntries ( dataDsIn ( ps, false ) ).flatMap ( ( [ name, dd ] ) =>
    [ `export const ${emptyName ( dd )}:${params.domainsFile}.${domainName( dd )} =`, ...indentList ( JSON.stringify ( makeEmptyData ( dd ), null, 2 ).split ( "\n" ) ) ] )
}
export function makeEmptyData<G> ( d: AllDataDD<G> ): string[] {
  let folder: AllDataFolder<any,G> = {
    stopAtDisplay: false,
    foldData: ( acc, path, parents, oneDataDD, dataDD, start ) => addData ( start, path, acc, dataDD ),
    foldRep: ( acc, path, parents, oneDataDD, dataDD, start ) =>
      start ? acc : Lenses.fromPath ( path ).transform ( child => [ child ] ) ( acc ),
    foldPrim: ( acc, path, parents, oneDataDD, dataDD ) => Lenses.fromPath ( path ).set ( acc, dataDD.emptyValue ? dataDD.emptyValue : dataDD.emptyValue )
  };
  return foldDataDD ( d, [], [], [], folder )
}
