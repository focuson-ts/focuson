package focuson.data.db;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class AccountOverviewDb{
  public static class AllAccountOverviewMaps{
    public final Map<String,Object> AccountAllFlags = new HashMap<>();
    public final Map<String,Object> AccountAllFlagsList = new HashMap<>();
    public final Map<String,Object> AccountOneFlag = new HashMap<>();
    public final Map<String,Object> AccountOverview = new HashMap<>();
    public final Map<String,Object> AccountOverviewCriteria = new HashMap<>();
    public final Map<String,Object> AccountOverviewCriteriaLine = new HashMap<>();
    public final Map<String,Object> AccountOverviewExcessHistoryLine = new HashMap<>();
    public final Map<String,Object> AccountOverviewExcessInfo = new HashMap<>();
    public final Map<String,Object> AccountOverviewExcessLines = new HashMap<>();
    public final Map<String,Object> AccountOverviewHistory = new HashMap<>();
    public final Map<String,Object> AccountOverviewReason = new HashMap<>();
    public final Map<String,Object> ArrearsDetails = new HashMap<>();
    public final Map<String,Object> ArrearsDetailsLine = new HashMap<>();
    public final Map<String,Object> ArrearsDetailsLines = new HashMap<>();
  }
  public void makeAccountAllFlags(AllAccountOverviewMaps maps, ResultSet rs) throws SQLException {
  }
  public void makeAccountAllFlagsList(AllAccountOverviewMaps maps, ResultSet rs) throws SQLException {
  }
  public void makeAccountOneFlag(AllAccountOverviewMaps maps, ResultSet rs) throws SQLException {
    maps.AccountOneFlag.put("flagName", rs.getString("flagName"));
    maps.AccountOneFlag.put("flagValue", rs.getBoolean("flagValue"));
  }
  public void makeAccountOverview(AllAccountOverviewMaps maps, ResultSet rs) throws SQLException {
    maps.AccountOverview.put("score", rs.getInt("score"));
    maps.AccountOverview.put("accountType", rs.getString("accountType"));
    maps.AccountOverview.put("drawDownDate", rs.getString("drawDownDate"));
    maps.AccountOverview.put("repaymentDate", rs.getString("repaymentDate"));
    maps.AccountOverview.put("propertyValue", rs.getInt("propertyValue"));
    maps.AccountOverview.put("mul", rs.getInt("mul"));
    maps.AccountOverview.put("drawDownAmount", rs.getInt("drawDownAmount"));
    maps.AccountOverview.put("zFlagSet", rs.getString("zFlagSet"));
    maps.AccountOverview.put("excessSixMonths", rs.getInt("excessSixMonths"));
    maps.AccountOverview.put("bouncedDDs12Months", rs.getInt("bouncedDDs12Months"));
    maps.AccountOverview.put("unpaidCardOrMisuseItems", rs.getInt("unpaidCardOrMisuseItems"));
  }
  public void makeAccountOverviewCriteria(AllAccountOverviewMaps maps, ResultSet rs) throws SQLException {
  }
  public void makeAccountOverviewCriteriaLine(AllAccountOverviewMaps maps, ResultSet rs) throws SQLException {
    maps.AccountOverviewCriteriaLine.put("criteria", rs.getString("criteria"));
  }
  public void makeAccountOverviewExcessHistoryLine(AllAccountOverviewMaps maps, ResultSet rs) throws SQLException {
    maps.AccountOverviewExcessHistoryLine.put("start", rs.getString("start"));
    maps.AccountOverviewExcessHistoryLine.put("end", rs.getString("end"));
    maps.AccountOverviewExcessHistoryLine.put("consecutiveDays", rs.getInt("consecutiveDays"));
  }
  public void makeAccountOverviewExcessInfo(AllAccountOverviewMaps maps, ResultSet rs) throws SQLException {
    maps.AccountOverviewExcessInfo.put("dayOfCurrentExcess", rs.getInt("dayOfCurrentExcess"));
    maps.AccountOverviewExcessInfo.put("currentExcessOnAccount", rs.getInt("currentExcessOnAccount"));
    maps.AccountOverviewExcessInfo.put("currentPctExcess", rs.getInt("currentPctExcess"));
    maps.AccountOverviewExcessInfo.put("dateOfLastCapitalization", rs.getString("dateOfLastCapitalization"));
    maps.AccountOverviewExcessInfo.put("dateOfLastExcessFulfillment", rs.getString("dateOfLastExcessFulfillment"));
  }
  public void makeAccountOverviewExcessLines(AllAccountOverviewMaps maps, ResultSet rs) throws SQLException {
  }
  public void makeAccountOverviewHistory(AllAccountOverviewMaps maps, ResultSet rs) throws SQLException {
  }
  public void makeAccountOverviewReason(AllAccountOverviewMaps maps, ResultSet rs) throws SQLException {
    maps.AccountOverviewReason.put("reason", rs.getString("reason"));
  }
  public void makeArrearsDetails(AllAccountOverviewMaps maps, ResultSet rs) throws SQLException {
  }
  public void makeArrearsDetailsLine(AllAccountOverviewMaps maps, ResultSet rs) throws SQLException {
    maps.ArrearsDetailsLine.put("collectionsDate", rs.getString("collectionsDate"));
    maps.ArrearsDetailsLine.put("creditedDate", rs.getString("creditedDate"));
    maps.ArrearsDetailsLine.put("minPayment", rs.getInt("minPayment"));
    maps.ArrearsDetailsLine.put("contractualAmount", rs.getInt("contractualAmount"));
    maps.ArrearsDetailsLine.put("paymentType", rs.getString("paymentType"));
    maps.ArrearsDetailsLine.put("paymentReceived", rs.getInt("paymentReceived"));
    maps.ArrearsDetailsLine.put("shortfall", rs.getInt("shortfall"));
    maps.ArrearsDetailsLine.put("arrearsTotal", rs.getInt("arrearsTotal"));
    maps.ArrearsDetailsLine.put("missedPayments", rs.getInt("missedPayments"));
  }
  public void makeArrearsDetailsLines(AllAccountOverviewMaps maps, ResultSet rs) throws SQLException {
  }
}