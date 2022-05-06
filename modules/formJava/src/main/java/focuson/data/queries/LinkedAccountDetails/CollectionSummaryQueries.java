package focuson.data.queries.LinkedAccountDetails;
public class CollectionSummaryQueries{
  public static  String getCollectionSummary(String accountId,String clientRef){ 
    return"query{getCollectionSummary(" + "accountId:" + "\"" + accountId + "\""  + "," + "clientRef:" + "\"" + clientRef + "\"" + "){"+
        "    lastCollectionDate"+
        "    lastCollectionAmount"+
        "    nextCollectionDate"+
        "    nextCollectionAmount"+
        "  }"
  +"}";}
}