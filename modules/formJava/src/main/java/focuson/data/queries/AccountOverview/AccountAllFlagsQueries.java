package focuson.data.queries.AccountOverview;
public class AccountAllFlagsQueries{
  public static  String getAccountAllFlags(String accountId,String applRef,String brandRef,String clientRef){ 
    return"query{getAccountAllFlags(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\"" + "){"+
        "    flags{"+
        "      flagName"+
        "      flagValue"+
        "    }"+
        "  }"
  +"}";}
}