import { copyFile, copyFiles, DirectorySpec, templateFile, writeToFile } from "@focuson/files";
import { JavaWiringParams } from "../codegen/config";
import fs from "fs";
import { unique } from "../common/restD";
import { detailsLog, GenerateLogLevel, NameAnd, safeArray, safeString, sortedEntries } from "@focuson/utils";
import { allMainPages, PageD, RestDefnInPageProperties } from "../common/pageD";
import { addStringToEndOfList, indentList } from "../codegen/codegen";
import { makeAllJavaVariableName } from "../codegen/makeSample";
import { createTableSqlName, fetcherInterfaceName, getSqlName, h2FetcherClassName, mockFetcherClassName, providerPactClassName, queryClassName, restControllerName, sqlMapFileName } from "../codegen/names";
import { makeGraphQlSchema } from "../codegen/makeGraphQlTypes";
import { makeAllJavaWiring, makeJavaResolversInterface } from "../codegen/makeJavaResolvers";
import { makeAllMockFetchers } from "../codegen/makeMockFetchers";
import { makeJavaVariablesForGraphQlQuery } from "../codegen/makeGraphQlQuery";
import { makeSpringEndpointsFor } from "../codegen/makeSpringEndpoint";
import { AppConfig } from "../focuson.config";
// import { findSqlRoot, makeCreateTableSql, makeGetSqlFor, makeSqlDataFor, walkRoots } from "../codegen/makeJavaSql.tsxxx";
import { createTableSql, findSqlLinkDataFromRootAndDataD, findSqlRoot, generateGetSql, makeMapsForRest, walkSqlRoots } from "../codegen/makeSqlFromEntities";
import { makeH2Fetchers } from "../codegen/makeH2Fetchers";
import { makePactValidation } from "../codegen/makePactValidation";


