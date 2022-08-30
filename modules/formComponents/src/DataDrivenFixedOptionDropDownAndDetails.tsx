import { LensProps, LensState } from "@focuson/state";
import { disabledFrom, NameAnd } from "@focuson/utils";
import { ContextForDropdown, LabelAndDropdown } from "./labelAndDropdown";
import { PageMode } from "@focuson/pages";


export interface OneDropDownDetails<S, C> {
  valuePath?: string;// the path to text display in the drop down
  value?: string; //if defined we use this, otherwise the value path
  dataPath?: string; // the path to data display in the RHS
  display?: ( props: any ) => JSX.Element;// the component to display the data
}

export interface DataDrivenFixedOptionDropDownAndDetailsProps<S> extends LensProps<S, string, ContextForDropdown<S>> {
  id: string;
  enabledBy?: string[][];
  parentState: LensState<S, any, ContextForDropdown<S>>;
  mode: PageMode;
  allButtons: NameAnd<JSX.Element>;
  label: string;
  pleaseSelect?: string;
  dontShowEmpty?: boolean;
  details: NameAnd<OneDropDownDetails<S, ContextForDropdown<S>>>
}

function DropDownFromData<S> ( props: DataDrivenFixedOptionDropDownAndDetailsProps<S> ) {
  const { state, id, details, label, mode, allButtons, parentState, pleaseSelect, dontShowEmpty, enabledBy } = props
  let s = state.main;
  const pathToLens = state.context.pathToLens ( s, parentState.optional )
  const rawValues = Object.entries ( details ).map ( ( [ name, detail ] ): [ string, string | undefined ] =>
    [ name, detail.value ? detail.value : detail.valuePath ? pathToLens ( detail.valuePath ).getOption ( s ) : '' ] );
  const values = Object.fromEntries ( rawValues.filter ( nv => !dontShowEmpty || (nv[ 1 ]?.length && nv[ 1 ].length > 0) ) )
  return <LabelAndDropdown parentState={parentState} label={label} enabledBy={enabledBy} enums={values} mode={mode} allButtons={allButtons} state={state} id={id} pleaseSelect={pleaseSelect} required={true}/>
}

interface TwoElements {
  children: [ JSX.Element, JSX.Element ];
}
function TwoColRow ( { children }: TwoElements ) {
  return <div style={{ display: 'flex' }}>
    <div style={{ flex: '50%' }}>{children[ 0 ]}</div>
    <div style={{ flex: '50%' }}>{children[ 1 ]}</div>
  </div>
}

function DetailsFromData<S> ( props: DataDrivenFixedOptionDropDownAndDetailsProps<S> ) {
  const { state, id, details, label, mode, allButtons, parentState } = props
  let s = state.main;
  const pathToLens = state.context.pathToLens ( s, parentState.optional )
  const value = props.state.optJson ()

  const d = value === undefined ? undefined : details[ value ]
  if ( d && d.dataPath && d.display ) {
    const data = d ? pathToLens ( d.dataPath )?.getOption ( s ) : undefined
    return <>
      {d.display ( {
        id, mode, allButtons, label,
        state: state.copyWithLens ( pathToLens ( d.dataPath ) ),
      } )}</>
  }
  return <div/>

}
export function DataDrivenFixedOptionDropDownAndDetails<S> ( props: DataDrivenFixedOptionDropDownAndDetailsProps<S> ) {
  return <TwoColRow><DropDownFromData {...props} /><DetailsFromData {...props}/></TwoColRow>
}

