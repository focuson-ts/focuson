import { safeFlatten } from "@focuson/utils";
import { useRef } from "react";

export function wrapWithErrors ( id: string, errors: string[][] | undefined, fn: ( errorId: string, errors: string[], error: boolean ) => JSX.Element ) {
  const errorId = id + '.error';
  const flatErrors = safeFlatten ( errors );
  const ref = useRef<HTMLUListElement> ( null );
  return <span className='tooltip-wrap'>{fn ( errorId, flatErrors, flatErrors.length > 0 )}
    <ul ref={ref} hidden={true} className='errormessage tooltip' id={errorId}>{flatErrors.map ( f => <li key={f}>{f}</li> )}</ul>
  </span>
}