package focuson.data.queries.AccountOverview;
public class AccountAllFlagsQueries{
  public static  String getAccountAllFlags(String accountId,String customerId){ 
    return"query{getAccountAllFlags(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    flags{"+
        "      flagName"+
        "      flagValue"+
        "    }"+
        "  }"
  +"}";}
}