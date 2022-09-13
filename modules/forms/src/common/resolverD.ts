import { MessageAndLevel, NameAnd, RestAction, SimpleMessageLevel, toArray, unique } from "@focuson/utils";
import { JavaWiringParams } from "../codegen/config";
import { indentList } from "../codegen/codegen";
import { Pattern } from "./dataD";
import { EntityAndWhere } from "./restD";


export interface Schema {
  name: string
}
/** This is the meta data about a table (except for field names..those are declared elsewhere */
export interface DBTable {
  /** Which schema the database is in. For now we only support single schema worlds */
  schema: Schema;
  /** a prefix that is added like xxx.<tableName> to queries */
  prefix?: string;
  /** The physical name of the table */
  name: string,
  /** the business purpose of the table */
  description: string,
  /** Any important comments or notes about this*/
  notes: string,
  /** @deprecated does nothing*/
  audit?: any;

}
/** * No longer used. Kept to avoid */
export interface AuditDetails {
  restActions: RestAction[],
  by: string
}

export type PrimaryMutations = PrimaryMutationDetail | PrimaryMutationDetail[]
export type Mutations = MutationDetail | MutationDetail[]


export interface MutationsForRestAction {
  restAction: RestAction;
  autowired?: Autowiring | Autowiring[];
  mutateBy: MutationDetail | MutationDetail[],
  // guards?: NameAnd<MutationResolverGuard>
}

// interface MutationResolverValueGuard{
//   type: 'value';
//   dotPath: string;
//   javaType: string;
//
// }
// export type MutationResolverGuard= MutationResolverValueGuard

export function parametersFor ( m: MutationDetail ): MutationParam[] {
  if ( isMessageMutation ( m ) || isMultipleMutation ( m ) || isAutoSqlResolver ( m ) ) return []
  return toArray ( m.params )
}

export function getMakeMock ( m: MutationDetail ): boolean {
  if ( isMessageMutation ( m ) || isMultipleMutation ( m ) || isAutoSqlResolver ( m ) ) return false
  return m.makeMock === undefined ? true : m.makeMock
}


export interface MessagesForSuccessAndFailure {
  messageOnSuccess?: string | MessageAndLevel
  messageOnFailure?: string | MessageAndLevel
}
export interface FullMessageForSuccessAndFailure {
  messageOnSuccess?: MessageAndLevel
  messageOnFailure?: MessageAndLevel

}
export function getMessagesForSuccessAndFailure ( md: MutationDetail ): FullMessageForSuccessAndFailure | undefined {
  const a: any = md
  function toMessageAndLevel ( s: string | MessageAndLevel, defaultLevel: SimpleMessageLevel ): MessageAndLevel {
    if ( s === undefined ) return undefined
    if ( typeof s === 'string' ) return { msg: s, level: defaultLevel }
    return s
  }
  const messageOnSuccess = toMessageAndLevel ( a.messageOnSuccess, 'info' )
  const messageOnFailure = toMessageAndLevel ( a.messageOnFailure, 'error' )
  return messageOnFailure || messageOnSuccess ? { messageOnSuccess, messageOnFailure } : undefined
}


export type PrimaryMutationDetail = StoredProcedureMutation | SqlFunctionMutation | AutoSqlResolver |
  SqlMutation | SqlMutationThatIsAList |
  ManualMutation | SelectMutation | MessageMutation
export type MutationDetail = PrimaryMutationDetail | MultipleMutation

// export interface IDFromSequenceMutation {
//   mutation: 'IDFromSequence',
//   schema: Schema;
//   name: string;
//   params: MutationParam
// }

export interface Autowiring {
  class: string,
  variableName: string,
  imports: boolean
}

