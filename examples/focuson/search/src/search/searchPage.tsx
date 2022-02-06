import { focusedPageWithExtraState } from "@focuson/pages";
import { LensProps } from "@focuson/state";
import { FullSearchDomain } from "./fullSearchDomain";


export function SearchQueryModalPage<S extends any> ( { state }: LensProps<S, string> ): JSX.Element {
  return <div><label>Search</label><input type='text' defaultValue={state.optJson ()}/></div>
}

export function textChangedEvent(id: string, fn: (value: string) => void): (e: any) => void {
  return (e) => {
    // @ts-ignore
    const value: string = document.getElementById(id)?.value
    console.log('keycode', e.keyCode, e.charCode, value, e)
    if (e.charCode === 13 && value) fn(value)
  }
}

interface InputProps<S> extends LensProps<S, any> {
  id: string;
  placeholder?: string,
  inputStyle?: any;
  readonly?: boolean
  ariaLabel?: string
}

function Input<S> ({ id, inputStyle, state, readonly, ariaLabel } : InputProps<S>) {
  function onChange(s?: string) {
    if (s) state.setJson(s);
  }
  console.log("Input", state.optJson())
  return <input  id={id} type="text" style={inputStyle}
                onKeyPress={textChangedEvent(id, onChange)}
                onBlur={(e) => onChange(e.target?.value)}
                readOnly= {readonly}
                aria-label={ariaLabel}
                defaultValue={state.optJson()}/>;
}
export function SearchPage<S extends any> () {
  return focusedPageWithExtraState<S, FullSearchDomain, string[]> ( s => 'Search' ) ( s => s.focusOn ( 'queryResults' ) ) (
    ( state, { query }, queryResults ) =>
      (<ul><Input id='query' state={state.focusOn('query')}/>
        <br/><pre>{JSON.stringify(queryResults,null,2)}</pre><br /><br /><br /><pre>{JSON.stringify(state.main,null,2)} </pre></ul>) )
      // (<ul><input type='text' defaultValue={query}/><br/>{safeArray ( queryResults ).map ( ( r, i ) => <li key={i}>{r}</li> )} </ul>) )
}