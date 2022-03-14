package focuson.data.db;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class OccupationAndIncomeSummaryDb{
  public static class AllOccupationAndIncomeSummaryMaps{
    public final Map<String,Object> CustomerOccupationIncomeDetailsDD = new HashMap<>();
    public final Map<String,Object> ListOccupationsDD = new HashMap<>();
    public final Map<String,Object> OccupationAndIncomeDetailsDD = new HashMap<>();
    public final Map<String,Object> OccupationDescriptionResponseDD = new HashMap<>();
    public final Map<String,Object> OccupationIncomeDetailsDD = new HashMap<>();
    public final Map<String,Object> OtherIncomeResponseDD = new HashMap<>();
  }
  public void makeCustomerOccupationIncomeDetailsDD(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
  }
  public void makeListOccupationsDD(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.ListOccupationsDD.put("searchField", rs.getString("searchField"));
  }
  public void makeOccupationAndIncomeDetailsDD(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.OccupationAndIncomeDetailsDD.put("regulatoryReport", rs.getString("regulatoryReport"));
    maps.OccupationAndIncomeDetailsDD.put("mainCustomerName", rs.getString("mainCustomerName"));
    maps.OccupationAndIncomeDetailsDD.put("jointCustomerName", rs.getString("jointCustomerName"));
    maps.OccupationAndIncomeDetailsDD.put("mainClientRef", rs.getInt("mainClientRef"));
    maps.OccupationAndIncomeDetailsDD.put("jointClientRef", rs.getInt("jointClientRef"));
  }
  public void makeOccupationDescriptionResponseDD(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.OccupationDescriptionResponseDD.put("descTypeValue", rs.getString("descTypeValue"));
    maps.OccupationDescriptionResponseDD.put("descTypeName", rs.getString("descTypeName"));
  }
  public void makeOccupationIncomeDetailsDD(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.OccupationIncomeDetailsDD.put("areYou", rs.getString("areYou"));
    maps.OccupationIncomeDetailsDD.put("currentEmployment", rs.getString("currentEmployment"));
    maps.OccupationIncomeDetailsDD.put("occupation", rs.getString("occupation"));
    maps.OccupationIncomeDetailsDD.put("customerDescription", rs.getString("customerDescription"));
    maps.OccupationIncomeDetailsDD.put("ownShareOfTheCompany", rs.getString("ownShareOfTheCompany"));
    maps.OccupationIncomeDetailsDD.put("owningSharesPct", rs.getString("owningSharesPct"));
    maps.OccupationIncomeDetailsDD.put("workFor", rs.getString("workFor"));
    maps.OccupationIncomeDetailsDD.put("employmentType", rs.getString("employmentType"));
    maps.OccupationIncomeDetailsDD.put("annualSalaryBeforeDeduction", rs.getInt("annualSalaryBeforeDeduction"));
    maps.OccupationIncomeDetailsDD.put("annualIncomeExcludingRent", rs.getInt("annualIncomeExcludingRent"));
    maps.OccupationIncomeDetailsDD.put("regularCommissionBonus", rs.getInt("regularCommissionBonus"));
    maps.OccupationIncomeDetailsDD.put("dateOfEmploymentStart", rs.getString("dateOfEmploymentStart"));
    maps.OccupationIncomeDetailsDD.put("otherSourceOfIncome", rs.getString("otherSourceOfIncome"));
    maps.OccupationIncomeDetailsDD.put("createdBy", rs.getString("createdBy"));
    maps.OccupationIncomeDetailsDD.put("createdDate", rs.getString("createdDate"));
    maps.OccupationIncomeDetailsDD.put("employerName", rs.getString("employerName"));
    maps.OccupationIncomeDetailsDD.put("whatTypeOfBusiness", rs.getString("whatTypeOfBusiness"));
    maps.OccupationIncomeDetailsDD.put("whatNameBusiness", rs.getString("whatNameBusiness"));
    maps.OccupationIncomeDetailsDD.put("establishedYear", rs.getString("establishedYear"));
    maps.OccupationIncomeDetailsDD.put("annualDrawing3Yrs", rs.getInt("annualDrawing3Yrs"));
    maps.OccupationIncomeDetailsDD.put("empStartDate", rs.getString("empStartDate"));
    maps.OccupationIncomeDetailsDD.put("empEndDate", rs.getString("empEndDate"));
    maps.OccupationIncomeDetailsDD.put("sePositionHeld", rs.getString("sePositionHeld"));
    maps.OccupationIncomeDetailsDD.put("occupationCategory", rs.getString("occupationCategory"));
    maps.OccupationIncomeDetailsDD.put("empEmploymentSeq", rs.getInt("empEmploymentSeq"));
    maps.OccupationIncomeDetailsDD.put("empAppRoleSeq", rs.getInt("empAppRoleSeq"));
    maps.OccupationIncomeDetailsDD.put("accountantAppRoleSeq", rs.getInt("accountantAppRoleSeq"));
  }
  public void makeOtherIncomeResponseDD(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.OtherIncomeResponseDD.put("clientOtherIncomeSeq", rs.getString("clientOtherIncomeSeq"));
    maps.OtherIncomeResponseDD.put("otherIncomeType", rs.getString("otherIncomeType"));
    maps.OtherIncomeResponseDD.put("incomeFreqRef", rs.getString("incomeFreqRef"));
    maps.OtherIncomeResponseDD.put("amount", rs.getInt("amount"));
  }
}