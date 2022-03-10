package focuson.data.queries;
public class ChequeCreditbooksHistoryDDQueries{
  public static  String getChequeCreditbooksHistoryLineDD(String accountId,String applRef,String brandRef,String customerId){ 
     return
  "query{getChequeCreditbooksHistoryLineDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    serialNumber"+
        "    howOrdered"+
        "    dateOrder"+
        "  }"
  +"}";}
  public static  String createChequeCreditbooksHistoryLineDD(String accountId,String applRef,String brandRef,String customerId, String obj){ 
     return
  "mutation{createChequeCreditbooksHistoryLineDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "customerId:" + "\"" + customerId + "\""  +  ", obj:" + obj + "){"+
        "    serialNumber"+
        "    howOrdered"+
        "    dateOrder"+
        "  }"
  +"}";}
}