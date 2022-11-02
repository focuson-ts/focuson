import { TSParams } from "./config";
import { RefD } from "../common/pageD";
import { toArray, unique } from "@focuson/utils";
import { indentList } from "./codegen";

export function makeRefs<G> ( params: TSParams, refs: RefD<any>[] ): string[] {
  const allGroups = unique(refs.flatMap ( ref => toArray ( ref.refGroups ) ), g => g)
  return [
    `import { FocusOnContext, transformersForRestForRef } from "@focuson/focuson";`,
    `import { LensState, reasonFor } from "@focuson/state";`,
    `//AllGroups: ${allGroups}`,
    ...allGroups.flatMap ( g => {
      const theseRefs = refs.filter ( r => toArray ( r.refGroups ).includes ( g ) );
      const refNames = theseRefs.map ( r => r.name )
      const name = `load${g}`
      return [
        `export function ${name}<S,C extends FocusOnContext<S>>(state: LensState<S,any,C>){`,
        ...indentList ( [
          `const pageNames = ${JSON.stringify ( refNames )}`,
          `const transformers = pageNames.map ( transformersForRestForRef ( state ) )`,
          `state.massTransform ( reasonFor ( '${name}', 'changeRaw' ) ) ( ...transformers )`,
          '}' ] ),
        '' ]
    } ),
    `var firstTime = true`,
    `export function loadAtStart<S, C extends FocusOnContext<S>> ( state: LensState<S, any, C> ) {`,
    `  if ( firstTime ) {`,
    `    firstTime = false`,
    ...allGroups.map ( g => `load${g}(state)` ),
    `  }`,
    `}`,
  ]
}