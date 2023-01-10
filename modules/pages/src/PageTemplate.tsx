import { LensProps, LensState, reasonFor } from "@focuson-nw/state";
import { FocusedPage, TitleDetails } from "./focusedPage";
import { PageMode } from "@focuson-nw/utils";
import { HasCloseOnePage } from "@focuson-nw/rest";


export interface PageTemplateProps<S, D, Context> extends LensProps<S, D, Context> {
  loading: ( ls: LensState<S, any, Context> ) => JSX.Element;
  focusedPage: FocusedPage<S, D, Context>;
  pageMode: PageMode;
  index: number
}
export const focusPageClassName = 'focus-page'

/** A sample template that shows the title, and 'loading' if 'D' isn't present */
export function DefaultTemplate<S extends any, D extends any, Msgs, Context extends HasCloseOnePage<S, any>> ( { state, loading, focusedPage, pageMode, index }: PageTemplateProps<S, D, Context> ): JSX.Element {
  // @ts-ignore
  const debug = state.main?.debug?.selectedPageDebug  //basically if S extends SelectedPageDebug
  if ( debug ) console.log ( `DefaultTemplate`, focusedPage )
  if ( debug ) console.log ( `DefaultTemplate`, state )
  const { title, displayLoading, display } = focusedPage
  let isLoading = displayLoading ( state );

  if ( debug ) console.log ( `DefaultTemplate.isLoading`, isLoading )
  const bodyFn = isLoading ? loading : display
  if ( debug ) console.log ( `DefaultTemplate.bodyFn`, bodyFn )
  const child: JSX.Element = bodyFn ( state, pageMode, index )
  if ( debug ) console.log ( `DefaultTemplate.child`, child )
  const titleDetails: TitleDetails = title ( state );
  const needCrossButton = focusedPage.haveTopRightCrossToCancel !== false
  function onClick () {
    const txs = state.context.closeOnePageTxs ( `CrossAtTopRight`, state.main, undefined, state.context, [] );
    state.massTransform ( reasonFor ( 'DefaultTemplate', "onClick", 'default_template' ) ) ( ...txs )
  }
  const crossButton = needCrossButton ? <button className='top-right-cross' onClick={onClick}></button> : <></>
  return (<>{crossButton}
    <div key={index} id='default_template'><h1 className={titleDetails.className} dangerouslySetInnerHTML={{ __html: titleDetails.title }}/>{child}</div>
  </>)
}
