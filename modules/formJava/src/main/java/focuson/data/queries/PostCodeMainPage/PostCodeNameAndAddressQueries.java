package focuson.data.queries.PostCodeMainPage;
public class PostCodeNameAndAddressQueries{
  public static  String createPostCodeNameAndAddress(String obj){ 
    return"mutation{createPostCodeNameAndAddress(" +  " obj:" + obj + "){"+
        "    name"+
        "    line1"+
        "    line2"+
        "    line3"+
        "    line4"+
        "    postcode"+
        "  }"
  +"}";}
}