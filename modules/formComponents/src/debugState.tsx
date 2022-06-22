import { isMassTransformReason, isSetJsonReason, LensProps, MassTransformReason, reasonFor, SetJsonReason } from "@focuson/state";
import { findValidityDetails, focusPageClassName, fromPathGivenState, HasPageSelection, HasPageSelectionLens, isMainPageDetails, PageSelectionContext } from "@focuson/pages";
import { HasTagHolder } from "@focuson/template";
import { HasSimpleMessages, safeArray, safeString, SimpleMessage, sortedEntries } from "@focuson/utils";
import { HasRestCommandL, HasRestCommands } from "@focuson/rest";
import { FocusOnConfig, FocusOnContext, traceL } from "@focuson/focuson";
import { Lenses, NameAndLens } from "@focuson/lens";
import { ToggleButton } from "./toggleButton";
import { AssertPages, MakeTest } from "./makeTest";
import { LabelAndStringInput } from "./labelAndInput";
import { LabelAndDropdown } from "./labelAndDropdown";
import { AccordionCollapseAll, AccordionExpandAll, AccordionWithInfo } from "./accordion";
import { trimDownText } from "./common";
import { CopyToClipboard } from "./CopyToClipboard";


export function Tags<S extends HasTagHolder, C> ( { state }: LensProps<S, any, C> ) {
  return <div>
    <ul>{sortedEntries ( state.main.tags ).map ( ( [ n, t ] ) => <li key={n}>      
      <span>
            <span className="json-key">{n}</span> : <span className="json-value">{JSON.stringify ( t )}</span>
        </span>
    </li> )}</ul>
  </div>
}
export function Pages<S, C extends HasPageSelectionLens<S>> ( { state }: LensProps<S, any, C> ) {
  const pages = safeArray ( state.context.pageSelectionL.getOption ( state.main ) )
  return <div>
    <ul>{pages.map ( ( p, i ) => <li key={i}>{JSON.stringify ( p )}</li> )}</ul>
  </div>
}
export function Rest<S, C extends HasRestCommandL<S>> ( { state }: LensProps<S, any, C> ) {
  const restCommands = safeArray ( state.context.restL.getOption ( state.main ) )
  return <div>Rest
    <ul>{restCommands.map ( ( p, i ) => <li key={i}>{JSON.stringify ( p )}</li> )}</ul>
  </div>
}
export function Messages<S extends HasSimpleMessages, C> ( { state }: LensProps<S, any, C> ) {
  const messages = safeArray ( state.main.messages )
  return <div>Messages
    <ul>{messages.map ( ( p, i ) => <li key={i}>{JSON.stringify ( p )}</li> )}</ul>
  </div>
}
export function CommonIds<S, C extends FocusOnContext<S>> ( { state }: DebugProps<S, C> ) {
  const commonIds = state.context.commonIds
  return <><p>Common Ids</p>
    <ul>{sortedEntries ( commonIds ).map ( ( [ n, l ] ) => {
      if ( n === 'dbName' ) return <li key={n}><LabelAndDropdown id={`commonIds.${n}`} state={state.copyWithLens ( l )} label={n} allButtons={{}} enums={{ mock: 'Mock', db: 'Database' }}/></li>;
      return <li key={n}><LabelAndStringInput id={`commonIds.${n}`} state={state.copyWithLens ( l )} label={n} allButtons={{}}/></li>;
    } )}</ul>
  </>
}
export function ClearTrace<S, C> ( { state }: LensProps<S, any, C> ) {
  const traceState = state.copyWithLens ( traceL<S> () )
  return <button id='ClearTrace' onClick={() => traceState.setJson ( [], reasonFor ( 'ClearTrace', 'onClick', 'ClearTrace' ) )}>Clear Trace</button>
}

