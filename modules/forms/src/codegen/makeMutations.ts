import { MainPageD } from "../common/pageD";
import { NameAnd, safeObject, toArray } from "@focuson/utils";
import { JavaWiringParams } from "./config";
import { mutationClassName, mutationMethodName } from "./names";
import { AllLensRestParams, RestD, unique } from "../common/restD";
import { indentList } from "./codegen";
import { allInputParams, AllJavaTypes, allOutputParams, AutowiredMutationParam, displayParam, importForTubles, isInputParam, isOutputParam, isSqlOutputParam, isStoredProcOutputParam, javaTypeForOutput, ManualMutation, MutationDetail, MutationParam, MutationsForRestAction, OutputMutationParam, paramName, SqlMutation, StoredProcedureMutation } from "../common/resolverD";
import { applyToTemplate } from "@focuson/template";
import { restActionForName } from "@focuson/rest";


export function setObjectFor ( m: MutationParam, i: number ): string {
  const index = i + 1
  if ( typeof m === 'string' ) return `s.setObject(${index}, ${m});`
  if ( m.type === 'input' ) return `s.setObject(${index}, ${m.name});`
  if ( m.type === 'null' ) return `s.setObject(${index},null);`
  if ( m.type === 'integer' ) return `s.setInt(${index}, ${m.value});`
  if ( m.type === 'autowired' ) return `s.setObject(${index}, ${m.name}.${m.method}());`
  if ( m.type === 'string' ) return `s.setString(${index}, "${m.value.replace ( /"/g, '\"' )}");`
  if ( isStoredProcOutputParam ( m ) ) return `s.registerOutParameter(${index},java.sql.Types.${m.sqlType});`
  throw new Error ( `Don't know how to process ${JSON.stringify ( m )}` )

}
export function allSetObjectForStoredProcs ( m: MutationParam | MutationParam[] ): string[] {
  return toArray ( m ).filter ( m => !isSqlOutputParam ( m ) ).map ( setObjectFor )
}
export function allSetObjectForInputs ( m: MutationParam | MutationParam[] ): string[] {
  return toArray ( m ).filter ( isInputParam ).map ( setObjectFor )
}

export function makeMutationResolverReturnStatement ( outputs: OutputMutationParam[] ): string {
  if ( outputs.length === 0 ) return `return;`
  if ( outputs.length === 1 ) return `return ${outputs[ 0 ].name};`
  return `return new Tuple${outputs.length}<>(${outputs.map ( x => x.name ).join ( ',' )});`
}
function quoteIfString ( javaType: AllJavaTypes, value: number ) {
  if ( javaType === 'String' ) return '"' + value + '"'
  return value
}
export function mockReturnStatement ( outputs: OutputMutationParam[] ): string {
  if ( outputs.length === 0 ) return `return;`
  if ( outputs.length === 1 ) return `return ${quoteIfString ( outputs[ 0 ].javaType, 0 )};`
  return `return new Tuple${outputs.length}<>(${outputs.map ( ( x, i ) => quoteIfString ( x.javaType, i ) ).join ( ',' )});`
}

