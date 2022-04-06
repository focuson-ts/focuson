package focuson.data.queries;
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
        "  }"
  +"}";}
}