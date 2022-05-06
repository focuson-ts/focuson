package focuson.data.queries.ChequeCreditbooks;
public class ChequeCreditbooksQueries{
  public static  String getChequeCreditbooks(String accountId,String applRef,String brandRef,String clientRef){ 
    return"query{getChequeCreditbooks(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\"" + "){"+
        "    history{"+
        "      serialNumber"+
        "      howOrdered"+
        "      dateOrder"+
        "    }"+
        "  }"
  +"}";}
  public static  String createChequeCreditbooks(String accountId,String applRef,String brandRef,String clientRef, String obj){ 
    return"mutation{createChequeCreditbooks(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\""  + ", obj:" + obj + "){"+
        "    history{"+
        "      serialNumber"+
        "      howOrdered"+
        "      dateOrder"+
        "    }"+
        "  }"
  +"}";}
  public static  String state_cancelChequeCreditbooks(String accountId,String applRef,String brandRef,String clientRef){ 
    return"mutation{stateChequeCreditbookscancel(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\"" + ")}";
  }
}