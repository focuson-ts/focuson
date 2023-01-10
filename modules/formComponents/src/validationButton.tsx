import { findValidityDetails, focusPageClassName } from "@focuson-nw/pages";


export interface ValidationButtonProps<S, C> {
  id: string;
  name: string;

}
export function ValidationButton<S, C> ( { id, name }: ValidationButtonProps<S, C> ) {
  function onClick () {
    const validity = findValidityDetails ( focusPageClassName, true )
    const content = document.getElementById ( `${id}-result` )
    console.log ( 'content', content )
    if ( content ) {
      content.textContent = validity.join ( "\n" )
    }
  }
  return <div>
    <button id={id} onClick={onClick}>ValidateDebug</button>
    <pre id={id + '-result'}></pre>
  </div>
}