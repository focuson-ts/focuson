import { LensProps, LensState } from "@focuson/state";
import { ModalPagesDetails } from "./modal/modalPages";
import { Loading } from "./loading";
import { FocusedPage } from "./focusedPage";


export interface PageTemplateProps<S, D> extends LensProps<S, D> {
  loading: ( ls: LensState<S, any> ) => JSX.Element,
  focusedPage: FocusedPage<S, D>
}

/** A sample template that shows the title, and 'loading' if 'D' isn't present */
export function DefaultTemplate<S extends any, D extends any, Msgs, MD extends ModalPagesDetails<S>> ( { state, loading, focusedPage }: PageTemplateProps<S, D> ): JSX.Element {
  // @ts-ignore
  const debug = state.main?.debug?.selectedPageDebug  //basically if S extends SelectedPageDebug
  if ( debug ) console.log ( `DefaultTemplate`, focusedPage )
  if ( debug ) console.log ( `DefaultTemplate`, state )
  const { title, displayLoading, display } = focusedPage
  let isLoading = displayLoading ( state );
  if ( debug ) console.log ( `DefaultTemplate.isLoading`, isLoading )
  const bodyFn = isLoading ? loading : display
  if ( debug ) console.log ( `DefaultTemplate.bodyFn`, bodyFn )
  const child: JSX.Element = bodyFn ( state )
  if ( debug ) console.log ( `DefaultTemplate.child`, child )
  return (<div id='default template'><h1>{title ( state )}</h1>{child}</div>)
}
