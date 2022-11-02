import { Optional, Transform } from "@focuson/lens";
import { RestCommand, RestLoadWindowWithoutRestProps } from "@focuson/rest";
import { applyPageOps, PageSelection } from "../pageSelection";
import { DateFn, RestAction, safeArray } from "@focuson/utils";
import { ModalContext } from "./modalCommitAndCancelButton";


export interface RestLoadWindowProps extends RestLoadWindowWithoutRestProps {
  rest: string
  action: RestAction
}
export function openRestLoadWindowPageSelection ( props: RestLoadWindowProps, dateFn: () => string ) {
  const ps: PageSelection = { pageName: 'restLoader', focusOn: '~', arbitraryParams: props, time: dateFn (), pageMode: 'view' }
  return ps;
}
export function openRestLoadWindowTxs<S, Context extends ModalContext<S>> ( props: RestLoadWindowProps, pageSelectionL: Optional<S, PageSelection[]>, dateFn: DateFn ): Transform<S, any>[] {
  const ps = openRestLoadWindowPageSelection ( props, dateFn );
  const openTx: Transform<S, any> = [ pageSelectionL, applyPageOps ( 'popup', ps ) ]
  return [ openTx ]
}
export function restAndLoaderTxs <S>( restL: Optional<S, RestCommand[]>, rest: RestCommand | undefined, pageSelectionL: Optional<S, PageSelection[]>, loader: RestLoadWindowWithoutRestProps | undefined , dateFn: DateFn): Transform<S, any>[] {
  if ( rest && loader ) {
    return openRestLoadWindowTxs ( { ...loader, rest: rest.name, action: rest.restAction }, pageSelectionL, dateFn )
  }
  if ( rest ) return [ [ restL, ( ps: RestCommand[] ) => [ ...safeArray ( ps ), rest ] ] ]
  return [];
}