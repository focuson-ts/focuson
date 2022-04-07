package focuson.data.queries;
public class AdditionalInfoFirstQueries{
  public static  String getAdditionalInfoFirst(String customerId){ 
     return
  "query{getAdditionalInfoFirst(" + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    applicantName"+
        "    employerName"+
        "    addressLine1"+
        "    addressLine2"+
        "    addressLine3"+
        "    addressLine4"+
        "    postcode"+
        "  }"
  +"}";}
  public static  String updateAdditionalInfoFirst(String customerId, String obj){ 
     return
  "mutation{updateAdditionalInfoFirst(" + "customerId:" + "\"" + customerId + "\""  + ", obj:" + obj + "){"+
        "    applicantName"+
        "    employerName"+
        "    addressLine1"+
        "    addressLine2"+
        "    addressLine3"+
        "    addressLine4"+
        "    postcode"+
        "  }"
  +"}";}
}