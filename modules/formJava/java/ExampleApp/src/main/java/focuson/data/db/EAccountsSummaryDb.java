package focuson.data.db;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class EAccountsSummaryDb{
  public static class AllEAccountsSummaryMaps{
    public final Map<String,Object> CreatePlanDD = new HashMap<>();
    public final Map<String,Object> EAccountsSummaryDD = new HashMap<>();
    public final Map<String,Object> EAccountsSummaryTableDD = new HashMap<>();
    public final Map<String,Object> EAccountSummaryDD = new HashMap<>();
  }
  public void makeCreatePlanDD(AllEAccountsSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.CreatePlanDD.put("createPlanStart", rs.getString("createPlanStart"));
    maps.CreatePlanDD.put("createPlanDate", rs.getString("createPlanDate"));
    maps.CreatePlanDD.put("createPlanEnd", rs.getString("createPlanEnd"));
  }
  public void makeEAccountsSummaryDD(AllEAccountsSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.EAccountsSummaryDD.put("useEStatements", rs.getBoolean("useEStatements"));
    maps.EAccountsSummaryDD.put("totalMonthlyCost", rs.getInt("totalMonthlyCost"));
    maps.EAccountsSummaryDD.put("oneAccountBalance", rs.getInt("oneAccountBalance"));
    maps.EAccountsSummaryDD.put("currentAccountBalance", rs.getInt("currentAccountBalance"));
  }
  public void makeEAccountsSummaryTableDD(AllEAccountsSummaryMaps maps, ResultSet rs) throws SQLException {
  }
  public void makeEAccountSummaryDD(AllEAccountsSummaryMaps maps, ResultSet rs) throws SQLException {
    maps.EAccountSummaryDD.put("accountId", rs.getInt("accountId"));
    maps.EAccountSummaryDD.put("displayType", rs.getString("displayType"));
    maps.EAccountSummaryDD.put("description", rs.getString("description"));
    maps.EAccountSummaryDD.put("virtualBankSeq", rs.getString("virtualBankSeq"));
    maps.EAccountSummaryDD.put("total", rs.getInt("total"));
    maps.EAccountSummaryDD.put("frequency", rs.getString("frequency"));
  }
}