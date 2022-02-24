import { focusedPage, focusedPageWithExtraState } from "@focuson/pages";
import { LensProps } from "@focuson/state";
import { FullSearchDomain } from "./fullSearchDomain";


export function SearchQueryModalPage<S extends any, Context> () {
  return focusedPage<S, string, Context> ( s => 'Search' )
  ( ( state ) => <div><label>Search</label><input type='text' defaultValue={state.optJson ()}/></div> )
}

export function textChangedEvent ( id: string, fn: ( value: string ) => void ): ( e: any ) => void {
  return ( e ) => {
    // @ts-ignore
    const value: string = document.getElementById ( id )?.value
    console.log ( 'keycode', e.keyCode, e.charCode, value, e )
    if ( e.charCode === 13 && value ) fn ( value )
  }
}

interface InputProps<S, Context> extends LensProps<S, any, Context> {
  id: string;
  placeholder?: string,
  inputStyle?: any;
  readonly?: boolean
  ariaLabel?: string
}

function Input<S, Context> ( { id, inputStyle, state, readonly, ariaLabel }: InputProps<S, Context> ) {
  function onChange ( s?: string ) {
    if ( s ) state.setJson ( s );
  }
  console.log ( "Input", state.optJson () )
  return <input id={id} type="text" style={inputStyle}
                onKeyPress={textChangedEvent ( id, onChange )}
                onBlur={( e ) => onChange ( e.target?.value )}
                readOnly={readonly}
                aria-label={ariaLabel}
                defaultValue={state.optJson ()}/>;
}
export function SearchPage<S extends any, Context> () {
  //I think this was the wrong selection of type of page... Because the page shouldn't show 'loading' if the search results aren't set
  //Need a second example
  return focusedPageWithExtraState<S, FullSearchDomain, string[], Context> ( s => 'Search' ) ( s => s.focusOn ( 'queryResults' ) ) (
    ( fullState, state, { query }, queryResults ) =>
      (<ul><Input id='query' state={fullState.focusOn ( 'query' )}/>
        <br/>
        <pre>{JSON.stringify ( queryResults, null, 2 )}</pre>
        <br/><br/><br/>
        <pre>{JSON.stringify ( state.main, null, 2 )} </pre>
      </ul>) )
  // (<ul><input type='text' defaultValue={query}/><br/>{safeArray ( queryResults ).map ( ( r, i ) => <li key={i}>{r}</li> )} </ul>) )
}