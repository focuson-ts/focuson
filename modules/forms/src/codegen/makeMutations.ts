import { MainPageD } from "../common/pageD";
import { RestAction, safeArray, toArray } from "@focuson/utils";
import { JavaWiringParams } from "./config";
import { mutationClassName, mutationMethodName } from "./names";
import { RestD, unique } from "../common/restD";
import { indentList } from "./codegen";
import { allInputParamNames, allInputParams, allOutputParams, displayParam, importForTubles, isInputParam, isOutputParam, javaTypeForOutput, ManualMutation, MutationDetail, MutationParam, OutputMutationParam, paramName, SqlMutation, StoredProcedureMutation } from "../common/resolverD";


function setObjectFor ( m: MutationParam, i: number ): string {
  const index = i + 1
  if ( typeof m === 'string' ) return `s.setObject(${index}, ${m});`
  if ( m.type === 'input' ) return `s.setObject(${index}, ${m.name});`
  if ( m.type === 'null' ) return `s.setObject(${index},null);`
  if ( m.type === 'integer' ) return `s.setInt(${index}, ${m.value});`
  if ( m.type === 'string' ) return `s.setString(${index}, "${m.value.replace ( /"/g, '\"' )}");`
  if ( m.type === 'output' ) return `s.registerOutParameter(${index},java.sql.Types.${m.sqlType});`
  throw new Error ( `Don't know how to process ${JSON.stringify ( m )}` )

}
export function allSetObjectForInputs ( m: MutationParam | MutationParam[] ): string[] {
  return toArray ( m ).map ( setObjectFor )
}

function returnStatement ( outputs: OutputMutationParam[] ): string {
  if ( outputs.length === 0 ) return `return;`
  if ( outputs.length === 1 ) return `return ${outputs[ 0 ].name};`
  return `return new Tuple${outputs.length}<>(${outputs.map ( x => x.name ).join ( ',' )});`
}
function quoteIfString ( javaType: 'String' | 'Integer', value: number ) {
  if ( javaType === 'String' ) return '"' + value + '"'
  return value
}
function mockReturnStatement ( outputs: OutputMutationParam[] ): string {
  if ( outputs.length === 0 ) return `return;`
  if ( outputs.length === 1 ) return `return ${quoteIfString ( outputs[ 0 ].javaType, 0 )};`
  return `return new Tuple${outputs.length}<>(${outputs.map ( ( x, i ) => quoteIfString ( x.javaType, i ) ).join ( ',' )});`
}

