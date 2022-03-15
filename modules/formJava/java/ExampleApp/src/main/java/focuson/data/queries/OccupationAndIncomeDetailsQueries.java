package focuson.data.queries;
public class OccupationAndIncomeDetailsQueries{
  public static  String getOccupationAndIncomeDetails(String accountSeq,String applicationRef,String brandRef,String vbAccountSeq,String vbAccountType){ 
     return
  "query{getOccupationAndIncomeDetails(" + "accountSeq:" + "\"" + accountSeq + "\""  + "," + "applicationRef:" + "\"" + applicationRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "vbAccountSeq:" + "\"" + vbAccountSeq + "\""  + "," + "vbAccountType:" + "\"" + vbAccountType + "\"" + "){"+
        "    regulatoryReport"+
        "    mainCustomerName"+
        "    jointCustomerName"+
        "    mainClientRef"+
        "    jointClientRef"+
        "    customerOccupationIncomeDetails{"+
        "      areYou"+
        "      currentEmployment"+
        "      occupation"+
        "      customerDescription"+
        "      ownShareOfTheCompany"+
        "      owningSharesPct"+
        "      workFor"+
        "      employmentType"+
        "      annualSalaryBeforeDeduction"+
        "      annualIncomeExcludingRent"+
        "      regularCommissionBonus"+
        "      dateOfEmploymentStart"+
        "      otherSourceOfIncome"+
        "      createdBy"+
        "      createdDate"+
        "      employerName"+
        "      whatTypeOfBusiness"+
        "      whatNameBusiness"+
        "      establishedYear"+
        "      annualDrawing3Yrs"+
        "      empStartDate"+
        "      empEndDate"+
        "      sePositionHeld"+
        "      occupationCategory"+
        "      empEmploymentSeq"+
        "      empAppRoleSeq"+
        "      accountantAppRoleSeq"+
        "    }"+
        "  }"
  +"}";}
  public static  String updateOccupationAndIncomeDetails(String accountSeq,String applicationRef,String brandRef,String vbAccountSeq,String vbAccountType, String obj){ 
     return
  "mutation{updateOccupationAndIncomeDetails(" + "accountSeq:" + "\"" + accountSeq + "\""  + "," + "applicationRef:" + "\"" + applicationRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "vbAccountSeq:" + "\"" + vbAccountSeq + "\""  + "," + "vbAccountType:" + "\"" + vbAccountType + "\""  + ", obj:" + obj + "){"+
        "    regulatoryReport"+
        "    mainCustomerName"+
        "    jointCustomerName"+
        "    mainClientRef"+
        "    jointClientRef"+
        "    customerOccupationIncomeDetails{"+
        "      areYou"+
        "      currentEmployment"+
        "      occupation"+
        "      customerDescription"+
        "      ownShareOfTheCompany"+
        "      owningSharesPct"+
        "      workFor"+
        "      employmentType"+
        "      annualSalaryBeforeDeduction"+
        "      annualIncomeExcludingRent"+
        "      regularCommissionBonus"+
        "      dateOfEmploymentStart"+
        "      otherSourceOfIncome"+
        "      createdBy"+
        "      createdDate"+
        "      employerName"+
        "      whatTypeOfBusiness"+
        "      whatNameBusiness"+
        "      establishedYear"+
        "      annualDrawing3Yrs"+
        "      empStartDate"+
        "      empEndDate"+
        "      sePositionHeld"+
        "      occupationCategory"+
        "      empEmploymentSeq"+
        "      empAppRoleSeq"+
        "      accountantAppRoleSeq"+
        "    }"+
        "  }"
  +"}";}
}