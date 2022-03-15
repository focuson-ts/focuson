import { EAccountsSummaryPD } from "./example/eAccounts/eAccountsSummary.pageD";
import { loadFile } from "@focuson/files";
import { ETransferPageD } from "./example/eTransfers/eTransfers.pageD";
import { CreateEAccountPageD } from "./example/createEAccount/createEAccount.pageD";
import { CreatePlanPD } from "./example/eAccounts/createPlanPD";
import { ChequeCreditbooksPD, OrderChequeBookOrPayingInModalPD } from "./example/chequeCreditBooks/chequeCreditBooks.pageD";
import { listOccupationsModalPD, OccupationAndIncomeSummaryPD, occupationIncomeModalPD, otherSourcesOfIncomeModalPD } from "./example/occupationAndIncomeDetails/occupationAndIncome.pageD";
import { generate } from "./makeFiles/generate";
import *  as fse from "fs-extra";
import { RepeatingLinePageD, RepeatingPageD } from "./example/repeating/repeating.pageD";
import { PostCodeMainPage, PostCodeModalPage } from "./example/addressSearch/addressSearch.pageD";
import { SimpleDisplayComp } from "./common/componentsD";
import { MainPageD } from "./common/pageD";
import { ExampleMainPage } from "./example/common";

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

