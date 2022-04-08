package focuson.data.queries;
public class EAccountsSummaryQueries{
  public static  String getEAccountsSummary(String accountId,String customerId){ 
     return
  "query{getEAccountsSummary(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    useEStatements"+
        "    eAccountsTable{"+
        "      accountId"+
        "      displayType"+
        "      description"+
        "      virtualBankSeq"+
        "      total"+
        "      frequency"+
        "    }"+
        "    totalMonthlyCost"+
        "    oneAccountBalance"+
        "    currentAccountBalance"+
        "    createPlan{"+
        "      createPlanStart"+
        "      createPlanDate"+
        "      createPlanEnd"+
        "    }"+
        "  }"
  +"}";}
}