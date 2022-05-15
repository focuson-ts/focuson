import { Optional } from "@focuson/lens";
import { LensState } from "@focuson/state";

//Exploring options to see what the actions should look like

export type PathSpec<S> = string | LensState<S, any, any> | Optional<S, any>
export interface CopyStringAction<S> {
  action: 'copyString';
  from:  PathSpec<S>;
  to:  PathSpec<S>;
  joiner?: string
}

export interface SetToLengthAction<S> {
  action: 'setToLength';
  array:  PathSpec<S>,
  variable:  PathSpec<S>
}
export interface CopyAction<S> {
  action: 'copy';
  from:  PathSpec<S>;
  to:  PathSpec<S>
}
export interface SetAction<S> {
  action: 'copy';
  path:  PathSpec<S>;
  value: string | number | boolean
}

export interface DeleteAction<S> {
  action: 'delete'
  delete:  PathSpec<S>
}