function commonIfDbNameBlock<G> ( r: RestD<G>, paramsA: MutationParam[], restAction: RestAction, m: MutationDetail ) {
  const paramsForLog = paramsA.length === 0 ? '' : paramsA.map ( m => displayParam ( m ).replace ( /"/g, "'" ) ).join ( ", " ) + '+';
  return [ `        if (dbName.equals(IFetcher.mock)) {`,
    `           System.out.println("Mock audit: ${mutationMethodName ( r, restAction, m )}( ${paramsForLog} )");`,
    `           ${mockReturnStatement ( allOutputParams ( paramsA ) )}` ]
}

function getFromStatement ( m: MutationParam[] ) {
  return m.flatMap ( ( m, i ) => {
    if ( !isOutputParam ( m ) ) return []
    return m.javaType === 'String' ?
      `String ${m.name} = s.getString(${i + 1});` :
      `Integer ${m.name} = s.getInt(${i + 1});`
  } )
}
function typeForParamAsInput ( m: MutationParam ) {
  if ( isOutputParam ( m ) ) return m.javaType;
  if ( typeof m === 'string' ) return 'Object'
  if ( m.type === 'integer' ) return 'Integer'
  if ( m.type === 'string' ) return 'String'
  return 'Object'
}


export function mutationCodeForSqlCalls<G> ( p: MainPageD<any, any>, r: RestD<G>, restAction: RestAction, m: SqlMutation ): string[] {
  const paramsA = toArray ( m.params )
  return [
    `    public ${javaTypeForOutput ( paramsA )} ${mutationMethodName ( r, restAction, m )}(Connection connection, ${unique ( allInputParams ( [ 'dbName', ...paramsA ] ), p => paramName ( p ) ).map ( param => `${typeForParamAsInput ( param )} ${param.name}` ).join ( ", " )}) throws SQLException {`,

    ...commonIfDbNameBlock ( r, paramsA, restAction, m ),
    `    }`,
    `    try (PreparedStatement s = connection.prepareStatement("${m.sql}")) {`,
    ...indentList ( indentList ( indentList ( allSetObjectForInputs ( m.params ) ) ) ),
    `      if (!s.execute()) throw new SQLException("Error in : ${mutationMethodName ( r, restAction, m )}");`,
    ...indentList ( indentList ( indentList ( [
      ...getFromStatement ( paramsA ),
      returnStatement ( allOutputParams ( paramsA ) ) ] ) ) ),
    `  }}`,
  ];
}
export function mutationCodeForStoredProcedureCalls<G> ( p: MainPageD<any, any>, r: RestD<G>, restAction: RestAction, m: StoredProcedureMutation ): string[] {
  const paramsA = toArray ( m.params )
  return [
    `    public ${javaTypeForOutput ( paramsA )} ${mutationMethodName ( r, restAction, m )}(Connection connection, ${unique ( allInputParams ( [ 'dbName', ...paramsA ] ), p => paramName ( p ) ).map ( param => `${typeForParamAsInput ( param )} ${param.name}` ).join ( ", " )}) throws SQLException {`,
    ...commonIfDbNameBlock ( r, paramsA, restAction, m ),
    `    }`,
    `    try (CallableStatement s = connection.prepareCall("call ${m.name}(${toArray ( m.params ).map ( () => '?' ).join ( ", " )})")) {`,
    ...indentList ( indentList ( indentList ( allSetObjectForInputs ( m.params ) ) ) ),
    `      if (!s.execute()) throw new SQLException("Error in : ${mutationMethodName ( r, restAction, m )}");`,
    ...indentList ( indentList ( indentList ( [
      ...getFromStatement ( paramsA ),
      returnStatement ( allOutputParams ( paramsA ) ) ] ) ) ),
    `  }}`,
  ];
}
export function mutationCodeForManual<G> ( p: MainPageD<any, any>, r: RestD<G>, restAction: RestAction, m: ManualMutation ): string[] {
  const paramsA = toArray ( m.params );
  return [
    `    public ${javaTypeForOutput ( paramsA )} ${mutationMethodName ( r, restAction, m )}(Connection connection, ${unique ( allInputParams ( [ 'dbName', ...paramsA ] ), p => paramName ( p ) ).map ( param => `${typeForParamAsInput ( param )} ${param.name}` ).join ( ", " )}) throws SQLException {`,
    ...commonIfDbNameBlock ( r, paramsA, restAction, m ),
    `    }`,
    ...m.code,
    ...indentList ( indentList ( indentList ( [ returnStatement ( allOutputParams ( paramsA ) ) ] ) ) ),
    `  }`,
  ];
}
export function makeMutations<G> ( params: JavaWiringParams, p: MainPageD<any, any>, r: RestD<G> ): string[] {
  let mutations = safeArray ( r.mutations );
  if ( mutations.length == 0 ) return []
  const methods = mutations.flatMap ( ( { restAction, mutateBy } ) => toArray ( mutateBy ).flatMap ( ( m: MutationDetail ) => {
    if ( m.mutation === 'sql' ) return mutationCodeForSqlCalls ( p, r, restAction, m )
    if ( m.mutation === 'storedProc' ) return mutationCodeForStoredProcedureCalls ( p, r, restAction, m )
    if ( m.mutation === 'manual' ) return mutationCodeForManual ( p, r, restAction, m );
    throw Error ( `Don't know how to findCode (Page ${p.name}) for ${JSON.stringify ( m )}` )
  } ) )
  return [
    `package ${params.thePackage}.${params.mutatorPackage}.${p.name};`,
    ``,

    `import ${params.thePackage}.${params.fetcherPackage}.IFetcher;`,
    `import org.springframework.stereotype.Component;`,
    ``,
    `import java.sql.CallableStatement;`,
    `import java.sql.PreparedStatement;`,
    `import java.sql.Connection;`,
    `import java.sql.SQLException;`,
    ...importForTubles ( params ),
    `@Component`,
    `public class ${mutationClassName ( r )} {`,
    ``,
    ...methods,
    ``,
    `}`
  ]
}