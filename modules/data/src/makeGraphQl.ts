import { FetchDD, FetchParams, FetchParamsDD } from "./example/example.fetchD";
import { AllDataDD, DataD, isDataDd, isRepeatingDd, PrimitiveDD, RepeatingDataD } from "./common/dataD";

const indent = ( ss: string[] ): string[] => ss.map ( s => '  ' + s );


export function makeGraphQlForDataDd ( name: string, d: DataD ): string[] {
  return [ name + "{",
    ...indent ( Object.entries ( d.structure ).flatMap ( ( [ k, v ] ) => {
        // let description = v.label ? [ `# Label${v.label}` ] : [];
        return makeGraphQlForDD ( k, v.dataDD )
      }
    ) ), "}" ];
}
export function makeGraphQlForRepeatingDd ( name: string, d: RepeatingDataD ): string[] {
  return indent ( makeGraphQlForDD ( name, d.dataDD ) );
}


export function makeGraphQlForPrimitiveDd ( name: string, p: PrimitiveDD ): string[] {
  return [ name ]
}
export function makeGraphQlForDD ( name: string, d: AllDataDD ): string[] {
  if ( isDataDd ( d ) ) return makeGraphQlForDataDd ( name, d )
  if ( isRepeatingDd ( d ) ) return makeGraphQlForRepeatingDd ( name, d );
  return makeGraphQlForPrimitiveDd ( name, d )
}

export function makeGraphQlForView<V extends FetchDD<P>, P extends FetchParamsDD> ( name: string, view: FetchDD<P>, params: FetchParams<P> ): string[] {
  const paramsEntries = Object.entries ( params )
  const paramsString = paramsEntries.length == 0 ? "" : '(' + paramsEntries.map ( ( [ k, v ] ) => `${k}: "${v}")` )
  return makeGraphQlForDD ( name + paramsString, view.dataDD )
}