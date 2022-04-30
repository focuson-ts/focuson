package focuson.data.queries.OccupationAndIncomeSummary;
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