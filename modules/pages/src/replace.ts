import { LensState } from "@focuson/state";
import { fromPathGivenState, PageSelectionContext } from "./pageSelection";


export function replaceTextUsingPath<S, Context extends PageSelectionContext<S>> ( state: LensState<S, any, Context>, label: string ) {
  const from = fromPathGivenState ( state )
  function replaceIt ( f: string ) {
    const parts = f.slice ( 1, -1 ).split ( "|" )
    const value = from ( parts[ 0 ] ).getOption ( state.main )
    if ( parts.length == 1 ) return `${value}`
    if ( typeof value == 'boolean' ) {
      if ( parts.length == 3 ) return value ? parts[ 2 ] : parts[ 1 ]
      throw new Error ( `Label is ${label} Replacing string ${f} and it's a boolean [${value}], but there are ${parts.length - 1} options, not 2` )
    }
    if ( typeof value == 'number' ) {
      if ( value >= 0 && value <= parts.length ) return parts[ value + 1 ]
      throw new Error ( `Label is ${label} Replacing string ${f} and it's a string [${value}], but there are ${parts.length - 1} options, and this value is out of range` )
    }
  }
  const text = label.replace ( /{[^}]*}/g, replaceIt )
  return text;
}