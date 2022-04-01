import { isMassTransformReason, isSetJsonReason, LensProps, MassTransformReason, SetJsonReason } from "@focuson/state";
import { fromPathGivenState, HasPageSelection, HasPageSelectionLens, isMainPageDetails } from "@focuson/pages";
import { HasTagHolder } from "@focuson/template";
import { HasSimpleMessages, safeArray, safeString, SimpleMessage, sortedEntries } from "@focuson/utils";
import { HasRestCommandL, HasRestCommands } from "@focuson/rest";
import { FocusOnConfig, FocusOnContext, traceL } from "./config";
import { NameAndLens } from "@focuson/lens";


export function Tags<S extends HasTagHolder, C> ( { state }: LensProps<S, any, C> ) {
  return <div>Tags
    <ul>{sortedEntries ( state.main.tags ).map ( ( [ n, t ] ) => <li key={n}>{n}: {JSON.stringify ( t )}</li> )}</ul>
  </div>
}
export function Pages<S, C extends HasPageSelectionLens<S>> ( { state }: LensProps<S, any, C> ) {
  const pages = safeArray ( state.context.pageSelectionL.getOption ( state.main ) )
  return <div>Pages
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
  return <ul>{sortedEntries ( commonIds ).map ( ( [ n, l ] ) => <li key={n}>{n}: {l.getOption ( state.main )}</li> )}</ul>
}

function PagesData<S, C extends FocusOnContext<S>> ( { state }: DebugProps<S, C> ) {
  const pages = safeArray ( state.context.pageSelectionL.getOption ( state.main ) )
  return <div>
    Pages
    <table>
      <tbody>{pages.map ( ( p, index ) => {
        const page = pages[ index ]
        const pageDetails = state.context.pages[ page.pageName ]
        const lens = isMainPageDetails ( pageDetails ) ? pageDetails.lens : fromPathGivenState ( state ) ( safeString ( page.focusOn ) )
        const title = isMainPageDetails ( pageDetails ) ? "Main" : "Modal"
        const pageData = lens.getOption ( state.main )
        return <tr key={index}>
          <td>{title} {page.pageName} - {safeString ( page.focusOn )}</td>
          <td>{lens?.description}</td>
          <td>
            <pre>{JSON.stringify ( pageData, null, 2 )}</pre>
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
    <td colSpan={2}>{JSON.stringify ( reason, )}</td>
  </tr>
}

export function Tracing<S, C> ( { state }: LensProps<S, any, C> ) {
  return <div><h3>Tracing</h3>
    <table>
      <tbody>
      {state.copyWithLens ( traceL<S> () ).optJsonOr ( [] ).map ( ( r, i ) =>
        <OneTracing key={i} reason={r}/> )}
      </tbody>
    </table>
  </div>
}

interface DebugProps<S, Context> extends LensProps<S, any, Context> {

}

export function DebugState<S extends HasTagHolder & HasSimpleMessages, C extends FocusOnContext<S>> ( props: DebugProps<S, C> ) {
  const { state } = props
  return <div>
    <hr/>
    <h1>Debug</h1>
    <Tracing state={state}/>
    <hr/>
    <h3>State</h3>
    <table>
      <tbody>
      <tr>
        <td><Pages state={state}/></td>
        <td><Tags state={state}/></td>
        <td><Rest state={state}/></td>
      </tr>
      <tr>
        <td><Messages state={state}/></td>
        <td colSpan={2}><CommonIds {...props}/></td>
      </tr>
      </tbody>
    </table>
    <hr/>
    <PagesData {...props} />
    <hr/>
    <h3>Context</h3>
    <ul>
      <li>Page Selection Lens: ${state.context.pageSelectionL.description}</li>
      <li>Rest Command Lens: ${state.context.restL.description}</li>
    </ul>
    <h3>Raw State</h3>
    <pre>{JSON.stringify ( state.json (), null, 2 )}</pre>
  </div>

  // {PagesData ( { state, config } )}


}