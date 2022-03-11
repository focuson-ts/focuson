package focuson.data.queries;
public class OtherIncomeResponseDDQueries{
  public static  String getOtherIncomeResponseDD(String accountSeq,String applicationRef,String brandRef,String vbAccountSeq,String vbAccountType){ 
     return
  "query{getOtherIncomeResponseDD(" + "accountSeq:" + "\"" + accountSeq + "\""  + "," + "applicationRef:" + "\"" + applicationRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "vbAccountSeq:" + "\"" + vbAccountSeq + "\""  + "," + "vbAccountType:" + "\"" + vbAccountType + "\"" + "){"+
        "    clientOtherIncomeSeq"+
        "    otherIncomeType"+
        "    incomeFreqRef"+
        "    amount"+
        "  }"
  +"}";}
}