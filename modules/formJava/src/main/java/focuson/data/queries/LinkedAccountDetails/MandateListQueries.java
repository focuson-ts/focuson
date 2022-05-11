package focuson.data.queries.LinkedAccountDetails;
public class MandateListQueries{
  public static  String getMandate(String clientRef){ 
    return"query{getMandate(" + "clientRef:" + "\"" + clientRef + "\"" + "){"+
        "    sortCode"+
        "    accountId"+
        "    mandateStatus"+
        "    bankName"+
        "    accountName"+
        "    mandateRef"+
        "  }"
  +"}";}
}