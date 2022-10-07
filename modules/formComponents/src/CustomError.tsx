import { useEffect, useRef } from "react";


const canHaveErrorMessage = 'edited';

export const setEdited = ( e: HTMLElement | undefined ) => {
  if ( e ) e.dataset[ canHaveErrorMessage ] = 'true'
};
export interface CustomErrorProps {
  id: string
  validationMessage?: string
  error?: boolean
}

export function CustomError ( { id, validationMessage, error }: CustomErrorProps ) {
  const ref: any = useRef ();
  useEffect ( () => {
    const errorDiv: any = ref.current
    const component: any = document.getElementById ( id )
    const hasBeenEdited = component?.dataset?.[ canHaveErrorMessage ] === 'true'
    const actualError = error === undefined ? component.checkValidity () : error
    // console.log ( 'CustomError - valid', id, 'actualError', actualError, 'checkValidity', component.checkValidity (), validationMessage, 'hasBeenEdited', hasBeenEdited )
    if ( !hasBeenEdited ) return
    if ( actualError ) {
      errorDiv.className = 'custom-error'
      errorDiv.innerHTML = validationMessage ? validationMessage : component.validationMessage
      errorDiv.hidden = false
    } else {
      errorDiv.hidden = true
      errorDiv.className = ''
    }

  } )
  return <div ref={ref} id={id + '.error'} hidden={true}/>
}