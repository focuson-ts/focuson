import { EAccountsSummaryPD } from "./example/eAccounts/eAccountsSummary.pageD";
import { loadFile } from "@focuson/files";
import { ETransferPageD } from "./example/eTransfers/eTransfers.pageD";
import { CreateEAccountPageD } from "./example/createEAccount/createEAccount.pageD";
import { ChequeCreditbooksPD } from "./example/chequeCreditBooks/chequeCreditBooks.pageD";
import { RepeatingPageD } from "./example/repeating/repeating.pageD";
import { PostCodeMainPage } from "./example/addressSearch/addressSearch.pageD";
import { SimpleDisplayComp } from "./common/componentsD";
import { ExampleMainPage } from "./example/common";
import { OccupationAndIncomeSummaryPD } from "./example/occupationAndIncome/occupationAndIncome.pageD";

export const generatedPages: ExampleMainPage[] = [
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

const MyCombineCD: SimpleDisplayComp = { import: "./copied/MyCombined", name: "MyCombined" }

export interface AppConfig {
  fetch: string;
  combine: SimpleDisplayComp;
  debug: any
}

export const devAppConfig = {
  fetch: "fetchWithDelay ( 1, fetchWithPrefix ( 'http://localhost:8080', loggingFetchFn ) )",
  combine: MyCombineCD,
  debug: { fetcherDebug: true, postDebug: true, Debug: true }
}

