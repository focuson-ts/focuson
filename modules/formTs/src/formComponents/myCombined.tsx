import { focusPageClassName, PageDetailsForCombine } from "@focuson/pages";

export type PageType = 'MainPage' | 'ModalPage' | 'ModalPopup'

const modalPopupJSX = ( p: PageDetailsForCombine, i: number ) => {
  console.log ( "modalPopupJSX" )
  return (
    <div className="modalPopup show-modal focus-page">
      <div className="modalPopup-content">
        {p.element}
      </div>
    </div>
  )
}

const modalPageJSX = ( p: PageDetailsForCombine, i: number ) => {
  console.log ( "modalPageJSX" )
  return (
    <div id='modalPage' className={focusPageClassName} key={i}>
      <div id='contentWrapper'>{p.element}</div>
    </div>
  )
}
const mainPageJSX = ( p: PageDetailsForCombine, i: number ) => {
  console.log ( "mainPageJSX" )
  return (
    <div id='pageContainer' className={focusPageClassName} key={i}>
      <div id='contentWrapper'>{p.element}</div>
    </div>
  )
}

export function MyCombined ( pages: PageDetailsForCombine[] ): JSX.Element {
  console.log ( "mycombined", pages.map ( pd => pd.pageType ) )
  return <div id='container' className='combine'>
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