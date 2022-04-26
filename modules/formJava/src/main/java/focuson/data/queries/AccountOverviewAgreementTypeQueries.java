package focuson.data.queries;
public class AccountOverviewAgreementTypeQueries{
  public static  String getAccountOverviewAgreementType(String accountId,String customerId){ 
     return
  "query{getAccountOverviewAgreementType(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    agreementType"+
        "    transactionHeading"+
        "  }"
  +"}";}
}