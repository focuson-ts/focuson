import { LensProps, LensState } from "@focuson/state";
import { NameAnd } from "@focuson/utils";
import { FocusOnContext } from "@focuson/focuson";
import { LabelAndDropdown } from "./labelAndDropdown";
import { PageMode } from "@focuson/pages";


export interface OneDropDownDetails<S, C> {
  valuePath?: string;// the path to text display in the drop down
  value?: string; //if defined we use this, otherwise the value path
  dataPath?: string; // the path to data display in the RHS
  display?: ( props: any ) => JSX.Element;// the component to display the data
}
export interface DataDrivenFixedOptionDropDownAndDetailsProps<S> extends LensProps<S, string, FocusOnContext<S>> {
  id: string;
  parentState: LensState<S, any, FocusOnContext<S>>;
  mode: PageMode;
  allButtons: NameAnd<JSX.Element>;
  label: string;
  details: NameAnd<OneDropDownDetails<S, FocusOnContext<S>>>
}

function DropDownFromData<S> ( props: DataDrivenFixedOptionDropDownAndDetailsProps<S> ) {
  const { state, id, details, label, mode, allButtons,parentState } = props
  let s = state.main;
  console.log('DropDownFromData', state.optional)
  const pathToLens = state.context.pathToLens ( s, parentState.optional )
  const values = Object.fromEntries ( Object.entries ( props.details ).map ( ( [ name, detail ] ) =>
    [ name, detail.value ? detail.value : detail.valuePath ? pathToLens ( detail.valuePath ).getOption ( s ) : '' ] ) )
  console.log('DropDownFromData ended', parentState.optional)
  return <LabelAndDropdown label={label} enums={values} mode={mode} allButtons={allButtons} state={state} id={id}/>
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
  const { state, id, details, label, mode, allButtons,parentState } = props
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

