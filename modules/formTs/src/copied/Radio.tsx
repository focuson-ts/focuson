import { reasonFor } from "@focuson/state";
import { NameAnd } from "@focuson/utils";
import React from "react";
import { CommonStateProps } from "./common";
import { Label } from "./Label";

export interface RadioProps<S, T, Context> extends CommonStateProps<S, T, Context> {
  enums: NameAnd<string>;
  defaultValue?: string
}

export function Radio<S, T, Context> ( { state, mode, enums, ariaLabel, id }: RadioProps<S, string, Context> ) {
  console.log ( state.optJson () )
  return <>{Object.entries ( enums ).map ( ( [ key, value ] ) => {
    console.log ( 'Key Value ===>', key + ' ' + value )
    return <span onClick={() => {
      console.log ( 'Setting state value to ===>', value )
      state.setJson ( value, reasonFor ( 'Radio', 'onClick', id ) )
    }} key={key}>
      <input id={id + value} onChange={() => {}} checked={state.optJson () === value} value={state.optJson ()} type='radio' name={id} disabled={mode === 'view'} aria-label={ariaLabel}/>
      <Label htmlFor={key} label={value}/>
    </span>
  } )}</>
}

export interface LabelAndRadioProps<S, T, Context> extends RadioProps<S, T, Context> {
  label: string;
}
export function LabelAndRadio<S, T, Context> ( { state, mode, enums, label, name, ariaLabel, id }: LabelAndRadioProps<S, string, Context> ) {
  return <div><Label htmlFor={name} label={label}/><span><Radio id={id} state={state} mode={mode} enums={enums} ariaLabel={ariaLabel}/></span></div>
}
