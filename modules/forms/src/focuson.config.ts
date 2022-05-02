import { EAccountsSummaryPD } from "./example/eAccounts/eAccountsSummary.pageD";
import { loadFile } from "@focuson/files";
import { ETransferPageD } from "./example/eTransfers/eTransfers.pageD";
import { CreateEAccountPageD } from "./example/createEAccount/createEAccount.pageD";
import { ChequeCreditbooksPD } from "./example/chequeCreditBooks/chequeCreditBooks.pageD";
import { RepeatingPageD } from "./example/repeating/repeating.pageD";
import { PostCodeMainPage } from "./example/postCodeDemo/addressSearch.pageD";
import { SimpleDisplayComp } from "./common/componentsD";
import { ExampleMainPage } from "./example/common";
import { OccupationAndIncomeSummaryPD } from "./example/occupationAndIncome/occupationAndIncome.pageD";
import { AccountOverviewMainPage } from "./example/accountOverview/accountOverview.pageD";
import { JointAccountPageD } from "./example/jointAccount/jointAccount.pageD";
import { HelloWorldPage } from "./example/HelloWorld/helloWorld.pageD";
import * as process from "process";
import { AppConfig } from "./appConfig";


export const generatedPages: ExampleMainPage[] = [
  HelloWorldPage,
  AccountOverviewMainPage,
  JointAccountPageD,
  // MainOccupationDetailsPageSummaryPD,
  OccupationAndIncomeSummaryPD,
  EAccountsSummaryPD,
  ETransferPageD,
  CreateEAccountPageD,
  ChequeCreditbooksPD,
  RepeatingPageD,
  PostCodeMainPage ];

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
  debug: { fetcherDebug: true, restDebug: false, selectedPageDebug: false, loadTreeDebug: false, showTracing: false, recordTrace: true, accordions: []}
}

