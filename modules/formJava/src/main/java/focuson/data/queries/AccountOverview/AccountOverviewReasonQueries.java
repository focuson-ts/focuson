package focuson.data.queries.AccountOverview;
public class AccountOverviewReasonQueries{
  public static  String getAccountOverviewReason(String accountId,String customerId){ 
     return
  "query{getAccountOverviewReason(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    reason"+
        "  }"
  +"}";}
}