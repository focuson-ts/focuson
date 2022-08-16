import { focusPageClassName, PageDetailsForCombine } from "@focuson/pages";
import { LensState } from "@focuson/state";
import { Messages } from "./messages";
import { HasTagHolder } from "@focuson/template";
import { HasSimpleMessages, SimpleMessage } from "@focuson/utils";
import { FocusOnContext } from "@focuson/focuson";
import { DebugState } from "./debugState";
import { lastIndexOf } from "./common";


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
    <div id={`page${i}`}  className={focusPageClassName} key={i}>
      <div id='contentWrapper'>
        {messagesJSX}
        {p.element}
      </div>
    </div>
  )
}

export function MyCombined<S extends HasTagHolder & HasSimpleMessages, Context extends FocusOnContext<S>> ( state: LensState<S, any, Context>, pages: PageDetailsForCombine[] ): JSX.Element {

  const debug = state.optJson ()?.debug;
  const lastIndexOfMainOrModalPage = lastIndexOf ( pages, p => p.pageType === 'MainPage' || p.pageType === 'ModalPage' )
  const clippedPages = pages.slice ( lastIndexOfMainOrModalPage )
  const pagesToShow = clippedPages.length === 0 ? pages : clippedPages // this occurs when we have a mainpop at the beginning
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
              if ( p.pageType === 'Arbitrary' ) return modalPageJSX ( p, i, messagesJSX )
              throw new Error ( `Don't know how to process page type ${p.pageType}\n${JSON.stringify ( p )}` )
            }
          )}
      </div>
      <DebugState state={state}/>
    </div>
  </>
}