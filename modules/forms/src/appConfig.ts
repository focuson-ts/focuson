import { SimpleDisplayComp } from "./common/componentsD";
import { loadFile } from "@focuson/files";

export interface AppConfig {
  fetch: string;
  combine: SimpleDisplayComp;
  debug: any;
  versionNumber: string;
  tsPort: number;
  javaPort: number;
  makeSqlStrings?: boolean; //default true
  manualMaxTuples?: number
  delayBeforeMessagesRemoved?: number // if undefined will not remove messages
  mockJwt?: boolean
}

export const javaOutputRoot = '../formJava'
export const tsRoot = "../formTs"
export const focusOnVersion: string = JSON.parse ( loadFile ( 'package.json' ) ).version

const MyCombineCD: SimpleDisplayComp = { import: "@focuson/form_components", name: "MyCombined" }
let details: any = undefined;
try {
  details = JSON.parse ( loadFile ( 'package.details.json' ) ).details;
} catch ( e: any ) {
}
export const javaPort = details?.javaPort ? details.javaPort : 8080
export const tsPort: number = details?.tsPort ? details.tsPort : 3000

console.log ( "JavaPort is", javaPort, "tsPort is", tsPort )

export const devAppConfig: AppConfig = {
  javaPort,
  tsPort,
  versionNumber: '0.0.1',
  fetch: `loadingCursorFetch ( fetchWithDelay ( 500, fetchWithPrefix ( 'http://localhost:${javaPort}', loggingFetchFn ) ) )`,
  combine: MyCombineCD,
  debug: {
    fetcherDebug: false, guardDebug: false, restDebug: false, reduxDebug: false, selectedPageDebug: false,
    loadTreeDebug: false, showTracing: false, dateDebug: false,
    optionalsDebug: true,
    recordTrace: true, tagFetcherDebug: false, validityDebug: false, modalDebug: false, accordions: []
  },
  makeSqlStrings: true,
  delayBeforeMessagesRemoved: 60000,
  mockJwt: true
}

