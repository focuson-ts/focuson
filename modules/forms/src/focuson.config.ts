import { ExampleMainPage, ExampleRefD } from "./example/common";
import { EAccountsSummaryPD } from "./example/eAccounts/eAccountsSummary.pageD";
import { ETransferPageD } from "./example/eTransfers/eTransfers.pageD";
import { CreateEAccountPageD } from "./example/createEAccount/createEAccount.pageD";
import { ChequeCreditbooksPD } from "./example/chequeCreditBooks/chequeCreditBooks.pageD";
import { RepeatingPageD } from "./example/repeating/repeating.pageD";
import { PostCodeMainPage } from "./example/postCodeDemo/addressSearch.pageD";
import { OccupationAndIncomeSummaryPD } from "./example/occupationAndIncome/occupationAndIncome.pageD";
import { AccountOverviewMainPage } from "./example/accountOverview/accountOverview.pageD";
import { JointAccountPageD } from "./example/jointAccount/jointAccount.pageD";
import { HelloWorldPage } from "./example/HelloWorld/helloWorld.pageD";
import { LinkedAccountDetailsPD } from "./example/linkedAccount/linkedAccountDetails.pageD";
import { ListOfPaymentsPagePD } from "./example/ListOfPayments/listOfPayements.pageD";
import { PaymentsPageD } from "./example/payments/payments.pageD";
import { AuthoriseChargesPD } from "./example/authoriseCharges/authoriseCharges.pageD";
import { OverpaymentMainPage } from "./example/overpaymentHistory/overpaymentHistory.pageD";
import { OnChangePageD } from "./example/onChange/onChange.pageD";
import { FourOhFourPageD } from "./example/FourOhFour/FourOhFour.pageD";
import { EnabledByPageD } from "./example/enabledBy/enabledBy.pageD";
import { ReadOnlyPageD } from "./example/readonly/readOnly.pageD";
import { DatesPageD } from "./example/dates/dates.pageD";
import { wizardPD } from "./example/wizard/wizard.pageD";

import { ButtonsPageD } from "./example/buttons/buttonsPageD";
import { dateInfoRefD, dateRefconfig } from "./common/dateInfoRefD";
import { CreditAC, DirectDebitAC } from "./example/authoriseCharges/authoriseCharges.customise";
import { modalPagePD } from "./example/modalPages/modalPages.pageD";
import { resolversRefD } from "./example/resolvers/resolvers.refD";

export const generatedRefs: ExampleRefD[] = [ dateInfoRefD ( dateRefconfig ) , resolversRefD]

export const generatedPages: ExampleMainPage[] = [
  ButtonsPageD,
  modalPagePD,
  DatesPageD,
  wizardPD,
  EnabledByPageD,
  ReadOnlyPageD,
  FourOhFourPageD,
  OnChangePageD,
  HelloWorldPage,
  AuthoriseChargesPD ( DirectDebitAC ),
  AuthoriseChargesPD ( CreditAC ),
  PaymentsPageD,
  ListOfPaymentsPagePD,
  LinkedAccountDetailsPD,
  OverpaymentMainPage,
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
