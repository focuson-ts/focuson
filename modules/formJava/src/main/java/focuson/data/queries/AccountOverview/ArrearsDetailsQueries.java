package focuson.data.queries.AccountOverview;
public class ArrearsDetailsQueries{
  public static  String getArrearsDetails(String accountId,String customerId,String startDate){ 
     return
  "query{getArrearsDetails(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\""  + "," + "startDate:" + "\"" + startDate + "\"" + "){"+
        "    details{"+
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