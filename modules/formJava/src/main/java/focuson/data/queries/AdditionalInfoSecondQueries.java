package focuson.data.queries;
public class AdditionalInfoSecondQueries{
  public static  String getAdditionalInfoSecond(String customerId){ 
     return
  "query{getAdditionalInfoSecond(" + "customerId:" + "\"" + customerId + "\"" + "){"+
        "    turnoverLastYear"+
        "    turnoverPenultimateYear"+
        "    netProfitLastYear"+
        "    netProfitPenultimateYear"+
        "    drawingsLastYear"+
        "    drawingsPenultimateYear"+
        "    dividendsLastYear"+
        "    dividendsPenultimateYear"+
        "    netAssetsLastYear"+
        "    netAssetsPenultimateYear"+
        "  }"
  +"}";}
  public static  String updateAdditionalInfoSecond(String customerId, String obj){ 
     return
  "mutation{updateAdditionalInfoSecond(" + "customerId:" + "\"" + customerId + "\""  + ", obj:" + obj + "){"+
        "    turnoverLastYear"+
        "    turnoverPenultimateYear"+
        "    netProfitLastYear"+
        "    netProfitPenultimateYear"+
        "    drawingsLastYear"+
        "    drawingsPenultimateYear"+
        "    dividendsLastYear"+
        "    dividendsPenultimateYear"+
        "    netAssetsLastYear"+
        "    netAssetsPenultimateYear"+
        "  }"
  +"}";}
}