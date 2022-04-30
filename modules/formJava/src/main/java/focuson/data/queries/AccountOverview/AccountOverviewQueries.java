package focuson.data.queries.AccountOverview;
public class AccountOverviewQueries{
  public static  String getAccountOverview(String accountId,String customerId){ 
     return
  "query{getAccountOverview(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    score"+
        "    accountType"+
        "    drawDownDate"+
        "    repaymentDate"+
        "    propertyValue"+
        "    mul"+
        "    drawDownAmount"+
        "    criteria{"+
        "      criteria"+
        "    }"+
        "    zFlagSet"+
        "    excessSixMonths"+
        "    bouncedDDs12Months"+
        "    unpaidCardOrMisuseItems"+
        "    currentBalance"+
        "    currentInterestRate"+
        "    facilities{"+
        "      facilities{"+
        "        facility"+
        "        changeDate"+
        "        unApproved"+
        "        reason"+
        "        amount"+
        "      }"+
        "    }"+
        "    highBalance"+
        "    lowBalance"+
        "    pctOfFacility"+
        "    eightyPctFacility"+
        "    eightyFivePctFacility"+
        "  }"
  +"}";}
}