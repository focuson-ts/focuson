import { LensProps, reasonFor } from '@focuson/state';
import { PageSelectionContext, replaceTextUsingPath } from "@focuson/pages";
import { wrapWithErrors } from "@focuson/pages";


export interface ToggleButtonProps<S, T, Context> extends LensProps<S, boolean, Context> {
  id: string;
  buttonText: string;
  enabledBy?: string[][]
  defaultValue?: boolean
}

export function ToggleButton<S, T, Context extends PageSelectionContext<S>> ( props: ToggleButtonProps<S, boolean, Context> ) {
  const { id, state, buttonText, enabledBy, defaultValue } = props
  const text = replaceTextUsingPath ( state, buttonText )
  return wrapWithErrors ( id, enabledBy, [], ( errorProps, error ) =>
    <button id={id} {...errorProps} disabled={error} onClick={() => state.setJson ( !state.optJsonOr ( defaultValue ? defaultValue : false ) , reasonFor ( 'ToggleButton', 'onClick', id ) )}>{text}</button> )
}
