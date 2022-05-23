import { SimpleDisplayComp } from "./common/componentsD";
import { loadFile } from "@focuson/files";
import process from "process";

export interface AppConfig {
  fetch: string;
  combine: SimpleDisplayComp;
  debug: any;
  versionNumber: string;
  tsPort: number;
  javaPort: number;}


export const javaOutputRoot = '../formJava'
export const tsRoot = "../formTs"
export const focusOnVersion: string = JSON.parse ( loadFile ( 'package.json' ) ).version

const MyCombineCD: SimpleDisplayComp = { import: "@focuson/form_components", name: "MyCombined" }

const details = JSON.parse ( loadFile ( 'project.details.json' ) ).details;
export const javaPort = details.javaPort
export const tsPort: number = details.tsPort
if ( !javaPort || !tsPort ) {
  console.log ( "exiting. please define javaPort and tsPort in the project.details file, in the details section" );
  process.exit ( 2 )
}
console.log ( "JavaPort is", javaPort, "tsPort is", tsPort )

export const devAppConfig: AppConfig = {
  javaPort,
  tsPort,
  versionNumber: '0.0.1',
  fetch: `fetchWithDelay ( 1, fetchWithPrefix ( 'http://localhost:${javaPort}', loggingFetchFn ) )`,
  combine: MyCombineCD,
  debug: { fetcherDebug: false, guardDebug: false, restDebug: false, selectedPageDebug: false,
    loadTreeDebug: false, showTracing: false,
    recordTrace: true, tagFetcherDebug: false, accordions: [] }
}

