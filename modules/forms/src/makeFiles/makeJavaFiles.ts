import { copyFile, copyFiles, DirectorySpec, templateFile, writeToFile } from "@focuson/files";
import { JavaWiringParams } from "../codegen/config";
import fs from "fs";
import { forEachRest, forEachRestAndActionsUsingRefs, mapRestAndResolverincRefs } from "../common/restD";
import { detailsLog, GenerateLogLevel, NameAnd, safeArray, safeObject, safeString, sortedEntries, toArray, unique } from "@focuson/utils";
import { allMainPages, PageD, RefD, RestDefnInPageProperties } from "../common/pageD";
import { addStringToEndOfList, indentList } from "../codegen/codegen";
import { makeAllJavaVariableName } from "../codegen/makeSample";
import { createTableSqlName, dbFetcherClassName, fetcherInterfaceForResolverName, fetcherInterfaceName, fetcherPackageName, getSqlName, mockFetcherClassName, mockFetcherClassNameForResolver, mockFetcherPackage, mutationClassName, providerPactClassName, queryClassName, queryPackage, resolverClassName, resolverName, restControllerName, sqlMapFileName } from "../codegen/names";
import { makeGraphQlSchema } from "../codegen/makeGraphQlTypes";

import { makeMockFetcherFor, makeMockFetchersForRest } from "../codegen/makeMockFetchers";
import { makeJavaVariablesForGraphQlQuery } from "../codegen/makeGraphQlQuery";
import { makeSpringEndpointsFor } from "../codegen/makeSpringEndpoint";
// import { findSqlRoot, makeCreateTableSql, makeGetSqlFor, makeSqlDataFor, walkRoots } from "../codegen/makeJavaSql.tsxxx";
import { createTableSql, findSqlLinkDataFromRootAndDataD, findSqlRoot, generateGetSql, getStrategy, makeInsertSqlForIds, makeInsertSqlForNoIds, makeMapsForRest, walkSqlRoots } from "../codegen/makeSqlFromEntities";
import { makeDBFetchers } from "../codegen/makeDBFetchers";
import { makePactValidation } from "../codegen/makePactValidation";
import { AppConfig } from "../appConfig";

import { makeMutations } from "../codegen/makeMutations";
import { findChildResolvers, findJavaType, findQueryMutationResolver, makeAllJavaWiring, makeJavaFetcherInterfaceForResolver } from "../codegen/makeJavaFetchersInterface";
import { makeTuples, tupleIndexes } from "../common/resolverD";
import { findResolverData, makeResolvers } from "../codegen/makeResolvers";


