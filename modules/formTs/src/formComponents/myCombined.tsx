import { focusPageClassName, PageDetailsForCombine } from "@focuson/pages";
import { LensState } from "@focuson/state";
import { Messages } from "./messages";
import { HasTagHolder } from "@focuson/template";
import { HasSimpleMessages } from "@focuson/utils";
import { FocusOnContext } from "@focuson/focuson";
import { DebugState } from "./debugState";


const modalPopupJSX = ( p: PageDetailsForCombine, i: number ) => {
  return (
    <div className="modalPopup show-modal focus-page">
      <div className="modalPopup-content">
        {p.element}
      </div>
    </div>
  )
}

const modalPageJSX = ( p: PageDetailsForCombine, i: number ) => {
  return (
    <div id='modalPage' className={focusPageClassName} key={i}>
      <div id='contentWrapper'>{p.element}</div>
    </div>
  )
}
const mainPageJSX = ( p: PageDetailsForCombine, i: number ) => {
  return (
    <div id='pageContainer' className={focusPageClassName} key={i}>
      <div id='contentWrapper'>{p.element}</div>
    </div>
  )
}

export function MyCombined<S extends HasTagHolder & HasSimpleMessages, Context extends FocusOnContext<S>> ( state: LensState<S, any, Context>, pages: PageDetailsForCombine[] ): JSX.Element {

  const debug = state.optJson ()?.debug
  return <>
    <div id='container' className='combine'>
      <Messages state={state.focusOn ( 'messages' )}/>
      {
        pages.map ( ( p, i ) => {
            if ( p.pageType === 'ModalPopup' ) return modalPopupJSX ( p, i )
            if ( p.pageType === 'ModalPage' ) return modalPageJSX ( p, i )
            if ( p.pageType === 'MainPage' ) return mainPageJSX ( p, i )
            throw new Error ( `Don't know how to process page type ${p.pageType}\n${JSON.stringify ( p )}` )
          }
        )}
      <DebugState state={state}/>
    </div>
  </>
}