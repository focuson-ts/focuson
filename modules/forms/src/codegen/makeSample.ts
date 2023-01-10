import { AllDataDD, AllDataFolder, CompDataD, DataD, foldDataDD, HasEnum, HasSample, isDataDd, isRepeatingDd, OneDataDD, PrimitiveDD, RepeatingDataD } from "../common/dataD";
import { asMultilineJavaString, safeArray, safePick, sortedEntries } from "@focuson-nw/utils";
import { parsePath } from "@focuson-nw/lens";
import { domainName, emptyName, sampleName } from "./names";
import { dataDsIn, RefD } from "../common/pageD";
import { TSParams } from "./config";
import { indentList } from "./codegen";
import { pathBuilderForLensWithPageAsIdentity } from "./lens";


function parsePathFromListFromPage ( path: string[] ) {
  let p = pathBuilderForLensWithPageAsIdentity ();
  return parsePath ( path.join ( "/" ), p )
}

const addData = <G> ( start: boolean, path: string[], acc: any, d: DataD<G> ) => {
  try {
    let optional = parsePathFromListFromPage ( path );
    if ( !optional )
      throw Error ( `Cannot create lens from [${path.join ( ',' )}]. DataD is ${d.name}` )
    return start ? optional.set ( acc, {} ) : acc;
  } catch ( e: any ) {
    console.error ( `Cannot addData`, start, path, acc, d.name )
    throw e
  }
};

export function selectSample ( i: number, ...ds: (HasSample<any> | undefined | HasEnum)[] ) {
  const enums: string[] = safeArray<any> ( ds ).flatMap ( d => sortedEntries ( d?.enum ).map ( x => x[ 0 ] ) )
  const samples: string[] = safeArray ( safeArray<any> ( ds ).find ( d => d?.sample && d.sample.length > 0 )?.sample )
  return safePick ( enums.length > 0 ? enums : samples, i )
}

const addPrimitive = <G> ( acc: any, path: string[], one: OneDataDD<G> | undefined, d: PrimitiveDD, i: number ) =>
  parsePathFromListFromPage ( path ).set ( acc, selectSample ( i, one, d ) );

export function makeTsSample<G> ( d: CompDataD<G>, i: number ): any {
  let foldStoppingAtRepeats = {
    stopAtDisplay: false,
    offset: 0,
    foldData: ( acc, path, parents, oneDataDD, dataDD, start ) => {
      if ( oneDataDD?.sampleOffset && oneDataDD?.sampleOffset > 0 )
        if ( start ) foldStoppingAtRepeats.offset = foldStoppingAtRepeats.offset + oneDataDD.sampleOffset;
        else foldStoppingAtRepeats.offset = foldStoppingAtRepeats.offset - oneDataDD.sampleOffset
      return addData ( start, path, acc, dataDD )
    },
    foldRep: ( acc, path, parents, oneDataDD, dataDD, start ) =>
      start ? acc : parsePathFromListFromPage ( path ).transform ( child => [ child, ...makeTsSampleForRepeats ( dataDD, i ) ] ) ( acc ),
    foldPrim: ( acc, path, parents, oneDataDD, dataDD ) =>
      addPrimitive ( acc, path, oneDataDD, dataDD, i + foldStoppingAtRepeats.offset )
  };
  return foldDataDD<any, G> ( d, [], [], {}, foldStoppingAtRepeats )
}

export function makeTsSampleForRepeats<G> ( r: RepeatingDataD<G>, i: number ): any[] {
  const count = r.sampleCount ? r.sampleCount : 3
  return [ ...Array ( 100 ).keys () ].slice ( count * i + 1, count * (i + 1) ).map ( i => makeTsSample ( r.dataDD, i ) )
}


export function makeSampleVariable<G> ( params: TSParams, d: CompDataD<G>, i: number ): string[] {
  return [
    `export const ${sampleName ( d )}${i}: ${params.domainsFile}.${domainName ( d )} = `,
    ...JSON.stringify ( makeTsSample ( d, i ), null, 2 ).split ( '\n' )
  ]
}
export function makeAllSampleVariables<G> ( params: TSParams, ps: RefD<G>[], i: number ): string[] {
  return sortedEntries ( dataDsIn ( ps ) ).flatMap ( ( [ name, dataD ] ) => makeSampleVariable ( params, dataD, i ) )
}


// export function makeJavaDataSample ( d: DataD, i: number ): string[] {
//   const contents: string = sortedEntries ( d.structure ).map ( ( [ name, value ] ) => [ `"${name}"`, ...makeJavaSample ( value.dataDD, i ) ] ).join ( "," )
//   return [ `Map.of(${contents})` ]
// }
export function makeJavaSample<G> ( d: CompDataD<G>, i: number ): string[] {
  const sample = makeTsSample ( d, i );
  return asMultilineJavaString ( JSON.stringify ( sample, null, 2 ).split ( "\n" ), '       ' )
}

export function makeJavaVariable<G> ( d: CompDataD<G>, i: number ): string[] {
  if ( isDataDd ( d ) )
    return [ `public static Map ${sampleName ( d ) + i} =  parse.parseMap(`, ...makeJavaSample ( d, i ), ");" ]
  if ( isRepeatingDd ( (d) ) )
    return [ `public static List ${sampleName ( d ) + i} =  parse.parseList(`, ...makeJavaSample ( d, i ), ");" ]
}
export function makeAllJavaVariableName<G> ( ps: RefD<G>[], i: number ): string[] {
  return sortedEntries ( dataDsIn ( ps ) ).flatMap ( ( [ name, dataD ] ) => makeJavaVariable ( dataD, i ) )
}

export function makeAllEmptyData<G> ( params: TSParams, ps: RefD<G>[] ): string[] {
  return sortedEntries ( dataDsIn ( ps, false ) ).flatMap ( ( [ name, dd ] ) =>
    [ `export const ${emptyName ( dd )}:${params.domainsFile}.${domainName ( dd )} =`, ...indentList ( JSON.stringify ( makeEmptyData ( dd ), null, 2 ).split ( "\n" ) ) ] )
}
export function makeEmptyData<G> ( d: AllDataDD<G> ): any{
  let folder: AllDataFolder<any, G> = {
    stopAtDisplay: false,
    foldData: ( acc, path, parents, oneDataDD, dataDD, start ) =>
      addData ( start, path, acc, dataDD ),
    foldRep: ( acc, path, parents, oneDataDD, dataDD, start ) =>
      start ? acc : parsePathFromListFromPage ( path ).transform ( child => [ child ] ) ( acc ),
    foldPrim: ( acc, path, parents, oneDataDD, dataDD ) =>
      parsePathFromListFromPage ( path ).set ( acc, dataDD.emptyValue)
  };
  return foldDataDD ( d, [], [], {  }, folder )
}
