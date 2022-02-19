import { AllDataFlatMap, DataD, emptyDataFlatMap, flatMapDD } from "../common/dataD";
import { RestD } from "../common/restD";
import { indent } from "./codegen";
import { applyToTemplate } from "@focuson/template";
import { queryName } from "./names";
import { asMultilineJavaString } from "@focuson/utils";


export const makeQueryFlatMap: AllDataFlatMap<string> = {
  stopAtDisplay: false,
  ...emptyDataFlatMap (),
  walkDataStart: ( path, parents: DataD[], oneDataDD, dataDD ) =>
    [ indent ( path, dataDD.name + "{" ) ],
  walkDataEnd: ( path, oparents: DataD[], neDataDD, dataDD ) => [ indent ( path, "}" ) ],
  walkPrim: ( path, onparents: DataD[], eDataDD, dataDD ) => [ indent ( path, path[ path.length - 1 ] ) ],
}

export function makeQueryForRest ( restD: RestD ): string[] {
  return [ 'query{', ...flatMapDD<string> ( restD.dataDD, makeQueryFlatMap ), '}' ]
}

export function makeJavaVariablesForGraphQlQuery ( rs: RestD[] ): string[] {
  return rs.flatMap ( r => {
    const q = makeQueryForRest
    return [ `public static  String ${queryName ( r )} = `, ...asMultilineJavaString ( makeQueryForRest ( r ), '     ' ), ";" ]
  } )
}
