import { EAccountsSummaryPD } from "./example/eAccounts/eAccountsSummary.pageD";
import { ETransferPageD } from "./example/eTransfers/eTransfers.pageD";
import { CreateEAccountPageD } from "./example/createEAccount/createEAccount.pageD";
import { ChequeCreditbooksPD } from "./example/chequeCreditBooks/chequeCreditBooks.pageD";
import { RepeatingPageD } from "./example/repeating/repeating.pageD";
import { PostCodeMainPage } from "./example/postCodeDemo/addressSearch.pageD";
import { ExampleMainPage } from "./example/common";
import { OccupationAndIncomeSummaryPD } from "./example/occupationAndIncome/occupationAndIncome.pageD";
import { AccountOverviewMainPage } from "./example/accountOverview/accountOverview.pageD";
import { JointAccountPageD } from "./example/jointAccount/jointAccount.pageD";
import { HelloWorldPage } from "./example/HelloWorld/helloWorld.pageD";
import { LinkedAccountDetailsPD } from "./example/linkedAccount/linkedAccountDetails.pageD";
import { ListOfPaymentsPagePD } from "./example/ListOfPayments/listOfPayements.pageD";


export const generatedPages: ExampleMainPage[] = [
  HelloWorldPage,
  ListOfPaymentsPagePD,
  LinkedAccountDetailsPD,
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
