package focuson.data.queries.PostCodeMainPage;
public class PostCodeSearchResponseQueries{
  public static  String getPostCodeDataLine(String dbName,String postcode){ 
    return"query{getPostCodeDataLine(" + "dbName:" + "\"" + dbName + "\""  + "," + "postcode:" + "\"" + postcode + "\"" + "){"+
        "    line1"+
        "    line2"+
        "    line3"+
        "    line4"+
        "  }"
  +"}";}
}