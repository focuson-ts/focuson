import { copyFile, copyFiles, DirectorySpec, templateFile, writeToFile } from "@focuson/files";
import { JavaWiringParams } from "../codegen/config";
import fs from "fs";
import { unique } from "../common/restD";
import { detailsLog, GenerateLogLevel, sortedEntries } from "@focuson/utils";
import { allMainPages, PageD, RestDefnInPageProperties } from "../common/pageD";
import { indentList } from "../codegen/codegen";
import { makeAllJavaVariableName } from "../codegen/makeSample";
import { createTableSqlName, fetcherInterfaceName, mockFetcherClassName, queryClassName, restControllerName, sqlMapFileName } from "../codegen/names";
import { makeGraphQlSchema } from "../codegen/makeGraphQlTypes";
import { makeAllJavaWiring, makeJavaResolversInterface } from "../codegen/makeJavaResolvers";
import { makeAllMockFetchers } from "../codegen/makeMockFetchers";
import { makeJavaVariablesForGraphQlQuery } from "../codegen/makeGraphQlQuery";
import { makeSpringEndpointsFor } from "../codegen/makeSpringEndpoint";
import { AppConfig } from "../focuson.config";
// import { findSqlRoot, makeCreateTableSql, makeGetSqlFor, makeSqlDataFor, walkRoots } from "../codegen/makeJavaSql.tsxxx";
import { createTableSql, findSqlLinkDataFromRootAndDataD, findSqlRoots, makeMapsForRest, walkSqlRoots } from "../codegen/makeSqlFromEntities";


