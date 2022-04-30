package focuson.data.queries.AccountOverview;
public class AccountOverviewHistoryQueries{
  public static  String getAccountOverviewHistory(String accountId,String customerId){ 
     return
  "query{getAccountOverviewHistory(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    history{"+
        "      start"+
        "      end"+
        "      consecutiveDays"+
        "    }"+
        "  }"
  +"}";}
}