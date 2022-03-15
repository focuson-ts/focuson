package focuson.data.queries;
public class OccupationAndIncomeDetailsDDQueries{
  public static  String getOccupationAndIncomeDetailsDD(String accountSeq,String applicationRef,String brandRef,String vbAccountSeq,String vbAccountType){ 
     return
  "query{getOccupationAndIncomeDetailsDD(" + "accountSeq:" + "\"" + accountSeq + "\""  + "," + "applicationRef:" + "\"" + applicationRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "vbAccountSeq:" + "\"" + vbAccountSeq + "\""  + "," + "vbAccountType:" + "\"" + vbAccountType + "\"" + "){"+
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
  public static  String updateOccupationAndIncomeDetailsDD(String accountSeq,String applicationRef,String brandRef,String vbAccountSeq,String vbAccountType, String obj){ 
     return
  "mutation{updateOccupationAndIncomeDetailsDD(" + "accountSeq:" + "\"" + accountSeq + "\""  + "," + "applicationRef:" + "\"" + applicationRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "vbAccountSeq:" + "\"" + vbAccountSeq + "\""  + "," + "vbAccountType:" + "\"" + vbAccountType + "\""  + ", obj:" + obj + "){"+
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