export const makeJavaFiles = ( logLevel: GenerateLogLevel, appConfig: AppConfig, javaOutputRoot: string, params: JavaWiringParams, directorySpec: DirectorySpec ) => <B, G> ( pages: PageD<B, G>[], refs: RefD<G>[] ) => {
  //to help the readability of the writeFile/template files
  const details = logLevel === 'detailed' ? 2 : -1
  const minimal = logLevel === 'minimal' ? 2 : -1
  const overview = logLevel === 'overview' ? 2 : -1

  const javaAppRoot = javaOutputRoot
  const javaScriptRoot = javaAppRoot + "/scripts"
  const javaCodeRoot = javaAppRoot + `/src/main/java/${params.thePackage.replace ( /\./g, '/' )}`
  const javaTestRoot = javaAppRoot + `/src/test/java/${params.thePackage.replace ( /\./g, '/' )}`
  const javaResourcesRoot = javaAppRoot + "/src/main/resources"
  const javaFetcherRoot = javaCodeRoot + "/" + params.fetcherPackage
  const javaControllerRoot = javaCodeRoot + "/" + params.controllerPackage
  const javaMockFetcherRoot = javaCodeRoot + "/" + params.mockFetcherPackage
  const javaH2FetcherRoot = javaCodeRoot + "/" + params.dbFetcherPackage
  const javaQueriesPackages = javaCodeRoot + "/" + params.queriesPackage
  const javaMutatorPackage = javaCodeRoot + '/' + params.mutatorPackage
  const javaResolverPackage = javaCodeRoot + '/' + params.resolversPackage
  const javaUtilsRoot = javaCodeRoot + '/' + params.utilsPackage
  const javaDbPackages = javaCodeRoot + "/" + params.dbPackage
  // const javaSql = javaResourcesRoot + "/" + params.sqlDirectory

  fs.mkdirSync ( `${javaOutputRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaAppRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaCodeRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaTestRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaResourcesRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaScriptRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaFetcherRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaMockFetcherRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaH2FetcherRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaControllerRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaQueriesPackages}`, { recursive: true } )
  // fs.mkdirSync ( `${javaDbPackages}`, { recursive: true } )
  const mainPages = allMainPages ( pages );
  const allRefs = [ ...refs, ...mainPages ];
  allRefs.forEach ( p => {
    fs.mkdirSync ( `${javaFetcherRoot}/${p.name}`, { recursive: true } );
    fs.mkdirSync ( `${javaMockFetcherRoot}/${p.name}`, { recursive: true } );
    fs.mkdirSync ( `${javaH2FetcherRoot}/${p.name}`, { recursive: true } );
    fs.mkdirSync ( `${javaQueriesPackages}/${p.name}`, { recursive: true } );
    fs.mkdirSync ( `${javaMutatorPackage}/${p.name}`, { recursive: true } )
    fs.mkdirSync ( `${javaResolverPackage}/${p.name}`, { recursive: true } )
    fs.mkdirSync ( `${javaDbPackages}/${p.name}`, { recursive: true } )
  } )
  fs.mkdirSync ( `${javaCodeRoot}/utils`, { recursive: true } )
  fs.mkdirSync ( `${javaMutatorPackage}/utils`, { recursive: true } )
// process.exit(2)
// This isn't the correct aggregation... need to think about this. Multiple pages can ask for more. I think... we''ll have to refactor the structure
  const raw = allRefs.flatMap ( x => sortedEntries ( x.rest ) ).map ( ( x: [ string, RestDefnInPageProperties<G> ] ) => x[ 1 ].rest );
  const rests = unique ( raw, r => r.dataDD.name + ":" + r.namePrefix )
  detailsLog ( logLevel, 1, 'java file copies' )
  copyFiles ( javaScriptRoot, 'templates/scripts', directorySpec ) ( 'makeJava.sh', 'makeJvmPact.sh', 'template.java' )

  let templateWithPortAndAppName = {
    ...params, applicationName: params.applicationName.toLowerCase (),
    javaPort: appConfig.javaPort
  };
  templateFile ( javaAppRoot + "/project.details.json", 'templates/java.projectDetails.json', templateWithPortAndAppName, directorySpec )
  templateFile ( javaAppRoot + "/application.properties", "templates/application.properties", templateWithPortAndAppName, directorySpec )
  copyFile ( javaAppRoot + '/.gitignore', 'templates/raw/gitignore', directorySpec )


  detailsLog ( logLevel, 1, 'java common copies' )
  templateFile ( `${javaAppRoot}/pom.xml`, 'templates/mvnTemplate.pom', { ...params, versionNumber: appConfig.versionNumber }, directorySpec )
  templateFile ( javaUtilsRoot + "/IManyGraphQl.java", "templates/raw/java/IManyGraphQl.java", params, directorySpec )
  templateFile ( javaCodeRoot + "/CorsConfig.java", "templates/raw/java/CorsConfig.java", params, directorySpec )
  templateFile ( `${javaCodeRoot}/SchemaController.java`, 'templates/raw/java/SchemaController.java', params, directorySpec )
  templateFile ( `${javaControllerRoot}/Transform.java`, 'templates/Transform.java', params, directorySpec )
  templateFile ( `${javaFetcherRoot}/IFetcher.java`, 'templates/raw/java/IFetcher.java', params, directorySpec )
  templateFile ( `${javaUtilsRoot}/IOGNL.java`, 'templates/raw/java/utils/IOGNL.java', params, directorySpec )
  templateFile ( `${javaUtilsRoot}/OGNL.java`, 'templates/raw/java/utils/OGNL.java', params, directorySpec )
  templateFile ( `${javaUtilsRoot}/GraphQlUtils.java`, 'templates/raw/java/utils/GraphQlUtils.java', params, directorySpec )


  const pageRestDefns = mainPages.flatMap ( p => sortedEntries ( p.rest ).map ( t => t[ 1 ] ) );
  const refRestDefns = refs.flatMap ( p => sortedEntries ( p.rest ) ).map ( t => t[ 1 ] )
  const allRestDefns: RestDefnInPageProperties<G>[] = [ ...pageRestDefns, ...refRestDefns ]

  const createTable: NameAnd<string[]> = createTableSql ( allRestDefns )
  // console.log ( JSON.stringify ( createTable, null, 2 ) )
  if ( appConfig.makeSqlStrings !== false && Object.entries ( createTable ).length > 0 )
    writeToFile ( `${javaResourcesRoot}/${createTableSqlName ()}.sql`, () => Object.values ( createTable ).flatMap ( addStringToEndOfList ( ";\n" ) ), details )
  else
    fs.rmSync ( `${javaResourcesRoot}/${createTableSqlName ()}.sql`, { force: true } )

  writeToFile ( `${javaResourcesRoot}/${getSqlName ()}.sql`,
    () => rests.filter ( r => r.tables ).flatMap ( rest =>
      [ `--${safeString ( rest.namePrefix )} ${rest.dataDD.name} ${rest.url} ${JSON.stringify ( rest.params )}`,
        ...walkSqlRoots ( findSqlRoot ( rest.tables ), r =>
          generateGetSql ( findSqlLinkDataFromRootAndDataD ( r, rest.dataDD, rest.params ) ) ).map ( addStringToEndOfList ( ';\n' ) ).flat () ] ), details )

  writeToFile ( `${javaResourcesRoot}/${params.schema}`, () => makeGraphQlSchema ( rests ), details )
  forEachRestAndActionsUsingRefs ( pages, refs, p => rest => action => {
    let name = resolverName ( rest, action );
    let fetcherFile = `${javaCodeRoot}/${params.fetcherPackage}/${p.name}/${fetcherInterfaceForResolverName ( params, rest, name )}.java`;
    writeToFile ( fetcherFile, () => makeJavaFetcherInterfaceForResolver ( params, p, rest, name, findJavaType ( rest.dataDD ) ), details )
  } )
  mapRestAndResolverincRefs ( pages, refs, p => rest => ( { resolver, javaType } ) => {
    let fetcherFile = `${javaCodeRoot}/${params.fetcherPackage}/${p.name}/${fetcherInterfaceForResolverName ( params, rest, resolver )}.java`;
    writeToFile ( fetcherFile, () => makeJavaFetcherInterfaceForResolver ( params, p, rest, resolver, javaType ), details )
  } )

  writeToFile ( `${javaUtilsRoot}/${params.wiringClass}.java`, () => makeAllJavaWiring ( params, pages, directorySpec ), details )
  templateFile ( `${javaUtilsRoot}/LoggedDataSource.java`, 'templates/raw/java/utils/LoggedDataSource.java', params, directorySpec, details )
  templateFile ( `${javaUtilsRoot}/Messages.java`, 'templates/raw/java/utils/Messages.java', params, directorySpec, details )
  templateFile ( `${javaUtilsRoot}/FocusonNotFound404Exception.java`, 'templates/raw/java/utils/FocusonNotFound404Exception.java', params, directorySpec, details )
  templateFile ( `${javaUtilsRoot}/FocusonNotFound404ExceptionHandling.java`, 'templates/raw/java/utils/FocusonNotFound404ExceptionHandling.java', params, directorySpec, details )
  templateFile ( `${javaCodeRoot}/${params.applicationName}.java`, 'templates/JavaApplicationTemplate.java', params, directorySpec, details )
  templateFile ( `${javaCodeRoot}/utils/ITimeService.java`, 'templates/raw/java/utils/ITimeService.java', params, directorySpec, details )
  templateFile ( `${javaCodeRoot}/utils/RealTimeService.java`, 'templates/raw/java/utils/RealTimeService.java', params, directorySpec, details )
  templateFile ( `${javaUtilsRoot}/DateFormatter.java`, 'templates/raw/java/utils/DateFormatter.java', params, directorySpec, details )

  forEachRestAndActionsUsingRefs ( pages, refs, p => restD => action => templateFile ( `${javaMockFetcherRoot}/${p.name}/${mockFetcherClassName ( params, restD, action )}.java`, 'templates/JavaFetcherClassTemplate.java',
    {
      ...params,
      mockFetcherPackage: mockFetcherPackage ( params, p ),
      thisFetcherPackage: fetcherPackageName ( params, p ),
      fetcherInterface: fetcherInterfaceName ( params, restD, action ),
      fetcherClass: mockFetcherClassName ( params, restD, action ),
      content: makeMockFetchersForRest ( params, restD, action ).join ( "\n" )
    }, directorySpec ) )
  mapRestAndResolverincRefs ( pages, refs, p => ( restD ) => ( resolverData ) => templateFile ( `${javaMockFetcherRoot}/${p.name}/${mockFetcherClassNameForResolver ( params, restD, resolverData.resolver )}.java`, 'templates/JavaFetcherClassTemplate.java',
    {
      ...params,
      mockFetcherPackage: mockFetcherPackage ( params, p ),
      thisFetcherPackage: fetcherPackageName ( params, p ),
      fetcherInterface: fetcherInterfaceForResolverName ( params, restD, resolverData.resolver ),
      fetcherClass: mockFetcherClassNameForResolver ( params, restD, resolverData.resolver ),
      content: makeMockFetcherFor ( params ) ( resolverData ).join ( "\n" )
    }, directorySpec ) )


  forEachRestAndActionsUsingRefs ( pages, refs, p => ( r, restName, rdp ) => a => {
    if ( a !== 'get' ) return;
    if ( rdp.rest.tables === undefined ) return;
    writeToFile ( `${javaH2FetcherRoot}/${p.name}/${dbFetcherClassName ( params, rdp.rest, a )}.java`, () => makeDBFetchers ( params, p, restName, rdp ) )
  } )

  fs.rmSync ( `${javaResourcesRoot}/data.sql`, { force: true } )
  if ( appConfig.makeSqlStrings !== false ) {
    let dataSql = allRefs.flatMap ( mainPage =>
      sortedEntries ( mainPage.rest )
        .flatMap ( ( [ _, rdp ] ) => {
          return getStrategy ( rdp?.rest?.tables?.entity ).flatMap ( s => {
            if ( s.type === 'WithId' ) return safeArray ( makeInsertSqlForIds ( rdp.rest.dataDD, rdp?.rest?.tables?.entity, s ) )
            else if ( s.type === 'WithoutId' ) return safeArray ( makeInsertSqlForNoIds ( rdp.rest.dataDD, rdp?.rest?.tables?.entity, s ) )
            else if ( s.type === 'Manual' ) return s.sql
            else return []
          } )
        } ) );
    if ( dataSql.length > 0 )
      writeToFile ( `${javaResourcesRoot}/data.sql`, () => dataSql )
  }
  allRefs.forEach ( p => writeToFile ( `${javaTestRoot}/${providerPactClassName ( p )}.java`, () => makePactValidation ( params, appConfig.javaPort, p ) ) )


  templateFile ( `${javaCodeRoot}/${params.sampleClass}.java`, 'templates/JavaSampleTemplate.java',
    { ...params, content: indentList ( makeAllJavaVariableName ( pages, 0 ) ).join ( "\n" ) }, directorySpec, details )
  forEachRest ( allRefs, p => r =>
    templateFile ( `${javaQueriesPackages}/${p.name}/${queryClassName ( params, r )}.java`, 'templates/JavaQueryTemplate.java',
      {
        ...params,
        queriesPackage: queryPackage ( params, p ),
        queriesClass: queryClassName ( params, r ),
        content: indentList ( makeJavaVariablesForGraphQlQuery ( [ r ] ) ).join ( "\n" )
      }, directorySpec, details )
  )

  allRefs.map ( p => {
    Object.entries ( p.rest ).map ( ( [ name, rdp ] ) => {
      writeToFile ( `${javaControllerRoot}/${restControllerName ( p, rdp.rest )}.java`, () => makeSpringEndpointsFor ( params, p, name, rdp.rest ), details )
      let tables = rdp.rest.tables;
      if ( !tables ) return
      detailsLog ( logLevel, 2, `Creating rest files for ${p.name} ${name}` )
      walkSqlRoots ( findSqlRoot ( tables ), ( root, path ) => {
        const ld = findSqlLinkDataFromRootAndDataD ( root, rdp.rest.dataDD, rdp.rest.params )
        let fileName = sqlMapFileName ( javaDbPackages, p, name, path ) + ".java";
        console.log ( 'name:', fileName )
        writeToFile ( fileName, () => makeMapsForRest ( params, p, name, rdp, ld, path, root.children.length ), details )
      } )
    } )
  } )

  forEachRest ( allRefs, p => ( r, restName ) => {
      toArray ( r.mutations ).forEach ( m => {
        writeToFile ( `${javaMutatorPackage}/${p.name}/${mutationClassName ( r, m.restAction )}.java`, () => makeMutations ( params, p, restName, r, m ), details )
      } )
    }
  )

  forEachRest ( allRefs, p => ( r, restName ) => {
    const allResolverData = [ findQueryMutationResolver ( r, 'get' ), ...findChildResolvers ( r ) ]
    Object.entries ( safeObject ( r.resolvers ) ).forEach ( ( [ name, res ] ) => {
      const resolverData = findResolverData ( `${p.name}.rest[${restName}].resolvers[${name}]`, allResolverData, name )
      writeToFile ( `${javaResolverPackage}/${p.name}/${resolverClassName ( r, resolverData.resolver )}.java`,
        () => makeResolvers ( params, p, restName, r, name, res, resolverData ), details )
    } )
  } )

  tupleIndexes ( params.maxTuples ).map ( i => writeToFile ( `${javaMutatorPackage}/utils/Tuple${i}.java`, () => makeTuples ( params, i ) ), details )

  // rests.forEach ( rest => {
  //   if ( isSqlResolverD ( rest.resolver ) ) {
  //     let sqlG = rest.resolver.get;
  //     if ( sqlG ) {
  //       console.log ( 'sqlG', rest.dataDD.name )
  //
  //       writeToFile ( `${javaSql}/${javaSqlCreateTableSqlName ( rest )}`, () => makeCreateTableSql ( rest.dataDD, sqlG ), details )
  //       const sqlRoots = findSqlRoot ( JointAccountDd, sqlG );
  //       const sqlData = walkRoots ( sqlRoots, r => makeSqlDataFor ( r, sqlG ) )
  //       const makeSql = sqlData.flatMap ( makeGetSqlFor )
  //       writeToFile ( `${javaSql}/${javaSqlReadSqlName ( rest )}`, () => makeSql, details )
  //
  //     }
  //   }
  // } )

};