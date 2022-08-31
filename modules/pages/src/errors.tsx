import { safeFlatten } from "@focuson/utils";
import { useRef } from "react";

export interface ErrorhandlingProps {
  'aria-errormessage': string;
  'aria-invalid': boolean

}

export function enableByToLi ( e: string ) {return <li key={e}>{e}</li>}

export function wrapWithErrors ( id: string, errors: string[][] | undefined, fn: ( props: ErrorhandlingProps, error: boolean, errorRef: React.MutableRefObject<HTMLUListElement> ) => JSX.Element ) {
  const errorId = id + '.error';
  const flatErrors = safeFlatten ( errors );
  const ref: React.MutableRefObject<HTMLUListElement> = useRef<HTMLUListElement> ( null );
  const error = flatErrors.length > 0;
  const props: ErrorhandlingProps = { 'aria-errormessage': errorId, 'aria-invalid': error }
  return <span className='tooltip-wrap'>{fn ( props, error, ref )}
    <ul ref={ref} hidden={true} className='errormessage tooltip' id={errorId}>{flatErrors.map ( enableByToLi )}</ul>
  </span>
}