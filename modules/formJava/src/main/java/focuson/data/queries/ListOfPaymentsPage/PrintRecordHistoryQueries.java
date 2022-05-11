package focuson.data.queries.ListOfPaymentsPage;
public class PrintRecordHistoryQueries{
  public static  String getPrintRecordItem(String accountId){ 
    return"query{getPrintRecordItem(" + "accountId:" + "\"" + accountId + "\"" + "){"+
        "    requestedBy"+
        "    requesterDetails{"+
        "      title"+
        "      forename"+
        "      surname"+
        "      addressLine1"+
        "      addressLine2"+
        "      addressLine3"+
        "      addressLine4"+
        "      postcode"+
        "      phone"+
        "      fax"+
        "    }"+
        "    listOfPayments{"+
        "      standingOrders{"+
        "        shouldPrint"+
        "        numberOfItems"+
        "      }"+
        "      openBankingStandingOrders{"+
        "        shouldPrint"+
        "        numberOfItems"+
        "      }"+
        "      directDebits{"+
        "        shouldPrint"+
        "        numberOfItems"+
        "      }"+
        "      billPayments{"+
        "        shouldPrint"+
        "        numberOfItems"+
        "      }"+
        "      openBanking{"+
        "        shouldPrint"+
        "        numberOfItems"+
        "      }"+
        "    }"+
        "    includeSingleAndInitialDirectDebits"+
        "    authorisedByCustomer"+
        "  }"
  +"}";}
}