function PagesData<S, C extends FocusOnContext<S>> ( { state }: DebugProps<S, C> ) {
  const pages = safeArray ( state.context.pageSelectionL.getOption ( state.main ) )
  return <div id="debug-pages-container">
    <table className="table-bordered">
      <thead>
      <tr>
        <th colSpan={2}>Pages</th>
      </tr>
      </thead>
      <tbody>{pages.map ( ( p, index ) => {
        const page = pages[ index ]
        const pageDetails = state.context.pages[ page.pageName ]
        const lens = isMainPageDetails ( pageDetails ) ? pageDetails.lens : fromPathGivenState ( state ) ( safeString ( page.focusOn ) )
        const title = isMainPageDetails ( pageDetails ) ? "Main" : "Modal"
        const pageData = safeArray ( lens.getOption ( state.main ) )
        const accordionsOpen = state.focusOn ( 'debug' ).focusOn ( 'accordions' ).optJsonOr ( [] )
        const accordions = Object.keys ( pageData )

        return <tr key={index}>
          <td>
            <div>{JSON.stringify ( page )}</div>
            <div>{title} {page.pageName} - {safeString ( page.focusOn )}</div>
            <div>{lens?.description}</div>
          </td>
          <td>
            <div>
              <AccordionExpandAll id="expandAllPageButtons" buttonText="Expand All" state={state.focusOn ( 'debug' ).focusOn ( 'accordions' )} list={accordions}/>
              <AccordionCollapseAll id="collapseAllPageButtons" buttonText="Collapse All" state={state.focusOn ( 'debug' ).focusOn ( 'accordions' )} list={accordions}/>
            </div>
            {Object.entries ( pageData ).map ( ( [ itemKey, itemVal ], index ) => {
              return <div key={`${itemKey}-${index}`}>
                {(Array.isArray ( itemVal ) && itemVal.length > 0)
                  ? <><AccordionWithInfo id={itemKey} buttonText={"-|+"} state={state.focusOn ( 'debug' ).focusOn ( 'accordions' )} list={accordions} count={itemVal.length}/>{accordionsOpen.find ( ( elem: string ) => elem == itemKey ) && <pre className="json-value">{JSON.stringify ( itemVal, null, 2 )}</pre>}</>
                  : (typeof itemVal === 'object' && itemVal !== null)
                    ? <><AccordionWithInfo id={itemKey} buttonText={"-|+"} state={state.focusOn ( 'debug' ).focusOn ( 'accordions' )} list={accordions} count={Object.entries ( itemVal ).length}/>{accordionsOpen.find ( ( elem: string ) => elem == itemKey ) && <pre className="json-value">{JSON.stringify ( itemVal, null, 2 )}</pre>}</>
                    : <><span className="json-key">{itemKey}</span>: {typeof itemVal === 'boolean' ? <span className="json-value">{itemVal.toString ()}</span> : <span className="json-string">{itemVal + ""}</span>}</>
                }
              </div>
            } )}
          </td>
        </tr>
      } )}</tbody>
    </table>
  </div>
}

interface TracingProps<R> {
  reason: R
}
export function MassTransformTracing ( { reason }: TracingProps<MassTransformReason> ) {
  return <tr>
    <td>
      <pre>{JSON.stringify ( reason.reason, null, 2 )} </pre>
    </td>
    <td>
      <ul>{reason.txLens.map ( ( [ lens, json ], i ) => <li key={lens}><b>{lens}</b><br/>
        <pre>{JSON.stringify ( json, null, 2 )}</pre>
      </li> )}</ul>
    </td>
  </tr>
}
export function SetJsonTracing ( { reason }: TracingProps<SetJsonReason> ) {
  return <tr>
    <td>
      <pre>{JSON.stringify ( reason.reason, null, 2 )} </pre>
    </td>
    <td><b>{reason.lens}</b>
      <pre>{JSON.stringify ( reason.json, null, 2 )}</pre>
    </td>
  </tr>
}
export function OneTracing ( reason: any ) {
  if ( reason ) {
    let r = reason.reason
    if ( isSetJsonReason ( r ) ) return <SetJsonTracing reason={r}/>
    if ( isMassTransformReason ( r ) ) return <MassTransformTracing reason={r}/>
  }
  return <tr>
    <td colSpan={2}>
      <CopyToClipboard textToCopy={JSON.stringify ( reason, )}/>
      <div className="tooltip">
        Reason:: {trimDownText ( JSON.stringify ( reason, ), 100 )}
        <span className="tooltiptext">
          <CopyToClipboard textToCopy={JSON.stringify ( reason, )}/>
          <pre>{JSON.stringify ( reason, null, 2 )}</pre>
        </span>
      </div>
    </td>
  </tr>
}

export function Tracing<S, C> ( { state }: LensProps<S, any, C> ) {
  return <div id="debug-tracing-container">
    <table className="table-bordered">
      <thead>
      <tr>
        <th colSpan={2}>Tracing</th>
      </tr>
      </thead>
      <tbody>
      {state.copyWithLens ( traceL<S> () ).optJsonOr ( [] ).map ( ( r: any, i: number ) =>
        <OneTracing key={i} reason={r}/> )}
      </tbody>
    </table>
  </div>
}

interface DebugProps<S, Context> extends LensProps<S, any, Context> {}

