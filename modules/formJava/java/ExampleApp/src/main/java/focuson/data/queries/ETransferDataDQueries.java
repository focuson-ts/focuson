package focuson.data.queries;
public class ETransferDataDQueries{
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
}