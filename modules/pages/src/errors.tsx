import { safeFlatten } from "@focuson/utils";
import { useRef } from "react";

export interface ErrorhandlingProps {
  'aria-errormessage': string;
  'aria-invalid': boolean

}

export function enableByToLi ( e: string ) {return <li key={e}>{e}</li>}

export function wrapWithErrors ( id: string, errors: string[][] | undefined, extraConditions: [ boolean, string ][], fn: ( props: ErrorhandlingProps, error: boolean, errorRef: React.MutableRefObject<HTMLUListElement>, allErrors: string[] ) => JSX.Element ) {
  const errorId = id + '.error';
  const extras = extraConditions.filter ( e => e[ 0 ] === true ).map ( e => e[ 1 ] )
  const allErrors: string[] = [ ...extras, ...safeFlatten ( errors ) ];
  const ref: React.MutableRefObject<HTMLUListElement> = useRef<HTMLUListElement> ( null );
  const error = allErrors.length > 0;
  const props: ErrorhandlingProps = { 'aria-errormessage': errorId, 'aria-invalid': error }
  return <span className='tooltip-wrap'>{fn ( props, error, ref , allErrors)}
    <ul ref={ref} hidden={true} className='errormessage tooltip' id={errorId}>{allErrors.map ( enableByToLi )}</ul>
  </span>
}