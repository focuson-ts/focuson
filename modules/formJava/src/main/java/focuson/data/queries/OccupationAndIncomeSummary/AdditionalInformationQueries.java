package focuson.data.queries.OccupationAndIncomeSummary;
public class AdditionalInformationQueries{
  public static  String getAdditionalInformation(String accountId,String applRef,String brandRef,String clientRef){ 
    return"query{getAdditionalInformation(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\"" + "){"+
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