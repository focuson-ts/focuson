import { useEffect, useRef } from "react";


const canHaveErrorMessage = 'edited';

export const setEdited = ( e: HTMLElement | undefined ) => {
  if ( e ) e.dataset[ canHaveErrorMessage ] = 'true'
};
export interface CustomErrorProps {
  id: string
}

export function CustomError ( { id }: CustomErrorProps ) {
  const ref: any = useRef ();
  useEffect ( () => {
    const errorDiv: any = ref.current
    const component: any = document.getElementById ( id )
    const dataErrorMessage = component.getAttribute ( 'data-errormessage' )
    const hasBeenEdited = component?.dataset?.[ canHaveErrorMessage ] === 'true'
    console.log ( 'CustomError - valid', id, component.checkValidity (), dataErrorMessage, hasBeenEdited )
    if ( !hasBeenEdited ) return
    if ( component.checkValidity () ) {
      errorDiv.hidden = true
      errorDiv.className = ''
      return
    }
    errorDiv.className = 'custom-error'
    errorDiv.innerHTML = dataErrorMessage ? dataErrorMessage : component.validationMessage
    errorDiv.hidden = false


  } )
  return <div ref={ref} id={id + '.error'} hidden={true}/>
}