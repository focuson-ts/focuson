import { NameAnd } from "@focuson/utils";

export interface HideButtonsProps {
    children: JSX.Element | JSX.Element[];
    hide: string[];
    buttons: NameAnd<JSX.Element>
}
export function HideButtonsLayout ( { children, hide, buttons }: HideButtonsProps ) {
    const elements = Array.isArray ( children ) ? children : [ children ]
    const hiddenButtons = new Set<JSX.Element> ()
    hide.forEach ( h => hiddenButtons.add ( buttons[ h ] ) )
    const visibleElements = elements.filter ( e => !hiddenButtons.has ( e ) )
    return <>{visibleElements}</>

}