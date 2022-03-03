import { AllDataFlatMap, DataD, flatMapDD, OneDataDD, PrimitiveDD, RepeatingDataD } from "../common/dataD";
import { defaultRestAction, RestD } from "../common/restD";
import { filterParamsByRestAction, indent, indentList } from "./codegen";
import { queryName, resolverName } from "./names";
import { asMultilineJavaString, RestAction, sortedEntries } from "@focuson/utils";


const makeQueryFolder: AllDataFlatMap<string> = {
  walkDataStart ( path: string[], parents: DataD[], oneDataDD: OneDataDD | undefined, dataDD: DataD ): string[] {
    return path.length == 0 ? [] : [ indent ( path, path[ path.length - 1 ] + "{" ) ];
  },
  walkDataEnd ( path: string[], parents: DataD[], oneDataDD: OneDataDD | undefined, dataDD: DataD ): string[] {
    return [ indent ( path, '}' ) ];
  },
  walkPrim ( path: string[], parents: DataD[], oneDataDD: OneDataDD | undefined, dataDD: PrimitiveDD ): string[] {
    return [ indent ( path, path[ path.length - 1 ] ) ];
  },
  walkRepStart ( path: string[], parents: DataD[], oneDataDD: OneDataDD | undefined, dataDD: RepeatingDataD ): string[] {
    return [];
  },
  walkRepEnd ( path: string[], parents: DataD[], oneDataDD: OneDataDD | undefined, dataDD: RepeatingDataD ): string[] {
    return [];
  },
}
export function makeQuery ( r: RestD, action: RestAction ): string[] {
  const paramString = sortedEntries ( r.params ).filter ( filterParamsByRestAction ( action ) ).map ( ( [ name, p ], i ) => `"${name}:" + "\\"" + ${name} + "\\"" ` ).join ( ` + "," + ` )
  const objParamString = defaultRestAction[ action ].params.needsObj ? ` +  ", obj:" + obj ` : ""
  const prefix = defaultRestAction[ action ].query.toLowerCase ()
  return [ `"${prefix}{${resolverName ( r.dataDD, defaultRestAction[ action ] )}(\" + ${paramString}${objParamString}+ \"){"+`,
    ...asMultilineJavaString ( flatMapDD ( r.dataDD, makeQueryFolder ), '      ' ), '+"}";}' ]
}

export function makeJavaVariablesForGraphQlQuery ( rs: RestD[] ): string[] {
  return rs.flatMap ( r => {
    return r.actions.flatMap ( action => {
      const paramString = sortedEntries ( r.params ).filter ( filterParamsByRestAction ( action ) ).map ( ( [ name, p ], i ) => `String ${name}` ).join ( "," )
      const objParamString = defaultRestAction[ action ].params.needsObj ? `, String obj` : ""
      return [
        `public static  String ${queryName ( r, action )}(${paramString}${objParamString}){ `,
        "   return",
        ...makeQuery ( r, action ) ];
    } )
  } )
}
