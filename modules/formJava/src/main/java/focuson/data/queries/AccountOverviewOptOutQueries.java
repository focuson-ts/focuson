package focuson.data.queries;
public class AccountOverviewOptOutQueries{
  public static  String getAccountOverviewOptOut(String accountId,String customerId){ 
     return
  "query{getAccountOverviewOptOut(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    optOut{"+
        "      optedOut"+
        "      addrLine5"+
        "      changedBy"+
        "      changedDate"+
        "    }"+
        "  }"
  +"}";}
}