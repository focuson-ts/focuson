import { NameAnd, safeArray } from "@focuson/utils";
import { ButtonFromPage } from "./buttonFromPage";

export interface HasButtons{
  allButtons: NameAnd<JSX.Element>;
  buttons?: string[];
}

export function makeButtons ( {allButtons, buttons}: HasButtons) {
  return safeArray ( buttons ).map ( ( b, i ) =>
    <ButtonFromPage key={b} button={b} buttons={allButtons}/> )
}