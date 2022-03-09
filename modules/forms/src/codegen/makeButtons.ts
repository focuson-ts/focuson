import { PageD } from "../common/pageD";
import { NameAnd, sortedEntries } from "@focuson/utils";
import { TSParams } from "./config";
import { ButtonD } from "../buttons/allButtons";
import { indentList } from "./codegen";

interface CreateButtonData<B> {
  params: TSParams,
  parent: PageD<B>,
  name: string;
  button: B
}
export interface ButtonCreator<Button> {
  import: string;
  makeButton: ( data: CreateButtonData<Button> ) => string;
}

export interface MakeButton extends NameAnd<ButtonCreator<any>> {}

export const makeButtonFrom =<B extends ButtonD> ( maker: MakeButton ) => ( params: TSParams ) =>  ( parent: PageD<B> ) => ( [ name, button ]: [ string, B ] ): string => {
  const createButton = maker[ button.control ]
  return createButton ? createButton.makeButton ( { params, parent, name, button } ) : `<button>${name} of type ${button.control} cannot be created yet</button>`
};

export function makeButtonsFrom<B extends ButtonD> ( params: TSParams, maker: MakeButton, p: PageD<B> ): string[] {
  return indentList ( indentList ( sortedEntries ( p.buttons ).map ( makeButtonFrom <B>( maker ) ( params ) ( p ) ) ) )
}