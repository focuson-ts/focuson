import { NameAnd, toArray } from "@focuson/utils";
import { guardName } from "../codegen/names";
import { stateQueryForGuards } from "../codegen/lens";
import { MainPageD, PageD } from "../common/pageD";
import { TSParams } from "../codegen/config";
import { PageMode } from "@focuson/pages";


export type AllGuards = LocalVariableGuard | LocalVariableMoreThanZero | LocalVariableLessThanLengthMinusOne |
  LocalVariableValueEquals<any> | LocalVariableDefined | ALessThanB | AEqualsB | BinaryCondition |
  AndOrCondition | NotCondition | PageModeIs | ContainsGuard | NumberAndBooleanCondition | RegexCondition | PageModeCondition | FunctionCondition |
  ArrayLengthMoreThanZero | ADateB

function errorPrefix ( mainP: PageD<any, any>, p: PageD<any, any>, name: string, guard: any ) {
  if ( mainP.name === p.name ) return `MakeGuardVariable for ${p.name} ${name} ${JSON.stringify ( guard )}`
  return `MakeGuardVariable for ${mainP.name}/${p.name} ${name} ${JSON.stringify ( guard )}`
}
export const AllGuardCreator: MakeGuard<AllGuards> = {
  in: {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: LocalVariableGuard ) =>
      `const ${guardName ( name )} = ${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.path )}.optJson()`,
    raw: true
  },
  isDefined: {
    imports: [],
    makeGuardVariable: ( params, mainPage, page, name, guard: LocalVariableDefined ) =>
      `const ${guardName ( name )} = ${stateQueryForGuards ( errorPrefix ( mainPage, page, name, guard ), params, mainPage, page, guard.path )}.optJson() !== undefined`
  },
  "arrayLength>0": {
    imports: [],
    makeGuardVariable: ( params, mainPage, page, name, guard: LocalVariableDefined ) =>
      `const ${guardName ( name )} = safeArray(${stateQueryForGuards ( errorPrefix ( mainPage, page, name, guard ), params, mainPage, page, guard.path )}.optJson()).length>0`
  },
  equals: {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: LocalVariableValueEquals<any> ) =>
      `const ${guardName ( name )} =  applyOrDefault(${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.path )}.optJson(), t => t === ${guard.value},${guard.ifUndefined ? guard.ifUndefined : false})`
  },
  notEquals: {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: LocalVariableValueEquals<any> ) =>
      `const ${guardName ( name )} =  applyOrDefault(${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.path )}.optJson(), t => t !== ${JSON.stringify ( guard.value )},${guard.ifUndefined ? guard.ifUndefined : false}))`
  },


  'dateCheck': {
    imports: [ `import {checkDates} from '@focuson/utils'` ],
    makeGuardVariable: ( params, mainP, page, name, guard: ADateB ) =>
      `const ${guardName ( name )} =  checkDates(${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.aPath )}.optJson(), ${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.bPath )}.optJson(),'${guard.subCond}')`
  },
  'a<b': {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: ALessThanB ) =>
      `const ${guardName ( name )} =  safeNumber(${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.aPath )}.optJson(),Number.MAX_VALUE) <  safeNumber(${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.bPath )}.optJson(),Number.MIN_VALUE)`
  },
  'a=b': {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: AEqualsB ) =>
      `const ${guardName ( name )} =  ${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.aPath )}.optJson() === ${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.bPath )}.optJson()`
  },
  '<#': {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: BinaryCondition ) =>
      `const ${guardName ( name )} =  safeNumber(${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.path )}.optJson(), Number.MAX_VALUE) <  ${guard.value}`
  },

  '>#': {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: BinaryCondition ) =>
      `const ${guardName ( name )} =  safeNumber(${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.path )}.optJson(), Number.MIN_VALUE) > ${guard.value}`
  },

  fn: {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: FunctionCondition ) =>
      `const ${guardName ( name )} =  guardFns.${guard.name}(${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.path )})`
  },
  or: {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: AndOrCondition ) =>
      `const ${guardName ( name )} =  ${guard.conditions.map ( c => c + 'Guard.length===0' ).join ( "||" )}`
  },
  and: {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: AndOrCondition ) =>
      `const ${guardName ( name )} =  ${guard.conditions.map ( c => c + 'Guard.length===0' ).join ( "&&" )}`
  },
  not: {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: NotCondition ) =>
      `const ${guardName ( name )} =  ${guard.cond}Guard.length>0`
  },
  pageModeIs: {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: PageModeIs ) =>
      `const ${guardName ( name )} =  ${JSON.stringify ( toArray ( guard.mode ) )}.includes(mode)`
  },
  "contains": {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: ContainsGuard ) =>
      `const ${guardName ( name )} =  ${JSON.stringify ( guard.values )}.includes(safeString( ${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.path )}.optJson()))`
  },
  ">0": {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: LocalVariableMoreThanZero ) =>
      `const ${guardName ( name )} =  safeNumber(${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.path )}.optJson(), 0) >0`
  },

  '>0 and true': {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: NumberAndBooleanCondition ) =>
      `const ${guardName ( name )} =  (safeNumber(${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.number )}.optJson(), 0) >0) && ${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.boolean )}.optJsonOr(false)      `
  },

  "<arrayEnd": {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: LocalVariableLessThanLengthMinusOne ) =>
      `const ${guardName ( name )} =  safeNumber(${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.varPath )}.optJson(), 0) <  safeArray(${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.arrayPath )}.optJson()).length - 1`
  },
  'regex': {
    imports: [],
    makeGuardVariable: ( params, mainP, page, name, guard: RegexCondition ) =>
      `const ${guardName ( name )} =  safeString(${stateQueryForGuards ( errorPrefix ( mainP, page, name, guard ), params, mainP, page, guard.path )}.optJson()).match(${guard.regex}) !== null `

  },
  pageModeEquals: {
    imports: [],
    makeGuardVariable: ( params, mainPage, page, name, guard: PageModeCondition ) =>
      `const ${guardName ( name )} = ${JSON.stringify ( toArray ( guard.mode ) )}.includes(mode) `

  }
}
export interface Guard {
  message?: string
}
export interface GuardWithCondition extends Guard {
  condition: string
}
export type Guards<G extends Guard> = NameAnd<G>

