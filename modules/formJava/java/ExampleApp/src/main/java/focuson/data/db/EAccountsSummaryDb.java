package focuson.data.db;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class EAccountsSummaryDb{
  public static class AllEAccountsSummaryMaps{
    public final Map<String,Object> CreatePlan = new HashMap<>();
    public final Map<String,Object> EAccountsSummary = new HashMap<>();
    public final Map<String,Object> EAccountsSummaryTable = new HashMap<>();
    public final Map<String,Object> EAccountSummary = new HashMap<>();
  }
  public void makeCreatePlan(AllEAccountsSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.CreatePlan.put("createPlanStart", rs.getString("createPlanStart"));
    maps.CreatePlan.put("createPlanDate", rs.getString("createPlanDate"));
    maps.CreatePlan.put("createPlanEnd", rs.getString("createPlanEnd"));
  }
  public void makeEAccountsSummary(AllEAccountsSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.EAccountsSummary.put("useEStatements", rs.getBoolean("useEStatements"));
    maps.EAccountsSummary.put("totalMonthlyCost", rs.getInt("totalMonthlyCost"));
    maps.EAccountsSummary.put("oneAccountBalance", rs.getInt("oneAccountBalance"));
    maps.EAccountsSummary.put("currentAccountBalance", rs.getInt("currentAccountBalance"));
  }
  public void makeEAccountsSummaryTable(AllEAccountsSummaryMaps maps, ResultSet rs) throws SQLException {
  }
  public void makeEAccountSummary(AllEAccountsSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.EAccountSummary.put("accountId", rs.getInt("accountId"));
    maps.EAccountSummary.put("displayType", rs.getString("displayType"));
    maps.EAccountSummary.put("description", rs.getString("description"));
    maps.EAccountSummary.put("virtualBankSeq", rs.getString("virtualBankSeq"));
    maps.EAccountSummary.put("total", rs.getInt("total"));
    maps.EAccountSummary.put("frequency", rs.getString("frequency"));
  }
}