package focuson.data.queries;
public class ETransferDataDQueries{
  public static  String createETransferDataD(String customerId, String obj){ 
     return
  "mutation{createETransferDataD(" + "customerId:" + "\"" + customerId + "\""  +  ", obj:" + obj + "){"+
        "    account"+
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