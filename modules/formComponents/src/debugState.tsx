import { isMassTransformReason, isSetJsonReason, LensProps, LensState, MassTransformReason, reasonFor, SetJsonReason } from "@focuson/state";
import { findThisPageElement, findValidityForInput, findValidityForRadio, findValidityForSelect, focusPageClassName, fromPathGivenState, HasPageSelectionLens, isMainPageDetails, mainPage, PageSelection, PageSelectionContext } from "@focuson/pages";
import { HasTagHolder, TagHolder, tagOps } from "@focuson/template";
import { HasSimpleMessages, safeArray, safeObject, safeString, SimpleMessage, sortedEntries, toArray } from "@focuson/utils";
import { HasRestCommandL, OneRestDetails, RestDetails } from "@focuson/rest";
import { FocusOnContext, restCommandsAndWhyFromFetchers, traceL } from "@focuson/focuson";
import { Lenses, Optional } from "@focuson/lens";
import { ToggleButton } from "./toggleButton";
import { AssertPages, MakeTest } from "./makeTest";
import { LabelAndStringInput } from "./labelAndInput";
import { LabelAndDropdown } from "./labelAndDropdown";
import { AccordionCollapseAll, AccordionExpandAll, AccordionWithInfo } from "./accordion";
import { trimDownText } from "./common";
import { CopyToClipboard } from "./CopyToClipboard";
import { useEffect, useRef } from "react";
import { DeleteStateButton } from "./deleteStateButton";
import { SetStateButton } from "./setStateButton";


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
      if ( n === 'dbName' ) return <li key={n}><LabelAndDropdown id={`commonIds.${n}`} parentState={state} state={state.copyWithLens ( l )} label={n} allButtons={{}} enums={{ mock: 'Mock', db: 'Database' }}/></li>;
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
        const pageData = safeObject ( lens.getOption ( state.main ) )
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
  return <ToggleButton id={name} buttonText={`{/debug/${name}|Hiding|Showing} ${name}`} state={state.focusOn ( name )}/>
}
export function ToggleDebugs<S, C extends PageSelectionContext<S>> ( { state }: LensProps<S, any, C> ) {
  const debugState = state.copyWithLens ( Lenses.identity<any> ().focusQuery ( 'debug' ) )
  return <ul>
    <li><ToggleOneDebug state={debugState} name='fetcherDebug'/></li>
    <li><ToggleOneDebug state={debugState} name='restDebug'/></li>
    <li><ToggleOneDebug state={debugState} name='reduxDebug'/></li>
    <li><ToggleOneDebug state={debugState} name='selectedPageDebug'/></li>
    <li><ToggleOneDebug state={debugState} name='loadTreeDebug'/></li>
    <li><ToggleOneDebug state={debugState} name='tagFetcherDebug'/></li>
    <li><ToggleOneDebug state={debugState} name='guardDebug'/></li>
    <li><ToggleOneDebug state={debugState} name='validityDebug'/></li>
    <li><ToggleOneDebug state={debugState} name='dateDebug'/></li>
    <li><ToggleOneDebug state={debugState} name='modalDebug'/></li>
  </ul>

}

