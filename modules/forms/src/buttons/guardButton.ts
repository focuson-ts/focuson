import { ButtonD } from "./allButtons";
import { NameAnd } from "@focuson/utils";
import { guardName } from "../codegen/names";

export type AllGuards = LocalVariableGuard | LocalVariableMoreThanZero | LocalVariableLessThanLengthMinusOne

export const AllGuardCreator: MakeGuard<AllGuards> = {
  in: {
    imports: [],
    makeGuardVariable: ( name, guard: LocalVariableGuard ) =>
      `const ${guardName ( name )} = state.chainLens(Lenses.fromPath(${JSON.stringify ( guard.path )})).optJsonOr([]);`
  },
  ">0": {
    imports: [],
    makeGuardVariable: ( name, guard: LocalVariableMoreThanZero ) =>
      `const ${guardName ( name )} = pageState(state)().chainLens<number>(Lenses.fromPath(${JSON.stringify ( guard.path )})).optJsonOr(0) >0`
  },
  "<arrayEnd": {
    imports: [],
    makeGuardVariable: ( name, guard: LocalVariableLessThanLengthMinusOne ) =>
      `const ${guardName ( name )} =  pageState(state)().chainLens<number>(Lenses.fromPath(${JSON.stringify ( guard.varPath )})).optJsonOr(0) <  pageState(state)().chainLens<string[]>(Lenses.fromPath(${JSON.stringify ( guard.arrayPath )})).optJsonOr([]).length - 1`
  }
}
export interface GuardWithCondition {
  condition: string
}
export type Guards<G> = NameAnd<G>

export type MakeGuard<G> = NameAnd<GuardCreator<G>>

export interface GuardCreator<G> {
  imports: string[];
  makeGuardVariable: ( name: string, guard: G ) => string

}


export interface LocalVariableGuard {
  condition: 'in'
  path: string[],
  values: NameAnd<any> | undefined
}
export interface LocalVariableMoreThanZero {
  condition: '>0'
  path: string[]
}
export interface LocalVariableLessThanLengthMinusOne {
  condition: '<arrayEnd'
  varPath: string[]
  arrayPath: string[]
}


export function isGuardButton<B, G extends GuardWithCondition> ( b: ButtonD ): b is GuardButtonInPage<B, G> {
  // @ts-ignore
  return b.guard !== undefined
}

export interface GuardButtonInPage<B, G> {
  guard: B;
  by: G
}