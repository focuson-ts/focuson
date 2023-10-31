import { lensState, LensState } from "@focuson/state";
import { HasRestCommands, restL } from "@focuson/rest";
import { HasPageSelection, PageDetailsForCombine, pageSelectionlens, rawCloseOnePageTxs, simpleMessagesL } from "@focuson/pages";
import { ContextForDropdown, DataDrivenFixedOptionDropDownAndDetails, OneDropDownDetails } from "@focuson/form_components";
import { HasSimpleMessages, NameAnd, PageMode, testDateFn } from "@focuson/utils";
import { Lenses } from "@focuson/lens";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

type Context = ContextForDropdown<DataDrivenState>
const context: Context = {
  restL: restL<DataDrivenState> (),
  dateFn: testDateFn,
  combine: ( state: LensState<DataDrivenState, any, Context>, pages: PageDetailsForCombine[] ): JSX.Element => <div>{pages.map ( p => p.element )}</div>,
  pageSelectionL: pageSelectionlens (),
  simpleMessagesL: simpleMessagesL (),
  closeOnePageTxs: rawCloseOnePageTxs,
// @ts-ignore
  pathToLens: () => path => Lenses.identity<DataDrivenState> ().focusQuery ( path.slice ( 1 ) ), //trims the / off the front
  pages: {},
  // commonIds: {}
}
function display ( s: DataDrivenState, setMain: ( s: DataDrivenState ) => void, fn: ( s: LensState<DataDrivenState, DataDrivenState, Context> ) => JSX.Element ) {
  return render ( fn ( lensState<DataDrivenState, Context> ( s, setMain, 'DataDriven', context ) ) ).container.innerHTML
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
  M: { valuePath: '/mainName', dataPath: '/mainData', display: displayString },
  J: { valuePath: '/jointName', dataPath: '/jointData', display: displayString },
  N: { value: 'New Bank' },
}
describe ( 'DataDrivenFixedOptionDropDownAndDetails', () => {
  it ( 'should display main', () => {
    const comp = display ( empty, s => {}, s =>
      <DataDrivenFixedOptionDropDownAndDetails parentState={s} state={s.focusOn ( 'mainOrJointOrNew' )} id='someId' allButtons={{}} mode='view' label='someLabel' details={details}/> )
    expect ( comp ).toEqual (
      '<div style="display: flex;"><div style="flex: 50%;"><div class="dropdown-container "><label for="someId" class="input-label">someLabel</label><div class=""><select class="select " data-validationmessage="someLabel" disabled="" id="someId" required=""><option value="M">theMainName</option><option value="J">theJointName</option><option value="N">New Bank</option></select></div></div></div><div style="flex: 50%;"><p>Label: someLabel Id: someId Mode: view Data: theMainData</p></div></div>' )
    const select = screen.getByRole ( 'combobox' );
    expect ( select ).toHaveValue ( "M" );
  } )
  it ( 'should display joint', () => {
    const comp = display ( { ...empty, mainOrJointOrNew: 'J' }, s => {}, s => <DataDrivenFixedOptionDropDownAndDetails parentState={s} state={s.focusOn ( 'mainOrJointOrNew' )} id='someId' allButtons={{}} mode='view' label='someLabel' details={details}/> )
    expect ( comp ).toEqual (
      '<div style="display: flex;"><div style="flex: 50%;"><div class="dropdown-container "><label for="someId" class="input-label">someLabel</label><div class=""><select class="select " data-validationmessage="someLabel" disabled="" id="someId" required=""><option value="M">theMainName</option><option value="J">theJointName</option><option value="N">New Bank</option></select></div></div></div><div style="flex: 50%;"><p>Label: someLabel Id: someId Mode: view Data: theJointData</p></div></div>' )
    const select = screen.getByRole ( 'combobox' );
    expect ( select ).toHaveValue ( "J" );

  } )
  it ( 'should display when no data path or display', () => {
    const comp = display ( { ...empty, mainOrJointOrNew: 'N' }, s => {}, s => <DataDrivenFixedOptionDropDownAndDetails parentState={s} state={s.focusOn ( 'mainOrJointOrNew' )} id='someId' allButtons={{}} mode='view' label='someLabel' details={details}/> )
    expect ( comp ).toEqual (
      '<div style="display: flex;"><div style="flex: 50%;"><div class="dropdown-container "><label for="someId" class="input-label">someLabel</label><div class=""><select class="select " data-validationmessage="someLabel" disabled="" id="someId" required=""><option value="M">theMainName</option><option value="J">theJointName</option><option value="N">New Bank</option></select></div></div></div><div style="flex: 50%;"><div></div></div></div>' )
    const select = screen.getByRole ( 'combobox' );
    expect ( select ).toHaveValue ( "N" );
  } )
  it ( 'should display when there is nothing at the value path', () => {
    const comp = display ( { ...empty, mainOrJointOrNew: 'J', jointName: undefined }, s => {}, s => <DataDrivenFixedOptionDropDownAndDetails parentState={s} state={s.focusOn ( 'mainOrJointOrNew' )} id='someId' allButtons={{}} mode='view' label='someLabel' details={details}/> )
    expect ( comp ).toEqual (
      '<div style="display: flex;"><div style="flex: 50%;"><div class="dropdown-container "><label for="someId" class="input-label">someLabel</label><div class=""><select class="select " data-validationmessage="someLabel" disabled="" id="someId" required=""><option value="M">theMainName</option><option value="J"></option><option value="N">New Bank</option></select></div></div></div><div style="flex: 50%;"><p>Label: someLabel Id: someId Mode: view Data: theJointData</p></div></div>' )
    const select = screen.getByRole ( 'combobox' );
    expect ( select ).toHaveValue ( "J" );
  } )
  it ( 'should display when there is nothing at the data path', () => {
    const comp = display ( { ...empty, mainOrJointOrNew: 'J', jointData: undefined }, s => {}, s => <DataDrivenFixedOptionDropDownAndDetails parentState={s} state={s.focusOn ( 'mainOrJointOrNew' )} id='someId' allButtons={{}} mode='view' label='someLabel' details={details}/> )
    expect ( comp ).toEqual (
      '<div style="display: flex;"><div style="flex: 50%;"><div class="dropdown-container "><label for="someId" class="input-label">someLabel</label><div class=""><select class="select " data-validationmessage="someLabel" disabled="" id="someId" required=""><option value="M">theMainName</option><option value="J">theJointName</option><option value="N">New Bank</option></select></div></div></div><div style="flex: 50%;"><p>Label: someLabel Id: someId Mode: view Data: </p></div></div>' )
    const select = screen.getByRole ( 'combobox' );
    expect ( select ).toHaveValue ( "J" );
  } )
  it ( 'should display when there is nothing at the data path and dontShowEmpty is true', () => {
    const comp = display ( { ...empty, jointName: undefined }, s => {},
      s => <DataDrivenFixedOptionDropDownAndDetails parentState={s} state={s.focusOn ( 'mainOrJointOrNew' )} id='someId' dontShowEmpty={true}
                                                    allButtons={{}} mode='view' label='someLabel' details={details}/> )
    expect ( comp ).toEqual (
      '<div style="display: flex;"><div style="flex: 50%;"><div class="dropdown-container "><label for="someId" class="input-label">someLabel</label><div class=""><select class="select " data-validationmessage="someLabel" disabled="" id="someId" required=""><option value="M">theMainName</option><option value="N">New Bank</option></select></div></div></div><div style="flex: 50%;"><p>Label: someLabel Id: someId Mode: view Data: theMainData</p></div></div>' )
    const select = screen.getByRole ( 'combobox' );
    expect ( select ).toHaveValue ( "M" );
  } )
} )