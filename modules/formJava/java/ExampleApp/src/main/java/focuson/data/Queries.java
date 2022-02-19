package focuson.data;

public class Queries {
    public static String getCreatePlanDD(String accountId, String createPlanId, String customerId) {
        return
                "{getCreatePlanDD(" + "accountId:" + "\"" + accountId + "\"" + "," + "createPlanId:" + "\"" + createPlanId + "\"" + "," + "customerId:" + "\"" + customerId + "\"" + "){" +
                        "    createPlanStart" +
                        "    createPlanDate" +
                        "    createPlanEnd" +
                        "  }"
                        + "}";
    }

    public static String createCreatePlanDD(String accountId, String createPlanId, String customerId) {
        return
                "{createCreatePlanDD(" + "accountId:" + "\"" + accountId + "\"" + "," + "createPlanId:" + "\"" + createPlanId + "\"" + "," + "customerId:" + "\"" + customerId + "\"" + "){" +
                        "    createPlanStart" +
                        "    createPlanDate" +
                        "    createPlanEnd" +
                        "  }"
                        + "}";
    }

    public static String updateCreatePlanDD(String accountId, String createPlanId, String customerId) {
        return
                "{updateCreatePlanDD(" + "accountId:" + "\"" + accountId + "\"" + "," + "createPlanId:" + "\"" + createPlanId + "\"" + "," + "customerId:" + "\"" + customerId + "\"" + "){" +
                        "    createPlanStart" +
                        "    createPlanDate" +
                        "    createPlanEnd" +
                        "  }"
                        + "}";
    }

    public static String deleteCreatePlanDD(String accountId, String createPlanId, String customerId) {
        return
                "{deleteCreatePlanDD(" + "accountId:" + "\"" + accountId + "\"" + "," + "createPlanId:" + "\"" + createPlanId + "\"" + "," + "customerId:" + "\"" + customerId + "\"" + "){" +
                        "    createPlanStart" +
                        "    createPlanDate" +
                        "    createPlanEnd" +
                        "  }"
                        + "}";
    }

    public static String listCreatePlanDD(String accountId, String createPlanId, String customerId) {
        return
                "{listCreatePlanDD(" + "accountId:" + "\"" + accountId + "\"" + "," + "createPlanId:" + "\"" + createPlanId + "\"" + "," + "customerId:" + "\"" + customerId + "\"" + "){" +
                        "    createPlanStart" +
                        "    createPlanDate" +
                        "    createPlanEnd" +
                        "  }"
                        + "}";
    }

    public static String getEAccountsSummaryDD(String accountId, String customerId) {
        return
                "{getEAccountsSummaryDD(" + "accountId:" + "\"" + accountId + "\"" + "," + "customerId:" + "\"" + customerId + "\"" + "){" +
                        "    eAccountsTable{" +
                        "      accountId" +
                        "      displayType" +
                        "      description" +
                        "      virtualBankSeq" +
                        "      total" +
                        "      frequency" +
                        "    }" +
                        "    totalMonthlyCost" +
                        "    oneAccountBalance" +
                        "    currentAccountBalance" +
                        "    createPlan{" +
                        "      createPlanStart" +
                        "      createPlanDate" +
                        "      createPlanEnd" +
                        "    }" +
                        "  }"
                        + "}";
    }
}