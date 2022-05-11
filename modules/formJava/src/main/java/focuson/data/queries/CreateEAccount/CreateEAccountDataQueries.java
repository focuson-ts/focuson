package focuson.data.queries.CreateEAccount;
public class CreateEAccountDataQueries{
  public static  String createCreateEAccountData(String accountId,String applRef,String brandRef,String clientRef, String obj){ 
    return"mutation{createCreateEAccountData(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\""  + ", obj:" + obj + "){"+
        "    name"+
        "    type"+
        "    savingsStyle"+
        "    initialAmount"+
        "  }"
  +"}";}
  public static  String getCreateEAccountData(String accountId,String applRef,String brandRef,String clientRef,String createPlanId){ 
    return"query{getCreateEAccountData(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\""  + "," + "createPlanId:" + "\"" + createPlanId + "\"" + "){"+
        "    name"+
        "    type"+
        "    savingsStyle"+
        "    initialAmount"+
        "  }"
  +"}";}
}