export function ToggleOneDebug<S, C extends PageSelectionContext<S>> ( { state, name }: LensProps<S, any, C> & { name: string } ) {
  return <ToggleButton id={name} buttonText={`{/debug/${name}|Hide|Show} ${name}`} state={state.focusOn ( name )}/>
}
export function ToggleDebugs<S, C extends PageSelectionContext<S>> ( { state }: LensProps<S, any, C> ) {
  const debugState = state.copyWithLens ( Lenses.identity<any> ().focusQuery ( 'debug' ) )
  return <ul>
    <li><ToggleOneDebug state={debugState} name='fetcherDebug'/></li>
    <li><ToggleOneDebug state={debugState} name='restDebug'/></li>
    <li><ToggleOneDebug state={debugState} name='selectedPageDebug'/></li>
    <li><ToggleOneDebug state={debugState} name='loadTreeDebug'/></li>
    <li><ToggleOneDebug state={debugState} name='tagFetcherDebug'/></li>
    <li><ToggleOneDebug state={debugState} name='guardDebug'/></li>
    <li><ToggleOneDebug state={debugState} name='validityDebug'/></li>
  </ul>

}

export function DebugState<S extends HasTagHolder & HasSimpleMessages, C extends FocusOnContext<S>> ( props: DebugProps<S, C> ) {
  const { state } = props
  let main: any = state.main;
  const { showDebug } = main.debug
  const debugState = state.copyWithLens ( Lenses.identity<any> ().focusQuery ( 'debug' ) )
  if ( showDebug ) {
    let showTracingState = debugState.focusOn ( 'showTracing' );
    let showValidityState = debugState.focusOn ( 'validityDebug' );
    let recordTracingState = debugState.focusOn ( 'recordTrace' );
    return <div id="debug-container">
      <ToggleButton id='hideDebug' buttonText='Hide Debug' state={debugState.focusOn ( 'showDebug' )}/>
      <div id="debug-bucket">
        <div id="debug-log">
          <ToggleDebugs state={state}/>
        </div>
        <div id="debug-trace">
          <ul>
            <li><ToggleButton id='debug.showTracing' buttonText='{/debug/showTracing|Show|Hide} Tracing ' state={showTracingState}/></li>
            <li><ToggleButton id='debug.recordTracing' buttonText='{/debug/recordTrace|Start|Stop} Trace ' state={recordTracingState}/></li>
            <li><ClearTrace state={state}/></li>
            <li><MakeTest state={state}/></li>
            <li><AssertPages state={state}/></li>
          </ul>
        </div>
      </div>
      {showValidityState.optJsonOr ( false ) &&
      <div id='debug-validation-container'>
          <table className="table-bordered">
              <thead>
              <tr>
                  <th>Validate</th>
              </tr>
              </thead>
              <tbody>
              {findValidityDetails ( focusPageClassName ).map ( x => <tr key={x.toString()}><td>{x[0]}</td><td>x[1]</td><td>{JSON.stringify ( x )}</td></tr> )}
              </tbody>
          </table>
          <ul>
          </ul>
      </div>}

      <div id="debug-state-container">
        <table className="table-bordered">
          <thead>
          <tr>
            <th>State</th>
          </tr>
          </thead>
          <tbody>
          {/* <tr>
          <td><Pages state={state}/></td>
          <td><Tags state={state}/></td>
          <td><Rest state={state}/></td>
        </tr> */}
          <tr>
            {/* <td><Messages state={state}/></td> */}
            <td><CommonIds {...props}/></td>
          </tr>
          </tbody>
        </table>
      </div>
      <PagesData {...props} />
      <div id="debug-context-container">
        <table className="table-bordered">
          <thead>
          <tr>
            <th colSpan={2}>Context</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Page Selection Lens:</td>
            <td>${state.context.pageSelectionL.description}</td>
          </tr>
          <tr>
            <td>Rest Command Lens:</td>
            <td>${state.context.restL.description}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div id="debug-tags-container">
        <table className="table-bordered">
          <thead>
          <tr>
            <th>Tags</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><Tags state={state}/></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div id="debug-raw-state-container">
        <table className="table-bordered">
          <thead>
          <tr>
            <th colSpan={2}>Raw State</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <pre>{JSON.stringify ( state.json (), null, 2 )}</pre>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div id="debug-messages-container">
        <table className="table-bordered">
          <thead>
          <tr>
            <th>Messages</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><Messages state={state}/></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  } else return <div id="debug-container"><ToggleButton id='showDebug' buttonText='Show Debug' state={debugState.focusOn ( 'showDebug' )}/></div>
  // {PagesData ( { state, config } )}


}