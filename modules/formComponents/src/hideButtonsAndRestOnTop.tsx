import { NameAnd } from "@focuson-nw/utils";

export interface HideButtonsAndRestOnTopProps {
  children: JSX.Element | JSX.Element[];
  hide: string[];
  buttons: NameAnd<JSX.Element>
}
export function HideButtonsAndRestOnTopLayout ( { children, hide, buttons }: HideButtonsAndRestOnTopProps ) {
  const elements = Array.isArray ( children ) ? children : [ children ]
  const hiddenButtons = hide.map ( h => buttons[ h ] )
  const allButtons = Object.values ( buttons );

  const visibleButtons = allButtons.filter ( b => !hiddenButtons.includes ( b ) )
  const notButtons = elements.filter ( e => !allButtons.includes ( e ) )
  return <>{visibleButtons}{notButtons}</>
}