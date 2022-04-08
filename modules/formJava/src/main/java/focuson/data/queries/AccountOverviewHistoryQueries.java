package focuson.data.queries;
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