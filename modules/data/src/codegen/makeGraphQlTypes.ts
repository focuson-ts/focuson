import { AllDataDD, AllDataFlatMap, DataD, emptyDataFlatMap, findDataDDIn, isDataDd, isRepeatingDd } from "../common/dataD";

export const makeGraphQlTypeFolder: AllDataFlatMap<string> = {
  stopAtDisplay: false,
  ...emptyDataFlatMap (),
  walkDataStart: ( path, oneDataDD, dataDD ) => [ `type ${dataDD.name}{` ],
  walkPrim: ( path, oneDataDD, dataDD ) => [ `  ${path.slice ( -1 )}: ${dataDD.graphQlType}` ],
  walkDataEnd: ( path, oneDataDD, dataDD ) => [ '}' ]
}

const rawTypeName = ( d: AllDataDD ): string => isRepeatingDd ( d ) ? rawTypeName ( d.dataDD ) : d.graphQlType ? d.graphQlType : d.name;
export function createGraphQlType ( a: AllDataDD ): string[] {
  const dataDs: DataD[] = findDataDDIn ( a )

  function theType ( d: AllDataDD ): string {
    if ( isDataDd ( d ) ) return rawTypeName ( d ) + "!"
    if ( isRepeatingDd ( d ) ) return "[" + theType ( d.dataDD ) + "]!"
    return d.graphQlType ? d.graphQlType : 'String'
  }
  return dataDs.flatMap ( dataD => [
    `type ${rawTypeName ( dataD )}{`,
    ...Object.entries ( dataD.structure ).map ( ( [ name, v ] ) => `  ${name}: ${theType ( v.dataDD )}` ),
    '}', '' ]
  )
}