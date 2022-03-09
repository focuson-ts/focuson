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
}