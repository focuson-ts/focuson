package focuson.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import java.io.IOException;
import java.util.Map;
import java.util.regex.Pattern;

public class Transform {
    public static ObjectMapper mapper = new ObjectMapper();
    public static ObjectWriter prettyPrinter = mapper.writerWithDefaultPrettyPrinter();
    public static Pattern pattern = Pattern.compile("(?m)^\\s*\"([^\"]+)\"");

    public static String removeQUoteFromProperties(String json) throws IOException {
        String pretty = prettyPrinter.writeValueAsString(mapper.readValue(json, Map.class));
        return pattern.matcher(pretty).replaceAll(r -> r.group(1));
    }
//
//    public static void main(String[] args) throws IOException {
//        Map<String, Object> map = new HashMap<>();
//        map.put("first_key", "1");
//        map.put("second_key", 2);
//        String json = prettyPrinter.writeValueAsString(map);
//
//        System.out.println(removeQUoteFromProperties(json));
//    }
}
