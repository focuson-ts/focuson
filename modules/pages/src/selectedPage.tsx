import { LensProps, LensState } from "@focuson/state";

import { currentPageSelection, HasPageSelectionLens, mainPage, mainPageFrom, page, PageMode, PageParams, PageSelection, PageSelectionContext } from "./pageSelection";
import { FocusedPage } from "./focusedPage";
import { isMainPageDetails, MainPageDetails, MultiPageDetails, OnePageDetails, PageConfig } from "./pageConfig";
import { DefaultTemplate, PageTemplateProps } from "./PageTemplate";
import { Loading } from "./loading";
import { lensBuilder, Lenses, NameAndLens, Optional, parsePath } from "@focuson/lens";
import { safeString } from "@focuson/utils";

export interface HasSelectedPageDebug {
  debug?: SelectedPageDebug
}
export interface SelectedPageDebug {
  selectedPageDebug?: boolean
}

export function SelectedPage<S, Context extends PageSelectionContext<S>> ( { state }: LensProps<S, any, Context> ) {
  let combine = state.context.combine;
  let pages: PageDetailsForCombine[] = findSelectedPageDetails ( state );
  return combine ? combine ( state, pages ) : <div key={0}>{pages}</div>
}

export interface PageDetailsForCombine {
  pageType?: string;
  element: JSX.Element;
  pageParams?: PageParams;
  pageDisplayedTime: string;
}

function findSelectedPageDetails<S, Context extends PageSelectionContext<S>> ( state: LensState<S, any, Context> ): PageDetailsForCombine[] {
  // @ts-ignore
  const debug = state.main?.debug?.selectedPageDebug  //basically if S extends SelectedPageDebug..
  let selectedPageData: PageSelection[] = currentPageSelection ( state );
  if ( debug ) console.log ( 'findSelectedPageDetails - for Combine', selectedPageData )

  let results = selectedPageData.map ( findOneSelectedPageDetails ( state, findMainPageDetails ( selectedPageData, state.context.pages ), selectedPageData.length ) );
  // results.forEach((p, i) =>p.element.key=i)
  return results
}

export function fullState<S, T, C> ( ls: LensState<S, T, C> ): LensState<S, S, C> {
  return ls.copyWithLens ( Lenses.identity () )
}
export const pageState = <S, T, C extends HasPageSelectionLens<S>> ( ls: LensState<S, T, C> ) => <D extends any> (): LensState<S, D, C> => {
  let ps = mainPage ( ls )
  if ( !ps ) throw new Error ( 'no selected page' )
  // @ts-ignore
  let newState: LensState<S, any, C> = fullState ( ls ).focusOn ( ps.pageName );
  return newState
};

export const prefixToLensFromRoot: NameAndLens<any> = { "/": Lenses.identity () };
export const prefixToLensFromBasePath: NameAndLens<any> = { "~/": Lenses.identity () };


export function lensForPageDetails<S, D, Msgs, Config extends PageConfig<S, D, Msgs, Context>, Context extends PageSelectionContext<S>> ( mainPageD: MainPageDetails<S, D, Msgs, Config, Context>,
                                                                                                                                          currentPageD: OnePageDetails<S, D, Msgs, Config, Context>, base?: string ): Optional<S, any> {
  if ( isMainPageDetails ( currentPageD ) ) return currentPageD.lens
  return parsePath<Optional<S, any>> ( safeString ( base ), lensBuilder<S> ( {
    '/': Lenses.identity (),
    '~': mainPageD.lens,
  }, mainPageD.namedOptionals ) )
}
export const fromPathFromRaw = <S, D, Msgs, Config extends PageConfig<S, D, Msgs, Context>, Context extends PageSelectionContext<S>>
( pageSelectionL: Optional<S, PageSelection[]>, pageDetails: MultiPageDetails<S, any> ) => ( s: S, currentLens?: Optional<S, any> ) => {
  let selectedPageData: PageSelection[] = pageSelectionL.getOption ( s );
  if ( selectedPageData === undefined ) throw Error ( `Calling lensForPageDetailsFromRaw without a selected page\n ${JSON.stringify ( s )}` )
  const mainPageD: MainPageDetails<S, D, Msgs, Config, Context> = findMainPageDetails ( selectedPageData, pageDetails )
  let prefixes: NameAndLens<S> = {
    '/': Lenses.identity (),
    '~': mainPageD.lens,
  };
  if ( currentLens ) prefixes[ '' ] = currentLens
  const builder = lensBuilder<S> ( prefixes, mainPageD.namedOptionals )
  return ( path: string ): Optional<S, any> => parsePath ( path, builder )
};


