import { AllDataFlatMap, DataD, flatMapDD, OneDataDD, PrimitiveDD, RepeatingDataD } from "../common/dataD";
import { defaultRestAction,  RestD } from "../common/restD";
import { indent, indentList } from "./codegen";
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
  const paramString = sortedEntries ( r.params ).map ( ( [ name, p ], i ) => `"${name}:" + "\\"" + ${name} + "\\"" ` ).join ( ` + "," + ` )
  // const paramString = "params"
  return [ `"{${resolverName ( r.dataDD, defaultRestAction[ action ] )}(\" + ${paramString}+ \"){"+`,
    ...asMultilineJavaString ( flatMapDD ( r.dataDD, makeQueryFolder ), '      ' ), '+"}";}']
}

export function makeJavaVariablesForGraphQlQuery ( rs: RestD[] ): string[] {
  return rs.flatMap ( r => {
    const paramString = sortedEntries ( r.params ).map ( ( [ name, p ], i ) => `String ${name}` ).join ( "," )
    return r.actions.flatMap ( action => [
      `public static  String ${queryName ( r, action )}(${paramString}){ `,
      "   return",
      ...makeQuery ( r, action )] )
  } )
}
