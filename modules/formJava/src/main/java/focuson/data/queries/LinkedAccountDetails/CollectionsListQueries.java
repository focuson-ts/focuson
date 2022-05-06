package focuson.data.queries.LinkedAccountDetails;
public class CollectionsListQueries{
  public static  String getCollectionItem(String accountId,String clientRef){ 
    return"query{getCollectionItem(" + "accountId:" + "\"" + accountId + "\""  + "," + "clientRef:" + "\"" + clientRef + "\"" + "){"+
        "    paymentId"+
        "    collectionDate"+
        "    amount"+
        "    status"+
        "  }"
  +"}";}
}