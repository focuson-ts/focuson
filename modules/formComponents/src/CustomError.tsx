import { useEffect, useRef } from "react";


const canHaveErrorMessage = 'edited';

export const setEdited = ( e: HTMLElement | undefined, data: string | undefined ) => {
  if ( e ) {
    const validData = data != undefined && data.length > 0
    console.log ( 'setEdited', data, validData )
    e.dataset[ canHaveErrorMessage ] = validData ? 'true' : undefined
  }
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
    const actualError = error === undefined &&component? !component.checkValidity () : error
    // console.log ( 'CustomError - valid', id, 'actualError', actualError, 'checkValidity', component.checkValidity (), validationMessage, 'hasBeenEdited', hasBeenEdited )
    if ( hasBeenEdited && actualError ) {
      errorDiv.className = 'custom-error'
      const msg = validationMessage ? validationMessage : component.validationMessage;
      errorDiv.innerHTML = msg
      // component.setCustomValidity(msg)
      // component.reportValidity()
      errorDiv.hidden = false
    } else {
      // component.setCustomValidity('')
      // component.reportValidity()
      errorDiv.hidden = true
      errorDiv.className = ''
    }

  } )
  return <div ref={ref} id={id + '.error'} hidden={true}/>
}