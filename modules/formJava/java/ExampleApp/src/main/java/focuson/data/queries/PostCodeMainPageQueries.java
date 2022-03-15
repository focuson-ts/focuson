package focuson.data.queries;
public class PostCodeMainPageQueries{
  public static  String createPostCodeMainPage(String obj){ 
     return
  "mutation{createPostCodeMainPage(" +  " obj:" + obj + "){"+
        "    name"+
        "    line1"+
        "    line2"+
        "    line3"+
        "    line4"+
        "    postcode"+
        "  }"
  +"}";}
}