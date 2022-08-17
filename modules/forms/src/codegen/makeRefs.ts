import { TSParams } from "./config";
import { RefD } from "../common/pageD";
import { toArray } from "@focuson/utils";

export function makeRefs<G> ( params: TSParams, refs: RefD<any>[] ): string[] {
  const allGroups = refs.flatMap ( ref => toArray ( ref.refGroups ) )
  if ( allGroups.length===0 ) return [ `export const thereAreNoRefGroupsToBeLoaded='so not needed'` ]
  return [ `//AllGroups: ${allGroups}`,
    ...allGroups.flatMap ( g => {
      const theseRefs = refs.filter ( r => toArray ( r.refGroups ).includes ( g ) );
      return [ `export function load${g}(){`,
        ...theseRefs.map ( r => `//${r.name}` ),
        '}', '' ]
    } ) ]
}