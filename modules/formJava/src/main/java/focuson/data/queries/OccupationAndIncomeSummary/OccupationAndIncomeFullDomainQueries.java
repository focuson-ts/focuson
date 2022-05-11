package focuson.data.queries.OccupationAndIncomeSummary;
public class OccupationAndIncomeFullDomainQueries{
  public static  String getOccupationAndIncomeFullDomain(String accountId,String applRef,String brandRef,String clientRef){ 
    return"query{getOccupationAndIncomeFullDomain(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\"" + "){"+
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
  public static  String updateOccupationAndIncomeFullDomain(String accountId,String applRef,String brandRef,String clientRef, String obj){ 
    return"mutation{updateOccupationAndIncomeFullDomain(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\""  + ", obj:" + obj + "){"+
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