export const findOneSelectedPageDetails = <S, T, Context extends PageSelectionContext<S>> ( state: LensState<S, T, Context>, page0Details: MainPageDetails<S, any, any, any, Context>, pageCount: number ) =>
  ( ps: PageSelection, index: number ): PageDetailsForCombine => {
    // @ts-ignore
    const debug = state.main?.debug?.selectedPageDebug  //basically if S extends SelectedPageDebug..
    const pages = state.context.pages
    const { pageName, pageMode, focusOn } = ps
    const page = pages[ pageName ]
    if ( !page ) throw Error ( `Cannot find page with name ${pageName}, legal Values are [${Object.keys ( pages ).join ( "," )}]\nIs this a modal page and you need to add it to the main page?` )
    const { config, pageFunction, pageType } = page

    const lsForPage = state.copyWithLens ( lensForPageDetails ( page0Details, page, focusOn ) )

    if ( debug ) console.log ( "findOneSelectedPageDetails.pageFunction", pageFunction )
    if ( typeof pageFunction === 'function' ) {// this is for legacy support
      if ( debug ) console.log ( "findOneSelectedPageDetails.legacy display" )
      let element = pageFunction ( { state: lsForPage } );
      if ( debug ) console.log ( "findOneSelectedPageDetails.legacy result", element )
      if ( debug ) console.log ( "findOneSelectedPageDetails.legacy result - json", JSON.stringify ( element ) )
      return { element, pageType, pageDisplayedTime: ps.time }
    } else return displayOne ( config, pageType, pageFunction, ps.pageParams, ps.time, lsForPage, pageMode, pageCount - index );
  };

export function findMainPageDetails<S> ( pageSelections: PageSelection[], pageDetails: MultiPageDetails<S, any> ) {
  const firstPage = mainPageFrom(pageSelections)
  let page0Details: any = pageDetails[ firstPage.pageName ];
  if ( page0Details.pageType !== 'MainPage' ) throw Error ( `Software error:  page ${firstPage.pageName} is not a main page.\nPageSelections: ${JSON.stringify(pageSelections)}\n\nfirstPage: ${firstPage}` )
  return page0Details
}

/** Given a config.ts, a focused page data structure and a lens state (focused on anything...doesn't matter) this will display a page */
export function displayOne<S extends any, D extends any, Msgs, Context extends PageSelectionContext<S>> (
  config: PageConfig<S, D, Msgs, Context>,
  pageType: string | undefined,
  focusedPage: FocusedPage<S, D, Context>,
  pageParams: PageParams | undefined,
  pageDisplayedTime: string,
  s: LensState<S, D, Context>, pageMode: PageMode, index: number ): PageDetailsForCombine {
  // @ts-ignore
  const debug = s.main?.debug?.selectedPageDebug  //basically if S extends SelectedPageDebug..
  let t = config.template
  const template: ( p: PageTemplateProps<S, D, Context> ) => JSX.Element = t ? t : DefaultTemplate
  if ( debug ) console.log ( "displayMain.template 1", template )
  const loading = config.loading ? config.loading : Loading
  if ( debug ) console.log ( "displayMain.loading 2", loading )
  const element = template ( { state: s, focusedPage, loading, pageMode, index } )
  if ( debug ) console.log ( "displayMain.element 3", element );
  return { element, pageType, pageParams, pageDisplayedTime }
}

