package focuson.data.queries;
public class PostCodeDataQueries{
  public static  String getpostCodeDataLine(String postcode){ 
     return
  "query{getpostCodeDataLine(" + "postcode:" + "\"" + postcode + "\"" + "){"+
        "    line1"+
        "    line2"+
        "    line3"+
        "    line4"+
        "  }"
  +"}";}
}