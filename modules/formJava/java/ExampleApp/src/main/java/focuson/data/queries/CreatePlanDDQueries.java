package focuson.data.queries;
public class CreatePlanDDQueries{
 public static  String getCreatePlanDD(String accountId,String createPlanId,String customerId){ 
    return
 "query{getCreatePlanDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "createPlanId:" + "\"" + createPlanId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    createPlanStart"+
       "    createPlanDate"+
       "    createPlanEnd"+
       "  }"
 +"}";}
 public static  String createCreatePlanDD(String accountId,String customerId){ 
    return
 "mutation{createCreatePlanDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    createPlanStart"+
       "    createPlanDate"+
       "    createPlanEnd"+
       "  }"
 +"}";}
 public static  String updateCreatePlanDD(String accountId,String createPlanId,String customerId){ 
    return
 "mutation{updateCreatePlanDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "createPlanId:" + "\"" + createPlanId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    createPlanStart"+
       "    createPlanDate"+
       "    createPlanEnd"+
       "  }"
 +"}";}
 public static  String deleteCreatePlanDD(String accountId,String createPlanId,String customerId){ 
    return
 "mutation{deleteCreatePlanDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "createPlanId:" + "\"" + createPlanId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    createPlanStart"+
       "    createPlanDate"+
       "    createPlanEnd"+
       "  }"
 +"}";}
 public static  String listCreatePlanDD(String accountId,String customerId){ 
    return
 "query{listCreatePlanDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    createPlanStart"+
       "    createPlanDate"+
       "    createPlanEnd"+
       "  }"
 +"}";}
}