export const makeJavaFiles = ( logLevel: GenerateLogLevel, appConfig: AppConfig, javaOutputRoot: string, params: JavaWiringParams, directorySpec: DirectorySpec ) => <B, G> ( pages: PageD<B, G>[] ) => {
  //to help the readability of the writeFile/template files
  const details = logLevel === 'detailed' ? 2 : -1
  const minimal = logLevel === 'minimal' ? 2 : -1
  const overview = logLevel === 'overview' ? 2 : -1

  const javaRoot = javaOutputRoot + "/java"
  const javaAppRoot = javaOutputRoot + "/java/" + params.applicationName
  const javaScriptRoot = javaAppRoot + "/scripts"
  const javaCodeRoot = javaAppRoot + "/src/main/java/focuson/data"
  const javaResourcesRoot = javaAppRoot + "/src/main/resources"
  const javaFetcherRoot = javaCodeRoot + "/" + params.fetcherPackage
  const javaControllerRoot = javaCodeRoot + "/" + params.controllerPackage
  const javaMockFetcherRoot = javaCodeRoot + "/" + params.mockFetcherPackage
  const javaQueriesPackages = javaCodeRoot + "/" + params.queriesPackage
  const javaDbPackages = javaCodeRoot + "/" + params.dbPackage
  const javaSql = javaResourcesRoot + "/" + params.sqlDirectory

  fs.mkdirSync ( `${javaOutputRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaAppRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaCodeRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaResourcesRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaScriptRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaFetcherRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaMockFetcherRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaControllerRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaQueriesPackages}`, { recursive: true } )
  fs.mkdirSync ( `${javaDbPackages}`, { recursive: true } )
  fs.mkdirSync ( `${javaSql}`, { recursive: true } )

// This isn't the correct aggregation... need to think about this. Multiple pages can ask for more. I think... we''ll have to refactor the structure
  const raw = allMainPages ( pages ).flatMap ( x => sortedEntries ( x.rest ) ).map ( ( x: [ string, RestDefnInPageProperties<G> ] ) => x[ 1 ].rest );
  const rests = unique ( raw, r => r.dataDD.name + ":" + r.namePrefix )
  detailsLog ( logLevel, 1, 'java file copies' )
  copyFiles ( javaScriptRoot, 'templates/scripts', directorySpec ) ( 'makeJava.sh', 'makeJvmPact.sh', 'template.java' )

  copyFiles ( javaAppRoot, 'templates/raw/java', directorySpec ) ( 'application.properties' )
  copyFile ( javaAppRoot + '/.gitignore', 'templates/raw/gitignore', directorySpec )
  copyFiles ( javaCodeRoot, 'templates/raw/java', directorySpec ) ( 'CorsConfig.java' )
  detailsLog ( logLevel, 1, 'java common copies' )
  templateFile ( `${javaAppRoot}/pom.xml`, 'templates/mvnTemplate.pom', params, directorySpec )
  templateFile ( `${javaCodeRoot}/SchemaController.java`, 'templates/raw/java/SchemaController.java', params, directorySpec )
  templateFile ( `${javaControllerRoot}/Transform.java`, 'templates/Transform.java', params, directorySpec )


  const allRestDefns: RestDefnInPageProperties<G>[] = allMainPages ( pages ).flatMap ( p => sortedEntries ( p.rest ).map ( t => t[ 1 ] ) )

  const createTable = createTableSql ( allRestDefns )
  console.log ( JSON.stringify ( createTable, null, 2 ) )
  Object.entries ( createTable ).forEach ( ( [ name, sql ] ) =>
    writeToFile ( `${javaSql}/${createTableSqlName ( name )}`, () => sql ), details )


  writeToFile ( `${javaResourcesRoot}/${params.schema}`, () => makeGraphQlSchema ( rests ), details )
  rests.forEach ( rest => {
      let file = `${javaCodeRoot}/${params.fetcherPackage}/${fetcherInterfaceName ( params, rest )}.java`;
      writeToFile ( file, () => makeJavaResolversInterface ( params, rest ), details )
    }
  )
  writeToFile ( `${javaCodeRoot}/${params.wiringClass}.java`, () => makeAllJavaWiring ( params, rests, directorySpec ), details )
  templateFile ( `${javaCodeRoot}/${params.applicationName}.java`, 'templates/JavaApplicationTemplate.java', params, directorySpec, details )
  rests.forEach ( restD => templateFile ( `${javaMockFetcherRoot}/${mockFetcherClassName ( params, restD )}.java`, 'templates/JavaFetcherClassTemplate.java',
    {
      ...params,
      fetcherInterface: fetcherInterfaceName ( params, restD ),
      fetcherClass: mockFetcherClassName ( params, restD ),
      thePackage: params.thePackage + "." + params.mockFetcherPackage,
      content: makeAllMockFetchers ( params, [ restD ] ).join ( "\n" )
    }, directorySpec ) )
  templateFile ( `${javaCodeRoot}/${params.sampleClass}.java`, 'templates/JavaSampleTemplate.java',
    { ...params, content: indentList ( makeAllJavaVariableName ( pages, 0 ) ).join ( "\n" ) }, directorySpec, details )
  rests.forEach ( r => templateFile ( `${javaQueriesPackages}/${queryClassName ( params, r )}.java`, 'templates/JavaQueryTemplate.java',
    {
      ...params,
      queriesClass: queryClassName ( params, r ),
      content: indentList ( makeJavaVariablesForGraphQlQuery ( [ r ] ) ).join ( "\n" )
    }, directorySpec, details ) )

  rests.forEach ( rest => writeToFile ( `${javaControllerRoot}/${restControllerName ( rest )}.java`, () => makeSpringEndpointsFor ( params, rest ), details ) )
  allMainPages ( pages ).map ( p => {
    Object.entries ( p.rest ).map ( ( [ name, rdp ] ) => {
      let tables = rdp.rest.tables;
      if ( !tables ) return
      detailsLog ( logLevel, 2, `Creating rest files for ${p.name} ${name}` )
      walkSqlRoots ( findSqlRoots ( tables ), ( root, path ) => {
        const ld = findSqlLinkDataFromRootAndDataD ( root, rdp.rest.dataDD )
        let fileName = sqlMapFileName ( javaDbPackages, p, name, path ) + ".java";
        console.log ( 'name:', fileName )
        writeToFile ( fileName, () => makeMapsForRest ( params, p, name, rdp.rest.dataDD, ld, path, root.children.length ) )
      } )
    } )
  } )

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