import { MainPageD } from "../common/pageD";
import {decamelize, NameAnd, safeObject, toArray, unique} from "@focuson/utils";
import { JavaWiringParams } from "./config";
import { mutationClassName, mutationDetailsName, mutationMethodName } from "./names";
import { AllLensRestParams, RestD } from "../common/restD";
import { indentList } from "./codegen";
import {
  allInputParamNames,
  allInputParams,
  AllJavaTypes,
  allOutputParams,
  AutowiredMutationParam,
  displayParam,
  getMakeMock,
  importForTubles,
  isBodyMutationParam,
  isInputParam,
  isMessageMutation,
  isOutputParam,
  isSqlMutationThatIsAList,
  isSqlOutputParam,
  isStoredProcOutputParam,
  javaTypeForOutput,
  JavaTypePrimitive,
  ManualMutation,
  MutationDetail,
  MutationParam,
  MutationParamForStoredProc,
  MutationsForRestAction,
  nameOrSetParam,
  OutputMutationParam,
  parametersFor,
  paramName, paramNamePathOrValue,
  requiredmentCheckCodeForJava,
  RSGetterForJavaType,
  SelectMutation,
  setParam,
  SqlMutation,
  SqlMutationThatIsAList,
  StoredProcedureMutation
} from "../common/resolverD";
import { applyToTemplate } from "@focuson/template";
import { restActionForName } from "@focuson/rest";
import { outputParamsDeclaration, paramsDeclaration } from "./makeSpringEndpoint";
import {type} from "os";


export function setObjectFor ( m: MutationParam, i: number ): string {
  const index = i + 1
  if ( isStoredProcOutputParam ( m ) ) return `s.registerOutParameter(${index},java.sql.Types.${m.sqlType});`
  if ( typeof m === 'string' ) return `s.setObject(${index}, ${m});`
  if ( isBodyMutationParam ( m ) ) return processInput ( m.javaType, m.datePattern, index, m );
  if ( isInputParam ( m ) ) return processInput ( m.javaType, m.datePattern, index, m );
  if ( setParam ( m ) ) return `s.setObject(${index}, ${setParam ( m )});`
  if ( m.type === 'autowired' ) return `s.setObject(${index}, ${m.name}.${m.method});`;
  if ( m.type === 'null' ) return `s.setObject(${index},null);`
  if ( m.type === 'integer' ) return `s.setInt(${index}, ${m.value});`
  if ( m.type === 'string' ) return `s.setString(${index}, "${m.value.replace ( /"/g, '\"' )}");`
  throw new Error ( `Don't know how to process ${JSON.stringify ( m )}` )
}

