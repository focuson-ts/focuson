import { AllDataFlatMap, DataD, emptyDataFlatMap, flatMapDD } from "../common/dataD";
import { RestD } from "../common/restD";

export const indent = ( path: string[], s: string ): string => ' '.repeat ( path.length * 2 + 2 ) + s;
export const indentList = ( ss: string[] ): string[] => ss.map ( s => ' ' + s )


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

