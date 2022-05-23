import { NameAnd, RestAction, toArray } from "@focuson/utils";
import { OneDataDD } from "./dataD";
import { JavaWiringParams } from "../codegen/config";
import { indentList } from "../codegen/codegen";


export interface Schema {
  name: string
}
/** This is the meta data about a table (except for field names..those are declared elsewhere */
export interface DBTable {
  /** Which schema the database is in. For now we only support single schema worlds */
  schema: Schema;
  /** The physical name of the table */
  name: string,
  /** the business purpose of the table */
  description: string,
  /** Any important comments or notes about this*/
  notes: string,
  /** How we audit the file */
  audit: AuditDetails | MutationsForRestAction[];
  /** How we access the file */
  access?: AccessDetails[];
}
/** * No longer used. Kept to avoid */
export interface AuditDetails {
  restActions: RestAction[],
  by: string
}

export type Mutations = MutationDetail | MutationDetail[]


export interface MutationsForRestAction {
  restAction: RestAction;
  mutateBy: MutationDetail | MutationDetail[]
}

export type MutationDetail = StoredProcedureMutation | SqlMutation | ManualMutation // | IDFromSequenceMutation

// export interface IDFromSequenceMutation {
//   mutation: 'IDFromSequence',
//   schema: Schema;
//   name: string;
//   params: MutationParam
// }
export interface SqlMutation {
  type: 'sql',
  list?: boolean,
  schema: Schema;
  /**The name of the procedure that does this: should capture the intent of what this does */
  name: string;
  sql: string;
  params: MutationParamForSql | MutationParamForSql[]
}

export interface StoredProcedureMutation {
  type: 'storedProc',
  list?: boolean,
  schema: Schema,
  package?: string;
  name: string,
  params: MutationParamForStoredProc | MutationParamForStoredProc[]
}

export interface ManualMutation {
  type: 'manual';
  list?: boolean,
  import?: string | string[];
  params: MutationParamForManual | MutationParamForManual[]
  name: string;
  code: string | string[]
}


export type MutationParam = string | StringMutationParam | IntegerMutationParam | ParamMutationParam | OutputForStoredProcMutationParam | OutputForSqlMutationParam | NullMutationParam | OutputForManualParam | AutowiredMutationParam
export type MutationParamForSql = string | StringMutationParam | IntegerMutationParam | ParamMutationParam | OutputForSqlMutationParam | NullMutationParam | AutowiredMutationParam
export type MutationParamForStoredProc = string | StringMutationParam | IntegerMutationParam | ParamMutationParam | OutputForStoredProcMutationParam | NullMutationParam | AutowiredMutationParam
export type MutationParamForManual = string | StringMutationParam | IntegerMutationParam | ParamMutationParam | NullMutationParam | OutputForManualParam | AutowiredMutationParam

export type OutputMutationParam = OutputForSqlMutationParam | OutputForStoredProcMutationParam | OutputForManualParam
export function inputParamName ( m: MutationParam ) {
  if ( typeof m === 'string' ) return [ m ]
  if ( m.type === 'input' ) return [ m.name ]
  return []
}
export function paramName ( m: MutationParam ): string {
  if ( typeof m === 'string' ) return m
  if ( m.type === 'string' || m.type === 'integer' || m.type === 'null' ) return ''
  return m.name

}
export function allInputParams ( m: MutationParam | MutationParam[] ): ParamMutationParam[] {
  return toArray ( m ).flatMap ( m => {
      if ( typeof m === "string" ) return [ { type: 'input', name: m } ];
      if ( m.type === 'input' ) return [ m ]
      return []
    }
  )
}

