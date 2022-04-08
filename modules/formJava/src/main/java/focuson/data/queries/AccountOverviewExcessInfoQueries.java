package focuson.data.queries;
public class AccountOverviewExcessInfoQueries{
  public static  String getAccountOverviewExcessInfo(String accountId,String customerId){ 
     return
  "query{getAccountOverviewExcessInfo(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    dayOfCurrentExcess"+
        "    currentExcessOnAccount"+
        "    currentPctExcess"+
        "    dateOfLastCapitalization"+
        "    dateOfLastExcessFulfillment"+
        "  }"
  +"}";}
}