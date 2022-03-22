package focuson.data.queries;
public class ArrearsDetailsQueries{
  public static  String getArrearsDetails(String accountId,String customerId,String startDate){ 
     return
  "query{getArrearsDetails(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\""  + "," + "startDate:" + "\"" + startDate + "\"" + "){"+
        "    history{"+
        "      collectionsDate"+
        "      creditedDate"+
        "      minPayment"+
        "      contractualAmount"+
        "      paymentType"+
        "      paymentReceived"+
        "      shortfall"+
        "      arrearsTotal"+
        "      missedPayments"+
        "    }"+
        "  }"
  +"}";}
}