import { findThisPageElement, firstTimeHappened, focusPageClassName, PageDetailsForCombine, resetFirstTimeHappened } from "@focuson/pages";
import { LensState } from "@focuson/state";
import { Messages } from "./messages";
import { HasTagHolder } from "@focuson/template";
import { HasSimpleMessages } from "@focuson/utils";
import { FocusOnContext, HasEnvironment } from "@focuson/focuson";
import { DebugState } from "./debugState";
import { lastIndexOf } from "./common";
import { useEffect } from "react";


const popupJSX = ( p: PageDetailsForCombine, i: number, messagesJSX: JSX.Element ) => {
  return (
    <div id={`page${i}`} className="modalPopup show-modal focus-page" key={i}>
      <div className="modalPopup-content">
        {messagesJSX}
        {p.element}
      </div>
    </div>
  )
}
const arbitaryJSX = ( p: PageDetailsForCombine, i: number, messagesJSX: JSX.Element ) => {
  return (
    <div id={`page${i}`} className="modalPopup show-modal focus-page" key={i}>
      <div>
        {messagesJSX}
        {p.element}
      </div>
    </div>
  )
}

const modalPageJSX = ( p: PageDetailsForCombine, i: number, messagesJSX: JSX.Element ) => {
  return (
    <div id={`page${i}`} className={focusPageClassName} key={i}>
      <div id='contentWrapper'>
        {messagesJSX}
        {p.element}
      </div>
    </div>
  )
}
const mainPageJSX = ( p: PageDetailsForCombine, i: number, messagesJSX: JSX.Element ) => {
  return (
    <div id={`page${i}`} className={focusPageClassName} key={i}>
      <div id='contentWrapper'>
        {messagesJSX}
        {p.element}
      </div>
    </div>
  )
}

export function MyCombined<S extends HasTagHolder & HasSimpleMessages & HasEnvironment, Context extends FocusOnContext<S>> ( state: LensState<S, any, Context>, pages: PageDetailsForCombine[] ): JSX.Element {

  if ( firstTimeHappened ) {
    useEffect ( () => {
      // console.log ( 'First time happened' )
      resetFirstTimeHappened ()
      const thisPage = findThisPageElement ( focusPageClassName );
      const inputs = thisPage.getElementsByTagName ( 'input' )
      if ( inputs.length > 0 ) {
        const item = inputs.item ( 0 );
        if ( item ) {
          item.focus ( { preventScroll: false } )
          item.select ()
        }
      }
    } )
  }
  const lastIndexOfMainOrModalPage = lastIndexOf ( pages, p => p.pageType === 'MainPage' || p.pageType === 'ModalPage' )
  const clippedPages = pages.slice ( lastIndexOfMainOrModalPage )
  const pagesToShow = clippedPages.length === 0 ? pages : clippedPages // this occurs when we have a mainpop at the beginning
  const showDebug = state.main.environment?.showDebugButton !== false
  console.log ( 'My Combined', 'State', state.main, 'showDebug', showDebug )
  return <>
    <div id='container' className='combine'>
      <div className='glassPane'>
        {
          pagesToShow.map ( ( p, i ) => {
              const nextPageTime = pagesToShow[ i + 1 ]?.pageDisplayedTime
              const messagesJSX = <Messages state={state.focusOn ( 'messages' )} pageDisplayTime={p.pageDisplayedTime} nextPageDisplayTime={nextPageTime}/>
              if ( p.pageType === 'MainPopup' ) return popupJSX ( p, i, messagesJSX )
              if ( p.pageType === 'ModalPopup' ) return popupJSX ( p, i, messagesJSX )
              if ( p.pageType === 'ModalPage' ) return modalPageJSX ( p, i, messagesJSX )
              if ( p.pageType === 'MainPage' ) return mainPageJSX ( p, i, messagesJSX )
              if ( p.pageType === 'Arbitrary' ) return arbitaryJSX ( p, i, messagesJSX )
              throw new Error ( `Don't know how to process page type ${p.pageType}\n${JSON.stringify ( p )}` )
            }
          )}
      </div>
      {showDebug && <DebugState state={state}/>}
    </div>
  </>
}