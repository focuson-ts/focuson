import { focusPageClassName, PageDetailsForCombine } from "@focuson/pages";
import { LensState } from "@focuson/state";
import { Messages } from "./messages";
import { HasTagHolder } from "@focuson/template";
import { HasSimpleMessages } from "@focuson/utils";
import { FocusOnContext } from "@focuson/focuson";
import { DebugState } from "./debugState";


const modalPopupJSX = ( p: PageDetailsForCombine, i: number, messagesJSX: JSX.Element ) => {
    return (
        <div className="modalPopup show-modal focus-page">
            <div className="modalPopup-content">
                {messagesJSX}
                {p.element}
            </div>
        </div>
    )
}

const modalPageJSX = ( p: PageDetailsForCombine, i: number, messagesJSX: JSX.Element ) => {
    return (
        <div id='modalPage' className={focusPageClassName} key={i}>
            <div id='contentWrapper'>
                {messagesJSX}
                {p.element}
            </div>
        </div>
    )
}
const mainPageJSX = ( p: PageDetailsForCombine, i: number, messagesJSX: JSX.Element ) => {
    return (
        <div id='pageContainer' className={focusPageClassName} key={i}>
            <div id='contentWrapper'>
                {messagesJSX}
                {p.element}
            </div>
        </div>
    )
}

export function MyCombined<S extends HasTagHolder & HasSimpleMessages, Context extends FocusOnContext<S>> ( state: LensState<S, any, Context>, pages: PageDetailsForCombine[] ): JSX.Element {

    const debug = state.optJson ()?.debug;
    const messagesJSX = <Messages state={state.focusOn ( 'messages' )}/>
    return <>
        <div id='container' className='combine'>
            <div className='glassPane' id='glassPaneId'>
                <div className='borderPane' id='borderPaneId'>
                    {
                        pages.map ( ( p, i ) => {
                                if ( p.pageType === 'ModalPopup' ) return modalPopupJSX ( p, i, messagesJSX )
                                if ( p.pageType === 'ModalPage' ) return modalPageJSX ( p, i, messagesJSX )
                                if ( p.pageType === 'MainPage' ) return mainPageJSX ( p, i, messagesJSX )
                                throw new Error ( `Don't know how to process page type ${p.pageType}\n${JSON.stringify ( p )}` )
                            }
                        )}
                </div>
            </div>
            <DebugState state={state}/>
        </div>
    </>
}