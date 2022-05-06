package focuson.data.queries.EAccountsSummary;
public class CreatePlanQueries{
  public static  String getCreatePlan(String accountId,String applRef,String brandRef,String clientRef,String createPlanId){ 
    return"query{getCreatePlan(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\""  + "," + "createPlanId:" + "\"" + createPlanId + "\"" + "){"+
        "    createPlanStart"+
        "    createPlanDate"+
        "    createPlanEnd"+
        "  }"
  +"}";}
  public static  String createCreatePlan(String accountId,String applRef,String brandRef,String clientRef, String obj){ 
    return"mutation{createCreatePlan(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\""  + ", obj:" + obj + "){"+
        "    createPlanStart"+
        "    createPlanDate"+
        "    createPlanEnd"+
        "  }"
  +"}";}
  public static  String updateCreatePlan(String accountId,String applRef,String brandRef,String clientRef,String createPlanId, String obj){ 
    return"mutation{updateCreatePlan(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\""  + "," + "createPlanId:" + "\"" + createPlanId + "\""  + ", obj:" + obj + "){"+
        "    createPlanStart"+
        "    createPlanDate"+
        "    createPlanEnd"+
        "  }"
  +"}";}
  public static  String deleteCreatePlan(String accountId,String applRef,String brandRef,String clientRef,String createPlanId){ 
    return"mutation{deleteCreatePlan(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\""  + "," + "createPlanId:" + "\"" + createPlanId + "\"" + ")}";
  }
}