function processInput ( javaType: JavaTypePrimitive | undefined, datePattern: string | undefined, index: number, m: MutationParam ): string {
  let name = nameOrSetParam ( m );
  const body = `s.setObject(${index}, ${name});`;
  if ( datePattern === undefined ) return body;
  switch ( javaType ) {
    case "String":
      return `s.setDate(${index}, DateFormatter.parseDate("${datePattern}", ${name}));`;
    default:
      throw new Error ( `makeMutations: don't know how to addFormat for ${datePattern}, ${javaType}` )
  }
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
  return `return new Tuple${outputs.length}<${outputs.map ( o => o.javaType ).join ( "," )}>(${outputs.map ( x => x.name ).join ( ',' )});`
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

function commonIfDbNameBlock<G> ( r: RestD<G>, paramsA: MutationParam[], name: string, m: MutationDetail, index: string, includeMockIf: boolean ) {
  const paramsForLog = paramsA.length === 0 ? '' : paramsA.map ( m => displayParam ( m ).replace ( /"/g, "'" ) ).join ( ", " ) + '+';
  let makeMock = includeMockIf && getMakeMock ( m );
  return makeMock ? [ `        if (dbName.equals(IFetcher.mock)) {`,
    `           System.out.println("Mock audit: ${mutationMethodName ( r, name, m, index )}( ${paramsForLog} )");`,
    `           ${mockReturnStatement ( allOutputParams ( paramsA ) )}`,
    `    }`,
  ] : []
}

export function getFromStatement ( errorPrefix: string, from: string, m: MutationParam[] ): string[] {
  return m.flatMap ( ( m, i ) => {
    if ( !isStoredProcOutputParam ( m ) ) return []
    return [ `${m.javaType} ${m.name} = ${addFormat ( errorPrefix, m.datePattern, m.javaType, from, i + 1 )};` ]
    throw new Error ( `${errorPrefix} don't know how to getFromStatement for ${JSON.stringify ( m )}` )
  } )
}

export function getFromResultSetIntoVariables ( errorPrefix: string, from: string, m: MutationParam[] ): string[] {
  return m.flatMap ( ( m, i ) => {
    if ( !isSqlOutputParam ( m ) ) return []
    return [ `${m.javaType} ${m.name} = ${addFormat ( errorPrefix, m.datePattern, m.javaType, from, m.rsName )};` ]
    throw new Error ( `${errorPrefix} don't know how to getFromResultSetIntoVariables for ${JSON.stringify ( m )}` )
  } )
}

export function getFromResultSetPutInMap ( errorPrefix: string, map: string, from: string, m: MutationParam[] ) {
  return m.flatMap ( ( m, i ) => {
    if ( !isSqlOutputParam ( m ) ) return []
    return `${map}.put("${m.name}", ${addFormat ( errorPrefix, m.datePattern, m.javaType, from, m.rsName )});`
  } )
}

export function addFormat ( errorPrefix: string, datePattern: string | undefined, javaType: JavaTypePrimitive, from: string, argument: string | number ): string {
  const arg = typeof argument === 'number' ? argument : `"${argument}"`
  let rsGetter = RSGetterForJavaType[ javaType ];
  if ( rsGetter === undefined ) throw Error ( `${errorPrefix} Trying to do an rsGetter and the field is a ${javaType} ` )
  const body = `${from}.${rsGetter}(${arg})`;
  if ( !datePattern ) return body
  switch ( javaType ) {
    case "String":
      return ` DateFormatter.formatDate("${datePattern}", ${from}.getDate(${arg}))`
    default:
      throw new Error ( `${errorPrefix} don't know how to addFormat for ${datePattern}, ${javaType}` )
  }
}

function findType ( errorPrefix: string, params: NameAnd<AllLensRestParams<any>>, name: string ) {
  const param = params[ name ]
  return param === undefined ? 'Object' : param.javaType;
}
export const typeForParamAsInput = ( errorPrefix: string, params: NameAnd<AllLensRestParams<any>> ) => ( m: MutationParam ) => {
  if ( isOutputParam ( m ) ) return m.javaType;
  if ( typeof m === 'string' ) return findType ( errorPrefix, params, m )
  if ( isBodyMutationParam ( m ) ) return m.javaType ? m.javaType : 'Object'
  if ( isInputParam ( m ) ) return m.javaType ? m.javaType : findType ( errorPrefix, params, m.name )
  if ( m.type === 'integer' ) return 'Integer'
  if ( m.type === 'string' ) return 'String'
  return 'Object'
};


export function preTransactionLogger(prefix: MutationDetail, paramsA: MutationParam[]): string {
  const arg1 = prefix.type === "storedProc" ? "storedProc" : prefix.type
  const hasBodyParams = paramsA.filter( isBodyMutationParam ).length > 0
  if (paramsA.filter( isInputParam ).length == 0) return `      logger.debug(MessageFormat.format("${prefix.type}: {${0}}", ${arg1}));`;
  let i = 1;
  const prefixNamesAndIndex = `${prefix.type}: {${0}}, `
      .concat( paramsA.filter( isInputParam ).filter(p => !isBodyMutationParam(p) ).map(p => `${paramNamePathOrValue(p)}: {${i++}}`).join( ", " ) )
      .concat( hasBodyParams ? `, bodyAsJson: {${i++}}` : `` );
  return `      logger.debug(MessageFormat.format("${prefixNamesAndIndex}", ${arg1},${paramsA
      .filter( isInputParam ).filter(p => !isBodyMutationParam(p) ).map(p => (paramNamePathOrValue(p)))}`
      .concat( hasBodyParams ? `, bodyAsJson` : `` ).concat(`));`);
}

export function postTransactionLogger (paramsA: MutationParam[] ): string {
  if (paramsA.filter( isOutputParam ).length == 0) return `logger.debug(MessageFormat.format("Duration: {${0}}", durationMs));`;
  let i = 1;
  const prefixNamesAndIndex = `Duration: {${0}}, `.concat( paramsA.filter( isOutputParam ).map( p => `${p.name}: {${i++}}`).join( ", " ) );
  return `logger.debug(MessageFormat.format("${prefixNamesAndIndex}", durationMs, ${paramsA.filter( isOutputParam ).map(p => p.name)}));`;
}

export function mutationCodeForSqlMapCalls<G> ( errorPrefix: string, p: MainPageD<any, any>, r: RestD<G>, name: string, m: SqlMutation, index: string, includeMockIf: boolean ): string[] {

  const paramsA = toArray ( m.params )
  const exception = m.noDataIs404 ?
    'FocusonNotFound404Exception(msgs)' :
    `SQLException("Error in : ${mutationMethodName ( r, name, m, index )}. Cannot get first item. Index was ${index} Sql was ${m.sql.replace ( /\n/g, ' ' )}\\n${errorPrefix}")`

  const execute = allOutputParams ( paramsA ).length == 0 ?
    [ `s.execute();` ] :
    [ `ResultSet rs = s.executeQuery();`,
      `if (!rs.next()) throw new ${exception};`,
    ]
  return [
    ...makeMethodDecl ( errorPrefix, paramsA, javaTypeForOutput ( paramsA ), r, name, m, index ),
    ...commonIfDbNameBlock ( r, paramsA, name, m, index, includeMockIf ),
    `    String sql = "${m.sql.replace ( /\n|\t|\s/gm, ' ' )}";`,
    `    try (PreparedStatement s = connection.prepareStatement(sql)) {`,
         preTransactionLogger(m, paramsA),
    ...indentList ( indentList ( indentList ( [
        ...allSetObjectForInputs ( m.params ),
        `long start = System.nanoTime();`,
        ...execute,
        `long durationMs = (System.nanoTime() - start) / 1000;`,
        ...getFromResultSetIntoVariables ( errorPrefix, 'rs', paramsA ),
        postTransactionLogger(paramsA),
        makeMutationResolverReturnStatement ( allOutputParams ( paramsA ) )
      ]
    ) ) ),
    `  }}`,
  ];
}

export function mutationCodeForSqlListCalls<G> ( errorPrefix: string, p: MainPageD<any, any>, r: RestD<G>, name: string, m: SqlMutationThatIsAList, index: string, includeMockIf: boolean ): string[] {
  const paramsA = toArray ( m.params )
  const messageLine = m.messageOnEmptyData ? [ `if (result.isEmpty()) msgs.error(${JSON.stringify ( m.messageOnEmptyData )});` ] : []
  return [
    ...makeMethodDecl ( errorPrefix, paramsA, 'List<Map<String,Object>>', r, name, m, index ),
    ...commonIfDbNameBlock ( r, paramsA, name, m, index, includeMockIf ),
    `    String sql = "${m.sql.replace ( /\n|\t|\s/gm, ' ' )}";`,
    `    try (PreparedStatement s = connection.prepareStatement(sql)) {`,
         preTransactionLogger(m, paramsA),
    ...indentList ( indentList ( indentList ( [
        ...allSetObjectForInputs ( m.params ),
        `long start = System.nanoTime();`,
        `ResultSet rs = s.executeQuery();`,
        `long durationMs = (System.nanoTime() - start) / 1000;`,
        `List<Map<String,Object>> result = new ArrayList();`,
        `while (rs.next()){`,
        ...indentList ( [
          `Map<String,Object> oneLine = new HashMap();`,
          ...getFromResultSetPutInMap ( errorPrefix, 'oneLine', 'rs', paramsA ),
          `result.add(oneLine);` ] ),
        '}',
        ...messageLine,
          postTransactionLogger(paramsA),
        `return result;`,
      ]
    ) ) ),
    `  }}`,
  ];
}
function makeMethodDecl<G> ( errorPrefix: string, paramsA: MutationParam[], resultType: string, r: RestD<G>, name: string, m: MutationDetail, index: string, ) {
  const params = safeObject ( r.params );
  let paramStrings = unique ( allInputParams ( [ 'dbName', ...paramsA ] ), p => paramName ( p ) )
    .map ( param => `${typeForParamAsInput ( errorPrefix, params ) ( param )} ${paramName ( param )}` ).join ( ", " );
  return [ `    public ${resultType} ${mutationMethodName ( r, name, m, index )}(Connection connection, Messages msgs, ${paramStrings}) throws SQLException {`,
    ...indentList ( indentList ( indentList ( requiredmentCheckCodeForJava ( paramsA, parametersFor ( m ) ) ) ) ) ];
}
export function mutationCodeForStoredProcedureCalls<G> ( errorPrefix: string, p: MainPageD<any, any>, r: RestD<G>, name: string, m: StoredProcedureMutation, index: string, includeMockIf: boolean ): string[] {
  const paramsA = toArray ( m.params )
  let fullName = m.package ? `${m.package}.${m.name}` : m.name;
  return [
    ...makeMethodDecl ( errorPrefix, paramsA, javaTypeForOutput ( paramsA ), r, name, m, index ),
    `      String storedProc = "call ${fullName}(${toArray ( m.params ).map ( () => '?' ).join ( ", " )})";`,
    ...commonIfDbNameBlock ( r, paramsA, name, m, index, includeMockIf ), `    try (CallableStatement s = connection.prepareCall(storedProc)) {`,
    preTransactionLogger(m, paramsA),
    ...indentList ( indentList ( indentList ( allSetObjectForStoredProcs ( m.params ) ) ) ),
    `      long start = System.nanoTime();`,
    `      s.execute();`,
    `      long durationMs = (System.nanoTime() - start) / 1000;`,
    ...indentList ( indentList ( indentList ( [
      ...getFromStatement ( errorPrefix, 's', paramsA ),
      postTransactionLogger(paramsA),
      makeMutationResolverReturnStatement ( allOutputParams ( paramsA ) ) ] ) ) ),
    `  }}`,
  ];
}
export function mutationCodeForManual<G> ( errorPrefix: string, p: MainPageD<any, any>, r: RestD<G>, name: string, m: ManualMutation, index: string, includeMockIf: boolean ): string[] {
  const paramsA = toArray ( m.params );
  return [
    `//If you have a compiler error in the type here, did you match the types of the output params in your manual code with the declared types in the .restD?`,
    ...makeMethodDecl ( errorPrefix, paramsA, javaTypeForOutput ( paramsA ), r, name, m, index ),
    ...commonIfDbNameBlock ( r, paramsA, name, m, index, includeMockIf ),
    ...indentList ( indentList ( indentList ( [ ...toArray ( m.code ), makeMutationResolverReturnStatement ( allOutputParams ( paramsA ) ) ] ) ) ),
    `  }`,
  ];
}

export function mutationCodeForCase<G> ( errorPrefix: string, p: MainPageD<any, any>, r: RestD<G>, name: string, m: SelectMutation, index: number, includeMockIf: boolean, indexPrefix: string ): string[] {
  const paramsA = toArray ( m.params );
  const callingCode: string[] = m.select.flatMap ( ( gm, i ) => {
    const ifStatement = `if (${[ 'true', ...gm.guard ].join ( ' && ' )})`;
    return isMessageMutation ( gm ) ?
      [ ifStatement + '{', `   msgs.${gm.level ? gm.level : 'info'}("${gm.message}");`, '   return;', '}' ] :
      [ `if (${[ 'true', ...gm.guard ].join ( ' && ' )}) {`,
        ...indentList ( [ `${paramsDeclaration ( gm, i )}${mutationMethodName ( r, name, gm, indexPrefix + index + "_" + i )}(connection,msgs,${[ 'dbName', ...allInputParamNames ( parametersFor ( gm ) ) ].join ( ',' )});`,
          ...outputParamsDeclaration ( gm, i ),
          `// If you have a compilation error here: do the output params match the output params in the 'case'?`,
          makeMutationResolverReturnStatement ( allOutputParams ( paramsA ) ) ] ),
        '}'
      ];
  } )
  return [
    `//If you have a compiler error in the type here, did you match the types of the output params in your manual code with the declared types in the .restD?`,
    ...makeMethodDecl ( errorPrefix, paramsA, javaTypeForOutput ( paramsA ), r, name, m, indexPrefix + index ),
    ...commonIfDbNameBlock ( r, paramsA, name, m, indexPrefix + index, includeMockIf ),
    ...indentList ( indentList ( indentList ( [
      ...callingCode,
      `throw new RuntimeException("No guard condition executed");` ] ) ) ),
    `  }`,
  ];
}

export function makeMutationMethod<G> ( errorPrefix: string, mutations: MutationDetail[], name: string, p: MainPageD<any, any>, r: RestD<G>, includeMockIf: boolean, indexPrefix: string ): string[] {
  const methods = mutations.flatMap ( ( mutateBy, index ) => toArray ( mutateBy ).flatMap ( ( m: MutationDetail ) => {
    const newErrorPrefix = `${errorPrefix} Mutation ${name} ${mutationDetailsName ( m, index.toString () )}`
    if ( isSqlMutationThatIsAList ( m ) ) return mutationCodeForSqlListCalls ( newErrorPrefix, p, r, name, m, indexPrefix + index, includeMockIf )
    if ( m.type === 'sql' ) return mutationCodeForSqlMapCalls ( newErrorPrefix, p, r, name, m, indexPrefix + index, includeMockIf )
    if ( m.type === 'storedProc' ) return mutationCodeForStoredProcedureCalls ( newErrorPrefix, p, r, name, m, indexPrefix + index, includeMockIf )
    if ( m.type === 'manual' ) return mutationCodeForManual ( newErrorPrefix, p, r, name, m, indexPrefix + index, includeMockIf );
    if ( m.type === 'case' ) {
      const caseCode = mutationCodeForCase ( newErrorPrefix, p, r, name, m, index, includeMockIf, indexPrefix );
      const clausesCode = makeMutationMethod ( errorPrefix, m.select, name, p, r, includeMockIf, indexPrefix + index + '_' );
      return [ ...caseCode, ...clausesCode ];
    }
    if ( m.type === 'message' ) return mutationCodeForMessage ()
    throw Error ( `Don't know how to findCode (Page ${p.name}) for ${JSON.stringify ( m )}` )
  } ) )
  return methods;
}

export function mutationCodeForMessage (): string[] {
  return [] // we return the empty string because this code is handled in the endpoint controller
}

export function makeCodeFragmentsForMutation<G> ( mutations: MutationDetail[], p: MainPageD<any, any>, r: RestD<G>, params: JavaWiringParams, ) {
  // const methods = makeMutationMethod ( mutations, name, p, r, includeMockIf );
  const autowiring: AutowiredMutationParam[] = unique<AutowiredMutationParam> ( mutations.flatMap ( ( mutateBy ) => toArray ( mutateBy ).flatMap ( m => toArray ( parametersFor ( m ) ) ) ).flatMap ( mp =>
    (typeof mp !== 'string' && mp.type === 'autowired' && mp.import !== false) ? [ { ...mp, class: applyToTemplate ( mp.class, params ).join ( '' ) } ] : [] ), r => r.class );
  const importsFromParams: string[] = unique ( autowiring, t => t.class ).flatMap ( mp => [ `//added by param ${mp.name}`, `import ${mp.class};` ] )
  const autowiringVariables = autowiring.map ( mp => `    ${mp.class} ${mp.name};` ).flatMap ( mp => [ `    @Autowired`, mp, '' ] )
  return { importsFromParams, autowiringVariables };
}
export function importsFromManual ( mutation: MutationsForRestAction ): string[] {
  return toArray ( mutation.mutateBy ).flatMap ( m => m.type === 'manual' ? toArray ( m.import ) : [] )
}

export const classLevelAutowiring = ( params: JavaWiringParams ) => ( mutation: MutationsForRestAction ): string[] => mutation.autowired !== undefined ? toArray ( mutation.autowired ).flatMap ( m => indentList ( [
  `@Autowired`,
  `public ${applyToTemplate ( m.class, params )} ${m.variableName};` ] ) ) : [];

export function makeMutations<G> ( params: JavaWiringParams, p: MainPageD<any, any>, restName: string, r: RestD<G>, mutation: MutationsForRestAction ): string[] {
  const errorPrefix = `${p.name}.rest[${restName}]. Making mutations for ${restActionForName ( mutation.restAction )}.`
  const { importsFromParams, autowiringVariables } = makeCodeFragmentsForMutation ( toArray ( mutation.mutateBy ), p, r, params );
  const methods = makeMutationMethod ( errorPrefix, toArray ( mutation.mutateBy ), restActionForName ( mutation.restAction ), p, r, true, '' )
  return [
    `package ${params.thePackage}.${params.mutatorPackage}.${p.name};`,
    ``,
    `import ${params.thePackage}.${params.fetcherPackage}.IFetcher;`,
    `import org.springframework.stereotype.Component;`,
    'import org.springframework.beans.factory.annotation.Autowired;',
    ``,
    `import ${params.thePackage}.${params.utilsPackage}.FocusonNotFound404Exception;`,
    `import ${params.thePackage}.${params.utilsPackage}.DateFormatter;`,
    `import org.slf4j.Logger;`,
    `import org.slf4j.LoggerFactory;`,
    `import java.text.MessageFormat;`,
    `import java.util.Map;`,
    `import java.util.HashMap;`,
    `import java.util.ArrayList;`,
    `import java.util.List;`,
    `import java.util.Date;`,
    `import java.sql.CallableStatement;`,
    `import java.sql.PreparedStatement;`,
    `import java.sql.ResultSet;`,
    `import java.sql.Connection;`,
    `import java.sql.SQLException;`,
    `import ${params.thePackage}.${params.utilsPackage}.IOGNL;`,
    `import ${params.thePackage}.${params.utilsPackage}.DateFormatter;`,
    `import ${params.thePackage}.${params.utilsPackage}.Messages;`,
    ...importsFromParams,
    ...importForTubles ( params ),
    ...importsFromManual ( mutation ),
    ...toArray ( r.mutations ).flatMap ( m => m.mutateBy ).flatMap ( m => m.type === 'manual' ? toArray ( m.import ) : [] ),
    `@Component`,
    `public class ${mutationClassName ( r, mutation.restAction )} {`,
    ``,
    `Logger logger = LoggerFactory.getLogger(getClass());`,
    ``,
    `    @Autowired IOGNL ognlForBodyAsJson;`,
    ...autowiringVariables,
    ...classLevelAutowiring ( params ) ( mutation ),
    ...methods,
    ``,
    `}`
  ]
}