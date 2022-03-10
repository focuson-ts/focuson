import { copyFiles, DirectorySpec, templateFile, writeToFile } from "@focuson/files";
import { JavaWiringParams } from "../codegen/config";
import fs from "fs";
import { unique } from "../common/restD";
import { sortedEntries } from "@focuson/utils";
import { allMainPages, isMainPage, PageD, RestDefnInPageProperties } from "../common/pageD";
import { indentList } from "../codegen/codegen";
import { makeAllJavaVariableName } from "../codegen/makeSample";
import { fetcherInterfaceName, mockFetcherClassName, queryClassName, restControllerName } from "../codegen/names";
import { makeGraphQlSchema } from "../codegen/makeGraphQlTypes";
import { makeAllJavaWiring, makeJavaResolversInterface } from "../codegen/makeJavaResolvers";
import { makeAllMockFetchers } from "../codegen/makeMockFetchers";
import { makeJavaVariablesForGraphQlQuery } from "../codegen/makeGraphQlQuery";
import { makeSpringEndpointsFor } from "../codegen/makeSpringEndpoint";

export const makeJavaFiles = ( javaOutputRoot: string, params: JavaWiringParams, directorySpec: DirectorySpec ) => <B, G> ( pages: PageD<B, G>[] ) => {

  let javaRoot = javaOutputRoot + "/java"
  let javaAppRoot = javaOutputRoot + "/java/" + params.applicationName
  let javaScriptRoot = javaAppRoot + "/scripts"
  let javaCodeRoot = javaAppRoot + "/src/main/java/focuson/data"
  let javaResourcesRoot = javaAppRoot + "/src/main/resources"
  let javaFetcherRoot = javaCodeRoot + "/" + params.fetcherPackage
  let javaControllerRoot = javaCodeRoot + "/" + params.controllerPackage
  let javaMockFetcherRoot = javaCodeRoot + "/" + params.mockFetcherPackage
  let javaQueriesPackages = javaCodeRoot + "/" + params.queriesPackage

  fs.mkdirSync ( `${javaOutputRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaAppRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaCodeRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaResourcesRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaScriptRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaFetcherRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaMockFetcherRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaControllerRoot}`, { recursive: true } )
  fs.mkdirSync ( `${javaQueriesPackages}`, { recursive: true } )

// This isn't the correct aggregation... need to think about this. Multiple pages can ask for more. I think... we''ll have to refactor the structure
  console.log ( 'pages', pages.map ( p => p.name ) )
  console.log ( 'mainpages', allMainPages ( pages ).map ( p => p.name ) )
  let raw = allMainPages ( pages ).flatMap ( x => {
    console.log ( 'processing', x.name, Object.keys ( x.rest ) )
    return sortedEntries ( x.rest );
  } ).map ( ( x: [ string, RestDefnInPageProperties<G> ] ) => {
    console.log ( '    and', x[ 0 ], x[ 1 ].rest.dataDD.name )
    return x[ 1 ].rest;
  } );
  console.log ( 'raw', raw.map ( p => p.dataDD.name ) )
  let rests = unique ( raw, r => r.dataDD.name )
  console.log ( 'rests', rests.map ( r => r.dataDD.name ) )
  copyFiles ( javaScriptRoot, 'templates/scripts', directorySpec ) ( 'makeJava.sh', 'makeJvmPact.sh', 'template.java' )

  templateFile ( `${javaAppRoot}/pom.xml`, 'templates/mvnTemplate.pom', params, directorySpec )
  copyFiles ( javaAppRoot, 'templates/raw/java', directorySpec ) ( 'application.properties' )
  templateFile ( `${javaCodeRoot}/SchemaController.java`, 'templates/raw/java/SchemaController.java', params, directorySpec )
  templateFile ( `${javaControllerRoot}/Transform.java`, 'templates/Transform.java', params, directorySpec )
  copyFiles ( javaAppRoot, 'templates/raw', directorySpec ) ( '.gitignore' )
  copyFiles ( javaCodeRoot, 'templates/raw/java', directorySpec ) ( 'CorsConfig.java' )

  console.log ( 5 )

  writeToFile ( `${javaResourcesRoot}/${params.schema}`, makeGraphQlSchema ( rests ) )
  rests.forEach ( rest =>
    writeToFile ( `${javaCodeRoot}/${params.fetcherPackage}/${fetcherInterfaceName ( params, rest )}.java`, makeJavaResolversInterface ( params, rest ) )
  )
  writeToFile ( `${javaCodeRoot}/${params.wiringClass}.java`, makeAllJavaWiring ( params, rests, directorySpec ) )
  templateFile ( `${javaCodeRoot}/${params.applicationName}.java`, 'templates/JavaApplicationTemplate.java', params, directorySpec )
  rests.forEach ( restD => templateFile ( `${javaMockFetcherRoot}/${mockFetcherClassName ( params, restD )}.java`, 'templates/JavaFetcherClassTemplate.java',
    {
      ...params,
      fetcherInterface: fetcherInterfaceName ( params, restD ),
      fetcherClass: mockFetcherClassName ( params, restD ),
      thePackage: params.thePackage + "." + params.mockFetcherPackage,
      content: makeAllMockFetchers ( params, [ restD ] ).join ( "\n" )
    }, directorySpec ) )
  templateFile ( `${javaCodeRoot}/${params.sampleClass}.java`, 'templates/JavaSampleTemplate.java',
    { ...params, content: indentList ( makeAllJavaVariableName ( pages, 0 ) ).join ( "\n" ) }, directorySpec )
  rests.forEach ( r => templateFile ( `${javaQueriesPackages}/${queryClassName ( params, r )}.java`, 'templates/JavaQueryTemplate.java',
    {
      ...params,
      queriesClass: queryClassName ( params, r ),
      content: indentList ( makeJavaVariablesForGraphQlQuery ( [ r ] ) ).join ( "\n" )
    }, directorySpec ) )

  rests.forEach ( rest => writeToFile ( `${javaControllerRoot}/${restControllerName ( rest )}.java`, makeSpringEndpointsFor ( params, rest ) ) )
};