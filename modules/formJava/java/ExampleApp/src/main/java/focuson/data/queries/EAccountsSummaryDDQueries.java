package focuson.data.queries;
public class EAccountsSummaryDDQueries{
 public static  String getEAccountsSummaryDD(String accountId,String customerId){ 
    return
 "query{getEAccountsSummaryDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
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