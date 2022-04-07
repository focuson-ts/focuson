import { MainPageD, PageD } from "../common/pageD";
import { NameAnd, sortedEntries } from "@focuson/utils";
import { TSParams } from "./config";
import { ButtonD, ButtonWithControl, isButtonWithControl } from "../buttons/allButtons";
import { addBrackets, addStringToStartOfFirst, indentList } from "./codegen";
import { GuardWithCondition, isGuardButton, MakeGuard } from "../buttons/guardButton";
import { guardName } from "./names";

export interface CreateButtonData<B, G> {
  params: TSParams,
  parent: PageD<B, G>,
  name: string;
  button: B
}
export interface ButtonCreator<B, G> {
  import: string;
  makeButton: ( data: CreateButtonData<B, G> ) => string[];
}

export interface MakeButton<G> extends NameAnd<ButtonCreator<any, G>> {}


const makeControlButton = <B, G> ( maker: MakeButton<G> ) => ( params: TSParams ) => ( parent: PageD<B, G> ) => ( [ name, button ]: [ string, ButtonWithControl ] ): string[] => {
  const createButton = maker[ button.control ]
  return createButton ? createButton.makeButton ( { params, parent, name, button } ) : [ `<button>${name} of type ${button.control} cannot be created yet</button>` ]
}
export const makeButtonFrom = <B extends ButtonD, G> ( makeGuard: MakeGuard<G>, maker: MakeButton<G> ) => ( params: TSParams ) => ( parent: PageD<B, G> ) => ( [ name, button ]: [ string, B ] ): string[] => {
         if ( isButtonWithControl ( button ) )
           return makeControlButton ( maker ) ( params ) ( parent ) ( [ name, button ] )
         if ( isGuardButton<B, G> ( button ) ) {
           return [ `<GuardButton cond={${guardName ( name )}}>`,
             ...indentList ( makeButtonFrom ( makeGuard, maker ) ( params ) ( parent ) ( [ name, button.guard ] ) ),
             "</GuardButton>" ]
         }
         throw Error ( `Don't know how to process button ${name} ${JSON.stringify ( button )}` )
       }
;

const makeButtonGuardVariableFrom = <B extends ButtonD, G extends GuardWithCondition> ( params: TSParams, maker: MakeGuard<G>, mainP: MainPageD<B, G>, p: PageD<B, G> ) => ( [ name, button ]: [ string, B ] ): string[] => {
  if ( isGuardButton<B, G> ( button ) ) {
    const guardCreator = maker[ button.by.condition ]
    if ( !guardCreator ) throw Error ( `Don't know how to makeButtonGuardVariableFrom(${name},${button.by.condition} in page ${p.name}` )
    return [ guardCreator.makeGuardVariable ( params, mainP, p, name, button.by ) ]
  }
  return []
};

export function makeGuardButtonVariables<B extends ButtonD, G extends GuardWithCondition> ( params: TSParams, makeGuard: MakeGuard<G>, mainP: MainPageD<B, G>, p: PageD<B, G> ): string[] {
  return sortedEntries ( p.buttons ).flatMap ( makeButtonGuardVariableFrom ( params, makeGuard, mainP, p ) )
}
export function makeButtonsFrom<B extends ButtonD, G> ( params: TSParams, makeGuard: MakeGuard<G>, makeButton: MakeButton<G>, p: PageD<B, G> ): string[] {
  if ( Object.keys ( p.buttons ).length === 0 ) return [ '{}' ]
  return indentList ( indentList ( addBrackets ( `{`, '}' ) ( sortedEntries ( p.buttons ).flatMap ( ( [ name, button ] ) =>
    addBrackets ( `${name}:`, ',' ) ( makeButtonFrom<B, G> ( makeGuard, makeButton ) ( params ) ( p ) ( [ name, button ] ) ) ) ) ) )
}

export function makeButtonsVariable<B extends ButtonD, G> ( params: TSParams, makeGuard: MakeGuard<G>, makeButton: MakeButton<G>, p: PageD<B, G> ): string[] {
  return addStringToStartOfFirst ( "const buttons =" ) ( makeButtonsFrom<B, G> ( params, makeGuard, makeButton, p ) )
}

export function addButtonsFromVariables<B extends ButtonD, G> ( p: PageD<any, any> ): string[] {
  let keys = Object.keys ( p.buttons );
  return keys.map ( name => `{ buttons.${name} } ` )

}