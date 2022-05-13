import { ButtonD } from "./allButtons";
import { NameAnd, toArray } from "@focuson/utils";
import { guardName } from "../codegen/names";
import { stateQueryForGuards } from "../codegen/lens";
import { MainPageD, PageD } from "../common/pageD";
import { TSParams } from "../codegen/config";
import { PageMode } from "@focuson/pages";


export type AllGuards = LocalVariableGuard | LocalVariableMoreThanZero | LocalVariableLessThanLengthMinusOne |
  LocalVariableValueEquals<any> | LocalVariableDefined | ALessThanB | BinaryCondition |
  AndOrCondition | NotCondition | PageModeIs | ContainsGuard

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
  'a<b': {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: ALessThanB ) =>
      `const ${guardName ( name )} =  ${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.aPath )}.optJsonOr(Number.MAX_VALUE) <  ${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.bPath )}.optJsonOr(Number.MIN_VALUE);`
  },
  '<#': {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: BinaryCondition ) =>
      `const ${guardName ( name )} =  ${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.path )}.optJsonOr(Number.MAX_VALUE) <  ${guard.value};`
  },

  '>#': {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: BinaryCondition ) =>
      `const ${guardName ( name )} =  ${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.path )}.optJsonOr(Number.MIN_VALUE) > ${guard.value}`
  },

  notEquals: {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: LocalVariableValueEquals<any> ) =>
      `const ${guardName ( name )} =  ${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.path )}.optJson() !== ${JSON.stringify ( guard.value )};`
  },
  or: {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: AndOrCondition ) =>
      `const ${guardName ( name )} =  ${guard.conditions.map ( c => c + 'Guard' ).join ( "||" )};`
  },
  and: {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: AndOrCondition ) =>
      `const ${guardName ( name )} =  ${guard.conditions.map ( c => c + 'Guard' ).join ( "&&" )};`
  },
  not: {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: NotCondition ) =>
      `const ${guardName ( name )} =  !${guard.cond}Guard';`
  },
  pageModeIs: {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: PageModeIs ) =>
      `const ${guardName ( name )} =  ${JSON.stringify ( toArray ( guard.mode ) )}.includes(mode);`
  },
  "contains": {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: ContainsGuard ) =>
      `const ${guardName ( name )} =  ${JSON.stringify ( guard.values  )}.includes( ${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.path )}.optJsonOr(''));`
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
export interface ContainsGuard{
  condition: 'contains'
  path: string,
  values: string[]
}
export interface PageModeIs {
  condition: 'pageModeIs'
  mode: PageMode | PageMode[]
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

export interface AndOrCondition {
  condition: 'or' | 'and';
  conditions: string[]
}
export interface NotCondition {
  condition: 'not';
  cond: string
}
export interface ALessThanB {
  condition: 'a<b'
  aPath: string;
  bPath: string;
}
export interface BinaryCondition {
  condition: '<#' | '>#'
  path: string;
  value: number
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