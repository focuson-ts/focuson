import { safeFlatten } from "@focuson/utils";
import { useRef } from "react";

export function wrapWithErrors ( id: string, errors: string[][] | undefined, fn: ( errorId: string, errors: string[], error: boolean, onMouseOver: ( e: any ) => void ,onMouseOut: ( e: any ) => void ) => JSX.Element ) {
  const errorId = id + '.error';
  const flatErrors = safeFlatten ( errors );
  const ref = useRef<HTMLUListElement> ( null );
  function onMouseOver ( e: any ) {
    ref.current.hidden = false
  }
  function onMouseOut ( e: any ) {
    ref.current.hidden = true
  }
  return <div>{fn ( errorId, flatErrors, flatErrors.length > 0, onMouseOver, onMouseOut )}
    <ul ref={ref}className='errormessage' id={errorId}>{flatErrors.map ( f => <li key={f}>{f}</li> )}</ul>
  </div>
}