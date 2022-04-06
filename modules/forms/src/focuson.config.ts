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
import { HelloWorldMainPage } from "./example/helloWorld/helloWorld.pageD";
import * as process from "process";


export const generatedPages: ExampleMainPage[] = [
  HelloWorldMainPage,
  AccountOverviewMainPage,
  JointAccountPageD,
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

export interface AppConfig {
  fetch: string;
  combine: SimpleDisplayComp;
  debug: any
}

export const devAppConfig = {
  fetch: "fetchWithDelay ( 1, fetchWithPrefix ( 'http://localhost:8080', loggingFetchFn ) )",
  combine: MyCombineCD,
  debug: { fetcherDebug: true, restDebug: false, selectedPageDebug: false, loadTreeDebug: false, showTracing: false, recordTrace: true }
}

