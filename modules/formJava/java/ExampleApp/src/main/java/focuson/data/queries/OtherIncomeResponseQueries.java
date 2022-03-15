package focuson.data.queries;
public class OtherIncomeResponseQueries{
  public static  String getOtherIncomeResponse(String accountSeq,String applicationRef,String brandRef,String vbAccountSeq,String vbAccountType){ 
     return
  "query{getOtherIncomeResponse(" + "accountSeq:" + "\"" + accountSeq + "\""  + "," + "applicationRef:" + "\"" + applicationRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "vbAccountSeq:" + "\"" + vbAccountSeq + "\""  + "," + "vbAccountType:" + "\"" + vbAccountType + "\"" + "){"+
        "    clientOtherIncomeSeq"+
        "    otherIncomeType"+
        "    incomeFreqRef"+
        "    amount"+
        "  }"
  +"}";}
}