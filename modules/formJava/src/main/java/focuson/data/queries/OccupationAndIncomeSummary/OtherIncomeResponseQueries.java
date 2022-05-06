package focuson.data.queries.OccupationAndIncomeSummary;
public class OtherIncomeResponseQueries{
  public static  String getOtherIncomeResponse(String accountId,String applRef,String brandRef,String clientRef){ 
    return"query{getOtherIncomeResponse(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\"" + "){"+
        "    clientOtherIncomeSeq"+
        "    otherIncomeType"+
        "    incomeFreqRef"+
        "    amount"+
        "  }"
  +"}";}
}