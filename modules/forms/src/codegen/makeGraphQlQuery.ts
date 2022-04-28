import { AllDataFlatMap, DataD, flatMapDD, OneDataDD, PrimitiveDD, RepeatingDataD } from "../common/dataD";
import { defaultRestAction, RestD } from "../common/restD";
import { filterParamsByRestAction, indent } from "./codegen";
import { queryName, resolverName } from "./names";
import { asMultilineJavaString, RestAction, sortedEntries } from "@focuson/utils";


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
  const objParamString = defaultRestAction[ action ].params.needsObj ? ` ${plus}"${comma} obj:" + obj ` : ""
  const prefix = defaultRestAction[ action ].query.toLowerCase ()
  let allParams = `${paramString}${objParamString}`;
  let allParamsAndBrackets = allParams === '' ? '' : `(\" + ${allParams}+ \")`;
  return [ `"${prefix}{${resolverName ( r, defaultRestAction[ action ] )}${allParamsAndBrackets}{"+`,
    ...asMultilineJavaString ( flatMapDD ( r.dataDD, makeQueryFolder () ), '      ' ), '+"}";}' ]
}

export function makeJavaVariablesForGraphQlQuery<G> ( rs: RestD<G>[] ): string[] {
  return rs.flatMap ( r => {
    return r.actions.flatMap ( action => {
      let params = sortedEntries ( r.params ).filter ( filterParamsByRestAction ( action ) );
      const paramString = params.map ( ( [ name, p ], i ) => `String ${name}` ).join ( "," )
      let zeroParams = paramString.length === 0;
      const comma = zeroParams ? '' : ', '
      const objParamString = defaultRestAction[ action ].params.needsObj ? `${comma}String obj` : ""
      return [
        `public static  String ${queryName ( r, action )}(${paramString}${objParamString}){ `,
        "   return",
        ...makeQuery ( r, action ) ];
    } )
  } )
}
