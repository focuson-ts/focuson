import { EAccountsSummaryPD } from "./example/eAccounts/eAccountsSummary.pageD";
import { loadFile } from "@focuson/files";
import { ETransferPageD } from "./example/eTransfers/eTransfers.pageD";
import { CreateEAccountPageD } from "./example/createEAccount/createEAccount.pageD";
import { CreatePlanPD } from "./example/eAccounts/createPlanPD";
import { ChequeCreditbooksPD, OrderChequeBookOrPayingInModalPD } from "./example/chequeCreditBooks/chequeCreditBooks.pageD";
import { OccupationAndIncomeSummaryPD, occupationIncomeModalPD } from "./example/occupationAndIncomeDetails/occupationAndIncome.pageD";
import { generate } from "./makeFiles/generate";
import *  as fse from "fs-extra";

let pages = [ OccupationAndIncomeSummaryPD, occupationIncomeModalPD,
  EAccountsSummaryPD, CreatePlanPD, ETransferPageD,
  CreateEAccountPageD,
  ChequeCreditbooksPD,
  OrderChequeBookOrPayingInModalPD ];
let javaOutputRoot = '../formJava'
let tsRoot = "../formTs"
const focusOnVersion: string = JSON.parse ( loadFile ( 'package.json' ) ).version

generate ( javaOutputRoot, tsRoot, focusOnVersion ) ( pages )

fse.copySync ('../formComponents/src', tsRoot + "/src/copied")


