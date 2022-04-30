package focuson.data.queries.AccountOverview;
public class AccountOverviewAgreementTypeQueries{
  public static  String getAccountOverviewAgreementType(String accountId,String customerId){ 
     return
  "query{getAccountOverviewAgreementType(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    agreementType"+
        "    transactionHeading"+
        "  }"
  +"}";}
}