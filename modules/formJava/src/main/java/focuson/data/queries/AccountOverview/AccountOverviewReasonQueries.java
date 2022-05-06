package focuson.data.queries.AccountOverview;
public class AccountOverviewReasonQueries{
  public static  String getAccountOverviewReason(String accountId,String applRef,String brandRef,String clientRef){ 
    return"query{getAccountOverviewReason(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\"" + "){"+
        "    reason"+
        "  }"
  +"}";}
}