package focuson.data.queries.AccountOverview;
public class AccountOverviewExcessInfoQueries{
  public static  String getAccountOverviewExcessInfo(String accountId,String applRef,String brandRef,String clientRef){ 
    return"query{getAccountOverviewExcessInfo(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\"" + "){"+
        "    dayOfCurrentExcess"+
        "    currentExcessOnAccount"+
        "    currentPctExcess"+
        "    dateOfLastCapitalization"+
        "    dateOfLastExcessFulfillment"+
        "  }"
  +"}";}
}