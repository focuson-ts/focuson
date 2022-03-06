import { LensProps } from "@focuson/state";
import { HasPageSelection, HasPageSelectionLens, isMainPageDetails } from "@focuson/pages";
import { HasTagHolder } from "@focuson/template";
import { HasSimpleMessages, safeArray, SimpleMessage, sortedEntries } from "@focuson/utils";
import { HasRestCommandL, HasRestCommands } from "@focuson/rest";
import { FocusOnConfig, traceL } from "./config";
import { Lenses, NameAndLens } from "@focuson/lens";


export function Tags<S extends HasPageSelection & HasTagHolder & HasSimpleMessages & HasRestCommands,
  C extends HasPageSelectionLens<S> & HasRestCommandL<S>> ( { state }: LensProps<S, any, C> ) {
  return <div>Tags
    <ul>{sortedEntries ( state.main.tags ).map ( ( [ n, t ] ) => <li key={n}>{n}: {JSON.stringify ( t )}</li> )}</ul>
  </div>
}
export function Pages<S extends HasPageSelection & HasTagHolder & HasSimpleMessages & HasRestCommands,
  C extends HasPageSelectionLens<S> & HasRestCommandL<S>> ( { state }: LensProps<S, any, C> ) {
  const pages = safeArray ( state.context.pageSelectionL.getOption ( state.main ) )
  return <div>Pages
    <ul>{pages.map ( ( p, i ) => <li key={i}>{JSON.stringify ( p )}</li> )}</ul>
  </div>
}
export function Rest<S extends HasPageSelection & HasTagHolder & HasSimpleMessages & HasRestCommands,
  C extends HasPageSelectionLens<S> & HasRestCommandL<S>> ( { state }: LensProps<S, any, C> ) {
  const restCommands = safeArray ( state.context.restL.getOption ( state.main ) )
  return <div>Rest
    <ul>{restCommands.map ( ( p, i ) => <li key={i}>{JSON.stringify ( p )}</li> )}</ul>
  </div>
}
export function Messages<S extends HasPageSelection & HasTagHolder & HasSimpleMessages & HasRestCommands,
  C extends HasPageSelectionLens<S> & HasRestCommandL<S>> ( { state }: LensProps<S, any, C> ) {
  const messages = safeArray ( state.main.messages )
  return <div>Messages
    <ul>{messages.map ( ( p, i ) => <li key={i}>{JSON.stringify ( p )}</li> )}</ul>
  </div>
}
export function CommonIds<S extends HasPageSelection & HasTagHolder & HasSimpleMessages & HasRestCommands,
  C extends HasPageSelectionLens<S> & HasRestCommandL<S>> ( { state, config, commonIds }: DebugProps<S, C> ) {
  return <ul>{sortedEntries ( commonIds ).map ( ( [ n, l ] ) => <li key={n}>{n}: {l.getOption ( state.main )}</li> )}</ul>
}

function PagesData<S extends HasPageSelection & HasTagHolder & HasSimpleMessages & HasRestCommands,
  C extends HasPageSelectionLens<S> & HasRestCommandL<S>> ( { state, config }: DebugProps<S, C> ) {
  const pages = safeArray ( state.context.pageSelectionL.getOption ( state.main ) )
  return <div>
    Pages
    <table>
      <tbody>{pages.map ( ( p, index ) => {
        const page = pages[ index ]
        const pageDetails = config.pages[ page.pageName ]
        const lens = isMainPageDetails ( pageDetails ) ? pageDetails.lens : Lenses.fromPath ( safeArray ( page.focusOn ) )
        const title = isMainPageDetails ( pageDetails ) ? "Main" : "Modal"
        const pageData = lens.getOption ( state.main )
        return <tr key={index}>
          <td>{title} {page.pageName} - {safeArray ( page.focusOn )}</td>
          <td>{lens?.description}</td>
          <td>
            <pre>{JSON.stringify ( pageData, null, 2 )}</pre>
          </td>
        </tr>
      } )}</tbody>
    </table>
  </div>
}

export function Tracing<S, C> ( { state }: LensProps<S, any, C> ) {
  return <div><h3>Tracing</h3>
    <ul>
      {state.copyWithLens ( traceL<S> () ).optJsonOr ( [] ).map ( ( r, i ) => <li key={i}>{JSON.stringify ( r )}</li> )}
    </ul>
  </div>

}

interface DebugProps<S, Context> extends LensProps<S, any, Context> {
  config: FocusOnConfig<S, Context, SimpleMessage>;
  commonIds: NameAndLens<S>;

}

export function DebugState<S extends HasPageSelection & HasTagHolder & HasSimpleMessages & HasRestCommands,
  C extends HasPageSelectionLens<S> & HasRestCommandL<S>> ( props: DebugProps<S, C> ) {
  const { state, config } = props
  return <div>
    <hr/>
    <h1>Debug</h1>
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
      <tr>
        <td><Tracing state={state}/></td>
      </tr>
      </tbody>
    </table>
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