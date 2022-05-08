import { ButtonD } from "./allButtons";
import { NameAnd } from "@focuson/utils";
import { guardName } from "../codegen/names";
import { stateQueryForGuards } from "../codegen/lens";
import { MainPageD, PageD } from "../common/pageD";
import { TSParams } from "../codegen/config";


export type AllGuards = LocalVariableGuard | LocalVariableMoreThanZero | LocalVariableLessThanLengthMinusOne | LocalVariableValueEquals<any> | LocalVariableDefined

function errorPrefix ( mainP: PageD<any, any>, p: PageD<any, any>, name: string, guard: any ) {
  if ( mainP.name === p.name ) return `MakeGuardVariable for ${p.name} ${name} ${JSON.stringify ( guard )}`
  return `MakeGuardVariable for ${mainP.name}/${p.name} ${name} ${JSON.stringify ( guard )}`
}
export const AllGuardCreator: MakeGuard<AllGuards> = {
  in: {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: LocalVariableGuard ) =>
      `const ${guardName ( name )} = ${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.path )}.optJson();`
  },
  isDefined: {
    imports: [],
    makeGuardVariable: ( params, mainPage, page, name, guard: LocalVariableDefined ) =>
      `const ${guardName ( name )} = ${stateQueryForGuards ( errorPrefix ( mainPage, page, name, guard ), params, mainPage, page, guard.path )}.optJson() !== undefined`
  },
  equals: {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: LocalVariableValueEquals<any> ) =>
      `const ${guardName ( name )} =  ${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.path )}.optJson() === ${guard.value};`
  },

  notEquals: {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: LocalVariableValueEquals<any> ) =>
      `const ${guardName ( name )} =  ${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.path )}.optJson() !== ${JSON.stringify(guard.value)};`
  },

  ">0": {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: LocalVariableMoreThanZero ) =>
      `const ${guardName ( name )} =  ${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.path )}.optJsonOr(0) >0`
  },
  "<arrayEnd": {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: LocalVariableLessThanLengthMinusOne ) =>
      `const ${guardName ( name )} =  ${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.varPath )}.optJsonOr(0) <  ${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.arrayPath )}.optJsonOr([]).length - 1`
  }
}
export interface GuardWithCondition {
  condition: string
}
export type Guards<G> = NameAnd<G>

export type MakeGuard<G> = NameAnd<GuardCreator<G>>

export interface GuardCreator<G> {
  imports: string[];
  makeGuardVariable: ( params: TSParams, mainPage: MainPageD<any, G>, page: PageD<any, G>, name: string, guard: G ) => string

}


export interface LocalVariableGuard {
  condition: 'in'
  path: string,
  values: NameAnd<any> | undefined
}
export interface LocalVariableMoreThanZero {
  condition: '>0'
  path: string
}
export interface LocalVariableValueEquals<T> {
  condition: 'equals' | 'notEquals';
  path: string;
  value: T
}
export interface LocalVariableDefined {
  condition: 'isDefined';
  path: string;
}
export interface LocalVariableLessThanLengthMinusOne {
  condition: '<arrayEnd'
  varPath: string
  arrayPath: string
}


export function isGuardButton<B, G> ( b: any ): b is GuardButtonInPage<B, G> {
  // @ts-ignore
  return b.guard !== undefined
}

export interface GuardButtonInPage<B, G> {
  guard: B;
  by: G
}