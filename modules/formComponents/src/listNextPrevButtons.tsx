import { LensState, reasonFor } from "@focuson/state";
import { disabledFrom, or, safeArray, useOrDefault } from "@focuson/utils";
import { CustomButtonType, getButtonClassName } from "./common";
import { wrapWithErrors } from "@focuson/pages/dist/src/errors";

export interface ListButtonProps<S, C> extends CustomButtonType {
  id: string;
  title: string;
  enabledBy?: string[][];
  value: LensState<S, number, C>;
  list: LensState<S, any[], C>;
}
export function ListNextButton<S, C> ( { id, title, value, list, enabledBy, buttonType }: ListButtonProps<S, C> ) {
  const index = value.optJson ()
  const i = index ? index : 0
  const listSize = safeArray ( list.optJson () ).length
  const disabled = (index !== undefined && index >= listSize - 1)
  return wrapWithErrors ( id, enabledBy, (errorProps, error) =>
    <button id={id}  {...errorProps} disabled={disabled || error} onClick={() => value.setJson ( i + 1, reasonFor ( 'ListNextButton', 'onClick', id ) )} className={getButtonClassName ( buttonType )}>{title} </button> )
}

export function ListPrevButton<S, C> ( { id, title, value, enabledBy, buttonType }: ListButtonProps<S, C> ) {
  const index = value.optJson ()
  const i = index ? index : 0
  const disabled = (index !== undefined && index <= 0)
  return wrapWithErrors ( id, enabledBy, (errorProps, error) =>
    <button id={id}{...errorProps} disabled={disabled || error} onClick={() => value.setJson ( i - 1, reasonFor ( 'ListPrevButton', 'onClick', id ) )} className={getButtonClassName ( buttonType )}>{title}</button> )
}