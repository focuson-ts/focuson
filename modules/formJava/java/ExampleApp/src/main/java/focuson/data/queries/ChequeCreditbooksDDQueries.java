package focuson.data.queries;
public class ChequeCreditbooksDDQueries{
 public static  String getChequeCreditbooksDD(String accountId,String applRef,String brandRef,String customerId){ 
    return
 "query{getChequeCreditbooksDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    history{"+
       "      serialNumber"+
       "      howOrdered"+
       "      dateOrder"+
       "    }"+
       "  }"
 +"}";}
 public static  String createChequeCreditbooksDD(String accountId,String applRef,String brandRef,String customerId){ 
    return
 "mutation{createChequeCreditbooksDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    history{"+
       "      serialNumber"+
       "      howOrdered"+
       "      dateOrder"+
       "    }"+
       "  }"
 +"}";}
}