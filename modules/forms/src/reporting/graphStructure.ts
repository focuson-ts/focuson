import { PageD } from "../common/pageD";
import { isModalButtonInPage } from "../buttons/modalButtons";
import { sortedEntries } from "@focuson/utils";
import { ButtonD, isButtonWithControl } from "../buttons/allButtons";
import { indentList } from "../codegen/codegen";
import { isGuardButton } from "../buttons/guardButton";

interface GraphNode<Other> {
  children: Other[]
}

export interface WindowNode<B, G> extends GraphNode<ButtonNode<B, G>> {
  pageD: PageD<B, G>;
}

export interface ButtonNode<B, G> extends GraphNode<WindowNode<B, G>> {
  name: string;
  button: B;
}

export function formatWindowNode<B extends ButtonD, G> ( w: WindowNode<B, G>, visited: Set<string>, avoidLoops?: boolean ): string[] {
  if ( avoidLoops && visited.has ( w.pageD.name ) ) return [ `${w.pageD.name} (visited already)` ]
  visited.add ( w.pageD.name )
  return [ `${w.pageD.name}`, ...indentList ( w.children.flatMap ( c => formatButtonNode ( c, visited, avoidLoops ) ) ) ]

}
export function formatButtonNode<B extends ButtonD, G> ( b: ButtonNode<B, G>, visited: Set<string>, avoidLoops: boolean ): string[] {
  let button = b.button;
  if ( isButtonWithControl ( button ) )
    return [ `${b.name}: ${button.control}`, ...indentList ( b.children.flatMap ( c => formatWindowNode ( c, visited, avoidLoops ) ) ) ]
  if ( isGuardButton ( button ) ) {
    const guard = button.guard
    if ( isButtonWithControl ( guard ) )
      return [ `${b.name}: ${guard.control} (Guarded ${JSON.stringify ( button.by )})`, ...indentList ( b.children.flatMap ( c => formatWindowNode ( c, visited, avoidLoops ) ) ) ]
  }
  throw Error ( `Cannot format ${button}` )

}

export function makeGraph<B extends ButtonD, G> ( pageD: PageD<B, G> ): WindowNode<B, G> {
  return { pageD, children: findButtons ( pageD ) }
}
export function findButtons<B extends ButtonD, G> ( pageD: PageD<B, G> ): ButtonNode<B, G>[] {
  return sortedEntries ( pageD.buttons ).map ( ( [ name, button ] ) => ({
    name,
    button,
    children: isModalButtonInPage<G> ( button ) ? [ makeGraph ( button.modal ) ] : []
  }) )
}