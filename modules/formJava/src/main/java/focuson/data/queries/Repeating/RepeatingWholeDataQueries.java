package focuson.data.queries.Repeating;
public class RepeatingWholeDataQueries{
  public static  String createRepeatingLine(String clientRef, String obj){ 
    return"mutation{createRepeatingLine(" + "clientRef:" + "\"" + clientRef + "\""  + ", obj:" + obj + "){"+
        "    name"+
        "    age"+
        "  }"
  +"}";}
  public static  String getRepeatingLine(String clientRef){ 
    return"query{getRepeatingLine(" + "clientRef:" + "\"" + clientRef + "\"" + "){"+
        "    name"+
        "    age"+
        "  }"
  +"}";}
}