import { PageD } from "../common/pageD";
import { NameAnd, sortedEntries } from "@focuson/utils";
import { TSParams } from "./config";
import { ButtonD } from "../buttons/allButtons";

export type ButtonCreator<Button> = ( params: TSParams ) => ( parent: PageD ) => ( [ name, button ]: [ string, Button ] ) => string;

export interface MakeButton extends NameAnd<ButtonCreator<any>> {}
//
// function restOnCommitString ( r: { rest: any, action: string } | any ): string {
//   return r ? `rest='${r.rest}' action='${r.action}'` : ''
// }
//




export const makeButtonFrom = ( maker: MakeButton ) => ( params: TSParams ) => ( parent: PageD ) => <Button extends ButtonD> ( [ name, button ]: [ string, Button ] ): string => {
  const makeButton = maker[ button.control ]
  return makeButton ?
    makeButton ( params ) ( parent ) ( [ name, button ] ) :
    `<button>${name} of type ${button.control} cannot be created yet</button>`
};

export function makeButtonsFrom ( params: TSParams, maker: MakeButton, p: PageD ): string[] {
  return sortedEntries ( p.buttons ).map ( makeButtonFrom ( maker ) ( params ) ( p ) )
}