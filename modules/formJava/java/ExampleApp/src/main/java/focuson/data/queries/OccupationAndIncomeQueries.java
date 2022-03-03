package focuson.data.queries;
public class OccupationAndIncomeQueries{
 public static  String createOccupationAndIncome(String customerId, String obj){ 
    return
 "mutation{createOccupationAndIncome(" + "customerId:" + "\"" + customerId + "\""  +  ", obj:" + obj + "){"+
       "    typeOfProfession"+
       "    occupation"+
       "    customersDescription"+
       "    businessType"+
       "    businessName"+
       "    dateStarted"+
       "    averageAnnualDrawings"+
       "  }"
 +"}";}
 public static  String updateOccupationAndIncome(String customerId, String obj){ 
    return
 "mutation{updateOccupationAndIncome(" + "customerId:" + "\"" + customerId + "\""  +  ", obj:" + obj + "){"+
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