import { lensBuilder, Lenses, Optional, PathBuilder, prefixNameAndLens } from "@focuson/lens";

export function pathBuilderForLensIncPage ( pageName: string ): PathBuilder<Optional<any, any>> {
  return lensBuilder ( prefixNameAndLens<any> ( [ '~', Lenses.identity<any> ().focusQuery ( pageName ) ] ) )
}
export function pathBuilderForLensWithPageAsIdentity (): PathBuilder<Optional<any, any>> {
  return lensBuilder ( prefixNameAndLens<any> ( [ '~', Lenses.identity<any> () ], [ '', Lenses.identity<any> () ] ) )
}