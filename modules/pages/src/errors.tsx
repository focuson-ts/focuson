import { safeFlatten } from "@focuson/utils";
import { useRef } from "react";

export interface ErrorhandlingProps {
  'aria-errormessage': string;
  'aria-invalid': boolean

}

export function wrapWithErrors ( id: string, errors: string[][] | undefined, fn: ( props: ErrorhandlingProps, error: boolean ) => JSX.Element ) {
  const errorId = id + '.error';
  const flatErrors = safeFlatten ( errors );
  const ref = useRef<HTMLUListElement> ( null );
  const error = flatErrors.length > 0;
  const props: ErrorhandlingProps = { 'aria-errormessage': errorId, 'aria-invalid': error }
  return <span className='tooltip-wrap'>{fn ( props, error )}
    <ul ref={ref} hidden={true} className='errormessage tooltip' id={errorId}>{flatErrors.map ( f => <li key={f}>{f}</li> )}</ul>
  </span>
}