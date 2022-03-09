import { findValidityDetails, focusPageClassName } from "@focuson/pages";


export interface ValidationButtonProps<S, C> {
  id: string;
  name: string;

}
export function ValidationButton<S, C> ( { id, name }: ValidationButtonProps<S, C> ) {


  function onClick () {
    const validity = findValidityDetails ( focusPageClassName )
    const content = document.getElementById ( `${id}-result` )
    console.log ( 'content', content )
    if ( content ) {
      content.textContent = validity.join ( "\n" )
    }
  }
  return <div>
    <button id={id} onClick={onClick}>ValidateDebug</button>
    <pre id={id + '-result'}>They will go here</pre>
  </div>
}