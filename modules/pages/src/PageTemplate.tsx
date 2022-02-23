import { LensProps, LensState } from "@focuson/state";
import { FocusedPage } from "./focusedPage";
import { PageMode } from "./pageSelection";


export interface PageTemplateProps<S, D, Context> extends LensProps<S, D, Context> {
  loading: ( ls: LensState<S, any, Context> ) => JSX.Element,
  focusedPage: FocusedPage<S, D, Context>
  pageMode: PageMode
}

/** A sample template that shows the title, and 'loading' if 'D' isn't present */
export function DefaultTemplate<S extends any, D extends any, Msgs, Context> ( { state, loading, focusedPage, pageMode }: PageTemplateProps<S, D, Context> ): JSX.Element {
  // @ts-ignore
  const debug = state.main?.debug?.selectedPageDebug  //basically if S extends SelectedPageDebug
  if ( debug ) console.log ( `DefaultTemplate`, focusedPage )
  if ( debug ) console.log ( `DefaultTemplate`, state )
  const { title, displayLoading, display } = focusedPage
  let isLoading = displayLoading ( state );
  if ( debug ) console.log ( `DefaultTemplate.isLoading`, isLoading )
  const bodyFn = isLoading ? loading : display
  if ( debug ) console.log ( `DefaultTemplate.bodyFn`, bodyFn )
  const child: JSX.Element = bodyFn ( state, pageMode )
  if ( debug ) console.log ( `DefaultTemplate.child`, child )
  return (<div id='default template'><h1>{title ( state )}</h1>{child}</div>)
}
