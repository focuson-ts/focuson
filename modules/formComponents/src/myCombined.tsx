import { focusPageClassName, PageDetailsForCombine } from "@focuson/pages";
import {LensState} from "@focuson/state";
import {Messages} from "./messages";

export type PageType = 'MainPage' | 'ModalPage' | 'ModalPopup'

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

export function MyCombined <S, Context> ( state: LensState<S, any, Context>, pages: PageDetailsForCombine[] ): JSX.Element {

  return <div id='container' className='combine'>
            <Messages state={state.focusOn('messages')}/>
    {
      pages.map ( ( p, i ) => {
          if ( p.pageType === 'ModalPopup' ) return modalPopupJSX ( p, i )
          if ( p.pageType === 'ModalPage' ) return modalPageJSX ( p, i )
          if ( p.pageType === 'MainPage' ) return mainPageJSX ( p, i )
          throw new Error ( `Don't know how to process page type ${p.pageType}\n${JSON.stringify ( p )}` )
        }
      )}
  </div>
}