package focuson.data;
import java.util.Arrays;
import java.util.Map;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.json.JsonParser;
public class Sample{
    private static JsonParser parse = new JacksonJsonParser();
 public static Map CreatePlanDDSample0 =  parse.parseMap(
    "{"+
    "  \"createPlanStart\": \"2022-01-01\","+
    "  \"createPlanDate\": \"2022-03-01\","+
    "  \"createPlanEnd\": \"2022-10-01\""+
    "}"
 );
 public static Map EAccountsSummaryDDSample0 =  parse.parseMap(
    "{"+
    "  \"eAccountsTable\": ["+
    "    {"+
    "      \"accountId\": \"1233450\","+
    "      \"displayType\": \"checking\","+
    "      \"description\": \"This account has a description\","+
    "      \"virtualBankSeq\": \"seq1\","+
    "      \"total\": \"1000\","+
    "      \"frequency\": \"23\""+
    "    }"+
    "  ],"+
    "  \"totalMonthlyCost\": \"1000\","+
    "  \"oneAccountBalance\": \"9921\","+
    "  \"currentAccountBalance\": \"12321\","+
    "  \"createPlan\": {"+
    "    \"createPlanStart\": \"2022-01-01\","+
    "    \"createPlanDate\": \"2022-03-01\","+
    "    \"createPlanEnd\": \"2022-10-01\""+
    "  }"+
    "}"
 );
 public static Map EAccountSummaryDDSample0 =  parse.parseMap(
    "{"+
    "  \"accountId\": \"1233450\","+
    "  \"displayType\": \"checking\","+
    "  \"description\": \"This account has a description\","+
    "  \"virtualBankSeq\": \"seq1\","+
    "  \"total\": \"1000\","+
    "  \"frequency\": \"23\""+
    "}"
 );
}