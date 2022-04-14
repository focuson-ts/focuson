package focuson.data.queries;
public class ChequeCreditbooksQueries{
  public static  String getChequeCreditbooks(String accountId,String applRef,String brandRef,String customerId){ 
     return
  "query{getChequeCreditbooks(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    history{"+
        "      serialNumber"+
        "      howOrdered"+
        "      dateOrder"+
        "    }"+
        "  }"
  +"}";}
  public static  String createChequeCreditbooks(String accountId,String applRef,String brandRef,String customerId, String obj){ 
     return
  "mutation{createChequeCreditbooks(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "customerId:" + "\"" + customerId + "\""  + ", obj:" + obj + "){"+
        "    history{"+
        "      serialNumber"+
        "      howOrdered"+
        "      dateOrder"+
        "    }"+
        "  }"
  +"}";}
}