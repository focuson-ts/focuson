package focuson.data.queries;
public class PostCodeDataQueries{
  public static  String getpostCodeDataLine(String customerId){ 
     return
  "query{getpostCodeDataLine(" + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    line1"+
        "    line2"+
        "    line3"+
        "    line4"+
        "  }"
  +"}";}
}