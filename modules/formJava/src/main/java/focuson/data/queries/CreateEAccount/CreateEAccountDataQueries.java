package focuson.data.queries.CreateEAccount;
public class CreateEAccountDataQueries{
  public static  String createCreateEAccountData(String accountId,String customerId, String obj){ 
    return"mutation{createCreateEAccountData(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\""  + ", obj:" + obj + "){"+
        "    name"+
        "    type"+
        "    savingsStyle"+
        "    initialAmount"+
        "  }"
  +"}";}
  public static  String getCreateEAccountData(String accountId,String createPlanId,String customerId){ 
    return"query{getCreateEAccountData(" + "accountId:" + "\"" + accountId + "\""  + "," + "createPlanId:" + "\"" + createPlanId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    name"+
        "    type"+
        "    savingsStyle"+
        "    initialAmount"+
        "  }"
  +"}";}
}