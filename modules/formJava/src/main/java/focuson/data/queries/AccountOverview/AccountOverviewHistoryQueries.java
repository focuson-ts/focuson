package focuson.data.queries.AccountOverview;
public class AccountOverviewHistoryQueries{
  public static  String getAccountOverviewHistory(String accountId,String applRef,String brandRef,String clientRef){ 
    return"query{getAccountOverviewHistory(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\"" + "){"+
        "    history{"+
        "      start"+
        "      end"+
        "      consecutiveDays"+
        "    }"+
        "  }"
  +"}";}
}