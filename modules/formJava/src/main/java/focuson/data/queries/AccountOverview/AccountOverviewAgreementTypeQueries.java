package focuson.data.queries.AccountOverview;
public class AccountOverviewAgreementTypeQueries{
  public static  String getAccountOverviewAgreementType(String accountId,String applRef,String brandRef,String clientRef){ 
    return"query{getAccountOverviewAgreementType(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\"" + "){"+
        "    agreementType"+
        "    transactionHeading"+
        "  }"
  +"}";}
}