import { NameAnd } from "@focuson/utils";

export interface HideButtonsAndRestOnTopProps {
  children: JSX.Element | JSX.Element[];
  hide: string[];
  buttons: NameAnd<JSX.Element>
}
export function HideButtonsAndRestOnTopLayout ( { children, hide, buttons }: HideButtonsAndRestOnTopProps ) {
  const elements = Array.isArray ( children ) ? children : [ children ]
  const hiddenButtons = new Set<JSX.Element> ()
  hide.forEach ( h => hiddenButtons.add ( buttons[ h ] ) )
  const allButtons = Object.values ( buttons );

  const visibleButtons = allButtons.filter ( b => !hiddenButtons.has ( b ) )
  const notButtons = elements.filter ( e => !allButtons.includes ( e ) )
    return <>{visibleButtons}{notButtons}</>
}