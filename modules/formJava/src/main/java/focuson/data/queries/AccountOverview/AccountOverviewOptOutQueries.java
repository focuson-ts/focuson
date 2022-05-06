package focuson.data.queries.AccountOverview;
public class AccountOverviewOptOutQueries{
  public static  String getAccountOverviewOptOut(String accountId,String applRef,String brandRef,String clientRef){ 
    return"query{getAccountOverviewOptOut(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\"" + "){"+
        "    optOut{"+
        "      optedOut"+
        "      addrLine5"+
        "      changedBy"+
        "      changedDate"+
        "    }"+
        "  }"
  +"}";}
}