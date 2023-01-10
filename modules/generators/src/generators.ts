import { NameAnd, RestAction, toArray } from "@focuson-nw/utils";
import { AllLensRestParams, MutationsForRestAction, RefD, RestDefnInPageProperties } from "@focuson-nw/forms";


export type TaglessMapGenerator<Acc, Source> = ( source: Source, template: NameAnd<string> ) => Acc

export const composeMappers = <Acc> ( monoid: Monoid<Acc> ) => <Source> ( ...fns: TaglessMapGenerator<Acc, Source>[] ): TaglessMapGenerator<Acc, Source> =>
  ( s, temp ) => monoid.flatten ( fns.map ( fn => fn ( s, temp ) ) )

export interface ThenWord<Acc, Source> {
  thenCall: ( fn: ( acc: Acc ) => TaglessMapGenerator<Acc, Source> ) => TaglessMapGenerator<Acc, Source>
}
export const firstCall = <Acc, Source> ( first: TaglessMapGenerator<Acc, Source> ): ThenWord<Acc, Source> => ({
  thenCall: ( thenFn ) => ( source, template ) => {
    const firstResults = first ( source, template )
    return thenFn ( firstResults ) ( source, template );
  }
})

export interface Monoid<Acc> {
  zero: Acc,
  flatten: ( as: Acc[] ) => Acc
  // join: ( as: Acc, separator: string ) => Acc
}
export interface Indenter<Acc> extends Monoid<Acc> {
  indent ( level: number, acc: Acc ): Acc
}

export const indent = <Acc> ( indenter: Indenter<Acc>, level: number ) => <Source> ( ...mappers: TaglessMapGenerator<Acc, Source>[] ): TaglessMapGenerator<Acc, Source> => ( source, template ) => indenter.flatten ( mappers.map ( fn => indenter.indent ( level, fn ( source, template ) ) ) );
// export const join = <Acc> ( monoid: Monoid<Acc>, separator: string ) => <Source> ( ...mappers: TaglessMapGenerator<Acc, Source>[] ): TaglessMapGenerator<Acc, Source>
// {
//   const composed = composeMappers ( monoid ) ( ...mappers );
//   return ( s, temp ) => monoid.join ( composed ( s, temp ), separator )
// }
export interface MakeFullAcc<Source, FullAcc, Acc> {
  makeFullAcc: ( source: Source, acc: Acc ) => FullAcc
}

export const iterateOverChangingAcc = <FullAcc, Acc, Source, NewSource> ( detailsFn: ( s: Source ) => NewSource[], monoid: Monoid<Acc>, makeFullAcc: MakeFullAcc<NewSource, FullAcc, Acc> ) => ( ...fns: TaglessMapGenerator<Acc, NewSource>[] ): TaglessMapGenerator<FullAcc[], Source> => {
  const composedFns: TaglessMapGenerator<Acc, NewSource> = composeMappers ( monoid ) ( ...fns )
  return ( source, template ) => detailsFn ( source ).map ( ( newSource: NewSource ) => makeFullAcc.makeFullAcc ( newSource, composedFns ( newSource, template ) ) )
};
export const iterateOver = <Acc, Source, NewSource> ( detailsFn: ( s: Source ) => NewSource[], folder: Monoid<Acc> ) => ( ...fns: TaglessMapGenerator<Acc, NewSource>[] ): TaglessMapGenerator<Acc, Source> => {
  const composedFns: TaglessMapGenerator<Acc, NewSource> = composeMappers ( folder ) ( ...fns )
  return ( source, template ) => folder.flatten ( detailsFn ( source ).map ( newSource => composedFns ( newSource, template ) ) )
};


export interface FileAndStrings {
  filename: string
  strings: string[]
}

export const stringsMonoid: Monoid<string[]> = {
  zero: [],
  flatten: as => as.flat (),
  // join: ( as: string[], separator: string ): string[] => [ as.join ( separator ) ]
}
const stringsIndenter: Indenter<string[]> = {
  ...stringsMonoid,
  indent: ( level: number, acc: string[] ): string[] => acc.map ( s => `${''.padStart ( level )}${s}` )
}

export const makeFullAccForFileAndStrings = <Source> ( filenameFn: ( s: Source ) => string ): MakeFullAcc<Source, FileAndStrings, string[]> => ({
  makeFullAcc: ( source: Source, strings: string[] ): FileAndStrings => ({ filename: filenameFn ( source ), strings })
})

export interface RefAndRestDetails {
  ref: RefD<any>
  restName: string
  rdpp: RestDefnInPageProperties<any>
}
export interface RefRestAndAction extends RefAndRestDetails {
  action: RestAction
}

interface ParamNameAndAction {
  paramName: string
  param: AllLensRestParams<any>

}
export interface RefRestActionAndParam extends RefRestAndAction, ParamNameAndAction {
  action: RestAction
}

export interface RefRestActionAndMutation0 extends RefRestAndAction {
  mutation: MutationsForRestAction
}

export const arrayToItems = <T> ( ts: T[] ) => ts
export const pageAndRestDetailsToRestDetailsArray = ( p: RefAndRestDetails ): RefRestAndAction[] => p.rdpp.rest.actions.map ( action => ({ ...p, action }) );
export const refDToPageAndRestDetailsArray = ( ref: RefD<any> ): RefAndRestDetails[] => Object.entries ( ref.rest ).map ( ( [ restName, rdpp ] ) => ({ ref, restName, rdpp }) )
export const refDToPageRestDetailAndParamArray = ( r: RefRestAndAction ): RefRestActionAndParam[] =>
  Object.entries ( r.rdpp.rest.params ).map ( ( [ paramName, param ] ) => ({ ...r, paramName, param }) )
export const refRestActionToMutationLevel0 = ( ref: RefRestAndAction ): RefRestActionAndMutation0[] => toArray ( ref.rdpp.rest.mutations ).map ( mutation => ({ ...ref, mutation }) )

