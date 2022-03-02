import { PageD } from "../common/pageD";
import { NameAnd, sortedEntries } from "@focuson/utils";
import { TSParams } from "./config";
import { ButtonD } from "../buttons/allButtons";
import { indentList } from "./codegen";

interface CreateButtonData<B> {
  params: TSParams,
  parent: PageD,
  name: string;
  button: B
}
export type ButtonCreator<Button> = ( data: CreateButtonData<Button> ) => string;

export interface MakeButton extends NameAnd<ButtonCreator<any>> {}

export const makeButtonFrom = ( maker: MakeButton ) => ( params: TSParams ) => ( parent: PageD ) => <Button extends ButtonD> ( [ name, button ]: [ string, Button ] ): string => {
  const makeButton = maker[ button.control ]
  return makeButton ? makeButton ( { params, parent, name, button } ) : `<button>${name} of type ${button.control} cannot be created yet</button>`
};

export function makeButtonsFrom ( params: TSParams, maker: MakeButton, p: PageD ): string[] {
  return indentList(indentList(sortedEntries ( p.buttons ).map ( makeButtonFrom ( maker ) ( params ) ( p ) )))
}