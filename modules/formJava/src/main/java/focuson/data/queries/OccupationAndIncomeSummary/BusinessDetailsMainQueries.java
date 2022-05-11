package focuson.data.queries.OccupationAndIncomeSummary;
public class BusinessDetailsMainQueries{
  public static  String getBusinessDetailsMain(String accountId,String applRef,String brandRef,String clientRef){ 
    return"query{getBusinessDetailsMain(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\"" + "){"+
        "    businessDetails{"+
        "      applicantName"+
        "      businessName"+
        "      addressLine1"+
        "      addressLine2"+
        "      addressLine3"+
        "      addressLine4"+
        "      postcode"+
        "    }"+
        "    businessFinancialDetails{"+
        "      turnoverLastYear"+
        "      turnoverPenultimateYear"+
        "      netProfitLastYear"+
        "      netProfitPenultimateYear"+
        "      drawingsLastYear"+
        "      drawingsPenultimateYear"+
        "      dividendsLastYear"+
        "      dividendsPenultimateYear"+
        "      netAssetsLastYear"+
        "      netAssetsPenultimateYear"+
        "    }"+
        "    detailsOfNonRecurringItems{"+
        "      nonRecurringItems"+
        "    }"+
        "    detailsOfReevaluationOfAssets{"+
        "      revaluationOfAssets"+
        "    }"+
        "    accountantDetails{"+
        "      contactTitle"+
        "      contactForename"+
        "      contactSurname"+
        "      practice"+
        "      addressLine1"+
        "      addressLine2"+
        "      addressLine3"+
        "      addressLine4"+
        "      postcode"+
        "      telephone"+
        "    }"+
        "  }"
  +"}";}
}