function commonIfDbNameBlock<G> ( r: RestD<G>, paramsA: MutationParam[], name: string, m: MutationDetail, includeMockIf: boolean ) {
  const paramsForLog = paramsA.length === 0 ? '' : paramsA.map ( m => displayParam ( m ).replace ( /"/g, "'" ) ).join ( ", " ) + '+';
  return includeMockIf ? [ `        if (dbName.equals(IFetcher.mock)) {`,
    `           System.out.println("Mock audit: ${mutationMethodName ( r, name, m )}( ${paramsForLog} )");`,
    `           ${mockReturnStatement ( allOutputParams ( paramsA ) )}`,
    `    }`,
  ] : []
}

export function getFromStatement ( from: string, m: MutationParam[] ) {
  return m.flatMap ( ( m, i ) => {
    if ( !isStoredProcOutputParam ( m ) ) return []
    return m.javaType === 'String' ?
      `String ${m.name} = ${from}.getString(${i + 1});` :
      `Integer ${m.name} = ${from}.getInt(${i + 1});`
  } )
}

export function getFromResultSet ( from: string, m: MutationParam[] ) {
  return m.flatMap ( ( m, i ) => {
    if ( !isSqlOutputParam ( m ) ) return []
    return m.javaType === 'String' ?
      `String ${m.name} = ${from}.getString("${m.rsName}");` :
      `Integer ${m.name} = ${from}.getInt("${m.rsName}");`
  } )
}
function findType ( errorPrefix: string, params: NameAnd<AllLensRestParams<any>>, name: string ) {
  const param = params[ name ]
  if ( param === undefined ) return 'Object'
  return param.javaType
}
export const typeForParamAsInput = ( errorPrefix: string, params: NameAnd<AllLensRestParams<any>> ) => ( m: MutationParam ) => {
  if ( isOutputParam ( m ) ) return m.javaType;
  if ( typeof m === 'string' ) return findType ( errorPrefix, params, m )
  if ( m.type === 'input' ) return m.javaType ? m.javaType : findType ( errorPrefix, params, m.name )
  if ( m.type === 'integer' ) return 'Integer'
  if ( m.type === 'string' ) return 'String'
  return 'Object'
};


export function mutationCodeForSqlCalls<G> ( errorPrefix: string, p: MainPageD<any, any>, r: RestD<G>, name: string, m: SqlMutation, includeMockIf: boolean ): string[] {
  const paramsA = toArray ( m.params )
  const execute = allOutputParams ( paramsA ).length == 0 ?
    [ `s.execute();` ] :
    [ `ResultSet rs = s.executeQuery();`,
      `if (!rs.next()) throw new SQLException("Error in : ${mutationMethodName ( r, name, m )}. Cannot get first item. Sql was ${m.sql}\\n${errorPrefix}");`,
    ]
  return [
    ...makeMethodDecl ( errorPrefix, paramsA, r, name, m ),
    ...commonIfDbNameBlock ( r, paramsA, name, m, includeMockIf ),
    `    try (PreparedStatement s = connection.prepareStatement("${m.sql}")) {`,
    ...indentList ( indentList ( indentList ( [
        ...allSetObjectForInputs ( m.params ),
        ...execute,
        ...getFromResultSet ( 'rs', paramsA ),
        makeMutationResolverReturnStatement ( allOutputParams ( paramsA ) )
      ]
    ) ) ),
    `  }}`,
  ];
}
function makeMethodDecl<G> ( errorPrefix: string, paramsA: MutationParam[], r: RestD<G>, name: string, m: MutationDetail ) {
  const params = safeObject ( r.params );
  return [ `    public ${javaTypeForOutput ( paramsA )} ${mutationMethodName ( r, name, m )}(Connection connection, ${unique ( allInputParams ( [ 'dbName', ...paramsA ] ), p => paramName ( p ) )
    .map ( param => `${typeForParamAsInput ( errorPrefix, params ) ( param )} ${param.name}` ).join ( ", " )}) throws SQLException {` ];
}
export function mutationCodeForStoredProcedureCalls<G> ( errorPrefix: string, p: MainPageD<any, any>, r: RestD<G>, name: string, m: StoredProcedureMutation, includeMockIf: boolean ): string[] {
  const paramsA = toArray ( m.params )
  let fullName = m.package ? `${m.package}.${m.name}` : m.name;
  return [
    ...makeMethodDecl ( errorPrefix, paramsA, r, name, m ),
    ...commonIfDbNameBlock ( r, paramsA, name, m, includeMockIf ), `    try (CallableStatement s = connection.prepareCall("call ${fullName}(${toArray ( m.params ).map ( () => '?' ).join ( ", " )})")) {`,
    ...indentList ( indentList ( indentList ( allSetObjectForStoredProcs ( m.params ) ) ) ),
    `      s.execute();`,
    ...indentList ( indentList ( indentList ( [
      ...getFromStatement ( 's', paramsA ),
      makeMutationResolverReturnStatement ( allOutputParams ( paramsA ) ) ] ) ) ),
    `  }}`,
  ];
}
export function mutationCodeForManual<G> ( errorPrefix: string, p: MainPageD<any, any>, r: RestD<G>, name: string, m: ManualMutation, includeMockIf: boolean ): string[] {
  const paramsA = toArray ( m.params );
  return [
    `//If you have a compiler error in the type here, did you match the types of the output params in your manual code with the declared types in the .restD?`,
    ...makeMethodDecl ( errorPrefix, paramsA, r, name, m ),
    ...commonIfDbNameBlock ( r, paramsA, name, m, includeMockIf ),
    ...indentList ( indentList ( indentList ( [ ...toArray ( m.code ), makeMutationResolverReturnStatement ( allOutputParams ( paramsA ) ) ] ) ) ),
    `  }`,
  ];
}
export function makeMutationMethod<G> ( errorPrefix: string, mutations: MutationDetail[], name: string, p: MainPageD<any, any>, r: RestD<G>, includeMockIf: boolean ) {
  const methods = mutations.flatMap ( ( mutateBy ) => toArray ( mutateBy ).flatMap ( ( m: MutationDetail ) => {
    const newErrorPrefix = `${errorPrefix} Mutation ${m.name}`
    if ( m.type === 'sql' ) return mutationCodeForSqlCalls ( newErrorPrefix, p, r, name, m, includeMockIf )
    if ( m.type === 'storedProc' ) return mutationCodeForStoredProcedureCalls ( newErrorPrefix, p, r, name, m, includeMockIf )
    if ( m.type === 'manual' ) return mutationCodeForManual ( newErrorPrefix, p, r, name, m, includeMockIf );
    throw Error ( `Don't know how to findCode (Page ${p.name}) for ${JSON.stringify ( m )}` )
  } ) )
  return methods;
}

export function makeCodeFragmentsForMutation<G> ( mutations: MutationDetail[], p: MainPageD<any, any>, r: RestD<G>, params: JavaWiringParams, ) {
  // const methods = makeMutationMethod ( mutations, name, p, r, includeMockIf );
  const autowiring: AutowiredMutationParam[] = unique<AutowiredMutationParam> ( mutations.flatMap ( ( mutateBy ) => toArray ( mutateBy ).flatMap ( m => toArray ( m.params ) ) ).flatMap ( mp =>
    (typeof mp !== 'string' && mp.type === 'autowired' && mp.import !== false) ? [ { ...mp, class: applyToTemplate ( mp.class, params ).join ( '' ) } ] : [] ), r => r.class );
  const importsFromParams: string[] = unique ( autowiring, t => t.class ).flatMap ( mp => [ `//added by param ${mp.name}`, `import ${mp.class};` ] )
  const autowiringVariables = autowiring.map ( mp => `    ${mp.class} ${mp.name};` ).flatMap ( mp => [ `    @Autowired`, mp, '' ] )
  return { importsFromParams, autowiringVariables };
}
export function importsFromManual ( mutation: MutationsForRestAction ): string[] {
  return toArray ( mutation.mutateBy ).flatMap ( m => m.type === 'manual' ? toArray ( m.import ) : [] )
}
export function makeMutations<G> ( params: JavaWiringParams, p: MainPageD<any, any>, restName: string, r: RestD<G>, mutation: MutationsForRestAction ): string[] {
  const errorPrefix = `${p.name}.rest[${restName}]. Making mutations for ${restActionForName ( mutation.restAction )}.`
  const { importsFromParams, autowiringVariables } = makeCodeFragmentsForMutation ( toArray ( mutation.mutateBy ), p, r, params );
  const methods = makeMutationMethod ( errorPrefix, toArray ( mutation.mutateBy ), restActionForName ( mutation.restAction ), p, r, true )
  return [
    `package ${params.thePackage}.${params.mutatorPackage}.${p.name};`,
    ``,

    `import ${params.thePackage}.${params.fetcherPackage}.IFetcher;`,
    `import org.springframework.stereotype.Component;`,
    'import org.springframework.beans.factory.annotation.Autowired;',
    ``,
    `import java.sql.CallableStatement;`,
    `import java.sql.PreparedStatement;`,
    `import java.sql.ResultSet;`,
    `import java.sql.Connection;`,
    `import java.sql.SQLException;`,
    ...importsFromParams,
    ...importForTubles ( params ),
    ...importsFromManual ( mutation ),
    ...toArray ( r.mutations ).flatMap ( m => m.mutateBy ).flatMap ( m => m.type === 'manual' ? toArray ( m.import ) : [] ),
    `@Component`,
    `public class ${mutationClassName ( r, mutation.restAction )} {`,
    ``,
    ...autowiringVariables,
    ...methods,
    ``,
    `}`
  ]
}