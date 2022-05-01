package focuson.data.queries.OccupationAndIncomeSummary;
public class OccupationAndIncomeFullDomainQueries{
  public static  String getOccupationAndIncomeFullDomain(String customerId){ 
    return"query{getOccupationAndIncomeFullDomain(" + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    mainCustomerName"+
        "    jointCustomerName"+
        "    mainClientRef"+
        "    jointClientRef"+
        "    customerOccupationIncomeDetails{"+
        "      areYou"+
        "      occupation"+
        "      customerDescription"+
        "      ownShareOfTheCompany"+
        "      owningSharesPct"+
        "      workFor"+
        "      employmentType"+
        "      empStartDate"+
        "      empEndDate"+
        "      annualSalaryBeforeDeduction"+
        "      annualIncomeExcludingRent"+
        "      regularCommissionBonus"+
        "      whatTypeOfBusiness"+
        "      whatNameBusiness"+
        "      establishedYear"+
        "      annualDrawing3Yrs"+
        "      otherSourceOfIncome"+
        "      createdBy"+
        "      createdDate"+
        "      employerName"+
        "      sePositionHeld"+
        "      occupationCategory"+
        "      empEmploymentSeq"+
        "      empAppRoleSeq"+
        "      accountantAppRoleSeq"+
        "      currentEmployment"+
        "    }"+
        "  }"
  +"}";}
  public static  String updateOccupationAndIncomeFullDomain(String customerId, String obj){ 
    return"mutation{updateOccupationAndIncomeFullDomain(" + "customerId:" + "\"" + customerId + "\""  + ", obj:" + obj + "){"+
        "    mainCustomerName"+
        "    jointCustomerName"+
        "    mainClientRef"+
        "    jointClientRef"+
        "    customerOccupationIncomeDetails{"+
        "      areYou"+
        "      occupation"+
        "      customerDescription"+
        "      ownShareOfTheCompany"+
        "      owningSharesPct"+
        "      workFor"+
        "      employmentType"+
        "      empStartDate"+
        "      empEndDate"+
        "      annualSalaryBeforeDeduction"+
        "      annualIncomeExcludingRent"+
        "      regularCommissionBonus"+
        "      whatTypeOfBusiness"+
        "      whatNameBusiness"+
        "      establishedYear"+
        "      annualDrawing3Yrs"+
        "      otherSourceOfIncome"+
        "      createdBy"+
        "      createdDate"+
        "      employerName"+
        "      sePositionHeld"+
        "      occupationCategory"+
        "      empEmploymentSeq"+
        "      empAppRoleSeq"+
        "      accountantAppRoleSeq"+
        "      currentEmployment"+
        "    }"+
        "  }"
  +"}";}
}