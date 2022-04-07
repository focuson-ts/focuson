package focuson.data.queries;
public class AdditionalInformationQueries{
  public static  String getAdditionalInformation(String customerId){ 
     return
  "query{getAdditionalInformation(" + "customerId:" + "\"" + customerId + "\"" + "){"+
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