export interface DisplayGuardsProps {
  guards: [ string, any ][]
}
export function DisplayGuards ( { guards }: DisplayGuardsProps ) {
  return <div className='display-guards'>
    {guards.map ( ( [ name, value ], i ) => <span key={name} className={`guard-${value}`}>{i === 0 ? '' : ',  '}{name}:{`${value}`}</span> )}
  </div>
}
const findTagLens = <S extends any> ( { cd, fdd }: RestDetails<S, SimpleMessage>[string], id: string ) => fdd[ id ] ? fdd[ id ] : cd[ id ];
function TagTable<S, FD, D> ( rest: OneRestDetails<S, FD, D, SimpleMessage>, theseTags: (string | undefined)[], desiredTags: [ string, (string | undefined) ][] ) {
  if ( rest.ids.length === 0  && rest.resourceId.length===0) return <div>There are no ids</div>
  return <table className="fetcher-debug">
    <thead>
    <tr>
      <th>Id</th>
      <th>Path to id</th>
      <th>value (must be defined for load)</th>
      <th>Remembered value in 'tags'</th>
    </tr>
    </thead>
    <tbody>
    {desiredTags.map ( ( [id,thisTag], tagIndex ) => {
      const tagLens: Optional<any, any> = findTagLens ( rest, id )
      let thisRememberedTag = theseTags?.[ tagIndex ];
      const classForUndefinedTag = thisTag ? undefined : 'debug-tag-undefined'
      return <tr key={id}>
        <td>{id}</td>
        <td>{tagLens.description}</td>
        <td className={classForUndefinedTag}>{thisTag ? JSON.stringify ( thisTag ) : 'undefined'}</td>
        <td>{thisRememberedTag ? JSON.stringify ( thisRememberedTag ) : 'undefined'}</td>
      </tr>;
    } )}</tbody>
  </table>;
}
function Fetchers<S, C extends FocusOnContext<S>> ( { state }: LensProps<S, any, C> ) {
  // @ts-ignore
  const debug = state.main?.debug?.tagFetcherDebug
  if ( !debug ) return <></>

  const page: PageSelection = mainPage ( state )
  const tagsInState = safeObject ( state.context.tagHolderL.getOption ( state.main ) )
  let { tagHolderL, newFetchers, restDetails } = state.context
  let fromFetchers = restCommandsAndWhyFromFetchers ( tagHolderL, newFetchers, restDetails, page.pageName, {...state.json (), debug: {}} );
  return <div>
    <h2>Rest commands</h2>
    {toArray ( state.context.newFetchers?.[ page.pageName ] ).map ( ( f, i ) => {
        const rest = state.context.restDetails[ f.restName ]
        const tagName = `${page.pageName}_${f.tagName}`
        const theseTags = tagsInState?.[ tagName ]
        const { tags } = tagOps
        const desiredTags = tags ( rest, 'get' ) ( state.main );
        let json = state.copyWithLens ( rest.fdLens ).chainLens ( rest.dLens ).optJson ();
        return <div key={i}><h3>Rest {f.restName} </h3>
          <dl>
            <dt>url</dt>
            <dd>{rest.url}</dd>
            <dt>Summary</dt>
            <dd>{fromFetchers.flatMap ( ( [ restCommand, tagName, reason ] ) => tagName == f.tagName ? [ reason ] : [] )}</dd>
            <dt>Tags</dt>
            <dd>
              {TagTable ( rest, theseTags, desiredTags )}
            </dd>
            <dt>Target path</dt>
            <dd>{f.tagName}</dd>
            <dt>Target - This must be undefined for the fetcher to load data</dt>
            <dd>
              <pre>{json ? JSON.stringify ( json, null, 2 ) : 'undefined'}</pre>
            </dd>
          </dl>
        </div>
      }
    )}
  </div>
}
function DebugTags<S extends HasTagHolder, C extends FocusOnContext<S>> ( { state }: LensProps<S, any, C> ) {
  return <div id="debug-tags-container">
    <table className="table-bordered">
      <thead>
      <tr>
        <th>Tag Fetchers</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><Fetchers state={state}/></td>
      </tr>
      <tr>
        <td><Tags state={state}/></td>
      </tr>
      </tbody>
    </table>
  </div>;
}

export function DebugState<S extends HasTagHolder & HasSimpleMessages, C extends FocusOnContext<S>> ( props: DebugProps<S, C> ) {
  const { state } = props
  let main: any = state.main;
  const { showDebug } = main.debug
  const validationRef = useRef<HTMLDivElement> ( null )
  useEffect ( () => {
    function textFor ( title: string, details: [ string, boolean ][] ): string {
      const text = details.map ( ( [ name, value ] ) => `<span class='validity-${value}'>${name}</span>` ).join ( ' ' )
      return `<h3>${title}</h3>${text}`
    }
    if ( validationRef.current === null ) return
    const thisPage = findThisPageElement ( focusPageClassName )
    validationRef.current.innerHTML =
      textFor ( 'inputs', findValidityForInput ( thisPage, false ) ) +
      textFor ( 'selects', findValidityForSelect ( thisPage, false ) ) +
      textFor ( 'radios', findValidityForRadio ( thisPage, false ) )
  } )
  const debugState = state.copyWithLens ( Lenses.identity<any> ().focusQuery ( 'debug' ) )
  if ( showDebug ) {
    let showTracingState = debugState.focusOn ( 'showTracing' );
    let showValidityState = debugState.focusOn ( 'validityDebug' );
    let recordTracingState = debugState.focusOn ( 'recordTrace' );
    let clearTagsState: LensState<S, TagHolder, C> = state.copyWithLens ( state.context.tagHolderL )
    let clearMessagesState: LensState<S, SimpleMessage[], C> = state.copyWithLens ( state.context.simpleMessagesL )
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
            <li><SetStateButton id='debug.clearMessage' label='Clear Messages' state={clearMessagesState} target={[]}/></li>
            <li><SetStateButton id='debug.clearTags' label='Clear Tags' state={clearTagsState} target={{}}/></li>
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
                  <th>Validations</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                  <td>
                      <div ref={validationRef}/>
                  </td>
              </tr>
              </tbody>
          </table>

      </div>}
      {showTracingState.optJsonOr ( false ) && <Tracing state={state}/>}
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

      <DebugTags state={state}/>
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