export const makeJavaFiles = ( logLevel: GenerateLogLevel, appConfig: AppConfig, javaOutputRoot: string, params: JavaWiringParams, directorySpec: DirectorySpec ) => <B, G> ( pages: PageD<B, G>[] ) => {
  //to help the readability of the writeFile/template files
  const details = logLevel === 'detailed' ? 2 : -1
  const minimal = logLevel === 'minimal' ? 2 : -1
  const overview = logLevel === 'overview' ? 2 : -1

  const javaAppRoot = javaOutputRoot
  const javaScriptRoot = javaAppRoot + "/scripts"
  const javaCodeRoot = javaAppRoot + `/src/main/java/${params.thePackage.replace ( ".", '/' )}`
  const javaTestRoot = javaAppRoot + `/src/test/java/${params.thePackage.replace ( ".", '/' )}`
  const javaResourcesRoot = javaAppRoot + "/src/main/resources"
  const javaFetcherRoot = javaCodeRoot + "/" + params.fetcherPackage
  const javaControllerRoot = javaCodeRoot + "/" + params.controllerPackage
  const javaMockFetcherRoot = javaCodeRoot + "/" + params.mockFetcherPackage
  const javaH2FetcherRoot = javaCodeRoot + "/" + params.h2FetcherPackage
  const javaQueriesPackages = javaCodeRoot + "/" + params.queriesPackage
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
  fs.mkdirSync ( `${javaDbPackages}`, { recursive: true } )

// This isn't the correct aggregation... need to think about this. Multiple pages can ask for more. I think... we''ll have to refactor the structure
  const raw = allMainPages ( pages ).flatMap ( x => sortedEntries ( x.rest ) ).map ( ( x: [ string, RestDefnInPageProperties<G> ] ) => x[ 1 ].rest );
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
  templateFile ( javaCodeRoot + "/IManyGraphQl.java", "templates/raw/java/IManyGraphQl.java", params, directorySpec )
  templateFile ( javaCodeRoot + "/CorsConfig.java", "templates/raw/java/CorsConfig.java", params, directorySpec )
  templateFile ( `${javaCodeRoot}/SchemaController.java`, 'templates/raw/java/SchemaController.java', params, directorySpec )
  templateFile ( `${javaControllerRoot}/Transform.java`, 'templates/Transform.java', params, directorySpec )
  templateFile ( `${javaFetcherRoot}/IFetcher.java`, 'templates/raw/java/IFetcher.java', params, directorySpec )


  const allRestDefns: RestDefnInPageProperties<G>[] = allMainPages ( pages ).flatMap ( p => sortedEntries ( p.rest ).map ( t => t[ 1 ] ) )

  const createTable: NameAnd<string[]> = createTableSql ( allRestDefns )
  // console.log ( JSON.stringify ( createTable, null, 2 ) )
  if ( Object.entries ( createTable ).length > 0 ) writeToFile ( `${javaResourcesRoot}/${createTableSqlName ()}.sql`, () => Object.values ( createTable ).flatMap ( addStringToEndOfList ( ";\n" ) ), details )

  writeToFile ( `${javaResourcesRoot}/${getSqlName ()}.sql`,
    () => rests.filter ( r => r.tables ).flatMap ( rest =>
      [ `--${safeString ( rest.namePrefix )} ${rest.dataDD.name} ${rest.url} ${JSON.stringify ( rest.params )}`,
        ...walkSqlRoots ( findSqlRoot ( rest.tables ), r =>
          generateGetSql ( findSqlLinkDataFromRootAndDataD ( r, rest.dataDD ) ) ).map ( addStringToEndOfList ( ';\n' ) ).flat () ] ), details )

  writeToFile ( `${javaResourcesRoot}/${params.schema}`, () => makeGraphQlSchema ( rests ), details )
  rests.forEach ( rest => {
      let fetcherFile = `${javaCodeRoot}/${params.fetcherPackage}/${fetcherInterfaceName ( params, rest )}.java`;
      writeToFile ( fetcherFile, () => makeJavaResolversInterface ( params, rest ), details )
    }
  )


  writeToFile ( `${javaCodeRoot}/${params.wiringClass}.java`, () => makeAllJavaWiring ( params, rests, directorySpec ), details )
  templateFile ( `${javaCodeRoot}/${params.applicationName}.java`, 'templates/JavaApplicationTemplate.java', params, directorySpec, details )
  rests.forEach ( restD => templateFile ( `${javaMockFetcherRoot}/${mockFetcherClassName ( params, restD )}.java`, 'templates/JavaFetcherClassTemplate.java',
    {
      ...params,
      fetcherInterface: fetcherInterfaceName ( params, restD ),
      fetcherClass: mockFetcherClassName ( params, restD ),
      content: makeAllMockFetchers ( params, [ restD ] ).join ( "\n" )
    }, directorySpec ) )

  allMainPages ( pages ).flatMap ( mainPage =>
    sortedEntries ( mainPage.rest ).forEach ( ( [ restName, rdp ] ) => {
      if ( rdp.rest.actions.indexOf ( 'get' ) < 0 ) return;
      if ( rdp.rest.tables === undefined ) return;
      writeToFile ( `${javaH2FetcherRoot}/${h2FetcherClassName ( params, rdp.rest )}.java`, () => makeH2Fetchers ( params, mainPage, restName, rdp ) )
    } )
  )

  let dataSql = allMainPages ( pages ).flatMap ( mainPage =>
    sortedEntries ( mainPage.rest ).flatMap ( ( [ restName, rdp ] ) => safeArray ( rdp.rest.initialSql ) ) );
  if ( dataSql.length > 0 )
    writeToFile ( `${javaResourcesRoot}/data.sql`, () => dataSql )
  else
    fs.rmSync ( `${javaResourcesRoot}/data.sql`, { force: true } )

  allMainPages ( pages ).forEach ( p => writeToFile ( `${javaTestRoot}/${providerPactClassName(p)}.java`, () => makePactValidation ( params, appConfig.javaPort, p ) ) )


  templateFile ( `${javaCodeRoot}/${params.sampleClass}.java`, 'templates/JavaSampleTemplate.java',
    { ...params, content: indentList ( makeAllJavaVariableName ( pages, 0 ) ).join ( "\n" ) }, directorySpec, details )
  rests.forEach ( r => templateFile ( `${javaQueriesPackages}/${queryClassName ( params, r )}.java`, 'templates/JavaQueryTemplate.java',
    {
      ...params,
      queriesClass: queryClassName ( params, r ),
      content: indentList ( makeJavaVariablesForGraphQlQuery ( [ r ] ) ).join ( "\n" )
    }, directorySpec, details ) )

  allMainPages ( pages ).map ( p => {
    Object.entries ( p.rest ).map ( ( [ name, rdp ] ) => {
      writeToFile ( `${javaControllerRoot}/${restControllerName ( rdp.rest )}.java`, () => makeSpringEndpointsFor ( params, p, name, rdp.rest ), details )
      let tables = rdp.rest.tables;
      if ( !tables ) return
      detailsLog ( logLevel, 2, `Creating rest files for ${p.name} ${name}` )
      walkSqlRoots ( findSqlRoot ( tables ), ( root, path ) => {
        const ld = findSqlLinkDataFromRootAndDataD ( root, rdp.rest.dataDD )
        let fileName = sqlMapFileName ( javaDbPackages, p, name, path ) + ".java";
        console.log ( 'name:', fileName )
        writeToFile ( fileName, () => makeMapsForRest ( params, p, name, rdp.rest, ld, path, root.children.length ) )
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