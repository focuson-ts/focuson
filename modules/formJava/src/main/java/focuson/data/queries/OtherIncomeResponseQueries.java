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
}