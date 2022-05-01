import { AllDataFlatMap, DataD, flatMapDD, OneDataDD, PrimitiveDD, RepeatingDataD } from "../common/dataD";
import { RestD } from "../common/restD";
import { addStringToStartOfFirst, filterParamsByRestAction, indent } from "./codegen";
import { queryName, resolverName } from "./names";
import { asMultilineJavaString, RestAction, sortedEntries } from "@focuson/utils";
import { getRestTypeDetails } from "@focuson/rest";


function makeQueryFolder<G> (): AllDataFlatMap<string, G> {
  return {
    walkDataStart ( path: string[], parents: DataD<G>[], oneDataDD: OneDataDD<G> | undefined, dataDD: DataD<G> ): string[] {
      return path.length == 0 ? [] : [ indent ( path, path[ path.length - 1 ] + "{" ) ];
    },
    walkDataEnd ( path: string[], parents: DataD<G>[], oneDataDD: OneDataDD<G> | undefined, dataDD: DataD<G> ): string[] {
      return [ indent ( path, '}' ) ];
    },
    walkPrim ( path: string[], parents: DataD<G>[], oneDataDD: OneDataDD<G> | undefined, dataDD: PrimitiveDD ): string[] {
      return [ indent ( path, path[ path.length - 1 ] ) ];
    },
    walkRepStart ( path: string[], parents: DataD<G>[], oneDataDD: OneDataDD<G> | undefined, dataDD: RepeatingDataD<G> ): string[] {
      return [];
    },
    walkRepEnd ( path: string[], parents: DataD<G>[], oneDataDD: OneDataDD<G> | undefined, dataDD: RepeatingDataD<G> ): string[] {
      return [];
    }
  }
}

export function makeQuery<G> ( r: RestD<G>, action: RestAction ): string[] {
  let params = sortedEntries ( r.params ).filter ( filterParamsByRestAction ( action ) );
  const paramString = params.map ( ( [ name, p ], i ) => `"${name}:" + "\\"" + ${name} + "\\"" ` ).join ( ` + "," + ` )
  const comma = params.length === 0 ? '' : ','
  const plus = params.length === 0 ? '' : '+ '
  const objParamString = getRestTypeDetails ( action ).params.needsObj ? ` ${plus}"${comma} obj:" + obj ` : ""
  const prefix = getRestTypeDetails ( action ).query.toLowerCase ()
  let allParams = `${paramString}${objParamString}`;
  let allParamsAndBrackets = allParams === '' ? '' : `(\" + ${allParams}+ \")`;
  const needsResultFilter = getRestTypeDetails ( action ).output.needsObj
  const resultFilter = needsResultFilter ? asMultilineJavaString ( flatMapDD ( r.dataDD, makeQueryFolder () ), '      ' ) : []
  const openingString = needsResultFilter ? '{"+' : '}";'
  const closingString = needsResultFilter ? '+"}";}' : '}'
  return [ `"${prefix}{${resolverName ( r, getRestTypeDetails ( action ) )}${allParamsAndBrackets}${openingString}`,
    ...resultFilter,
    closingString ]
}

export const makeGraphQlQueryForOneAction = <G> ( r: RestD<G> ) => ( action: RestAction ) => {
  let params = sortedEntries ( r.params ).filter ( filterParamsByRestAction ( action ) );
  const paramString = params.map ( ( [ name, p ], i ) => `String ${name}` ).join ( "," )
  let zeroParams = paramString.length === 0;
  const comma = zeroParams ? '' : ', '
  const objParamString = getRestTypeDetails ( action ).params.needsObj ? `${comma}String obj` : ""
  return [
    `public static  String ${queryName ( r, action )}(${paramString}${objParamString}){ `,
    ...addStringToStartOfFirst ( '  return' ) ( makeQuery ( r, action ) ) ];
}
export const makeJavaVariablesForGraphQlQuery = <G> ( rs: RestD<G>[] ): string[] =>
  rs.flatMap ( r => r.actions.flatMap ( makeGraphQlQueryForOneAction ( r ) ) );
