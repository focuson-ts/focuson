package focuson.data.queries.AccountOverview;
public class AccountOverviewQueries{
  public static  String getAccountOverview(String accountId,String applRef,String brandRef,String clientRef){ 
    return"query{getAccountOverview(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\"" + "){"+
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