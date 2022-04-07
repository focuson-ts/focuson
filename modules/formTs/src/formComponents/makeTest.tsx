import { LensProps } from "@focuson/state";
import { FocusOnContext, traceL } from "@focuson/focuson";
import { fromPathGivenState, HasPageSelectionLens } from "@focuson/pages";
import { safeArray } from "@focuson/utils";


export function MakeTest<S, C> ( { state }: LensProps<S, any, C> ) {
  function onClick () {
    const traces = state.copyWithLens<any> ( traceL<S> () ).optJson ()
    const result = safeArray ( traces ).map ( ( j, i ) => `const step${i} = ${JSON.stringify ( j, null, 2 )}` )
    const allTraces = `const allSteps = [${result.map ( ( r, i ) => `step${i}` ).join ( ',' )}]`
    navigator.clipboard.writeText ( result.join ( '\n\n' ) + '\n\n' + allTraces )
  }
  return <button onClick={onClick}>Make Test</button>
}

export function AssertPages<S, C extends HasPageSelectionLens<S>> ( { state }: LensProps<S, any, C> ) {
  function onClick () {
    const pages = state.copyWithLens ( state.context.pageSelectionL ).optJson ()
    navigator.clipboard.writeText ( JSON.stringify ( { pages } ) )
  }
  return <button onClick={onClick}>Assert Page</button>

}

export function AssertState<S, C extends FocusOnContext<S>> ( { state }: LensProps<S, any, C> ) {
  function onChange ( e: any ) {
    try {
      let json: any = fromPathGivenState<S, C> ( state ) ( e.target.value ).getOption ( state.main );
      console.log ( e.target.value, json )
      navigator.clipboard.writeText ( JSON.stringify ( { assert: { focusOn: e.target.value, json } } ) )
    } catch ( e: any ) {
      console.log ( e )
    }
  }
  return <div>
    <input onChange={onChange} type='text'/>
  </div>

}