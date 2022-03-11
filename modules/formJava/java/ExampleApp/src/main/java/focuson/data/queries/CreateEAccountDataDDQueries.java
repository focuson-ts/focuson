package focuson.data.queries;
public class CreateEAccountDataDDQueries{
  public static  String createCreateEAccountDataDD(String accountId,String customerId, String obj){ 
     return
  "mutation{createCreateEAccountDataDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\""  +  ", obj:" + obj + "){"+
        "    name"+
        "    type"+
        "    savingsStyle"+
        "    initialAmount"+
        "  }"
  +"}";}
  public static  String getCreateEAccountDataDD(String accountId,String createPlanId,String customerId){ 
     return
  "query{getCreateEAccountDataDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "createPlanId:" + "\"" + createPlanId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    name"+
        "    type"+
        "    savingsStyle"+
        "    initialAmount"+
        "  }"
  +"}";}
}