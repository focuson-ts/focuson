package focuson.data;
public class Queries{
 public static  String createOccupationAndIncome(String customerId){ 
    return
 "{createOccupationAndIncome(" + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    typeOfProfession"+
       "    occupation"+
       "    customersDescription"+
       "    businessType"+
       "    businessName"+
       "    dateStarted"+
       "    averageAnnualDrawings"+
       "  }"
 +"}";}
 public static  String updateOccupationAndIncome(String customerId){ 
    return
 "{updateOccupationAndIncome(" + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    typeOfProfession"+
       "    occupation"+
       "    customersDescription"+
       "    businessType"+
       "    businessName"+
       "    dateStarted"+
       "    averageAnnualDrawings"+
       "  }"
 +"}";}
 public static  String getOccupationAndIncome(String customerId){ 
    return
 "{getOccupationAndIncome(" + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    typeOfProfession"+
       "    occupation"+
       "    customersDescription"+
       "    businessType"+
       "    businessName"+
       "    dateStarted"+
       "    averageAnnualDrawings"+
       "  }"
 +"}";}
 public static  String getCreatePlanDD(String accountId,String createPlanId,String customerId){ 
    return
 "{getCreatePlanDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "createPlanId:" + "\"" + createPlanId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    createPlanStart"+
       "    createPlanDate"+
       "    createPlanEnd"+
       "  }"
 +"}";}
 public static  String createCreatePlanDD(String accountId,String createPlanId,String customerId){ 
    return
 "{createCreatePlanDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "createPlanId:" + "\"" + createPlanId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    createPlanStart"+
       "    createPlanDate"+
       "    createPlanEnd"+
       "  }"
 +"}";}
 public static  String updateCreatePlanDD(String accountId,String createPlanId,String customerId){ 
    return
 "{updateCreatePlanDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "createPlanId:" + "\"" + createPlanId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    createPlanStart"+
       "    createPlanDate"+
       "    createPlanEnd"+
       "  }"
 +"}";}
 public static  String deleteCreatePlanDD(String accountId,String createPlanId,String customerId){ 
    return
 "{deleteCreatePlanDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "createPlanId:" + "\"" + createPlanId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    createPlanStart"+
       "    createPlanDate"+
       "    createPlanEnd"+
       "  }"
 +"}";}
 public static  String listCreatePlanDD(String accountId,String createPlanId,String customerId){ 
    return
 "{listCreatePlanDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "createPlanId:" + "\"" + createPlanId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    createPlanStart"+
       "    createPlanDate"+
       "    createPlanEnd"+
       "  }"
 +"}";}
 public static  String getEAccountsSummaryDD(String accountId,String customerId){ 
    return
 "{getEAccountsSummaryDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
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
 public static  String createETransferDataD(String customerId){ 
    return
 "{createETransferDataD(" + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    amount"+
       "    dateOfETransfer"+
       "    description"+
       "    fromAccount"+
       "    toAccount"+
       "    monitoringAccount"+
       "    type"+
       "    balance"+
       "    notes"+
       "  }"
 +"}";}
 public static  String createCreateEAccountDataDD(String accountId,String createPlanId,String customerId){ 
    return
 "{createCreateEAccountDataDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "createPlanId:" + "\"" + createPlanId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    name"+
       "    type"+
       "    savingsStyle"+
       "    initialAmount"+
       "  }"
 +"}";}
}