package focuson.data.queries;
public class CreateEAccountDataDDQueries{
 public static  String createCreateEAccountDataDD(String accountId,String customerId){ 
    return
 "mutation{createCreateEAccountDataDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    name"+
       "    type"+
       "    savingsStyle"+
       "    initialAmount"+
       "  }"
 +"}";}
}