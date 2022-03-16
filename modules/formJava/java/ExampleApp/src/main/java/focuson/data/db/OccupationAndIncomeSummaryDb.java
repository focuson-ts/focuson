package focuson.data.db;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class OccupationAndIncomeSummaryDb{
  public static class AllOccupationAndIncomeSummaryMaps{
    public final Map<String,Object> AccountDetails = new HashMap<>();
    public final Map<String,Object> AdditionalInformation = new HashMap<>();
    public final Map<String,Object> BusinessDetails = new HashMap<>();
    public final Map<String,Object> BusinessDetailsMain = new HashMap<>();
    public final Map<String,Object> BusinessFinancialDetails = new HashMap<>();
    public final Map<String,Object> ContractTypesResponse = new HashMap<>();
    public final Map<String,Object> CustomerOccupationIncomeDetails = new HashMap<>();
    public final Map<String,Object> DetailsOfNonRecurringItems = new HashMap<>();
    public final Map<String,Object> DetailsOfReevaluationOfAssets = new HashMap<>();
    public final Map<String,Object> Dropdowns = new HashMap<>();
    public final Map<String,Object> EmploymentStatus = new HashMap<>();
    public final Map<String,Object> FrequenciesResponse = new HashMap<>();
    public final Map<String,Object> ListOccupations = new HashMap<>();
    public final Map<String,Object> OccupationAndIncomeFullDomain = new HashMap<>();
    public final Map<String,Object> OccupationDescriptionResponse = new HashMap<>();
    public final Map<String,Object> OccupationsList = new HashMap<>();
    public final Map<String,Object> OneOccupationIncomeDetails = new HashMap<>();
    public final Map<String,Object> OtherIncomeResponse = new HashMap<>();
  }
  public void makeAccountDetails(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.AccountDetails.put("contactTitle", rs.getString("contactTitle"));
    maps.AccountDetails.put("contactForename", rs.getString("contactForename"));
    maps.AccountDetails.put("contactSurname", rs.getString("contactSurname"));
    maps.AccountDetails.put("practice", rs.getString("practice"));
    maps.AccountDetails.put("addressLine1", rs.getString("addressLine1"));
    maps.AccountDetails.put("addressLine2", rs.getString("addressLine2"));
    maps.AccountDetails.put("addressLine3", rs.getString("addressLine3"));
    maps.AccountDetails.put("addressLine4", rs.getString("addressLine4"));
    maps.AccountDetails.put("postcode", rs.getString("postcode"));
    maps.AccountDetails.put("telephone", rs.getString("telephone"));
  }
  public void makeAdditionalInformation(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.AdditionalInformation.put("applicantName", rs.getString("applicantName"));
    maps.AdditionalInformation.put("employerName", rs.getString("employerName"));
    maps.AdditionalInformation.put("addressLine1", rs.getString("addressLine1"));
    maps.AdditionalInformation.put("addressLine2", rs.getString("addressLine2"));
    maps.AdditionalInformation.put("addressLine3", rs.getString("addressLine3"));
    maps.AdditionalInformation.put("addressLine4", rs.getString("addressLine4"));
    maps.AdditionalInformation.put("postcode", rs.getString("postcode"));
  }
  public void makeBusinessDetails(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.BusinessDetails.put("applicantName", rs.getString("applicantName"));
    maps.BusinessDetails.put("businessName", rs.getString("businessName"));
    maps.BusinessDetails.put("addressLine1", rs.getString("addressLine1"));
    maps.BusinessDetails.put("addressLine2", rs.getString("addressLine2"));
    maps.BusinessDetails.put("addressLine3", rs.getString("addressLine3"));
    maps.BusinessDetails.put("addressLine4", rs.getString("addressLine4"));
    maps.BusinessDetails.put("postcode", rs.getString("postcode"));
  }
  public void makeBusinessDetailsMain(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
  }
  public void makeBusinessFinancialDetails(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.BusinessFinancialDetails.put("turnoverLastYear", rs.getString("turnoverLastYear"));
    maps.BusinessFinancialDetails.put("turnoverPenultimateYear", rs.getString("turnoverPenultimateYear"));
    maps.BusinessFinancialDetails.put("netProfitLastYear", rs.getString("netProfitLastYear"));
    maps.BusinessFinancialDetails.put("netProfitPenultimateYear", rs.getString("netProfitPenultimateYear"));
    maps.BusinessFinancialDetails.put("drawingsLastYear", rs.getString("drawingsLastYear"));
    maps.BusinessFinancialDetails.put("drawingsPenultimateYear", rs.getString("drawingsPenultimateYear"));
    maps.BusinessFinancialDetails.put("dividendsLastYear", rs.getString("dividendsLastYear"));
    maps.BusinessFinancialDetails.put("dividendsPenultimateYear", rs.getString("dividendsPenultimateYear"));
    maps.BusinessFinancialDetails.put("netAssetsLastYear", rs.getString("netAssetsLastYear"));
    maps.BusinessFinancialDetails.put("netAssetsPenultimateYear", rs.getString("netAssetsPenultimateYear"));
  }
  public void makeContractTypesResponse(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.ContractTypesResponse.put("contractTypeId", rs.getInt("contractTypeId"));
    maps.ContractTypesResponse.put("description", rs.getString("description"));
  }
  public void makeCustomerOccupationIncomeDetails(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
  }
  public void makeDetailsOfNonRecurringItems(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.DetailsOfNonRecurringItems.put("nonRecurringItems", rs.getString("nonRecurringItems"));
  }
  public void makeDetailsOfReevaluationOfAssets(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.DetailsOfReevaluationOfAssets.put("revaluationOfAssets", rs.getString("revaluationOfAssets"));
  }
  public void makeDropdowns(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
  }
  public void makeEmploymentStatus(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.EmploymentStatus.put("employmentName", rs.getString("employmentName"));
    maps.EmploymentStatus.put("employmentValue", rs.getString("employmentValue"));
  }
  public void makeFrequenciesResponse(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.FrequenciesResponse.put("frequencyId", rs.getInt("frequencyId"));
    maps.FrequenciesResponse.put("frequencyDescription", rs.getString("frequencyDescription"));
    maps.FrequenciesResponse.put("annualMultiple", rs.getInt("annualMultiple"));
  }
  public void makeListOccupations(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
  }
  public void makeOccupationAndIncomeFullDomain(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.OccupationAndIncomeFullDomain.put("mainCustomerName", rs.getString("mainCustomerName"));
    maps.OccupationAndIncomeFullDomain.put("jointCustomerName", rs.getString("jointCustomerName"));
    maps.OccupationAndIncomeFullDomain.put("mainClientRef", rs.getInt("mainClientRef"));
    maps.OccupationAndIncomeFullDomain.put("jointClientRef", rs.getInt("jointClientRef"));
  }
  public void makeOccupationDescriptionResponse(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.OccupationDescriptionResponse.put("descTypeValue", rs.getString("descTypeValue"));
    maps.OccupationDescriptionResponse.put("descTypeName", rs.getString("descTypeName"));
  }
  public void makeOccupationsList(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
  }
  public void makeOneOccupationIncomeDetails(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.OneOccupationIncomeDetails.put("areYou", rs.getString("areYou"));
    maps.OneOccupationIncomeDetails.put("occupation", rs.getString("occupation"));
    maps.OneOccupationIncomeDetails.put("customerDescription", rs.getString("customerDescription"));
    maps.OneOccupationIncomeDetails.put("ownShareOfTheCompany", rs.getString("ownShareOfTheCompany"));
    maps.OneOccupationIncomeDetails.put("owningSharesPct", rs.getString("owningSharesPct"));
    maps.OneOccupationIncomeDetails.put("workFor", rs.getString("workFor"));
    maps.OneOccupationIncomeDetails.put("annualSalaryBeforeDeduction", rs.getInt("annualSalaryBeforeDeduction"));
    maps.OneOccupationIncomeDetails.put("annualIncomeExcludingRent", rs.getInt("annualIncomeExcludingRent"));
    maps.OneOccupationIncomeDetails.put("regularCommissionBonus", rs.getInt("regularCommissionBonus"));
    maps.OneOccupationIncomeDetails.put("whatTypeOfBusiness", rs.getString("whatTypeOfBusiness"));
    maps.OneOccupationIncomeDetails.put("whatNameBusiness", rs.getString("whatNameBusiness"));
    maps.OneOccupationIncomeDetails.put("establishedYear", rs.getString("establishedYear"));
    maps.OneOccupationIncomeDetails.put("annualDrawing3Yrs", rs.getInt("annualDrawing3Yrs"));
    maps.OneOccupationIncomeDetails.put("employmentType", rs.getString("employmentType"));
    maps.OneOccupationIncomeDetails.put("empStartDate", rs.getString("empStartDate"));
    maps.OneOccupationIncomeDetails.put("empEndDate", rs.getString("empEndDate"));
    maps.OneOccupationIncomeDetails.put("dateOfEmploymentStart", rs.getString("dateOfEmploymentStart"));
    maps.OneOccupationIncomeDetails.put("otherSourceOfIncome", rs.getString("otherSourceOfIncome"));
    maps.OneOccupationIncomeDetails.put("createdBy", rs.getString("createdBy"));
    maps.OneOccupationIncomeDetails.put("createdDate", rs.getString("createdDate"));
    maps.OneOccupationIncomeDetails.put("employerName", rs.getString("employerName"));
    maps.OneOccupationIncomeDetails.put("sePositionHeld", rs.getString("sePositionHeld"));
    maps.OneOccupationIncomeDetails.put("occupationCategory", rs.getString("occupationCategory"));
    maps.OneOccupationIncomeDetails.put("empEmploymentSeq", rs.getInt("empEmploymentSeq"));
    maps.OneOccupationIncomeDetails.put("empAppRoleSeq", rs.getInt("empAppRoleSeq"));
    maps.OneOccupationIncomeDetails.put("accountantAppRoleSeq", rs.getInt("accountantAppRoleSeq"));
    maps.OneOccupationIncomeDetails.put("currentEmployment", rs.getString("currentEmployment"));
  }
  public void makeOtherIncomeResponse(AllOccupationAndIncomeSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.OtherIncomeResponse.put("clientOtherIncomeSeq", rs.getString("clientOtherIncomeSeq"));
    maps.OtherIncomeResponse.put("otherIncomeType", rs.getString("otherIncomeType"));
    maps.OtherIncomeResponse.put("incomeFreqRef", rs.getString("incomeFreqRef"));
    maps.OtherIncomeResponse.put("amount", rs.getInt("amount"));
  }
}