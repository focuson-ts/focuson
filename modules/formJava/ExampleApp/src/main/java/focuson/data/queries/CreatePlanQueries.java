package focuson.data.queries;
public class CreatePlanQueries{
  public static  String getCreatePlan(String accountId,String createPlanId,String customerId){ 
     return
  "query{getCreatePlan(" + "accountId:" + "\"" + accountId + "\""  + "," + "createPlanId:" + "\"" + createPlanId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    createPlanStart"+
        "    createPlanDate"+
        "    createPlanEnd"+
        "  }"
  +"}";}
  public static  String createCreatePlan(String accountId,String customerId, String obj){ 
     return
  "mutation{createCreatePlan(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\""  + ", obj:" + obj + "){"+
        "    createPlanStart"+
        "    createPlanDate"+
        "    createPlanEnd"+
        "  }"
  +"}";}
  public static  String updateCreatePlan(String accountId,String createPlanId,String customerId, String obj){ 
     return
  "mutation{updateCreatePlan(" + "accountId:" + "\"" + accountId + "\""  + "," + "createPlanId:" + "\"" + createPlanId + "\""  + "," + "customerId:" + "\"" + customerId + "\""  + ", obj:" + obj + "){"+
        "    createPlanStart"+
        "    createPlanDate"+
        "    createPlanEnd"+
        "  }"
  +"}";}
  public static  String deleteCreatePlan(String accountId,String createPlanId,String customerId){ 
     return
  "mutation{deleteCreatePlan(" + "accountId:" + "\"" + accountId + "\""  + "," + "createPlanId:" + "\"" + createPlanId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    createPlanStart"+
        "    createPlanDate"+
        "    createPlanEnd"+
        "  }"
  +"}";}
  public static  String listCreatePlan(String accountId,String customerId){ 
     return
  "query{listCreatePlan(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    createPlanStart"+
        "    createPlanDate"+
        "    createPlanEnd"+
        "  }"
  +"}";}
}