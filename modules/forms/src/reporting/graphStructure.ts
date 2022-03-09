import { PageD } from "../common/pageD";
import { isModalButtonInPage } from "../buttons/modalButtons";
import { sortedEntries } from "@focuson/utils";
import { ButtonD } from "../buttons/allButtons";
import { indentList } from "../codegen/codegen";

interface GraphNode<Other> {
  children: Other[]
}

export interface WindowNode<B> extends GraphNode<ButtonNode<B>> {
  pageD: PageD<any>;
}

export interface ButtonNode<B> extends GraphNode<WindowNode<B>> {
  name: string;
  button: B;
}

export function formatWindowNode<B extends ButtonD> ( w: WindowNode<B>, visited: Set<string>, avoidLoops?: boolean ): string[] {
  if ( avoidLoops && visited.has ( w.pageD.name ) ) return [ `${w.pageD.name} (visited already)` ]
  visited.add ( w.pageD.name )
  return [ `${w.pageD.name}`, ...indentList ( w.children.flatMap ( c => formatButtonNode ( c, visited, avoidLoops ) ) ) ]

}
export function formatButtonNode<B extends ButtonD> ( b: ButtonNode<B>, visited: Set<string>, avoidLoops: boolean ): string[] {
  return [ `${b.name}: ${b.button.control}`, ...indentList ( b.children.flatMap ( c => formatWindowNode ( c, visited, avoidLoops ) ) ) ]

}

export function makeGraph<B extends ButtonD> ( pageD: PageD<B> ): WindowNode<B> {
  return { pageD, children: findButtons ( pageD ) }
}
export function findButtons<B extends ButtonD> ( pageD: PageD<B> ): ButtonNode<B>[] {
  return sortedEntries ( pageD.buttons ).map ( ( [ name, button ] ) => ({
    name,
    button,
    children: isModalButtonInPage ( button ) ? [ makeGraph ( button.modal ) ] : []
  }) )
}