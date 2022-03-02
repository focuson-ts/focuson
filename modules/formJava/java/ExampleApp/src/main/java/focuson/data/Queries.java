package focuson.data;
public class Queries{
 public static  String createOccupationAndIncome(String customerId){ 
    return
 "mutation{createOccupationAndIncome(" + "customerId:" + "\"" + customerId + "\"" + "){"+
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
 "mutation{updateOccupationAndIncome(" + "customerId:" + "\"" + customerId + "\"" + "){"+
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
 "query{getOccupationAndIncome(" + "customerId:" + "\"" + customerId + "\"" + "){"+
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
 "query{getCreatePlanDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "createPlanId:" + "\"" + createPlanId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    createPlanStart"+
       "    createPlanDate"+
       "    createPlanEnd"+
       "  }"
 +"}";}
 public static  String createCreatePlanDD(String accountId,String customerId){ 
    return
 "mutation{createCreatePlanDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    createPlanStart"+
       "    createPlanDate"+
       "    createPlanEnd"+
       "  }"
 +"}";}
 public static  String updateCreatePlanDD(String accountId,String createPlanId,String customerId){ 
    return
 "mutation{updateCreatePlanDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "createPlanId:" + "\"" + createPlanId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    createPlanStart"+
       "    createPlanDate"+
       "    createPlanEnd"+
       "  }"
 +"}";}
 public static  String deleteCreatePlanDD(String accountId,String createPlanId,String customerId){ 
    return
 "mutation{deleteCreatePlanDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "createPlanId:" + "\"" + createPlanId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    createPlanStart"+
       "    createPlanDate"+
       "    createPlanEnd"+
       "  }"
 +"}";}
 public static  String listCreatePlanDD(String accountId,String customerId){ 
    return
 "query{listCreatePlanDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    createPlanStart"+
       "    createPlanDate"+
       "    createPlanEnd"+
       "  }"
 +"}";}
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
 public static  String createETransferDataD(String customerId){ 
    return
 "mutation{createETransferDataD(" + "customerId:" + "\"" + customerId + "\"" + "){"+
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
 public static  String createCreateEAccountDataDD(String accountId,String customerId){ 
    return
 "mutation{createCreateEAccountDataDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    name"+
       "    type"+
       "    savingsStyle"+
       "    initialAmount"+
       "  }"
 +"}";}
 public static  String getChequeCreditbooksDD(String accountId,String applRef,String brandRef,String customerId){ 
    return
 "query{getChequeCreditbooksDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    history{"+
       "      serialNumber"+
       "      howOrdered"+
       "      dateOrder"+
       "    }"+
       "  }"
 +"}";}
 public static  String createChequeCreditbooksDD(String accountId,String applRef,String brandRef,String customerId){ 
    return
 "mutation{createChequeCreditbooksDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    history{"+
       "      serialNumber"+
       "      howOrdered"+
       "      dateOrder"+
       "    }"+
       "  }"
 +"}";}
}