package focuson.data.queries;
public class OtherIncomeResponseQueries{
  public static  String getOtherIncomeResponse(String customerId){ 
     return
  "query{getOtherIncomeResponse(" + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    clientOtherIncomeSeq"+
        "    otherIncomeType"+
        "    incomeFreqRef"+
        "    amount"+
        "  }"
  +"}";}
  public static  String updateOtherIncomeResponse(String customerId, String obj){ 
     return
  "mutation{updateOtherIncomeResponse(" + "customerId:" + "\"" + customerId + "\""  + ", obj:" + obj + "){"+
        "    clientOtherIncomeSeq"+
        "    otherIncomeType"+
        "    incomeFreqRef"+
        "    amount"+
        "  }"
  +"}";}
}