export interface SqlMutation extends MessagesForSuccessAndFailure {
  type: 'sql',
  schema: Schema;
  /**The name of the procedure that does this: should capture the intent of what this does */
  name?: string;
  sql: string;
  makeMock?: boolean
  params: MutationParamForSql | MutationParamForSql[]
  noDataIs404?: boolean
  messageOnEmptyData?: string
}
export interface MessageMutation {
  type: 'message',
  message: string,
  level?: SimpleMessageLevel
}
export function isMessageMutation ( s: MutationDetail ): s is MessageMutation {
  return s.type === 'message'
}
export interface SqlMutationThatIsAList extends SqlMutation {
  list?: boolean,
}
export function isSqlMutationThatIsAList ( s: MutationDetail ): s is SqlMutationThatIsAList {
  const a: any = s
  return s.type === 'sql' && a.list
}

export function isMutationThatIsaList ( m: MutationDetail ): m is (SqlMutationThatIsAList | SelectMutation | ManualMutation) {
  return isSqlMutationThatIsAList ( m ) || isSelectMutationThatIsAList ( m ) || (isManualMutation ( m ) && m.list)
}

export interface StoredProcedureMutation extends MessagesForSuccessAndFailure {
  type: 'storedProc',
  list?: boolean,
  schema: Schema,
  package?: string;
  name: string,
  makeMock?: boolean
  params: MutationParamForStoredProc | MutationParamForStoredProc[]
}
export interface SqlFunctionMutation extends MessagesForSuccessAndFailure {
  type: 'sqlFunction',
  list?: boolean,
  schema: Schema,
  package?: string;
  name: string,
  makeMock?: boolean,
  params: MutationParamForSqlFunction | MutationParamForSqlFunction[]
}
export interface AutoSqlResolver extends EntityAndWhere {
  type: 'autosql',
  name?: string
}
export function isAutoSqlResolver ( m: MutationDetail ): m is AutoSqlResolver {
  const a: any = m
  return m.type === 'autosql'
}

export interface ManualMutation {
  type: 'manual';
  list?: boolean,
  import?: string | string[];
  params: MutationParamForManual | MutationParamForManual[]
  name?: string;
  makeMock?: boolean
  code: string | string[]
}
export function isManualMutation ( m: MutationDetail ): m is ManualMutation {
  const a: any = m
  return m.type === 'manual'
}

export interface MultipleMutation {
  type: 'multiple',
  name?: 'string',
  mutations: MutationDetail[]
}
export function isMultipleMutation ( m: MutationDetail ): m is MultipleMutation {
  return m.type === 'multiple'
}

export interface SelectMutation {
  type: 'case';
  list?: boolean;
  params: MutationParamForSelect | MutationParamForSelect[];
  name: string;
  makeMock?: boolean
  select: GuardedMutation[]
}
export function isSelectMutationThatIsAList ( s: MutationDetail ): s is SelectMutation {
  const a: any = s
  return s.type === 'case' && a.list
}


export type GuardedMutation = GuardedManualMutation | GuardedSqMutation | GuardedStoredProcedureMutation | GuardedSqMutationThatIsAList | GuardedMessageMutation | GuardedSqlFunctionMutation | GuardedMultipleMutation
export interface GuardedManualMutation extends ManualMutation {
  guard: string[]
}
export interface GuardedMultipleMutation extends MultipleMutation {
  guard: string[]
}
export interface GuardedSqMutation extends SqlMutation {
  guard: string[]
}
export interface GuardedSqlFunctionMutation extends SqlFunctionMutation {
  guard: string[]
}
export interface GuardedSqMutationThatIsAList extends SqlMutationThatIsAList {
  guard: string[]
}
export interface GuardedStoredProcedureMutation extends StoredProcedureMutation {
  guard: string[]
}
export interface GuardedMessageMutation extends MessageMutation {
  guard: string[]
}


export type CommonMutationParam = string | StringMutationParam | IntegerMutationParam | InputMutationParam | NullMutationParam | AutowiredMutationParam | FromParentMutationParam | BodyMutationParam

export type MutationParamForSql = CommonMutationParam | OutputForSqlMutationParam
export type MutationParamForStoredProc = CommonMutationParam | OutputForStoredProcMutationParam
export type MutationParamForSqlFunction = MutationParamForStoredProc
export type MutationParamForManual = CommonMutationParam | OutputForManualParam
export type MutationParamForSelect = CommonMutationParam | OutputForSelectMutationParam