export type MakeGuard<G extends Guard> = NameAnd<GuardCreator<G>>

export interface GuardCreator<G> {
  imports: string[];
  makeGuardVariable: ( params: TSParams, mainPage: MainPageD<any, G>, page: PageD<any, G>, name: string, guard: G ) => string
  raw?: boolean

}


export interface LocalVariableGuard extends Guard {
  condition: 'in'
  path: string,
  values: NameAnd<any> | undefined
}
export interface ContainsGuard extends Guard {
  condition: 'contains'
  path: string,
  values: string[]
}
export interface PageModeIs extends Guard {
  condition: 'pageModeIs'
  mode: PageMode | PageMode[]
}

export interface LocalVariableMoreThanZero extends Guard {
  condition: '>0'
  path: string
}
export interface LocalVariableValueEquals<T> extends Guard {
  condition: 'equals' | 'notEquals';
  path: string;
  ifUndefined?: boolean
  value: T
}

export interface AndOrCondition extends Guard {
  condition: 'or' | 'and';
  conditions: string[]
}
export interface NotCondition extends Guard {
  condition: 'not';
  cond: string
}
export interface FunctionCondition extends Guard {
  condition: 'fn';
  name: string
  path: string
}
export interface ALessThanB extends Guard {
  condition: 'a<b'
  aPath: string;
  bPath: string;
}
export interface AEqualsB extends Guard {
  condition: 'a=b'
  aPath: string;
  bPath: string;
}
export interface ADateB extends Guard {
  condition: 'dateCheck'
  subCond: '<' | '>' | '<=' | '>='
  aPath: string;
  bPath: string;
}

export interface BinaryCondition extends Guard {
  condition: '<#' | '>#'
  path: string;
  value: number
}
export interface NumberAndBooleanCondition extends Guard {
  condition: '>0 and true'
  number: string;
  boolean: string
}


export interface LocalVariableDefined extends Guard {
  condition: 'isDefined';
  path: string;
}

export interface ArrayLengthMoreThanZero extends Guard {
  condition: 'arrayLength>0';
  path: string;
}


export interface LocalVariableLessThanLengthMinusOne extends Guard {
  condition: '<arrayEnd'
  varPath: string
  arrayPath: string
}

export interface RegexCondition extends Guard {
  condition: 'regex',
  regex: RegExp,
  path: string
}
export interface PageModeCondition extends Guard {
  condition: 'pageModeEquals',
  mode: PageMode | PageMode[]
}

export function isGuardButton<B, G> ( b: any ): b is GuardButtonInPage<B, G> {
  // @ts-ignore
  return b.guard !== undefined
}

export interface GuardButtonInPage<B, G> {
  guard: B;
  by: G | string
}

