package focuson.data.queries;
public class ListOccupationsQueries{
  public static  String getListOccupations(String customerId){ 
     return
  "query{getListOccupations(" + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    descTypeValue"+
        "    descTypeName"+
        "  }"
  +"}";}
}