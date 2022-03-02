package focuson.data.queries;
public class OccupationAndIncomeQueries{
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
}