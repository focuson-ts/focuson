package focuson.data.queries;
public class RepeatingWholeDataQueries{
  public static  String createRepeatingLine(String customerId, String obj){ 
     return
  "mutation{createRepeatingLine(" + "customerId:" + "\"" + customerId + "\""  + ", obj:" + obj + "){"+
        "    name"+
        "    age"+
        "  }"
  +"}";}
  public static  String getRepeatingLine(String customerId){ 
     return
  "query{getRepeatingLine(" + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    name"+
        "    age"+
        "  }"
  +"}";}
}