export function tupleIndexes ( maxTuples: number ) {return [ ...Array ( maxTuples + 1 ).keys () ].slice ( 2 );}
export function importForTubles ( params: JavaWiringParams ) {
  return tupleIndexes ( params.maxTuples ).map ( i => `import ${params.thePackage}.${params.mutatorPackage}.utils.Tuple${i};` )
}
export function makeTuples ( params: JavaWiringParams, i: number ) {
  const indexes = [ ...Array ( i + 1 ).keys () ].slice ( 1 )
  return [
    `package ${[ params.thePackage ]}.${params.mutatorPackage}.utils;`,
    ``,
    `public class Tuple${i}<${indexes.map ( i => `T${i}` ).join ( ',' )}> {`,
    ...indentList ( indexes.map ( i => `public final T${i} t${i};` ) ),
    '',
    `  public Tuple${i}(${indexes.map ( i => `T${i} t${i}` ).join ( ',' )}) {`,
    ...indentList ( indexes.map ( i => `this.t${i}=t${i};` ) ),
    `  }`,
    `}` ]

}
export function allInputParamNames ( m: MutationParam | MutationParam[] ): string[] {
  return toArray ( m ).flatMap ( inputParamName )
}
export function allSqlOutputParams ( m: MutationParam | MutationParam[] ): OutputForSqlMutationParam[] {
  return toArray ( m ).flatMap ( m => isSqlOutputParam ( m ) ? [ m ] : [] )
}
export function allStoredProcOutputParams ( m: MutationParam | MutationParam[] ): OutputForStoredProcMutationParam[] {
  return toArray ( m ).flatMap ( m => isStoredProcOutputParam ( m ) ? [ m ] : [] )
}
export function allOutputParams ( m: MutationParam | MutationParam[] ): OutputMutationParam[] {
  return toArray ( m ).flatMap ( m => isSqlOutputParam ( m ) || isStoredProcOutputParam ( m ) ? [ m ] : [] )
}
export function javaTypeForOutput ( m: MutationParam | MutationParam[] ) {
  const outputs = allOutputParams ( m )
  if ( outputs.length == 0 ) return 'void'
  if ( outputs.length == 1 ) return outputs[ 0 ].javaType
  return `Tuple${outputs.length}<${outputs.map ( o => o.javaType ).join ( "," )}>`
}


export function isSqlOutputParam ( m: MutationParam ): m is OutputForSqlMutationParam {
  const ma: any = m
  return isOutputParam ( m ) && ma.rsName !== undefined
}
export function isStoredProcOutputParam ( m: MutationParam ): m is OutputForStoredProcMutationParam {
  const ma: any = m
  return isOutputParam ( m ) && ma.javaType !== undefined
}
export function isOutputParam ( m: any ): m is OutputMutationParam {
  return typeof m !== 'string' && m.type === 'output'
}
export function isInputParam ( m: MutationParam ) {
  return (typeof m === 'string' || !(isSqlOutputParam ( m ) || isStoredProcOutputParam ( m )))
}
export function displayParam ( param: MutationParam ) {
  if ( typeof param === 'string' ) return param
  return JSON.stringify ( param )
}
export function paramNameOrValue ( m: MutationParam ) {
  if ( typeof m === 'string' ) return m
  if ( m.type === 'string' || m.type === 'integer' ) return m.value
  if ( m.type === 'null' ) return "null"
  return m.name
}
export interface StringMutationParam {
  type: 'string';
  value: string
}
export interface AutowiredMutationParam {
  type: 'autowired';
  import?: boolean;
  name: string;
  class: string;
  method: string
}
export interface IntegerMutationParam {
  type: 'integer';
  value: number
}
interface ParamMutationParam {
  type: 'input';
  name: string;
  javaType?: string

}
export interface OutputForStoredProcMutationParam {
  type: 'output';
  name: string;
  javaType: 'String' | 'Integer';
  sqlType: string;
}
export interface OutputForSqlMutationParam {
  type: 'output';
  name: string;
  javaType: 'String' | 'Integer';
  rsName: string;
}
export type AllJavaTypes = 'String' | 'Integer' | 'Map<String,Object>' | 'List<Map<String,Object>>' | 'Boolean'
export interface OutputForManualParam {
  type: 'output';
  name: string;
  javaType: AllJavaTypes;
}
export interface NullMutationParam {
  type: 'null';
}

export interface AccessDetails {
  restAction: RestAction;
  condition: AccessCondition | AccessCondition[]
}

export interface AccessCondition {
  type: 'in';
  param: string;
  values: string[]
}

export interface DBTableAndName {
  name: string;
  table: DBTable;
}
export function isDbTableAndName ( d: DBTableAndMaybeName ): d is DBTableAndName {
  // @ts-ignore
  return d && d.schema === undefined
}
export function isDBTable ( d: DBTableAndMaybeName ): d is DBTable {
  // @ts-ignore
  return d.schema !== undefined
}
export type DBTableAndMaybeName = DBTableAndName | DBTable

export interface Where {
  ids: string[];
  other?: string[]
}


export interface AliasAndWhere {
  aliases: NameAnd<DBTableAndMaybeName>;
  where: Where;
}

