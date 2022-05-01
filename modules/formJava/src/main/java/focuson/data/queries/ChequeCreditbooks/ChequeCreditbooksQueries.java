package focuson.data.queries.ChequeCreditbooks;
public class ChequeCreditbooksQueries{
  public static  String getChequeCreditbooks(String accountId,String applRef,String brandRef,String customerId){ 
    return"query{getChequeCreditbooks(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    history{"+
        "      serialNumber"+
        "      howOrdered"+
        "      dateOrder"+
        "    }"+
        "  }"
  +"}";}
  public static  String state_createChequeCreditbooks(String accountId,String applRef,String brandRef,String customerId){ 
    return"mutation{stateChequeCreditbookscreate(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + ")}";
  }
}