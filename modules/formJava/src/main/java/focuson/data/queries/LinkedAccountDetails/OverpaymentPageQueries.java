package focuson.data.queries.LinkedAccountDetails;
public class OverpaymentPageQueries{
  public static  String getOverpaymentPage(String accountId,String clientRef){ 
    return"query{getOverpaymentPage(" + "accountId:" + "\"" + accountId + "\""  + "," + "clientRef:" + "\"" + clientRef + "\"" + "){"+
        "    history{"+
        "      amountReceived"+
        "      date"+
        "      status"+
        "    }"+
        "    drawDownDate"+
        "    initialBorrowing"+
        "  }"
  +"}";}
}