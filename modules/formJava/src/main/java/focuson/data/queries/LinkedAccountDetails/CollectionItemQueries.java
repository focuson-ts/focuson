package focuson.data.queries.LinkedAccountDetails;
public class CollectionItemQueries{
  public static  String state_cancelCollectionItem(String accountId,String clientRef,String paymentId){ 
    return"mutation{stateCollectionItemcancel(" + "accountId:" + "\"" + accountId + "\""  + "," + "clientRef:" + "\"" + clientRef + "\""  + "," + "paymentId:" + "\"" + paymentId + "\"" + ")}";
  }
  public static  String state_revalidateCollectionItem(String accountId,String clientRef,String paymentId){ 
    return"mutation{stateCollectionItemrevalidate(" + "accountId:" + "\"" + accountId + "\""  + "," + "clientRef:" + "\"" + clientRef + "\""  + "," + "paymentId:" + "\"" + paymentId + "\"" + ")}";
  }
}