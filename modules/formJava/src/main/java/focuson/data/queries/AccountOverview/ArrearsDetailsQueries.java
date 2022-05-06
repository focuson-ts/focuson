package focuson.data.queries.AccountOverview;
public class ArrearsDetailsQueries{
  public static  String getArrearsDetails(String accountId,String applRef,String brandRef,String clientRef,String startDate){ 
    return"query{getArrearsDetails(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\""  + "," + "startDate:" + "\"" + startDate + "\"" + "){"+
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