export type MutationParam = CommonMutationParam | OutputForStoredProcMutationParam | OutputForSqlMutationParam | OutputForManualParam | OutputForSelectMutationParam

export interface OutputForSelectMutationParam {
  type: 'output';
  name: string;
  javaType: AllJavaTypes;
  msgLevel?: SimpleMessageLevel
}

export type OutputMutationParam = OutputForSqlMutationParam | OutputForStoredProcMutationParam | OutputForManualParam | OutputForSelectMutationParam
export function inputParamName ( m: MutationParam ) {
  if ( typeof m === 'string' ) return [ m ]
  if ( isBodyMutationParam ( m ) ) return [ m.path ]
  if ( isInputParam ( m ) ) return [ m.name ]
  return []
}
export function paramName ( m: MutationParam ): string {
  if ( typeof m === 'string' ) return m
  if ( m.type === 'string' || m.type === 'integer' || m.type === 'null' ) return ''
  if ( isBodyMutationParam ( m ) ) return m.path
  return m.name

}
export function allInputParams ( m: MutationParam | MutationParam[] ): InputMutationParam[] {
  const ms = toArray ( m );
  const hasBodyParams = ms.find ( isBodyMutationParam ) !== undefined
  const bodyParam: InputMutationParam[] = hasBodyParams ? [ { type: 'input', name: 'bodyAsJson', javaType: 'Map<String,Object>' } ] : []
  return [ ...ms.flatMap <InputMutationParam> ( m => {
      if ( typeof m === "string" ) return [ { type: 'input', name: m } ];
      if ( isBodyMutationParam ( m ) ) return []
      if ( isInputParam ( m ) ) return [ m ]
      return []
    }
  ), ...bodyParam, ]
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
  return unique ( allInputParams ( m ).flatMap ( inputParamName ), p => p )
}
export function allSqlOutputParams ( m: MutationParam | MutationParam[] ): OutputForSqlMutationParam[] {
  return toArray ( m ).flatMap ( m => isSqlOutputParam ( m ) ? [ m ] : [] )
}
export function allStoredProcOutputParams ( m: MutationParam | MutationParam[] ): OutputForStoredProcMutationParam[] {
  return toArray ( m ).flatMap ( m => isStoredProcOutputParam ( m ) ? [ m ] : [] )
}
export function allOutputParams ( m: MutationParam | MutationParam[] ): OutputMutationParam[] {
  return toArray ( m ).flatMap ( m => isOutputParam ( m ) ? [ m ] : [] )
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
export function isInputParam ( m: MutationParam ): m is InputMutationParam {
  return typeof m === 'string' || m.type == 'input' || isBodyMutationParam ( m ) || isParentMutationParam ( m )
}
export function displayParam ( param: MutationParam ) {
  if ( typeof param === 'string' ) return param
  return JSON.stringify ( param )
}
export function paramNamePathOrValue ( m: MutationParam ): string | number {
  if ( typeof m === 'string' ) return m
  if ( m.type === 'string' || m.type === 'integer' ) return m.value
  if ( m.type === 'null' ) return "null"
  if ( isBodyMutationParam ( m ) ) return m.path
  return m.name
}
export interface StringMutationParam {
  type: 'string';
  value: string
}
export interface HasSetParam {
  setParam?: string;
}
export function needsRequiredCheck ( paramsFromCall: MutationParam[], m: MutationParam ): boolean {
  const a: any = m;
  if ( typeof m === 'string' ) return false;
  if ( m.type === 'input' ) return a.required !== false
  return false
}

export function requiredmentCheckCodeForJava ( paramsFromCall: MutationParam[], m: MutationParam | MutationParam[] ): string[] {
  return toArray ( m ).flatMap ( m => {
    let name = inputParamName ( m );
    const a: any = m
    return needsRequiredCheck ( paramsFromCall, m ) ? [ `if (${name} == null) throw new IllegalArgumentException("${name} must not be null");//${JSON.stringify ( m )} ${typeof m}` ] : []
  } )
}
export function nameOrSetParam ( m: InputMutationParam ) {
  const a: any = m
  if ( a.setParam ) return a.setParam
  if ( isBodyMutationParam ( m ) && m.ifNull ) return `ognlForBodyAsJson.getStringOr(bodyAsJson, "${m.path}", "${m.ifNull}", ${!!m.emptyStringCountsAsNull})`
  if ( isBodyMutationParam ( m ) ) return `ognlForBodyAsJson.getData(bodyAsJson, "${m.path}", ${m.javaType ? m.javaType : 'Object'}.class)`
  if ( m.ifNull )
    if ( m.emptyStringCountsAsNull )
      return `${a.name} == null || ${a.name}.toString().trim().length()==0 ? "${m.ifNull}": ${a.name}`
    else
      return `${a.name} == null ? "${m.ifNull}": ${a.name}`
  return a.name;
}
export function setParam ( m: any ) {
  const a: any = m
  return m.setParam
}

export interface AutowiredMutationParam {
  type: 'autowired';
  import?: boolean;
  name: string;
  class: string;
  method: string
  setParam?: string;
  required?: boolean;
}
export type JavaTypePrimitive = 'String' | 'Integer' | 'Double' | 'Object' | 'Boolean' | 'Date' | 'Map<String,Object>' | 'List<Map<String,Object>>';

export const RSGetterForJavaType = {
  String: 'getString',
  Integer: 'getInt',
  Double: 'getDouble',
  Object: 'getObject',
  Date: 'getDate',
  'Map<String,Object>': undefined,
  'Boolean': undefined
}

export interface IntegerMutationParam {
  type: 'integer';
  value: number
}
export type InputMutationParam = SimpleInputMutationParam | FromParentMutationParam | BodyMutationParam
interface SimpleInputMutationParam {
  type: 'input';
  name: string;
  javaType?: JavaTypePrimitive;
  setParam?: string;
  required?: boolean;
  format?: Pattern
  ifNull?: string
  emptyStringCountsAsNull?: boolean

}
interface FromParentMutationParam {
  type: 'fromParent';
  name: string;
  javaType?: JavaTypePrimitive;
  setParam?: string;
  required?: boolean;
  format?: Pattern
  ifNull?: string
  emptyStringCountsAsNull?: boolean

}
export function isParentMutationParam ( p: MutationParam ): p is FromParentMutationParam {
  const a: any = p
  return a.type === 'fromParent'
}
export function allParentMutationParams ( ps: MutationParam | MutationParam[] ): FromParentMutationParam[] {
  return toArray ( ps ).flatMap ( p => isParentMutationParam ( p ) ? [ p ] : [] )
}
interface BodyMutationParam {
  type: 'body';
  path: string;
  javaType?: JavaTypePrimitive;
  setParam?: string;
  required?: boolean;
  format?: Pattern;
  ifNull?: string
  emptyStringCountsAsNull?: boolean
}
export function isBodyMutationParam ( p: MutationParam ): p is BodyMutationParam {
  const a: any = p
  return a.type === 'body'
}

export interface OutputForStoredProcMutationParam {
  type: 'output';
  name: string;
  javaType: JavaTypePrimitive
  sqlType: string;
  msgLevel?: SimpleMessageLevel
  format?: Pattern
}
export interface OutputForSqlMutationParam {
  type: 'output';
  name: string;
  javaType: JavaTypePrimitive;
  rsName: string;
  msgLevel?: SimpleMessageLevel
  format?: Pattern
}
export type AllJavaTypes = JavaTypePrimitive | 'Map<String,Object>' | 'List<Map<String,Object>>' | 'Boolean'
export interface OutputForManualParam {
  type: 'output';
  name: string;
  javaType: AllJavaTypes;
  msgLevel?: SimpleMessageLevel
  format?: Pattern

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

