package focuson.data;

import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.json.JsonParser;

import java.util.Arrays;
import java.util.Map;

public class Sample {
    private static JsonParser parse = new JacksonJsonParser();

    public static Map CreatePlanDDSample0 = parse.parseMap("{\"a\": 1}}");
    public static Map EAccountsSummaryDDSample0 = parse.parseMap("{\"a\": 1}}");
    public static Map EAccountSummaryDDSample0 = Map.of("accountId", "1233450", "description", "This is a one line string", "displayType", "checking", "frequency", "This is a one line string", "total", "This is a one line string", "virtualBankSeq", "This is a one line string");
}