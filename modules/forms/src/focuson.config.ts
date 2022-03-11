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

export const generatedPages = [
  OccupationAndIncomeSummaryPD, occupationIncomeModalPD,
  otherSourcesOfIncomeModalPD, listOccupationsModalPD,
  EAccountsSummaryPD, CreatePlanPD, ETransferPageD,
  CreateEAccountPageD,
  ChequeCreditbooksPD,
  OrderChequeBookOrPayingInModalPD, RepeatingLinePageD, RepeatingPageD,
  PostCodeMainPage,PostCodeModalPage

];
export const javaOutputRoot = '../formJava'
export const tsRoot = "../formTs"
export const focusOnVersion: string = JSON.parse ( loadFile ( 'package.json' ) ).version