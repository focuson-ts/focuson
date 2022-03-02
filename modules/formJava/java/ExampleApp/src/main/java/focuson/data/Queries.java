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
 public static  String getCreatePlanDD(String accountId,String customerId){ 
    return
 "{getCreatePlanDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    createPlanStart"+
       "    createPlanDate"+
       "    createPlanEnd"+
       "  }"
 +"}";}
 public static  String createCreatePlanDD(String accountId,String customerId){ 
    return
 "{createCreatePlanDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    createPlanStart"+
       "    createPlanDate"+
       "    createPlanEnd"+
       "  }"
 +"}";}
 public static  String updateCreatePlanDD(String accountId,String customerId){ 
    return
 "{updateCreatePlanDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    createPlanStart"+
       "    createPlanDate"+
       "    createPlanEnd"+
       "  }"
 +"}";}
 public static  String deleteCreatePlanDD(String accountId,String customerId){ 
    return
 "{deleteCreatePlanDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    createPlanStart"+
       "    createPlanDate"+
       "    createPlanEnd"+
       "  }"
 +"}";}
 public static  String listCreatePlanDD(String accountId,String customerId){ 
    return
 "{listCreatePlanDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    createPlanStart"+
       "    createPlanDate"+
       "    createPlanEnd"+
       "  }"
 +"}";}
 public static  String getEAccountsSummaryDD(String accountId,String customerId){ 
    return
 "{getEAccountsSummaryDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
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
 public static  String getChequeCreditbooksDD(String accountId,String applRef,String brandRef,String customerId){ 
    return
 "{getChequeCreditbooksDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    history{"+
       "      serialNumber"+
       "      howOrdered"+
       "      dateOrder"+
       "    }"+
       "  }"
 +"}";}
 public static  String createChequeCreditbooksDD(String accountId,String applRef,String brandRef,String customerId){ 
    return
 "{createChequeCreditbooksDD(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "customerId:" + "\"" + customerId + "\"" + "){"+
       "    history{"+
       "      serialNumber"+
       "      howOrdered"+
       "      dateOrder"+
       "    }"+
       "  }"
 +"}";}
}