package focuson.data.queries.LinkedAccountDetails;
public class CreatePaymentQueries{
  public static  String createCreatePayment(String accountId,String clientRef,String paymentId, String obj){ 
    return"mutation{createCreatePayment(" + "accountId:" + "\"" + accountId + "\""  + "," + "clientRef:" + "\"" + clientRef + "\""  + "," + "paymentId:" + "\"" + paymentId + "\""  + ", obj:" + obj + "){"+
        "    amount"+
        "    collectionDate"+
        "    reason"+
        "    allowance"+
        "    period"+
        "  }"
  +"}";}
}