import { lensState, LensState } from "@focuson/state";
import { shallow } from "enzyme";
import { HasRestCommands, restL } from "@focuson/rest";
import { HasPageSelection, PageDetailsForCombine, PageMode, pageSelectionlens, simpleMessagesL } from "@focuson/pages";
import { FocusOnContext } from "@focuson/focuson";
import { DataDrivenFixedOptionDropDownAndDetails, OneDropDownDetails } from "@focuson/form_components";
import { HasSimpleMessages, NameAnd } from "@focuson/utils";
import { enzymeSetup } from "./enzymeAdapterSetup";
import { Lenses } from "@focuson/lens";

enzymeSetup ()

type Context = FocusOnContext<DataDrivenState>
const context: Context = {
  restL: restL<DataDrivenState> (),
  combine: ( state, pages: PageDetailsForCombine[] ): JSX.Element => <div>{pages.map ( p => p.element )}</div>,
  pageSelectionL: pageSelectionlens (),
  simpleMessagesL: simpleMessagesL (),
  pathToLens: () => () => Lenses.identity<DataDrivenState> ().focusQuery ( 'jointData' ), //just something to compile we aren't using it
  pages: {},
  commonIds: {}
}
function display ( s: DataDrivenState, setMain: ( s: DataDrivenState ) => void, fn: ( s: LensState<DataDrivenState, DataDrivenState, Context> ) => JSX.Element ) {
  const comp = shallow ( fn ( lensState<DataDrivenState, Context> ( s, setMain, 'DataDriven', context ) ) )
  return comp
}
interface DataDrivenState extends HasRestCommands, HasSimpleMessages, HasPageSelection {
  mainOrJointOrNew: string;
  mainName?: string;
  jointName?: string;
  mainData?: string;
  jointData?: string;
}
const empty: DataDrivenState = {
  messages: [], pageSelection: [], restCommands: [],
  mainOrJointOrNew: 'M',
  mainName: 'theMainName',
  jointName: 'theJointName',
  mainData: 'theMainData',
  jointData: 'theJointData'
}
interface FocusedProps {
  id: string;
  state: LensState<DataDrivenState, any, Context>,
  mode: PageMode,
  allButtons: {},
  label: string
}
function displayString ( props: FocusedProps ) {
  return <p>Label: {props.label} Id: {props.id} Mode: {props.mode} Data: {props.state.optJson ()}</p>
}
const details: NameAnd<OneDropDownDetails<DataDrivenState, Context>> = {
  M: { valuePath: '/theMainName', dataPath: '/mainData', display: displayString },
  J: { valuePath: '/jointName', dataPath: '/jointData', display: displayString },
  N: { value: 'New Bank' },
}
describe ( 'DataDrivenFixedOptionDropDownAndDetails', () => {
  it ( 'should display main', () => {
    const comp = display ( empty, s => {}, s =>
      <DataDrivenFixedOptionDropDownAndDetails state={s.focusOn ( 'mainOrJointOrNew' )} id='someId' allButtons={{}} mode='view' label='someLabel' details={details}/> )
    expect ( comp.html () ).toEqual (
      '<div style="display:flex"><div style="flex:50%"><div class="labelDropdown"><label>someLabel</label><select class="dropdown" disabled="" id="someId"><option selected="" value="M">theJointData</option><option value="J">theJointData</option><option value="N">New Bank</option></select></div></div>' +
      '<div style="flex:50%"><p>Label: someLabel Id: someId Mode: view Data: theJointData</p></div></div>' )
  } )
  it ( 'should display joint', () => {
    const comp = display ( { ...empty, mainOrJointOrNew: 'J' }, s => {}, s => <DataDrivenFixedOptionDropDownAndDetails state={s.focusOn ( 'mainOrJointOrNew' )} id='someId' allButtons={{}} mode='view' label='someLabel' details={details}/> )
    expect ( comp.html () ).toEqual (
      '<div style="display:flex"><div style="flex:50%"><div class="labelDropdown"><label>someLabel</label><select class="dropdown" disabled="" id="someId"><option value="M">theJointData</option><option selected="" value="J">theJointData</option><option value="N">New Bank</option></select></div></div><div style="flex:50%"><p>Label: someLabel Id: someId Mode: view Data: theJointData</p></div></div>' )
  } )
  it ( 'should display when no data path or display', () => {
    const comp = display ( { ...empty, mainOrJointOrNew: 'N' }, s => {}, s => <DataDrivenFixedOptionDropDownAndDetails state={s.focusOn ( 'mainOrJointOrNew' )} id='someId' allButtons={{}} mode='view' label='someLabel' details={details}/> )
    expect ( comp.html () ).toEqual (
      '<div style="display:flex"><div style="flex:50%"><div class="labelDropdown"><label>someLabel</label><select class="dropdown" disabled="" id="someId"><option value="M">theJointData</option><option value="J">theJointData</option><option selected="" value="N">New Bank</option></select></div></div><div style="flex:50%"><div></div></div></div>' )
  } )
  it ( 'should display when there is nothing at the value path', () => {
    const comp = display ( { ...empty, mainOrJointOrNew: 'J', jointName: undefined }, s => {}, s => <DataDrivenFixedOptionDropDownAndDetails state={s.focusOn ( 'mainOrJointOrNew' )} id='someId' allButtons={{}} mode='view' label='someLabel' details={details}/> )
    expect ( comp.html () ).toEqual (
      '<div style="display:flex"><div style="flex:50%"><div class="labelDropdown"><label>someLabel</label><select class="dropdown" disabled="" id="someId"><option value="M">theJointData</option><option selected="" value="J">theJointData</option><option value="N">New Bank</option></select></div></div><div style="flex:50%"><p>Label: someLabel Id: someId Mode: view Data: theJointData</p></div></div>' )
  } )
  it ( 'should display when there is nothing at the data path', () => {
    const comp = display ( { ...empty, mainOrJointOrNew: 'J', jointData: undefined }, s => {}, s => <DataDrivenFixedOptionDropDownAndDetails state={s.focusOn ( 'mainOrJointOrNew' )} id='someId' allButtons={{}} mode='view' label='someLabel' details={details}/> )
    expect ( comp.html () ).toEqual (
      '<div style="display:flex"><div style="flex:50%"><div class="labelDropdown"><label>someLabel</label><select class="dropdown" disabled="" id="someId"><option value="M"></option><option selected="" value="J"></option><option value="N">New Bank</option></select></div></div><div style="flex:50%"><p>Label: someLabel Id: someId Mode: view Data: </p></div></div>' )
  } )
} )