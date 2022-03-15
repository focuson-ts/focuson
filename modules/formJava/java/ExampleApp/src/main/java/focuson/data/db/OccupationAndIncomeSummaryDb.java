package focuson.data.db;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class OccupationAndIncomeSummaryDb{
  public static class AllOccupationAndIncomeSummaryMaps{
    public final Map<String,Object> CustomerOccupationIncomeDetails = new HashMap<>();
    public final Map<String,Object> ListOccupations = new HashMap<>();
    public final Map<String,Object> OccupationAndIncomeDetails = new HashMap<>();
    public final Map<String,Object> OccupationDescriptionResponse = new HashMap<>();
    public final Map<String,Object> OccupationIncomeDetails = new HashMap<>();
    public final Map<String,Object> OtherIncomeResponse = new HashMap<>();
  }
  public void makeCustomerOccupationIncomeDetails(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
  }
  public void makeListOccupations(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.ListOccupations.put("searchField", rs.getString("searchField"));
  }
  public void makeOccupationAndIncomeDetails(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.OccupationAndIncomeDetails.put("regulatoryReport", rs.getString("regulatoryReport"));
    maps.OccupationAndIncomeDetails.put("mainCustomerName", rs.getString("mainCustomerName"));
    maps.OccupationAndIncomeDetails.put("jointCustomerName", rs.getString("jointCustomerName"));
    maps.OccupationAndIncomeDetails.put("mainClientRef", rs.getInt("mainClientRef"));
    maps.OccupationAndIncomeDetails.put("jointClientRef", rs.getInt("jointClientRef"));
  }
  public void makeOccupationDescriptionResponse(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.OccupationDescriptionResponse.put("descTypeValue", rs.getString("descTypeValue"));
    maps.OccupationDescriptionResponse.put("descTypeName", rs.getString("descTypeName"));
  }
  public void makeOccupationIncomeDetails(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.OccupationIncomeDetails.put("areYou", rs.getString("areYou"));
    maps.OccupationIncomeDetails.put("currentEmployment", rs.getString("currentEmployment"));
    maps.OccupationIncomeDetails.put("occupation", rs.getString("occupation"));
    maps.OccupationIncomeDetails.put("customerDescription", rs.getString("customerDescription"));
    maps.OccupationIncomeDetails.put("ownShareOfTheCompany", rs.getString("ownShareOfTheCompany"));
    maps.OccupationIncomeDetails.put("owningSharesPct", rs.getString("owningSharesPct"));
    maps.OccupationIncomeDetails.put("workFor", rs.getString("workFor"));
    maps.OccupationIncomeDetails.put("employmentType", rs.getString("employmentType"));
    maps.OccupationIncomeDetails.put("annualSalaryBeforeDeduction", rs.getInt("annualSalaryBeforeDeduction"));
    maps.OccupationIncomeDetails.put("annualIncomeExcludingRent", rs.getInt("annualIncomeExcludingRent"));
    maps.OccupationIncomeDetails.put("regularCommissionBonus", rs.getInt("regularCommissionBonus"));
    maps.OccupationIncomeDetails.put("dateOfEmploymentStart", rs.getString("dateOfEmploymentStart"));
    maps.OccupationIncomeDetails.put("otherSourceOfIncome", rs.getString("otherSourceOfIncome"));
    maps.OccupationIncomeDetails.put("createdBy", rs.getString("createdBy"));
    maps.OccupationIncomeDetails.put("createdDate", rs.getString("createdDate"));
    maps.OccupationIncomeDetails.put("employerName", rs.getString("employerName"));
    maps.OccupationIncomeDetails.put("whatTypeOfBusiness", rs.getString("whatTypeOfBusiness"));
    maps.OccupationIncomeDetails.put("whatNameBusiness", rs.getString("whatNameBusiness"));
    maps.OccupationIncomeDetails.put("establishedYear", rs.getString("establishedYear"));
    maps.OccupationIncomeDetails.put("annualDrawing3Yrs", rs.getInt("annualDrawing3Yrs"));
    maps.OccupationIncomeDetails.put("empStartDate", rs.getString("empStartDate"));
    maps.OccupationIncomeDetails.put("empEndDate", rs.getString("empEndDate"));
    maps.OccupationIncomeDetails.put("sePositionHeld", rs.getString("sePositionHeld"));
    maps.OccupationIncomeDetails.put("occupationCategory", rs.getString("occupationCategory"));
    maps.OccupationIncomeDetails.put("empEmploymentSeq", rs.getInt("empEmploymentSeq"));
    maps.OccupationIncomeDetails.put("empAppRoleSeq", rs.getInt("empAppRoleSeq"));
    maps.OccupationIncomeDetails.put("accountantAppRoleSeq", rs.getInt("accountantAppRoleSeq"));
  }
  public void makeOtherIncomeResponse(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.OtherIncomeResponse.put("clientOtherIncomeSeq", rs.getString("clientOtherIncomeSeq"));
    maps.OtherIncomeResponse.put("otherIncomeType", rs.getString("otherIncomeType"));
    maps.OtherIncomeResponse.put("incomeFreqRef", rs.getString("incomeFreqRef"));
    maps.OtherIncomeResponse.put("amount", rs.getInt("amount"));
  }
}